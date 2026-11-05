"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { config } from "@/config";
import { track } from "@/lib/analytics";
import { Check, Paperclip } from "@/components/ui/icons";
import Recaptcha, { RecaptchaHandle } from "./Recaptcha";
import {
    ACCEPTED_EXTENSIONS,
    ACCEPTED_FILE_TYPES,
    BRIEF_STORAGE_KEY,
    Channel,
    EMAIL_PATTERN,
    MAX_FILE_BYTES,
    PHONE_PATTERN,
    channelOptions,
    existingOptions,
    serviceOptions,
    stepNames,
    timelineOptions,
} from "./briefOptions";

type FieldError = "services" | "goal" | "file" | "timeline" | "name" | "contact" | "email" | "phone" | "captcha";
type Errors = Partial<Record<FieldError, string>>;

const cardClass = (on: boolean) =>
    `opt w-full min-h-[104px] cursor-pointer rounded-[18px] border-[1.5px] p-[22px] text-left text-white ${on ? "border-green bg-green-deep" : "border-line bg-surface"}`;
const chipClass = (on: boolean) =>
    `opt min-h-[46px] cursor-pointer rounded-full border-[1.5px] px-5 py-3 text-[15px] font-medium ${on ? "border-green bg-green text-ink" : "border-slate bg-surface text-white"}`;
const fieldClass =
    "fld w-full rounded-[14px] border border-slate bg-surface px-[18px] py-[15px] text-base font-normal text-white placeholder:text-[#6F7D8A]";
const headingClass = "m-0 font-display text-[clamp(38px,5vw,60px)] font-extrabold leading-none tracking-[-0.04em] outline-none";

const ErrorText = ({ id, message }: { id: string; message?: string }) =>
    message ? <p id={id} role="alert" className="m-0 mt-2 text-sm font-medium text-[#FF8A8A]">{message}</p> : null;

const StartProjectForm = () => {
    const router = useRouter();
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const captchaRef = useRef<RecaptchaHandle>(null);
    const firstRender = useRef(true);

    const [step, setStep] = useState(0);
    const [services, setServices] = useState<string[]>([]);
    const [goal, setGoal] = useState("");
    const [existing, setExisting] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState("");
    const [timeline, setTimeline] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [channel, setChannel] = useState<Channel>("whatsapp");
    const [captchaToken, setCaptchaToken] = useState("");

    const [attempted, setAttempted] = useState(false);
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const validate = (forStep: number): Errors => {
        const errors: Errors = {};
        if (forStep === 0 && services.length === 0) errors.services = "Pick at least one service.";
        if (forStep === 1 && !goal.trim()) errors.goal = "Tell us briefly what you want to achieve.";
        if (forStep === 2 && !timeline) errors.timeline = "Choose a timeline.";
        if (forStep === 3) {
            const trimmedEmail = email.trim();
            const trimmedPhone = phone.trim();
            if (!name.trim()) errors.name = "Add your full name.";
            if (!trimmedEmail && !trimmedPhone) errors.contact = "Add an email address or WhatsApp number so we can reply.";
            if (trimmedEmail && !EMAIL_PATTERN.test(trimmedEmail)) errors.email = "Enter a valid email address.";
            if (trimmedPhone && !PHONE_PATTERN.test(trimmedPhone)) errors.phone = "Enter a valid phone number.";
            if (!errors.contact && channel === "email" && !trimmedEmail) errors.email = "Add your email, since you'd like us to reply by email.";
            if (!errors.contact && channel !== "email" && !trimmedPhone) {
                errors.phone = `Add your WhatsApp number, since you'd like us to reply by ${channel === "phone" ? "phone" : "WhatsApp"}.`;
            }
        }
        return errors;
    };

    const errors = validate(step);
    const canContinue = Object.keys(errors).length === 0;
    const show = (field: FieldError) => (attempted || touched[field] ? errors[field] : undefined);

    useEffect(() => {
        track("form_step", { step: step + 1, step_name: stepNames[step] });

        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        // Move focus to the new step's heading for keyboard and screen reader users.
        headingRef.current?.focus({ preventScroll: true });
        const top = sectionRef.current?.getBoundingClientRect().top ?? 0;
        if (top < 0) window.scrollBy({ top: top - 24, behavior: "smooth" });
    }, [step]);

    const goTo = (next: number) => {
        setAttempted(false);
        setSubmitError("");
        setStep(next);
    };

    const toggleService = (id: string) =>
        setServices((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selected = event.target.files?.[0] ?? null;
        setFileError("");
        if (!selected) return;

        const extension = selected.name.split(".").pop()?.toLowerCase() ?? "";
        if (!ACCEPTED_EXTENSIONS.includes(extension)) {
            setFileError("Attach a PDF, Word document or image (PNG or JPG).");
            event.target.value = "";
            return;
        }
        if (selected.size > MAX_FILE_BYTES) {
            setFileError("That file is over 4 MB. Attach a smaller version, or send it to us on WhatsApp after submitting.");
            event.target.value = "";
            return;
        }
        setFile(selected);
        track("file_upload", { file_type: extension });
    };

    const removeFile = () => {
        setFile(null);
        setFileError("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const submit = async () => {
        if (!config.RECAPTCHA_DISABLED && !captchaToken) {
            setSubmitError("Please confirm you're not a robot.");
            return;
        }

        setSubmitting(true);
        setSubmitError("");

        const body = new FormData();
        services.forEach((service) => body.append("services", service));
        body.append("goal", goal.trim());
        if (existing) body.append("existing", existing);
        if (timeline) body.append("timeline", timeline);
        body.append("name", name.trim());
        if (company.trim()) body.append("company", company.trim());
        if (email.trim()) body.append("email", email.trim());
        if (phone.trim()) body.append("phone", phone.trim());
        body.append("channel", channel);
        body.append("captchaToken", config.RECAPTCHA_DISABLED ? "captcha-disabled" : captchaToken);
        if (file) body.append("file", file);

        // Recorded on the Zoho CRM lead, so the team can see where the brief came from.
        body.append("pageUri", window.location.href);

        try {
            const response = await fetch(`${config.BASE_API_URL}/brief`, { method: "POST", body });
            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                const message = Array.isArray(data.message) ? data.message[0] : data.message;
                throw new Error(typeof message === "string" ? message : "");
            }

            track("generate_lead", { services: services.join(","), timeline: timeline ?? "", channel });
            try {
                window.sessionStorage.setItem(
                    BRIEF_STORAGE_KEY,
                    JSON.stringify({ firstName: name.trim().split(/\s+/)[0], channel, hasEmail: !!email.trim() }),
                );
            } catch {
                // The thank-you page falls back to generic copy.
            }
            router.push("/thank-you");
        } catch (error) {
            const message = error instanceof Error && error.message ? error.message : "";
            setSubmitError(message || "We couldn't send your brief. Please try again, or WhatsApp us instead.");
            captchaRef.current?.reset();
            setSubmitting(false);
        }
    };

    const onNext = () => {
        if (!canContinue) {
            setAttempted(true);
            return;
        }
        if (step < 3) goTo(step + 1);
        else submit();
    };

    const chosenServices = serviceOptions.filter((option) => services.includes(option.id));
    const chosenTimeline = timelineOptions.find((option) => option.id === timeline);

    return (
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-start gap-10 px-6 pb-24 pt-8">
            <section ref={sectionRef} aria-label="Project brief" className="min-w-0 flex-[999_1_600px]">
                <div className="flex gap-2" aria-hidden="true">
                    {stepNames.map((label, index) => (
                        <div key={label} className="h-1 flex-1 overflow-hidden rounded-full bg-line">
                            <div className={`h-full origin-left rounded-full bg-green transition-transform duration-500 ease-sleek ${index <= step ? "scale-x-100" : "scale-x-0"}`} />
                        </div>
                    ))}
                </div>
                <p className="m-0 mt-3.5 flex justify-between text-[13px] uppercase tracking-[0.08em] text-muted">
                    <span>Step {step + 1} / 4</span>
                    <span>{stepNames[step]}</span>
                </p>

                {step === 0 && (
                    <div key="step-0" className="step-in mt-12">
                        <h1 ref={headingRef} tabIndex={-1} className={headingClass}>What can we build<br />for you?</h1>
                        <p className="m-0 mt-4 text-[17px] text-muted">Pick everything that applies.</p>
                        <div role="group" aria-label="Services" aria-describedby={show("services") ? "services-error" : undefined} className="mt-9 grid grid-cols-[repeat(auto-fit,minmax(min(230px,100%),1fr))] gap-3.5">
                            {serviceOptions.map((option) => {
                                const on = services.includes(option.id);
                                return (
                                    <button key={option.id} type="button" aria-pressed={on} onClick={() => toggleService(option.id)} className={cardClass(on)}>
                                        <span className="flex items-center justify-between gap-3">
                                            <span className="font-display text-[19px] font-bold tracking-[-0.01em]">{option.label}</span>
                                            <span className={`flex h-[22px] w-[22px] flex-none items-center justify-center rounded-full border-[1.5px] ${on ? "border-green bg-green" : "border-slate"}`}>
                                                {on && <Check size={13} strokeWidth={3} color="#070B10" />}
                                            </span>
                                        </span>
                                        <span className="mt-2 block text-sm leading-normal text-muted">{option.desc}</span>
                                    </button>
                                );
                            })}
                        </div>
                        <ErrorText id="services-error" message={show("services")} />
                    </div>
                )}

                {step === 1 && (
                    <div key="step-1" className="step-in mt-12">
                        <h1 ref={headingRef} tabIndex={-1} className={headingClass}>Tell us about it.</h1>
                        <p className="m-0 mt-4 text-[17px] text-muted">A few lines is plenty — we&rsquo;ll dig into details on the call.</p>

                        <label htmlFor="goal" className="mt-9 block text-[15px] font-medium">What do you want to achieve?</label>
                        <textarea
                            id="goal"
                            rows={5}
                            value={goal}
                            onChange={(event) => setGoal(event.target.value)}
                            onBlur={() => setTouched((current) => ({ ...current, goal: true }))}
                            aria-invalid={!!show("goal")}
                            aria-describedby={show("goal") ? "goal-error" : undefined}
                            maxLength={5000}
                            placeholder="e.g. We take bookings over WhatsApp and Excel. We want customers to book and pay online, and our team to see everything in one dashboard."
                            className={`${fieldClass} mt-2.5 resize-y rounded-2xl py-4 leading-[1.55]`}
                        />
                        <ErrorText id="goal-error" message={show("goal")} />

                        <fieldset className="m-0 mt-7 border-0 p-0">
                            <legend className="text-[15px] font-medium">Do you already have a website or app?</legend>
                            <div className="mt-3 flex flex-wrap gap-2.5">
                                {existingOptions.map((option) => (
                                    <button
                                        key={option.id}
                                        type="button"
                                        aria-pressed={existing === option.id}
                                        onClick={() => setExisting(existing === option.id ? null : option.id)}
                                        className={chipClass(existing === option.id)}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </fieldset>

                        <label className="relative mt-7 flex cursor-pointer items-center gap-[18px] rounded-[18px] border-[1.5px] border-dashed border-slate bg-ink-raised p-[22px] focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-green">
                            <span className="flex h-12 w-12 flex-none items-center justify-center rounded-[14px] bg-chip"><Paperclip /></span>
                            <span className="min-w-0 flex-1">
                                <span className="block truncate text-base font-semibold">{file ? file.name : "Attach a document"}</span>
                                <span className="mt-1 block text-sm text-muted">Optional — a brief, RFP, sketch or screenshots. PDF, DOCX or images, up to 4 MB.</span>
                            </span>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept={ACCEPTED_FILE_TYPES}
                                onChange={onFileChange}
                                aria-describedby={fileError ? "file-error" : undefined}
                                className="absolute h-px w-px opacity-0"
                            />
                        </label>
                        {file && (
                            <button type="button" onClick={removeFile} className="mt-2 text-sm font-medium text-green">
                                Remove attachment
                            </button>
                        )}
                        <ErrorText id="file-error" message={fileError} />
                    </div>
                )}

                {step === 2 && (
                    <div key="step-2" className="step-in mt-12">
                        <h1 ref={headingRef} tabIndex={-1} className={headingClass}>When do you<br />need it?</h1>
                        <p className="m-0 mt-4 text-[17px] text-muted">So we can plan the right team for you.</p>
                        <div role="group" aria-label="Timeline" className="mt-9 grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-3.5">
                            {timelineOptions.map((option) => (
                                <button key={option.id} type="button" aria-pressed={timeline === option.id} onClick={() => setTimeline(option.id)} className={cardClass(timeline === option.id)}>
                                    <span className="block font-display text-[19px] font-bold">{option.label}</span>
                                    <span className="mt-2 block text-sm leading-normal text-muted">{option.desc}</span>
                                </button>
                            ))}
                        </div>
                        <ErrorText id="timeline-error" message={show("timeline")} />
                    </div>
                )}

                {step === 3 && (
                    <div key="step-3" className="step-in mt-12">
                        <h1 ref={headingRef} tabIndex={-1} className={headingClass}>Where can we<br />reach you?</h1>
                        <p className="m-0 mt-4 text-[17px] text-muted">Your name, plus an email address or WhatsApp number.</p>

                        <div className="mt-9 grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-[18px]">
                            <div>
                                <label htmlFor="name" className="block text-[15px] font-medium">Full name</label>
                                <input
                                    id="name"
                                    type="text"
                                    autoComplete="name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    onBlur={() => setTouched((current) => ({ ...current, name: true }))}
                                    aria-invalid={!!show("name")}
                                    aria-describedby={show("name") ? "name-error" : undefined}
                                    placeholder="Ada Okafor"
                                    className={`${fieldClass} mt-2.5`}
                                />
                                <ErrorText id="name-error" message={show("name")} />
                            </div>
                            <div>
                                <label htmlFor="company" className="block text-[15px] font-medium">Company <span className="font-normal text-muted">(optional)</span></label>
                                <input
                                    id="company"
                                    type="text"
                                    autoComplete="organization"
                                    value={company}
                                    onChange={(event) => setCompany(event.target.value)}
                                    placeholder="Okafor Logistics"
                                    className={`${fieldClass} mt-2.5`}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-[15px] font-medium">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    onBlur={() => setTouched((current) => ({ ...current, email: true }))}
                                    aria-invalid={!!show("email")}
                                    aria-describedby={show("email") ? "email-error" : undefined}
                                    placeholder="ada@company.com"
                                    className={`${fieldClass} mt-2.5`}
                                />
                                <ErrorText id="email-error" message={show("email")} />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-[15px] font-medium">WhatsApp number</label>
                                <input
                                    id="phone"
                                    type="tel"
                                    autoComplete="tel"
                                    value={phone}
                                    onChange={(event) => setPhone(event.target.value)}
                                    onBlur={() => setTouched((current) => ({ ...current, phone: true }))}
                                    aria-invalid={!!show("phone")}
                                    aria-describedby={show("phone") ? "phone-error" : undefined}
                                    placeholder="0801 234 5678"
                                    className={`${fieldClass} mt-2.5`}
                                />
                                <ErrorText id="phone-error" message={show("phone")} />
                            </div>
                        </div>
                        <ErrorText id="contact-error" message={show("contact")} />

                        <fieldset className="m-0 mt-[26px] border-0 p-0">
                            <legend className="text-[15px] font-medium">Best way to reach you</legend>
                            <div className="mt-3 flex flex-wrap gap-2.5">
                                {channelOptions.map((option) => (
                                    <button key={option.id} type="button" aria-pressed={channel === option.id} onClick={() => setChannel(option.id)} className={chipClass(channel === option.id)}>
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </fieldset>

                        <div className="mt-7">
                            {config.RECAPTCHA_DISABLED ? (
                                <p className="m-0 inline-block rounded-xl border border-dashed border-slate px-4 py-3 text-[13px] text-muted">
                                    reCAPTCHA is turned off on this test version.
                                </p>
                            ) : (
                                <Recaptcha ref={captchaRef} onToken={(token) => { setCaptchaToken(token); if (token) setSubmitError(""); }} />
                            )}
                        </div>

                        <p className="m-0 mt-[22px] text-[13px] leading-normal text-muted">
                            We&rsquo;ll only use your details to respond to this request. See our{" "}
                            <Link href="/privacy-policy" className="text-green underline-offset-4 hover:underline">privacy policy</Link>.
                        </p>
                    </div>
                )}

                {submitError && (
                    <p role="alert" className="m-0 mt-8 rounded-2xl border border-[#FF8A8A]/40 bg-[#FF8A8A]/10 px-5 py-4 text-[15px] text-[#FFC2C2]">
                        {submitError}
                    </p>
                )}

                <div className="mt-12 flex items-center justify-between gap-3 border-t border-line pt-7">
                    {step > 0 ? (
                        <button
                            type="button"
                            onClick={() => goTo(step - 1)}
                            disabled={submitting}
                            className="cursor-pointer rounded-full border border-slate bg-transparent px-6 py-3.5 text-[15px] font-medium text-white transition-colors hover:border-green"
                        >
                            Back
                        </button>
                    ) : <span />}
                    <button
                        type="button"
                        onClick={onNext}
                        aria-disabled={!canContinue || submitting}
                        disabled={submitting}
                        className={`min-h-[52px] rounded-full px-8 py-4 text-base font-semibold transition-colors duration-300 ${canContinue && !submitting ? "cursor-pointer bg-green text-ink" : "cursor-not-allowed bg-line text-muted"}`}
                    >
                        {step === 3 ? (submitting ? "Sending…" : "Send my brief") : "Continue"}
                    </button>
                </div>
            </section>

            <aside aria-label="Your brief" className="min-w-0 flex-[1_1_300px] rounded-[28px] border border-line bg-surface p-8">
                <h2 className="m-0 font-display text-lg font-bold">Your brief</h2>
                <dl className="mt-6 flex flex-col gap-5">
                    <div>
                        <dt className="text-xs uppercase tracking-[0.1em] text-muted">Services</dt>
                        <dd className="m-0 mt-1.5 text-base leading-normal">{chosenServices.length ? chosenServices.map((option) => option.label).join(", ") : "Not chosen yet"}</dd>
                    </div>
                    <div>
                        <dt className="text-xs uppercase tracking-[0.1em] text-muted">Attachment</dt>
                        <dd className="m-0 mt-1.5 break-words text-base">{file ? file.name : "None"}</dd>
                    </div>
                    <div>
                        <dt className="text-xs uppercase tracking-[0.1em] text-muted">Timeline</dt>
                        <dd className="m-0 mt-1.5 text-base">{chosenTimeline ? chosenTimeline.label : "—"}</dd>
                    </div>
                </dl>
                <ul className="mt-7 flex flex-col gap-3.5 border-t border-line pt-6 text-sm text-soft">
                    {["Reply within 24 hours", "Free discovery call", "Tailored proposal, no obligation"].map((item) => (
                        <li key={item} className="flex items-center gap-2.5"><Check />{item}</li>
                    ))}
                </ul>
            </aside>
        </div>
    );
}

export default StartProjectForm;

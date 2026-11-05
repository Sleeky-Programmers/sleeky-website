import { Fragment } from "react";

// Headings edited in the CMS use a small convention: each new line is a line on
// the page, and *words in asterisks* are shown in green.
// "Software\nthat *grows*\nyour business."

/** One line's text, with *starred* words in green. */
export const HighlightedText = ({ text }: { text: string }) => (
    <>
        {text.split(/(\*[^*]+\*)/g).map((part, index) =>
            part.length > 2 && part.startsWith("*") && part.endsWith("*") ? (
                <span key={index} className="text-green">{part.slice(1, -1)}</span>
            ) : (
                <Fragment key={index}>{part}</Fragment>
            ),
        )}
    </>
);

export const headingLines = (text: string) => text.split("\n").filter((line) => line.trim() !== "");

/** The heading as plain text (for metadata, aria labels and alt text). */
export const plainHeading = (text: string) => headingLines(text).join(" ").replace(/\*([^*]+)\*/g, "$1");

/** Lines separated by <br />. */
export const HighlightedLines = ({ text }: { text: string }) => (
    <>
        {headingLines(text).map((line, index) => (
            <Fragment key={index}>
                {index > 0 && <br />}
                <HighlightedText text={line} />
            </Fragment>
        ))}
    </>
);

/** Lines that slide up one after another (the hero headline animation). */
export const AnimatedLines = ({ text }: { text: string }) => (
    <>
        {headingLines(text).map((line, index) => (
            <span key={index} className={`ln ${index === 1 ? "d2" : index > 1 ? "d3" : ""}`}>
                <span><HighlightedText text={line} /></span>
            </span>
        ))}
    </>
);

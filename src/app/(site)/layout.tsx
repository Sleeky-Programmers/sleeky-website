import SiteHeader from "@/components/layout/SiteHeader";

// Each page renders its own <main> and footer, because the designs give every
// page type a different closing section.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-x-clip">
      <SiteHeader />
      {children}
    </div>
  );
}

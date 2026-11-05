// Re-mounts on every navigation, giving a short fade/slide between pages (brief 5.5).
// The page background is the same ink colour throughout, so there is no white flash.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}

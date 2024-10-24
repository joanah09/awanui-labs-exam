import { ReactNode } from "react";

interface LayoutProps {
  preview: boolean;
  children: ReactNode;
}

export default function Layout({ preview, children }: LayoutProps) {
  return (
    <>
      {preview}
      <main className="min-h-screen bg-slate-50 py-5 xl:py-20">
        <div className="container mx-auto">{children}</div>
      </main>
    </>
  );
}

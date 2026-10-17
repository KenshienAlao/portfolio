import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Starfield } from "@/components/starfield";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Starfield />
      <div className="relative z-1 flex flex-col min-h-screen text-foreground">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
}

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { SmoothScroll } from "@/components/site/SmoothScroll";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}

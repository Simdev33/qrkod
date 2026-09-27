import { Generator } from "@/components/generator/Generator";
import { CtaBand } from "@/components/home/CtaBand";
import { Faq } from "@/components/home/Faq";
import { Features } from "@/components/home/Features";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Lifecycle } from "@/components/home/Lifecycle";
import { UseCaseMarquee } from "@/components/home/UseCaseMarquee";
import { Pricing } from "@/components/home/Pricing";
import { randomCode } from "@/lib/ids";
import { currentOrigin } from "@/lib/server/request";

export default async function HomePage() {
  const origin = await currentOrigin();
  return (
    <>
      <Hero>
        <Generator origin={origin} candidate={randomCode()} />
      </Hero>
      <UseCaseMarquee />
      <HowItWorks />
      <Lifecycle />
      <Features />
      <Pricing />
      <Faq />
      <CtaBand origin={origin} />
    </>
  );
}

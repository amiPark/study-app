export const metadata = {
  title: "Home - Open PRO",
  description: "Page description",
};

import PageIllustration from "@/src/components/page-illustration";
import Hero from "@/src/components/hero-home";
import Workflows from "@/src/components/workflows";
import Features from "@/src/components/features";
import Testimonials from "@/src/components/testimonials";
import Cta from "@/src/components/cta";

export default function Home() {
  return (
    <>
      <PageIllustration />
      <Hero />
      <Workflows />
      <Features />
      <Testimonials />
      <Cta />
    </>
  );
}

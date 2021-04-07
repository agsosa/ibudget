import Footer from "treact/components/footers/MiniCenteredFooter";
import Hero from "treact/components/hero/TwoColumnWithVideo";
import Stats from "treact/components/features/TwoColSingleFeatureWithStats2";
import Features from "treact/components/features/ThreeColWithSideImage";

function LandingPage() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <Footer />
    </>
  );
}

export default LandingPage;

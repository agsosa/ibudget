import Footer from "components/Footer";
import Hero from "components/Hero";
import Stats from "components/TwoColFeatures";
import Features from "components/ThreeColFeatures";
import Navbar from "components/Navbar";

function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Footer />
    </>
  );
}

export default LandingPage;

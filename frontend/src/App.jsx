import "./style.css";
import "tailwindcss/dist/base.css";
import "bulma/css/bulma.min.css";
import LandingPage from "./pages/LandingPage";
import AnimationRevealPage from "./treact/helpers/AnimationRevealPage";

function App() {
  return (
    <AnimationRevealPage>
      <LandingPage />
    </AnimationRevealPage>
  );
}

export default App;

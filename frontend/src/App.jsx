import "./style.css";
import "tailwindcss/dist/base.css";
import "bulma/css/bulma.min.css";
import Routes from "pages/Routes";
import AnimationRevealPage from "./treact/helpers/AnimationRevealPage";

function App() {
  return (
    <AnimationRevealPage>
      <Routes />
    </AnimationRevealPage>
  );
}

export default App;

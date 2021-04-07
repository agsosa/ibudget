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
  /*
  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img
              src="https://bulma.io/images/bulma-logo.png"
              width="112"
              height="28"
              alt="Logo"
            />
          </a>

          <a
            href="/"
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a href="/" className="navbar-item">
              Home
            </a>

            <a href="/" className="navbar-item">
              Documentation
            </a>

            <div className="navbar-item has-dropdown is-hoverable">
              <a href="/" className="navbar-link">
                More
              </a>

              <div className="navbar-dropdown">
                <a href="/" className="navbar-item">
                  About
                </a>
                <a href="/" className="navbar-item">
                  Jobs
                </a>
                <a href="/" className="navbar-item">
                  Contact
                </a>
                <hr href="/" className="navbar-divider" />
                <a href="/" className="navbar-item">
                  Report an issue
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a href="/" className="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a href="/" className="button is-light">
                Log in
              </a>
            </div>
          </div>
        </div>
      </nav>

      <section className="hero is-primary">
        <div className="hero-body">
          <p className="title">Primary hero</p>
          <p className="subtitle">Primary subtitle</p>
        </div>
      </section>

      <section className="section">
        <nav className="level is-mobile">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Tweets</p>
              <p className="title">3,456</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Following</p>
              <p className="title">123</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Followers</p>
              <p className="title">456K</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Likes</p>
              <p className="title">789</p>
            </div>
          </div>
        </nav>

        <div className="container">
          <div className="notification is-primary">
            This container is <strong>centered</strong> on desktop and larger
            viewports.
          </div>
        </div>

        <article className="panel is-primary">
          <p className="panel-heading">Primary</p>
          <p className="panel-tabs">
            <a hreF="/" className="is-active">
              All
            </a>
            <a hreF="/">Public</a>
            <a hreF="/">Private</a>
            <a hreF="/">Sources</a>
            <a hreF="/">Forks</a>
          </p>
          <div className="panel-block">
            <p className="control has-icons-left">
              <input
                className="input is-primary"
                type="text"
                placeholder="Search"
              />
              <span className="icon is-left">
                <i className="fas fa-search" aria-hidden="true" />
              </span>
            </p>
          </div>
          <a hreF="/" className="panel-block is-active">
            <span className="panel-icon">
              <i className="fas fa-book" aria-hidden="true" />
            </span>
            bulma
          </a>
          <a hreF="/" className="panel-block">
            <span className="panel-icon">
              <i className="fas fa-book" aria-hidden="true" />
            </span>
            marksheet
          </a>
          <a hreF="/" className="panel-block">
            <span className="panel-icon">
              <i className="fas fa-book" aria-hidden="true" />
            </span>
            minireset.css
          </a>
          <a hreF="/" className="panel-block">
            <span className="panel-icon">
              <i className="fas fa-book" aria-hidden="true" />
            </span>
            jgthms.github.io
          </a>
        </article>
      </section>

      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            <strong>Bulma</strong> by{" "}
            <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is
            licensed
            <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
            The website content is licensed{" "}
            <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
              CC BY NC SA 4.0
            </a>
            .
          </p>
        </div>
      </footer>
    </>
  ); */
}

export default App;

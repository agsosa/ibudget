import ThreeColSlider from "components/dashboard/Articles";
import Pricing from "components/dashboard/Test";

function DashboardPage() {
  return (
    <>
      <Pricing />
      <div className="container">
        <div className="notification is-primary">
          <p className="title">Hi, Alejandro</p>
          <p className="subtitle">test</p>
        </div>
      </div>

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

        <div className="card">
          <header className="card-header">
            <p className="card-header-title">Component</p>
            <button
              className="card-header-icon"
              aria-label="more options"
              type="button"
            >
              <span className="icon">
                <i className="fas fa-angle-down" aria-hidden="true" />
              </span>
            </button>
          </header>
          <div className="card-content">
            <div className="content">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              nec iaculis mauris.
              <a href="/">@bulmaio</a>. <a href="/">#css</a>
              <a href="/">#responsive</a>
              <br />
              <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
            </div>
          </div>
          <footer className="card-footer">
            <a href="/" className="card-footer-item">
              Save
            </a>
            <a href="/" className="card-footer-item">
              Edit
            </a>
            <a href="/" className="card-footer-item">
              Delete
            </a>
          </footer>
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

      <ThreeColSlider />

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
  );
}

export default DashboardPage;

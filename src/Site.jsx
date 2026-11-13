import Magnet from './rb/Magnet.jsx';
import SplitText from './rb/SplitText.jsx';
import { SocialMenu, SocialSection } from './Socials.jsx';
import Compose, { openCompose } from './Compose.jsx';
import { BASE, url } from './base.js';

const EMAIL = 'madou.business@gmail.com';

// Shared nav. On the home page the links are in-page anchors; on the About page they go back to "/".
export function Nav({ page = 'home' }) {
  const home = page === 'home';
  const pre = home ? '' : BASE;
  return (
    <nav className="nav">
      <a className="brand" href={home ? '#top' : BASE}>GUEDRIA.</a>
      <div className="links">
        <a href={pre + '#work'}>Work</a>
        <a href={pre + '#deliverables'}>Deliverables</a>
        <a href={url("about.html")} aria-current={home ? undefined : 'page'} className={`nav-about${home ? '' : ' active'}`}>About</a>
        <a href="#contact">Contact</a>
        <Magnet padding={16} magnetStrength={9}><a className="btn solid" href="#contact">Start a project</a></Magnet>
        <SocialMenu />
      </div>
    </nav>
  );
}

export function Footer() {
  const toTop = (e) => {
    e.preventDefault();
    if (window.__jump) window.__jump(0);
    else window.scrollTo(0, 0);
  };
  return (
    <footer id="contact" className="foot">
      <div className="wrap">
        <SplitText tag="h2" text="Have a board to build?" className="h1" splitType="words" textAlign="left" />
        <p className="lede">From schematic to fab package, in KiCad</p>
        <div className="contact-card">
          <a className="mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <div className="row">
            <Magnet padding={30} magnetStrength={3}><a className="btn solid" href={`mailto:${EMAIL}`} onClick={(e) => { e.preventDefault(); openCompose(); }}>Email me</a></Magnet>
            <Magnet padding={30} magnetStrength={3}><a className="btn" href={`${BASE}#work`}>See the work</a></Magnet>
          </div>
        </div>
        <SocialSection />
        <div className="meta"><span>© 2026 Mahdi Guedria · PCB &amp; Embedded Design · KiCad</span><a href="#top" onClick={toTop}>Back to top</a></div>
      </div>
      <div className="ghost" aria-hidden="true" data-text="GUEDRIA" />
      <Compose />
    </footer>
  );
}

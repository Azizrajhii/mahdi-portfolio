import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import useLenis from './useLenis';
import SplitText from './rb/SplitText.jsx';
import CountUp from './rb/CountUp.jsx';
import Magnet from './rb/Magnet.jsx';
import AnimatedContent from './rb/AnimatedContent.jsx';
import ScrambledText from './rb/ScrambledText.jsx';
import TiltBoard from './TiltBoard.jsx';
import StageArt from './StageArt.jsx';
import { Nav, Footer } from './Site.jsx';
import { imgProps } from './img.js';
import { BASE, url } from './base.js';

const STAGE_NAMES = ['01 · Schematic capture', '02 · PCB layout', '03 · DRC / ERC checks', '04 · Fab package'];

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = [
  {
    id: 'midi', preset: 'bursts', imgs: ['s3-iso','flex'], cap: 'Flex touch strip · 4 pads with through-pad LEDs', tag: '01', title: 'Wearable MIDI controller', chip: 'ESP32-S3',
    text: 'A main board and a flex touch strip that play notes from touch and motion, powered from USB-C and a LiPo cell.',
    specs: [['Main board', '4 layers · 60 × 67.5 mm'], ['Touch strip', 'Flex · 125 × 20 mm'], ['Power', 'USB-C · LiPo charger · 5 V boost'], ['Sensing', '9-axis IMU · 16 touch pads'], ['Light', 'RGB LEDs through the pads']],
  },
  {
    id: 'soil', preset: 'shards', imgs: ['c3-iso','c3-low'], cap: 'Main board, isometric and low angle · battery clips underneath', tag: '02', title: 'Soil probe node', chip: 'ESP32-C3',
    text: 'A long main board that carries its own battery, paired with a capacitive probe that goes into the ground up to a marked soil line.',
    specs: [['Main board', '4 layers · 90 × 33.8 mm'], ['Probe', 'Capacitive · 2 layers · 15 × 80 mm'], ['Temperature', 'DS18B20 strip on the probe'], ['Probe head', 'Potted, above the soil line'], ['Power', 'USB-C · on-board battery clips']],
  },
];

const deliver = [['Schematic', 'PDF + KiCad source'], ['PCB layout', '2 or 4 layers, rigid or flex'], ['Checks', 'DRC / ERC report, clean'], ['Fab package', 'Gerbers · drill · BOM · placement'], ['Renders', '3D views like the ones on this page']];
const stack = [['Tool', 'KiCad'], ['Microcontrollers', 'ESP32-S3 · ESP32-C3'], ['Power', 'USB-C · LiPo charging · 5 V boost'], ['Sensors', 'IMU · capacitive touch · soil · DS18B20'], ['Wireless', 'On-module antenna with keepout']];

export default function App() {
  useLenis();
  const root = useRef(null);
  const pin = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const hero = { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true };
      gsap.to('.hero-board', { yPercent: -12, ease: 'none', scrollTrigger: hero });
      gsap.to('.hero-letters', { yPercent: 18, ease: 'none', scrollTrigger: hero });

      // Pinned section: probe rotates, background word travels sideways.
      const angle = { v: 0 };
      const out = document.querySelector('.angle');
      const stages = gsap.utils.toArray('.stage');
      const stageLabel = document.querySelector('.stage-label');
      gsap.timeline({ scrollTrigger: { trigger: pin.current, start: 'top top', end: '+=250%', pin: true, scrub: 0.6 } })
        .to('.probe-frame', { rotation: 360, ease: 'none' }, 0)
        .to(angle, { v: 360, ease: 'none', onUpdate: () => {
          out.textContent = angle.v.toFixed(2).padStart(6, '0') + '°';
          const i = Math.min(3, Math.floor(angle.v / 90));
          stages.forEach((s, k) => { s.style.opacity = k === i ? 1 : 0; });
          stageLabel.textContent = STAGE_NAMES[i];
        } }, 0)
        .to('.marquee-word', { xPercent: -55, ease: 'none' }, 0);
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <div ref={root}>
      <Nav page="home" />

      <header className="hero" id="top">
        <div className="hero-letters" aria-hidden="true" data-text="P C B" />
        <div className="hero-board"><img {...imgProps('s3-iso', '(max-width: 860px) 60vw, 560px')} alt="ESP32-S3 main board, isometric" fetchpriority="high" decoding="async" /></div>
        <div className="hero-copy">
          <p className="label">PCB &amp; Embedded Design · KiCad</p>
          <SplitText tag="h1" text="PCB design, ready for the fab" className="h1" splitType="words" textAlign="left" delay={70} />
          <p className="lede">Schematic capture, 2- and 4-layer layout, and fabrication files for ESP32 products, checked clean before handoff.</p>
          <div className="row">
            <Magnet padding={40} magnetStrength={3}><a className="btn solid" href="#work">See the work</a></Magnet>
            <Magnet padding={16} magnetStrength={9}><a className="btn" href="#contact">Start a project</a></Magnet>
          </div>
          <dl className="spec">
            <div><dt>Latest board</dt><dd>ESP32-S3 MIDI</dd></div>
            <div><dt>Layers</dt><dd>4</dd></div>
            <div><dt>Checks</dt><dd className="ok">DRC / ERC clean</dd></div>
          </dl>
        </div>
      </header>

      <section className="band">
        <div className="wrap band-grid">
          <ScrambledText
            className="band-p"
            effect="scramble"
            radius={100}
            duration={1.2}
            speed={0.5}
            scrambleChars=".:"
            scrambleColor="var(--accent)"
            fontFamily="'JetBrains Mono', monospace"
            style={{ margin: 0 }}
            clickBurst
            intro
          >
            Every board is checked against its design rules and electrical rules before the files leave, so the fab house builds it instead of sending questions back.
          </ScrambledText>
          <div>
            <div className="big"><CountUp to={0} from={24} duration={2} /></div>
            <p className="label on">DRC / ERC errors</p>
            <p className="cap">ESP32-S3 main board · 4 layers · 60 × 67.5 mm</p><img className="band-img" {...imgProps('s3-top', '(max-width: 860px) 90vw, 440px')} alt="ESP32-S3 main board, top side" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>

      <section id="work" className="wrap work">
        {projects.map((p) => (
          <AnimatedContent key={p.id} distance={60} duration={0.9}>
            <article className="project">
              <div className="proj-visual">{p.imgs.map((n) => <TiltBoard key={n} src={url(`img/${n}.webp`)} alt={`${p.title} board`} />)}<p className="cap">{p.cap} · move your cursor over the boards</p></div>
              <div>
                <p className="label">{p.tag} · {p.chip}</p>
                <h2 className="h2">{p.title}</h2>
                <p className="lede">{p.text}</p>
                <dl className="table">{p.specs.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
              </div>
            </article>
          </AnimatedContent>
        ))}
      </section>

      <section id="deliverables" className="wrap deliver">
        <AnimatedContent distance={40}>
          <h2 className="h2">What you get</h2>
          <div className="two">
            <dl className="table">{deliver.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            <dl className="table">{stack.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
          </div>
        </AnimatedContent>
      </section>

      {/* GSAP pins the plain outer section; the rounded, inset panel lives inside it.
          Pinning the panel directly fixed its width to the viewport while keeping its
          16px margin, which made the page 16px wider than the screen. */}
      <section className="pin-outer" ref={pin}>
        <div className="pin">
          <div className="marquee-word" aria-hidden="true" data-text="Schematic · Layout · Checks · Fab · Schematic · Layout" />
          <div className="probe-wrap">
            <div className="probe-frame"><StageArt /></div>
            <p className="label stage-label">{STAGE_NAMES[0]}</p>
            <p className="angle">000.00°</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

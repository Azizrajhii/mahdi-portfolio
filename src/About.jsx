import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import useLenis from './useLenis';
import { Nav, Footer } from './Site.jsx';
import SplitText from './rb/SplitText.jsx';
import CountUp from './rb/CountUp.jsx';
import Magnet from './rb/Magnet.jsx';
import AnimatedContent from './rb/AnimatedContent.jsx';
import ScrollReveal from './rb/ScrollReveal.jsx';
import TiltBoard from './TiltBoard.jsx';
import { SOCIALS } from './Socials.jsx';
import { openCompose } from './Compose.jsx';
import { BASE, url } from './base.js';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const UPWORK = SOCIALS.find((s) => s.name === 'Upwork').url;

const stats = [
  { to: 4, prefix: '$', suffix: 'K+', label: 'Earned on Upwork' },
  { to: 11, label: 'Jobs delivered' },
  { to: 118, label: 'Hours billed' },
  { to: 100, suffix: '%', label: 'Job success' },
];

const builds = [
  {
    n: '01', title: 'Embedded firmware',
    text: 'Firmware that keeps running outside the lab: low-power, event driven and tested on real hardware.',
    tags: ['ESP32 · S3 · C3', 'ESP-IDF', 'Arduino', 'STM32', 'FreeRTOS', 'BLE', 'Wi-Fi', 'LoRa', 'MQTT', 'ESP-NOW', 'I2C · SPI · UART'],
  },
  {
    n: '02', title: 'PCB design',
    text: 'Schematic to fab-ready files, with manufacturing in mind: clean checks, sensible stack-ups, antenna keep-outs.',
    tags: ['KiCad', 'EasyEDA', 'Altium', '2 & 4 layers', 'Flex', 'JLCPCB DFM', 'Power design', 'BLE antenna'],
    img: 's3-top',
  },
  {
    n: '03', title: 'Edge AI',
    text: 'TensorFlow Lite models that run on the microcontroller itself, so devices decide locally instead of waiting for the cloud.',
    tags: ['TensorFlow Lite', 'ESP32-class hardware', 'On-device inference', 'Constrained memory'],
  },
  {
    n: '04', title: 'Full product support',
    text: 'The parts around the board: mobile app, backend and dashboards, so the product works end to end.',
    tags: ['React Native', 'Node.js', 'Flask', 'Cloud dashboards', 'Real-time data', 'AWS IoT Core'],
    img: 'c3-iso',
  },
];

const proof = [
  ['1st place', 'National IEEE Congress', 'AI traffic-detection system: computer vision plus an embedded app.'],
  ['1st place', 'National CSE Congress', 'AI smart-home system.'],
  ['Product', 'AutoBlocks display controller', 'ESP32 + BLE + HUB75 LED display, custom PCB and React Native app.'],
  ['Product', 'Multi-sensor access device', 'ESP32 with fingerprint and RFID, Wi-Fi backend, SD logging, custom PCB.'],
];

const jobs = [
  'PCB design for an ESP32 wearable music helmet',
  'Rework of a daughterboard',
  'PCB panelization for manufacturing',
  'Daughterboard for an ESP32-S3 dev board',
  'KiCad schematic clean-up, 28 components',
  'PCB for a small BLE device prototype',
];

const insights = ['Clear communicator', 'Committed to quality', 'Solution oriented', 'Detail oriented', 'Collaborative', 'Accountable for outcomes', 'Professional', 'Reliable'];

const skills = ['ESP32', 'Arduino', 'Raspberry Pi', 'Embedded systems', 'Electronics', 'PCB design', 'EasyEDA', 'Altium Designer', 'KiCad', 'AWS IoT Core', 'Bluetooth', 'BLE', 'Wi-Fi', 'LoRa', 'MQTT', 'STM32', 'FreeRTOS', 'Firmware', 'Prototyping'];

const background = [
  { h: 'Education', t: 'Master of Computer Science', s: 'Higher Institute of Computer Science and Mathematics of Monastir (ISIMM). Information and communication technologies.' },
  { h: 'Languages', t: 'English · Arabic · French', s: 'English fluent, Arabic native, French fluent.' },
  { h: 'Certification', t: 'Google Digital Garage', s: 'Provider: Google EMEA.' },
  { h: 'Experience', t: 'Technical Coordinator and Speaker', s: "Tunisia's 2nd largest technology congress, Aug 2024 to Apr 2025: workshops, coordination and talks on engineering and technology topics." },
  { h: 'Also', t: 'Visual lead and designer', s: 'Led the visual identity for a national congress, ran student social pages, and founded a small print-on-demand clothing brand.' },
];

export default function About() {
  useLenis();
  const root = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // portrait + floating chips drift at different speeds
      const hero = { trigger: '.ab-hero', start: 'top top', end: 'bottom top', scrub: true };
      gsap.to('.ab-photo', { yPercent: -8, ease: 'none', scrollTrigger: hero });
      gsap.to('.ab-chip-a', { yPercent: -60, ease: 'none', scrollTrigger: hero });
      gsap.to('.ab-chip-b', { yPercent: 50, ease: 'none', scrollTrigger: hero });

      // stacked cards: each card settles back as the next one slides over it
      const cards = gsap.utils.toArray('.ab-card');
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        // explicit start values: GSAP would otherwise start the filter from brightness(0), i.e. black
        gsap.fromTo(card.querySelector('.ab-card-in'),
          { scale: 1, filter: 'brightness(1)' },
          {
            scale: 0.95, filter: 'brightness(0.72)', ease: 'power1.inOut',
            scrollTrigger: { trigger: cards[i + 1], start: 'top 100%', end: 'top 10%', scrub: 1 },
          });
      });

      // skills pop in with a stagger
      gsap.from('.ab-skill', {
        y: 18, opacity: 0, duration: 0.6, ease: 'power3.out', stagger: 0.03,
        scrollTrigger: { trigger: '.ab-skills', start: 'top 80%' },
      });

      // proof rail fills as you scroll
      gsap.fromTo('.ab-rail-fill', { scaleY: 0 }, { scaleY: 1, ease: 'none', transformOrigin: 'top', scrollTrigger: { trigger: '.ab-proof-list', start: 'top 70%', end: 'bottom 60%', scrub: true } });
    });
    return () => mm.revert();
  }, { scope: root });

  return (
    <div ref={root}>
      <Nav page="about" />

      <header className="ab-hero" id="top">
        <div className="wrap ab-hero-grid">
          <div className="ab-hero-copy">
            <p className="label">About · Ben Arous, Tunisia</p>
            <SplitText tag="h1" text="Hi, I'm Mahdi." className="h1" splitType="words" textAlign="left" delay={80} />
            <p className="lede">ESP32 &amp; IoT firmware engineer, PCB designer, and edge-AI developer. I build connected devices that ship and keep working outside a lab: the firmware, the board, and the AI that runs on the chip itself.</p>
            <div className="row">
              <Magnet padding={16} magnetStrength={9}><a className="btn solid" href={UPWORK} target="_blank" rel="noopener noreferrer">Hire me on Upwork</a></Magnet>
              <Magnet padding={16} magnetStrength={9}><a className="btn" href="mailto:madou.business@gmail.com" onClick={(e) => { e.preventDefault(); openCompose(); }}>Email me</a></Magnet>
            </div>
            <p className="ab-avail"><span className="dot" /> Open to offers · Replies in 4 to 8 hours</p>
          </div>
          <div className="ab-photo-wrap">
            <div className="ab-photo"><img src={url("img/me.webp")} width="500" height="500" alt="Portrait of Mahdi Guedria" fetchpriority="high" /></div>
            <span className="ab-chip ab-chip-a">Top Rated</span>
            <span className="ab-chip ab-chip-b">100% Job Success</span>
          </div>
        </div>
      </header>

      <section className="band ab-stats">
        <div className="wrap ab-stat-grid">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="ab-num"><CountUp to={s.to} from={0} duration={2} prefix={s.prefix || ''} suffix={s.suffix || ''} /></div>
              <p className="label on">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap ab-story" id="story">
        <p className="label">The short version</p>
        <ScrollReveal baseOpacity={0.4} enableBlur={false} textClassName="ab-story-p">
          I design the board, write the firmware and train the model that runs on it. One person from first schematic to a product that works in the field, with every file checked clean before it leaves.
        </ScrollReveal>
      </section>

      <section className="wrap ab-builds" id="build">
        <p className="label">What I build</p>
        <h2 className="h2">Four layers of one product</h2>
        <div className="ab-stack">
          {builds.map((b) => (
            <div className="ab-card" key={b.n}>
              <div className="ab-card-in">
                <div className="ab-card-text">
                  <p className="label">{b.n}</p>
                  <h3 className="ab-h3">{b.title}</h3>
                  <p className="lede">{b.text}</p>
                  <ul className="ab-tags">{b.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                </div>
                {b.img ? <div className="ab-card-img"><TiltBoard src={url(`img/${b.img}.webp`)} alt={b.title} /></div> : <div className="ab-card-mark" aria-hidden="true" data-text={b.n} />}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap ab-work">
        <AnimatedContent distance={40}>
          <p className="label">From my own bench</p>
          <h2 className="h2">Boards I designed end to end</h2>
          <div className="ab-work-grid">
            <a className="ab-work-card" href={`${BASE}#work`}>
              <TiltBoard src={url("img/s3-iso.webp")} alt="ESP32-S3 MIDI controller board" tilt={10} shift={10} />
              <p className="label">ESP32-S3 · 4 layers</p>
              <h3 className="ab-h3 sm">Wearable MIDI controller</h3>
              <span className="ab-more">See the project →</span>
            </a>
            <a className="ab-work-card" href={`${BASE}#work`}>
              <TiltBoard src={url("img/c3-iso.webp")} alt="ESP32-C3 soil probe board" tilt={10} shift={10} />
              <p className="label">ESP32-C3 · 4 layers</p>
              <h3 className="ab-h3 sm">Soil probe node</h3>
              <span className="ab-more">See the project →</span>
            </a>
          </div>
        </AnimatedContent>
      </section>

      <section className="wrap ab-proof">
        <p className="label">Proof, not just claims</p>
        <h2 className="h2">Awards and shipped work</h2>
        <div className="ab-proof-list">
          <span className="ab-rail"><span className="ab-rail-fill" /></span>
          {proof.map(([k, t, s]) => (
            <AnimatedContent key={t} distance={30}>
              <div className="ab-proof-row">
                <span className="ab-proof-k">{k}</span>
                <div><h3 className="ab-h3 sm">{t}</h3><p className="lede">{s}</p></div>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </section>

      <section className="wrap ab-upwork">
        <AnimatedContent distance={40}>
          <p className="label">Upwork track record</p>
          <h2 className="h2">Clients keep coming back</h2>
          <div className="ab-two">
            <ul className="ab-joblist">{jobs.map((j) => <li key={j}>{j}</li>)}</ul>
            <div>
              <p className="lede" style={{ marginTop: 0 }}>Top Rated with a 100% job success score. What clients single out most:</p>
              <ul className="ab-tags">{insights.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          </div>
        </AnimatedContent>
      </section>

      <section className="wrap ab-skills">
        <p className="label">Skills</p>
        <h2 className="h2">Tools I work with</h2>
        <ul className="ab-tags big">{skills.map((s) => <li className="ab-skill" key={s}>{s}</li>)}</ul>
      </section>

      <section className="wrap ab-bg">
        <p className="label">Background</p>
        <h2 className="h2">Where this comes from</h2>
        <div className="ab-bg-grid">
          {background.map((b) => (
            <AnimatedContent key={b.h} distance={30}>
              <div className="ab-bg-card">
                <p className="label">{b.h}</p>
                <h3 className="ab-h3 sm">{b.t}</h3>
                <p>{b.s}</p>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

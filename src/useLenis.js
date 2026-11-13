import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BASE } from './base.js';

gsap.registerPlugin(ScrollTrigger);

// One Lenis instance, driven by GSAP's ticker so ScrollTrigger stays in sync.
export default function useLenis() {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    window.__lenis = lenis;

    // Glide to a target. While travelling, the "jumping" class hides the pinned
    // scroll-scrubbed section's contents so its rotation never flashes past.
    let clear = 0;
    const jump = (target) => {
      const root = document.documentElement;
      const y = typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY;
      const dist = Math.abs(y - window.scrollY);
      root.classList.add('jumping');
      clearTimeout(clear);
      const done = () => { clearTimeout(clear); clear = setTimeout(() => root.classList.remove('jumping'), 120); };
      lenis.scrollTo(target, {
        // short hops: fast expo-out; long trips: gentle in-out so it reads as one smooth glide
        duration: dist > 2500 ? Math.min(2.2, 1.2 + dist / 9000) : Math.max(0.9, dist / 3500),
        easing: dist > 2500
          ? (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
          : (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
        lock: true,
        onComplete: done,
      });
      clear = setTimeout(() => root.classList.remove('jumping'), 3000); // safety net
    };
    window.__jump = jump;

    // In-page links: a quick expo-out glide instead of the browser's instant jump.
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const a = e.target.closest('a[href^="#"], a[href*="/#"]');
      if (!a) return;
      let id = a.getAttribute('href');
      if (id.startsWith(BASE + '#')) {
        if (location.pathname !== BASE && location.pathname !== BASE + 'index.html') return; // other page: normal navigation
        id = id.slice(BASE.length);
      }
      const target = id === '#top' ? 0 : document.querySelector(id);
      if (target === null) return;
      e.preventDefault();
      jump(target);
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}

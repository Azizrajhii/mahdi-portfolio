import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Lightweight replacement for the React Bits CountUp: same props this site uses,
// animated with GSAP (already loaded) instead of the `motion` library.
export default function CountUp({ to, from = 0, duration = 2, delay = 0, prefix = '', suffix = '', className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const fmt = (v) => `${prefix}${Math.round(v)}${suffix}`;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = fmt(to);
      return undefined;
    }
    const state = { v: from };
    el.textContent = fmt(from);
    let tween;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      tween = gsap.to(state, { v: to, duration, delay, ease: 'power3.out', onUpdate: () => { el.textContent = fmt(state.v); } });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => { io.disconnect(); tween?.kill(); };
  }, [to, from, duration, delay, prefix, suffix]);

  // Server/initial text is the final value so the number is correct without JS.
  return <span ref={ref} className={className}>{`${prefix}${to}${suffix}`}</span>;
}

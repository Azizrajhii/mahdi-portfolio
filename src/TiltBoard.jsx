import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { imgProps } from './img.js';

// "/img/s3-iso.webp" -> responsive props; boards sit in half-width columns on desktop.
const imgFor = (src) => {
  const m = src.match(/\/img\/([\w-]+)\.webp$/);
  return m ? imgProps(m[1], '(max-width: 860px) 90vw, 560px') : { src };
};

// A bare board render that tilts and slides toward the pointer. No card, no flip.
export default function TiltBoard({ src, alt, tilt = 16, shift = 18 }) {
  const wrap = useRef(null);
  const img = useRef(null);

  useGSAP(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = img.current;
    const opts = { duration: 0.6, ease: 'power3.out' };
    const rx = gsap.quickTo(el, 'rotationX', opts);
    const ry = gsap.quickTo(el, 'rotationY', opts);
    const x = gsap.quickTo(el, 'x', opts);
    const y = gsap.quickTo(el, 'y', opts);
    gsap.set(el, { transformPerspective: 900 });

    const move = (e) => {
      const r = wrap.current.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      ry(px * tilt * 2);
      rx(-py * tilt * 2);
      x(px * shift * 2);
      y(py * shift * 2);
    };
    const leave = () => { rx(0); ry(0); x(0); y(0); };
    const w = wrap.current;
    w.addEventListener('pointermove', move);
    w.addEventListener('pointerleave', leave);
    return () => {
      w.removeEventListener('pointermove', move);
      w.removeEventListener('pointerleave', leave);
    };
  }, { scope: wrap });

  return (
    <div ref={wrap} className="tilt">
      <img ref={img} {...imgFor(src)} alt={alt} draggable={false} loading="lazy" decoding="async" />
    </div>
  );
}

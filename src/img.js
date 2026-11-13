import { url } from './base.js';
// Responsive image sizes for the board renders in /public/img.
// Each entry: intrinsic size of the original + the smaller copies that exist as name-<w>.webp.
const IMGS = {
  's3-iso': { w: 1552, h: 1179, steps: [640, 1080] },
  's3-top': { w: 999, h: 1143, steps: [640] },
  'c3-iso': { w: 1084, h: 894, steps: [640] },
  'c3-low': { w: 1374, h: 817, steps: [640, 1080] },
  flex: { w: 893, h: 269, steps: [640] },
  me: { w: 500, h: 500, steps: [] },
};

// Returns src / srcSet / sizes / width / height for an <img>, so the browser
// downloads a copy close to the displayed size and reserves space before it loads.
export function imgProps(name, sizes) {
  const m = IMGS[name];
  if (!m) return { src: url(`img/${name}.webp`) };
  const set = [...m.steps.map((w) => `${url(`img/${name}-${w}.webp`)} ${w}w`), `${url(`img/${name}.webp`)} ${m.w}w`].join(', ');
  return { src: url(`img/${name}.webp`), srcSet: set, sizes, width: m.w, height: m.h };
}

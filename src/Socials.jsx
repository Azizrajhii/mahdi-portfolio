import { useEffect, useRef, useState } from 'react';

export const SOCIALS = [
  { name: 'Instagram', handle: '@medii_gd', url: 'https://www.instagram.com/medii_gd/' },
  { name: 'Upwork', handle: 'Hire me for a project', url: 'https://www.upwork.com/freelancers/~010b8a351e9c0c2bd1' },
  { name: 'GitHub', handle: '@madou003', url: 'https://github.com/madou003' },
];

export function Icon({ name }) {
  const p = { width: 20, height: 20, 'aria-hidden': true, focusable: false };
  if (name === 'Instagram') {
    return (
      <svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />
      </svg>
    );
  }
  if (name === 'GitHub') {
    return (
      <svg {...p} viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
      </svg>
    );
  }
  // Upwork: lowercase "up" mark, drawn to match the supplied logo
  return (
    <svg {...p} width={24} height={24} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="9" strokeLinejoin="round">
      <path d="M10 34V56A15 15 0 0 0 40 56V34" />
      <path d="M52 30L44 84" />
      <circle cx="70" cy="49" r="15" />
    </svg>
  );
}

// Circular drop list that sits next to the nav button.
export function SocialMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const away = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const esc = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('pointerdown', away);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('pointerdown', away);
      document.removeEventListener('keydown', esc);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`smenu${open ? ' open' : ''}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="smenu-btn"
        aria-label="Social links"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={(e) => {
          // Mouse: hover already opened it, so a click keeps it open. Touch / keyboard: toggle.
          const mouse = e.detail > 0 && matchMedia('(hover: hover)').matches;
          setOpen((v) => (mouse ? true : !v));
        }}
      >
        <span className="smenu-dots" aria-hidden="true"><i /><i /><i /></span>
      </button>
      <ul className="smenu-list">
        {SOCIALS.map((s, i) => (
          <li key={s.name} style={{ '--i': i }}>
            <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name} tabIndex={open ? 0 : -1}>
              <Icon name={s.name} />
              <span className="smenu-tip">{s.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SocialSection() {
  return (
    <section id="social" className="wrap socials">
      <p className="label">Find me online</p>
      <h2 className="h2">Social</h2>
      <div className="social-grid">
        {SOCIALS.map((s) => (
          <a key={s.name} className="social-card" href={s.url} target="_blank" rel="noopener noreferrer">
            <span className="social-ico"><Icon name={s.name} /></span>
            <span className="social-txt"><strong>{s.name}</strong><span>{s.handle}</span></span>
            <span className="social-arrow" aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}

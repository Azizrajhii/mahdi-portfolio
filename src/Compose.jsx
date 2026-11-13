import { useEffect, useRef, useState } from 'react';
import './compose.css';

const TO = 'madou.business@gmail.com';
// FormSubmit relays the form to the inbox above. First real submission triggers a one-time
// activation email to that address; after clicking "Activate", every message lands in the inbox.
const ENDPOINT = `https://formsubmit.co/ajax/${TO}`;
const OPEN_EVENT = 'open-compose';

export const openCompose = (preset = {}) => window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: preset }));

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Compose() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('normal'); // normal | min | max
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [err, setErr] = useState('');
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [touched, setTouched] = useState(false);
  const firstField = useRef(null);
  const trigger = useRef(null);

  useEffect(() => {
    const onOpen = (e) => {
      trigger.current = document.activeElement;
      setForm((f) => ({ ...f, subject: e.detail?.subject ?? f.subject }));
      setMode('normal');
      setOpen(true);
      if (status === 'sent') { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }); setTouched(false); }
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, [status]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => firstField.current?.focus(), 350);
    const esc = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', esc);
    return () => { clearTimeout(t); document.removeEventListener('keydown', esc); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const close = () => { setOpen(false); trigger.current?.focus?.(); };
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const emailBad = touched && !EMAIL_RE.test(form.email.trim());
  const msgBad = touched && !form.message.trim();

  const send = async (e) => {
    e.preventDefault();
    setTouched(true);
    if (!EMAIL_RE.test(form.email.trim()) || !form.message.trim()) return;
    setStatus('sending');
    setErr('');
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name.trim() || 'Website visitor',
          email: form.email.trim(),
          message: form.message.trim(),
          _subject: form.subject.trim() || 'New message from your portfolio',
          _template: 'table',
          _captcha: 'false',
          _honey: '',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === 'false' || data.success === false) throw new Error(data.message || 'Send failed');
      setStatus('sent');
    } catch (ex) {
      setStatus('error');
      setErr(ex.message && ex.message !== 'Failed to fetch' ? ex.message : 'Could not reach the mail service.');
    }
  };

  const discard = () => {
    setForm({ name: '', email: '', subject: '', message: '' });
    setTouched(false);
    setStatus('idle');
    close();
  };

  const mailto = `mailto:${TO}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(form.message)}`;

  return (
    <div className={`cmp-wrap${open ? ' open' : ''} ${mode}`} {...(open ? {} : { inert: '' })}>
      {open && mode === 'max' && <button className="cmp-scrim" aria-label="Close" onClick={close} tabIndex={-1} />}
      <form className="cmp" role="dialog" aria-label="New message" onSubmit={send} noValidate data-lenis-prevent>
        <header className="cmp-head" onClick={() => mode === 'min' && setMode('normal')}>
          <span>{status === 'sent' ? 'Message sent' : 'New message'}</span>
          <span className="cmp-ctrl">
            <button type="button" aria-label={mode === 'min' ? 'Restore' : 'Minimize'} onClick={(e) => { e.stopPropagation(); setMode(mode === 'min' ? 'normal' : 'min'); }}>
              <svg viewBox="0 0 16 16" width="14" height="14"><path d="M3 12h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            </button>
            <button type="button" aria-label={mode === 'max' ? 'Shrink' : 'Expand'} onClick={(e) => { e.stopPropagation(); setMode(mode === 'max' ? 'normal' : 'max'); }}>
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2.5h4v4M13.5 2.5l-4.5 4.5M6.5 13.5h-4v-4M2.5 13.5L7 9" /></svg>
            </button>
            <button type="button" aria-label="Close" onClick={(e) => { e.stopPropagation(); close(); }}>
              <svg viewBox="0 0 16 16" width="14" height="14"><path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
            </button>
          </span>
        </header>

        {status === 'sent' ? (
          <div className="cmp-done">
            <span className="cmp-check"><svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg></span>
            <h3>Thanks, your message is on its way.</h3>
            <p>I'll reply to <strong>{form.email}</strong> as soon as I can, usually within a day.</p>
            <button type="button" className="btn solid" onClick={close}>Close</button>
          </div>
        ) : (
          <>
            <div className="cmp-row">
              <label htmlFor="cmp-to">To</label>
              <span className="cmp-chip" id="cmp-to">{TO}</span>
            </div>
            <div className="cmp-row">
              <label htmlFor="cmp-name">Name</label>
              <input id="cmp-name" ref={firstField} value={form.name} onChange={set('name')} autoComplete="name" placeholder="Your name" />
            </div>
            <div className={`cmp-row${emailBad ? ' bad' : ''}`}>
              <label htmlFor="cmp-email">From</label>
              <input id="cmp-email" type="email" value={form.email} onChange={set('email')} autoComplete="email" placeholder="you@example.com" aria-invalid={emailBad} required />
              {emailBad && <span className="cmp-hint">Enter a valid email</span>}
            </div>
            <div className="cmp-row">
              <label htmlFor="cmp-subject">Subject</label>
              <input id="cmp-subject" value={form.subject} onChange={set('subject')} placeholder="Project idea, quote, question…" />
            </div>
            <div className={`cmp-body${msgBad ? ' bad' : ''}`}>
              <textarea aria-label="Message" value={form.message} onChange={set('message')} placeholder="Tell me about your board, the deadline and anything I should know." aria-invalid={msgBad} required />
              {msgBad && <span className="cmp-hint">Write a message first</span>}
            </div>
            {status === 'error' && (
              <p className="cmp-err" role="alert">{err} <a href={mailto}>Open in your mail app instead</a></p>
            )}
            <footer className="cmp-foot">
              <button type="submit" className="cmp-send" disabled={status === 'sending'}>
                {status === 'sending' ? <><span className="cmp-spin" />Sending</> : <>Send <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 8h11M9 4l4 4-4 4" /></svg></>}
              </button>
              <span className="cmp-note">Goes straight to my inbox</span>
              <button type="button" className="cmp-trash" aria-label="Discard draft" onClick={discard}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 002 2h6a2 2 0 002-2l1-12M9 7V4h6v3" /></svg>
              </button>
            </footer>
          </>
        )}
      </form>
    </div>
  );
}

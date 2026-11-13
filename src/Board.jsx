// Placeholder board drawing until the WebP renders are dropped into /public/img.
export default function Board({ w = 420, h = 280, label = 'PCB' }) {
  const rows = [0, 1, 2, 3, 4, 5];
  return (
    <svg viewBox="0 0 420 280" width={w} height={h} role="img" aria-label={label} className="board">
      <rect x="6" y="6" width="408" height="268" rx="14" fill="var(--band)" stroke="var(--accent)" strokeWidth="2" />
      {rows.map((i) => (
        <path key={i} d={`M30 ${50 + i * 34} H${150 + (i % 3) * 40} L${180 + (i % 3) * 40} ${70 + i * 34} H390`} fill="none" stroke="var(--accent)" strokeOpacity=".45" strokeWidth="2" />
      ))}
      <rect x="150" y="90" width="120" height="100" rx="4" fill="var(--ink)" opacity=".9" />
      <circle cx="165" cy="105" r="4" fill="var(--paper)" />
      {rows.map((i) => <rect key={'l' + i} x={140} y={98 + i * 14} width="10" height="6" fill="var(--accent)" />)}
      {rows.map((i) => <rect key={'r' + i} x={270} y={98 + i * 14} width="10" height="6" fill="var(--accent)" />)}
      <circle cx="60" cy="230" r="10" fill="none" stroke="var(--on-band)" strokeWidth="2" />
      <circle cx="360" cy="230" r="10" fill="none" stroke="var(--on-band)" strokeWidth="2" />
    </svg>
  );
}

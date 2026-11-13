// One drawing per workflow stage. The scroll timeline in App.jsx fades between
// the four groups: Schematic -> Layout -> Checks -> Fab.
const line = { fill: 'none', stroke: 'var(--ink)', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
const trace = { fill: 'none', stroke: 'var(--accent)', strokeWidth: 4, strokeLinecap: 'round', strokeLinejoin: 'round' };

export default function StageArt() {
  return (
    <svg className="stage-art" viewBox="0 0 200 200" role="img" aria-label="Schematic, layout, checks and fab drawings">
      {/* 0 - schematic */}
      <g className="stage" data-i="0">
        <path {...line} d="M20 60H62M78 60H118M134 60H180" />
        <path {...line} d="M62 52H78V68H62Z" />
        <path {...line} d="M118 50V70M134 50V70" />
        <path {...line} d="M100 60V120M100 120H70M100 120H130" />
        <path {...line} d="M70 120V150M130 120V150M60 150H80M120 150H140M64 156H76M124 156H136" />
        <path {...line} d="M20 100H50M150 100H180" />
        <circle cx="100" cy="60" r="3" fill="var(--ink)" />
        <text x="62" y="44" fontSize="9" fontFamily="JetBrains Mono" fill="var(--ink)">R1</text>
        <text x="118" y="44" fontSize="9" fontFamily="JetBrains Mono" fill="var(--ink)">C1</text>
      </g>
      {/* 1 - layout */}
      <g className="stage" data-i="1">
        <rect x="14" y="14" width="172" height="172" rx="8" fill="none" stroke="var(--ink)" strokeWidth="1.6" />
        <path {...trace} d="M34 50H90L110 70H166" />
        <path {...trace} d="M34 90H70L90 110V150H140" />
        <path {...trace} d="M166 100H120L100 120" opacity=".6" />
        <path {...trace} d="M34 130H60L74 144" opacity=".6" />
        <rect x="76" y="66" width="38" height="38" rx="3" fill="var(--ink)" />
        {[0, 1, 2, 3].map((i) => <rect key={i} x={70} y={72 + i * 9} width="6" height="4" fill="var(--accent)" />)}
        {[0, 1, 2, 3].map((i) => <rect key={'r' + i} x={114} y={72 + i * 9} width="6" height="4" fill="var(--accent)" />)}
        {[[34, 50], [166, 70], [34, 90], [140, 150], [166, 100], [34, 130]].map(([x, y]) => <circle key={x + '-' + y} cx={x} cy={y} r="6" fill="var(--paper)" stroke="var(--accent)" strokeWidth="2.5" />)}
      </g>
      {/* 2 - checks */}
      <g className="stage" data-i="2">
        <rect x="14" y="14" width="172" height="172" rx="8" fill="none" stroke="var(--ink)" strokeWidth="1.6" opacity=".5" />
        <path {...trace} opacity=".35" d="M34 50H90L110 70H166M34 90H70L90 110V150H140M166 100H120L100 120M34 130H60L74 144" />
        {[[34, 50], [110, 70], [34, 90], [90, 130], [140, 150], [166, 100], [60, 130]].map(([x, y]) => (
          <g key={x + '-' + y}>
            <circle cx={x} cy={y} r="11" fill="var(--paper)" stroke="var(--ok)" strokeWidth="2.5" />
            <path d={`M${x - 5} ${y}L${x - 1} ${y + 4}L${x + 6} ${y - 5}`} fill="none" stroke="var(--ok)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        ))}
        <text x="100" y="186" textAnchor="middle" fontSize="11" fontFamily="JetBrains Mono" fill="var(--ok)">0 ERRORS</text>
      </g>
      {/* 3 - fab */}
      <g className="stage" data-i="3">
        <rect x="14" y="14" width="172" height="172" rx="8" fill="none" stroke="var(--ink)" strokeWidth="1.6" strokeDasharray="6 4" />
        {[0, 1, 2, 3, 4, 5].map((i) => <path key={i} d={`M24 ${40 + i * 24}H176`} stroke="var(--accent)" strokeWidth="1.2" opacity=".5" />)}
        {[[40, 40], [160, 40], [40, 160], [160, 160], [100, 100], [70, 64], [130, 136]].map(([x, y]) => (
          <g key={x + '-' + y} stroke="var(--ink)" strokeWidth="1.4">
            <circle cx={x} cy={y} r="7" fill="var(--paper)" />
            <path d={`M${x - 12} ${y}H${x + 12}M${x} ${y - 12}V${y + 12}`} />
          </g>
        ))}
        <text x="100" y="186" textAnchor="middle" fontSize="11" fontFamily="JetBrains Mono" fill="var(--ink)">GERBER · DRILL</text>
      </g>
    </svg>
  );
}

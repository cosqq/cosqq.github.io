// Animated backdrop: a distributed-inference cluster. Server racks in the
// margins (blinking status LEDs) wired together by glowing cables with pulses
// flowing across the fabric — a supercomputer hall. Pure CSS/SVG, no GIF asset.

// Mixed "electric" palette — cyan stays dominant, with yellow / red / green sparks.
const LED_COLORS = [
  "#22d3ee", // cyan
  "#fde047", // yellow
  "#f87171", // red
  "#4ade80", // green
  "#a5f3fc", // light cyan
  "#f472b6", // pink
];
const PULSE_COLORS = [
  "#67e8f9", // cyan
  "#fde047", // yellow
  "#f87171", // red
  "#4ade80", // green
  "#a5f3fc", // light cyan
];

/** A server-rack cabinet: stacked 1U units, each with blinking status LEDs. */
function Rack({
  x,
  y,
  units = 8,
  seed = 0,
  w = 116,
}: {
  x: number;
  y: number;
  units?: number;
  seed?: number;
  w?: number;
}) {
  const pad = 8;
  const uh = 22;
  const gap = 4;
  const h = pad * 2 + units * (uh + gap) - gap;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect className="rack-frame" x={0} y={0} width={w} height={h} rx={8} />
      {Array.from({ length: units }).map((_, u) => {
        const uy = pad + u * (uh + gap);
        const c = LED_COLORS[(u + seed) % LED_COLORS.length];
        return (
          <g key={u}>
            <rect
              className="rack-unit"
              x={8}
              y={uy}
              width={w - 16}
              height={uh}
              rx={3}
            />
            <line
              className="rack-vent"
              x1={16}
              y1={uy + uh / 2}
              x2={w - 44}
              y2={uy + uh / 2}
            />
            <circle
              className="rack-led"
              cx={w - 18}
              cy={uy + 7}
              r={2.6}
              style={{
                fill: c,
                color: c,
                animationDuration: `${2.8 + ((u + seed) % 4) * 0.6}s`,
                animationDelay: `${u * 0.25 + seed * 0.3}s`,
              }}
            />
            {/* Second LED is static (no animation) — halves the per-frame work. */}
            <circle
              cx={w - 18}
              cy={uy + uh - 7}
              r={2.6}
              style={{
                fill: LED_COLORS[(u + seed + 3) % LED_COLORS.length],
                opacity: 0.5,
              }}
            />
          </g>
        );
      })}
    </g>
  );
}

const WIRES = [
  "M0 130 H280 V330 H640 V210 H900",
  "M1440 90 H1180 V300 H840 V520 H1080 V760",
  "M0 470 H180 V690 H520 V900 H760",
  "M1440 600 H1240 V430 H1000 V250",
  "M720 0 V150 H980 V370 H760 V560",
  "M360 1024 V820 H600 V640 H300",
  "M1440 980 H1120 V820 H880 V980",
  "M40 1024 V900 H260 V1024",
  "M0 250 H120 V60 H420 V240 H560",
  "M1440 400 H1300 V560 H1140 V340",
  "M0 800 H320 V620 H460",
  "M1440 760 H1320 V940 H1180",
  "M180 0 V90 H360 V0",
  "M1080 0 V120 H1240 V280 H1380",
  "M520 1024 V940 H700 V820",
  "M900 1024 V900 H1040 V1024",
  "M0 600 H80 V520 H240 V680",
  "M1440 200 H1360 V120 H1200",
];

export function CircuitBackground() {
  return (
    <div className="circuit-bg" aria-hidden>
      <svg
        className="circuit-svg"
        viewBox="0 0 1440 1024"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* faint static traces */}
        {WIRES.map((d, i) => (
          <path key={`w-${i}`} className="circuit-wire" d={d} />
        ))}

        {/* Glowing pulses flow along every trace so both margins have current.
            (The expensive per-frame drop-shadow was removed for performance —
            the bright stroke alone reads as a flowing pulse.) */}
        {WIRES.map((d, i) => {
          const c = PULSE_COLORS[i % PULSE_COLORS.length];
          return (
            <path
              key={`p-${i}`}
              className="circuit-pulse"
              d={d}
              style={{
                stroke: c,
                animationDuration: `${5 + (i % 5) * 0.9}s`,
                animationDelay: `${(i * 0.55) % 5}s`,
              }}
            />
          );
        })}

        {/* pulsing connection nodes */}
        {[
          [280, 130],
          [640, 330],
          [900, 210],
          [840, 300],
          [1080, 760],
          [520, 690],
          [1000, 430],
          [980, 150],
          [600, 820],
          [880, 820],
          [420, 240],
          [560, 240],
          [1140, 340],
          [320, 620],
          [460, 620],
          [1180, 940],
          [360, 90],
          [1240, 280],
          [700, 820],
          [240, 680],
          [1200, 120],
          [120, 60],
        ].filter((_, i) => i % 2 === 0).map(([cx, cy], i) => (
          <circle
            key={`n-${i}`}
            className="circuit-node"
            cx={cx}
            cy={cy}
            r={5}
            style={{
              animationDuration: `${3.8 + (i % 4) * 0.7}s`,
              animationDelay: `${i * 0.35}s`,
            }}
          />
        ))}

        {/* server racks in the margins — the distributed-inference cluster */}
        <Rack x={18} y={70} units={8} seed={0} />
        <Rack x={18} y={560} units={6} seed={2} />
        <Rack x={1306} y={120} units={7} seed={1} />
        <Rack x={1306} y={590} units={8} seed={3} />
      </svg>
    </div>
  );
}

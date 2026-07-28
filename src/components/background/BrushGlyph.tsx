import { motion, MotionValue } from "framer-motion";

interface BrushGlyphProps {
  className?: string;
  tipColor?: string | MotionValue<string>;
}

/**
 * A realistic artist's paintbrush: tapered wooden handle, a brushed-metal
 * ferrule, and a fanned bristle cluster whose wet tip tints to match
 * whichever pigment is active as the visitor scrolls.
 */
export function BrushGlyph({ className, tipColor = "#C1652F" }: BrushGlyphProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="brush-wood" x1="34" y1="70" x2="92" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7A4E29" />
          <stop offset="45%" stopColor="#B98849" />
          <stop offset="80%" stopColor="#E4C089" />
          <stop offset="100%" stopColor="#F3DDAE" />
        </linearGradient>
        <linearGradient id="brush-ferrule" x1="32" y1="60" x2="58" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6E747C" />
          <stop offset="45%" stopColor="#E6EAEE" />
          <stop offset="55%" stopColor="#C7CDD4" />
          <stop offset="100%" stopColor="#767C85" />
        </linearGradient>
        <linearGradient id="brush-bristle" x1="8" y1="94" x2="42" y2="58" gradientUnits="userSpaceOnUse">
          <motion.stop offset="0%" style={{ stopColor: tipColor }} stopOpacity="0.95" />
          <motion.stop offset="55%" style={{ stopColor: tipColor }} stopOpacity="0.55" />
          <stop offset="100%" stopColor="#241F1C" />
        </linearGradient>
      </defs>

      {/* wooden handle */}
      <rect
        x="0"
        y="0"
        width="13"
        height="64"
        rx="6.5"
        fill="url(#brush-wood)"
        transform="translate(50 6) rotate(45)"
      />
      <rect
        x="0"
        y="0"
        width="13"
        height="64"
        rx="6.5"
        fill="none"
        stroke="#5A3A20"
        strokeOpacity="0.25"
        strokeWidth="0.6"
        transform="translate(50 6) rotate(45)"
      />

      {/* metal ferrule */}
      <path d="M31 58 L53 36 L62 45 L40 67 Z" fill="url(#brush-ferrule)" />
      <path d="M35.5 62.5 L57.5 40.5" stroke="#4B5057" strokeWidth="1" strokeOpacity="0.45" strokeLinecap="round" />
      <path d="M40 67 L62 45" stroke="#F5F7F9" strokeWidth="1" strokeOpacity="0.55" strokeLinecap="round" />
      <path d="M31 58 L36 63" stroke="#4B5057" strokeWidth="1" strokeOpacity="0.35" strokeLinecap="round" />

      {/* fanned bristle cluster */}
      <path
        d="M40 67 C32 70 21 75 15 83 C11 89 9 93 7 97 C12 95 18 92 25 88 C33 83 40 76 44 68 Z"
        fill="url(#brush-bristle)"
      />
      {/* individual bristle strands for texture */}
      <path d="M37 69 C28 76 16 87 8 97" stroke="#1C1B19" strokeOpacity="0.3" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M40 67 C31 75 19 86 10 96" stroke="#1C1B19" strokeOpacity="0.25" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M34 72 C26 79 15 89 8 97" stroke="#1C1B19" strokeOpacity="0.22" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M43 68 C35 74 24 84 15 92" stroke="#1C1B19" strokeOpacity="0.2" strokeWidth="0.7" strokeLinecap="round" />

      {/* wet paint highlight at the very tip */}
      <motion.ellipse cx="11" cy="90" rx="3.4" ry="2.6" style={{ fill: tipColor }} fillOpacity="0.9" />
      <ellipse cx="10" cy="89" rx="1.1" ry="0.8" fill="#FFF6E6" fillOpacity="0.7" />
    </svg>
  );
}

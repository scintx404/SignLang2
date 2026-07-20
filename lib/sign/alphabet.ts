import type { HandShape, Sign } from "./types"

// Helper to build a HandShape with sensible defaults.
function shape(
  curls: Partial<HandShape["curl"]>,
  opts: { spread?: number; thumbSide?: number; wrist?: [number, number, number] } = {},
): HandShape {
  return {
    curl: {
      thumb: curls.thumb ?? 0,
      index: curls.index ?? 0,
      middle: curls.middle ?? 0,
      ring: curls.ring ?? 0,
      pinky: curls.pinky ?? 0,
    },
    spread: opts.spread ?? 0,
    thumbSide: opts.thumbSide ?? 0,
    wrist: opts.wrist,
  }
}

const CLOSED = 1
const OPEN = 0

// The 26 ASL manual-alphabet handshapes (right hand). Motion letters J and Z
// use multiple frames with hand-root movement; the rest are single static
// frames. These are close approximations tuned to read clearly on the avatar.
const LETTER_SHAPES: Record<string, HandShape> = {
  A: shape({ thumb: 0.2, index: CLOSED, middle: CLOSED, ring: CLOSED, pinky: CLOSED }, { thumbSide: 0.1 }),
  B: shape({ thumb: 0.9, index: OPEN, middle: OPEN, ring: OPEN, pinky: OPEN }, { thumbSide: -1, spread: 0 }),
  C: shape({ thumb: 0.5, index: 0.45, middle: 0.45, ring: 0.45, pinky: 0.45 }, { thumbSide: 0.3 }),
  // Index points straight up; middle/ring/pinky curl so their tips meet the
  // thumb tip, forming a round "O" with the index extended above it.
  D: shape({ thumb: 0.5, index: OPEN, middle: 0.6, ring: 0.62, pinky: 0.62 }, { thumbSide: 0.35 }),
  // Fingertips curl down to press against the front of the thumb, thumb
  // tucked in under the fingers.
  E: shape({ thumb: 0.85, index: 0.85, middle: 0.85, ring: 0.85, pinky: 0.85 }, { thumbSide: -0.5 }),
  F: shape({ thumb: 0.6, index: 0.6, middle: OPEN, ring: OPEN, pinky: OPEN }, { thumbSide: 0.2, spread: 0.4 }),
  // Index points to the side, thumb held parallel just below it (small gap).
  G: shape({ thumb: 0.3, index: OPEN, middle: CLOSED, ring: CLOSED, pinky: CLOSED }, { thumbSide: 0.5, wrist: [0, 0, 70] }),
  H: shape({ thumb: 0.7, index: OPEN, middle: OPEN, ring: CLOSED, pinky: CLOSED }, { thumbSide: -0.2, wrist: [0, 0, 70] }),
  I: shape({ thumb: 0.7, index: CLOSED, middle: CLOSED, ring: CLOSED, pinky: OPEN }, { thumbSide: -0.2 }),
  // Index up, middle out at an angle, thumb tucked in at the base between
  // them (pointing up toward the middle finger, not flared out to the side).
  K: shape({ thumb: 0.25, index: OPEN, middle: OPEN, ring: CLOSED, pinky: CLOSED }, { thumbSide: 0.2, spread: 0.55 }),
  L: shape({ thumb: OPEN, index: OPEN, middle: CLOSED, ring: CLOSED, pinky: CLOSED }, { thumbSide: 1 }),
  M: shape({ thumb: 0.9, index: 0.7, middle: 0.7, ring: 0.7, pinky: 0.9 }, { thumbSide: -0.7 }),
  N: shape({ thumb: 0.9, index: 0.7, middle: 0.7, ring: 0.9, pinky: 0.95 }, { thumbSide: -0.7 }),
  O: shape({ thumb: 0.55, index: 0.6, middle: 0.6, ring: 0.6, pinky: 0.6 }, { thumbSide: 0.35 }),
  // K shape rotated to point downward: index forward, middle down, thumb between.
  P: shape({ thumb: 0.2, index: OPEN, middle: OPEN, ring: CLOSED, pinky: CLOSED }, { thumbSide: 0.2, spread: 0.55, wrist: [90, 0, 0] }),
  Q: shape({ thumb: 0.5, index: OPEN, middle: CLOSED, ring: CLOSED, pinky: CLOSED }, { thumbSide: 0.3, wrist: [90, 0, 0] }),
  R: shape({ thumb: 0.7, index: OPEN, middle: OPEN, ring: CLOSED, pinky: CLOSED }, { thumbSide: -0.2, spread: 0 }),
  S: shape({ thumb: 0.5, index: CLOSED, middle: CLOSED, ring: CLOSED, pinky: CLOSED }, { thumbSide: -0.5 }),
  // Thumb tucked between the index and middle fingers; index curls over it.
  T: shape({ thumb: 0.65, index: 0.75, middle: CLOSED, ring: CLOSED, pinky: CLOSED }, { thumbSide: -0.3 }),
  U: shape({ thumb: 0.8, index: OPEN, middle: OPEN, ring: CLOSED, pinky: CLOSED }, { thumbSide: -0.3, spread: 0 }),
  V: shape({ thumb: 0.8, index: OPEN, middle: OPEN, ring: CLOSED, pinky: CLOSED }, { thumbSide: -0.3, spread: 0.7 }),
  W: shape({ thumb: 0.8, index: OPEN, middle: OPEN, ring: OPEN, pinky: CLOSED }, { thumbSide: -0.2, spread: 0.6 }),
  X: shape({ thumb: 0.6, index: 0.55, middle: CLOSED, ring: CLOSED, pinky: CLOSED }, { thumbSide: -0.2 }),
  Y: shape({ thumb: OPEN, index: CLOSED, middle: CLOSED, ring: CLOSED, pinky: OPEN }, { thumbSide: 1 }),
}

// Neutral resting hand (relaxed, slightly curled) used between letters.
export const REST_SHAPE: HandShape = shape(
  { thumb: 0.2, index: 0.15, middle: 0.15, ring: 0.2, pinky: 0.25 },
  { spread: 0.15, thumbSide: 0.2 },
)

export function letterSign(letter: string): Sign | null {
  const L = letter.toUpperCase()

  if (L === "J") {
    // Pinky out, trace a J: down then hook to the side.
    const iShape = LETTER_SHAPES.I
    return {
      gloss: "J",
      frames: [
        { right: iShape, rightPos: [0, 0.05, 0], hold: 160 },
        { right: iShape, rightPos: [0.02, -0.12, 0], hold: 160 },
        { right: iShape, rightPos: [-0.12, -0.18, 0], hold: 200 },
      ],
    }
  }

  if (L === "Z") {
    // Index finger draws a Z in the air.
    const zShape = shape(
      { thumb: 0.6, index: OPEN, middle: CLOSED, ring: CLOSED, pinky: CLOSED },
      { thumbSide: -0.2 },
    )
    return {
      gloss: "Z",
      frames: [
        { right: zShape, rightPos: [-0.1, 0.1, 0], hold: 130 },
        { right: zShape, rightPos: [0.1, 0.1, 0], hold: 130 },
        { right: zShape, rightPos: [-0.1, -0.08, 0], hold: 130 },
        { right: zShape, rightPos: [0.1, -0.08, 0], hold: 170 },
      ],
    }
  }

  const s = LETTER_SHAPES[L]
  if (!s) return null
  return { gloss: L, frames: [{ right: s, hold: 420 }] }
}

export function isFingerspellable(ch: string): boolean {
  const L = ch.toUpperCase()
  return L === "J" || L === "Z" || L in LETTER_SHAPES
}

export { LETTER_SHAPES }

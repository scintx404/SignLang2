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

// Where the dominant hand sits while fingerspelling: raised up in front of the
// dominant shoulder, roughly jaw height, palm toward the viewer. Real ASL
// fingerspelling happens in this "sign space", NOT down by the hip. This offset
// is added on top of the neutral hand anchor for every fingerspelled letter.
export const FINGERSPELL_POS: [number, number, number] = [0.05, 0.35, 0.14]

// The 26 ASL manual-alphabet handshapes (right hand). Motion letters J and Z
// use multiple frames with hand-root movement; the rest are single static
// frames. These are close approximations tuned to read clearly on the avatar.
const LETTER_SHAPES: Record<string, HandShape> = {
  // Fist with the thumb resting up along the side of the index finger.
  A: shape({ thumb: 0.15, index: CLOSED, middle: CLOSED, ring: CLOSED, pinky: CLOSED }, { thumbSide: 0.15 }),
  // Flat hand, four fingers straight up and together, thumb folded across palm.
  B: shape({ thumb: 0.95, index: OPEN, middle: OPEN, ring: OPEN, pinky: OPEN }, { thumbSide: -1, spread: 0 }),
  // Curved hand forming a "C": fingers and thumb make an open crescent.
  C: shape({ thumb: 0.35, index: 0.4, middle: 0.4, ring: 0.4, pinky: 0.42 }, { thumbSide: 0.55 }),
  // Index points straight up; middle/ring/pinky curl so their tips meet the
  // thumb tip, forming a round "O" with the index extended above it.
  D: shape({ thumb: 0.5, index: OPEN, middle: 0.68, ring: 0.7, pinky: 0.7 }, { thumbSide: 0.3 }),
  // Fingertips curl down to press against the front of the thumb, thumb
  // tucked in under the fingers.
  E: shape({ thumb: 0.85, index: 0.82, middle: 0.82, ring: 0.82, pinky: 0.82 }, { thumbSide: -0.45 }),
  // Thumb and index touch in a ring; middle/ring/pinky stand straight up, fanned.
  F: shape({ thumb: 0.55, index: 0.58, middle: OPEN, ring: OPEN, pinky: OPEN }, { thumbSide: 0.25, spread: 0.45 }),
  // Index points to the side, thumb held parallel just below it (small gap).
  G: shape({ thumb: 0.2, index: OPEN, middle: CLOSED, ring: CLOSED, pinky: CLOSED }, { thumbSide: 0.15, wrist: [0, 0, 78] }),
  // Index + middle extended together and pointing sideways, thumb folded.
  H: shape({ thumb: 0.7, index: OPEN, middle: OPEN, ring: CLOSED, pinky: CLOSED }, { thumbSide: -0.2, spread: 0, wrist: [0, 0, 78] }),
  // Pinky straight up, everything else closed with thumb over the fingers.
  I: shape({ thumb: 0.7, index: CLOSED, middle: CLOSED, ring: CLOSED, pinky: OPEN }, { thumbSide: -0.2 }),
  // Index up, middle out at an angle, thumb tucked in at the base between
  // them (pointing up toward the middle finger, not flared out to the side).
  K: shape({ thumb: 0.3, index: OPEN, middle: OPEN, ring: CLOSED, pinky: CLOSED }, { thumbSide: 0.3, spread: 0.55 }),
  // Index straight up, thumb straight out to the side = right angle "L".
  L: shape({ thumb: OPEN, index: OPEN, middle: CLOSED, ring: CLOSED, pinky: CLOSED }, { thumbSide: 1 }),
  // Thumb tucked under three fingers (index, middle, ring) folded over it.
  M: shape({ thumb: 0.95, index: 0.82, middle: 0.82, ring: 0.82, pinky: 0.9 }, { thumbSide: -0.7 }),
  // Thumb tucked under two fingers (index, middle) folded over it.
  N: shape({ thumb: 0.95, index: 0.82, middle: 0.82, ring: 0.95, pinky: 0.95 }, { thumbSide: -0.7 }),
  // All fingertips curl to meet the thumb tip forming a round "O".
  O: shape({ thumb: 0.6, index: 0.62, middle: 0.62, ring: 0.62, pinky: 0.62 }, { thumbSide: 0.45 }),
  // K shape rotated to point downward: index forward, middle down, thumb between.
  P: shape({ thumb: 0.3, index: OPEN, middle: OPEN, ring: CLOSED, pinky: CLOSED }, { thumbSide: 0.3, spread: 0.55, wrist: [90, 0, 0] }),
  // G shape rotated to point downward.
  Q: shape({ thumb: 0.2, index: OPEN, middle: CLOSED, ring: CLOSED, pinky: CLOSED }, { thumbSide: 0.15, wrist: [90, 0, 0] }),
  // Index and middle extended, crossed (approximated as held tightly together).
  R: shape({ thumb: 0.7, index: OPEN, middle: OPEN, ring: CLOSED, pinky: CLOSED }, { thumbSide: -0.2, spread: 0 }),
  // Fist with the thumb wrapped across the front of the fingers.
  S: shape({ thumb: 0.6, index: CLOSED, middle: CLOSED, ring: CLOSED, pinky: CLOSED }, { thumbSide: -0.5 }),
  // Thumb tucked between the index and middle fingers; index curls over it.
  T: shape({ thumb: 0.65, index: 0.78, middle: CLOSED, ring: CLOSED, pinky: CLOSED }, { thumbSide: -0.3 }),
  // Index + middle straight up, held together, thumb over ring/pinky.
  U: shape({ thumb: 0.8, index: OPEN, middle: OPEN, ring: CLOSED, pinky: CLOSED }, { thumbSide: -0.3, spread: 0 }),
  // Index + middle straight up, spread apart in a "V".
  V: shape({ thumb: 0.8, index: OPEN, middle: OPEN, ring: CLOSED, pinky: CLOSED }, { thumbSide: -0.3, spread: 0.7 }),
  // Index + middle + ring up and spread; thumb pins the pinky down.
  W: shape({ thumb: 0.7, index: OPEN, middle: OPEN, ring: OPEN, pinky: CLOSED }, { thumbSide: -0.2, spread: 0.6 }),
  // Index crooked into a hook, everything else closed.
  X: shape({ thumb: 0.6, index: 0.55, middle: CLOSED, ring: CLOSED, pinky: CLOSED }, { thumbSide: -0.2 }),
  // Thumb and pinky extended out to the sides ("hang loose").
  Y: shape({ thumb: OPEN, index: CLOSED, middle: CLOSED, ring: CLOSED, pinky: OPEN }, { thumbSide: 1 }),
}

// Neutral resting hand (relaxed, gently curled) used between letters and while
// idle. A real relaxed hand is not flat — the fingers fall into a soft curl.
export const REST_SHAPE: HandShape = shape(
  { thumb: 0.25, index: 0.32, middle: 0.34, ring: 0.37, pinky: 0.4 },
  { spread: 0.12, thumbSide: 0.15 },
)

// Offset a hand-root position by adding the fingerspell anchor.
function fs(dx: number, dy: number, dz: number): [number, number, number] {
  return [FINGERSPELL_POS[0] + dx, FINGERSPELL_POS[1] + dy, FINGERSPELL_POS[2] + dz]
}

export function letterSign(letter: string): Sign | null {
  const L = letter.toUpperCase()

  if (L === "J") {
    // Pinky out, trace a J in the air: down, then hook to the side.
    const iShape = LETTER_SHAPES.I
    return {
      gloss: "J",
      frames: [
        { right: iShape, rightPos: fs(0, 0.05, 0), hold: 170 },
        { right: iShape, rightPos: fs(0.02, -0.07, 0), hold: 170 },
        { right: iShape, rightPos: fs(-0.1, -0.12, 0), hold: 210 },
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
        { right: zShape, rightPos: fs(-0.06, 0.06, 0), hold: 140 },
        { right: zShape, rightPos: fs(0.1, 0.06, 0), hold: 140 },
        { right: zShape, rightPos: fs(-0.06, -0.06, 0), hold: 140 },
        { right: zShape, rightPos: fs(0.1, -0.06, 0), hold: 180 },
      ],
    }
  }

  const s = LETTER_SHAPES[L]
  if (!s) return null
  return { gloss: L, frames: [{ right: s, rightPos: FINGERSPELL_POS, hold: 420 }] }
}

export function isFingerspellable(ch: string): boolean {
  const L = ch.toUpperCase()
  return L === "J" || L === "Z" || L in LETTER_SHAPES
}

export { LETTER_SHAPES }

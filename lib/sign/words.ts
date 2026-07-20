import type { HandShape, Sign } from "./types"

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

// Common handshapes reused across words.
const FLAT = shape({ thumb: 0.3 }, { spread: 0.15 }) // flat hand, fingers together
const FIVE = shape({}, { spread: 1, thumbSide: 0.8 }) // fully spread open hand
const FIST = shape({ thumb: 0.5, index: 1, middle: 1, ring: 1, pinky: 1 }, { thumbSide: -0.3 })
const POINT = shape({ thumb: 0.6, index: 0, middle: 1, ring: 1, pinky: 1 }, { thumbSide: -0.2 }) // "1" / index point
const THUMB_UP = shape({ thumb: 0, index: 1, middle: 1, ring: 1, pinky: 1 }, { thumbSide: 0.6 })
const OPEN_B = shape({ thumb: 0.55, index: 0, middle: 0, ring: 0, pinky: 0 }, { thumbSide: -0.4 }) // flat hand, thumb in
const CLAW = shape({ thumb: 0.4, index: 0.5, middle: 0.5, ring: 0.5, pinky: 0.5 }, { spread: 0.4, thumbSide: 0.3 })
const A_HAND = shape({ thumb: 0.2, index: 1, middle: 1, ring: 1, pinky: 1 }, { thumbSide: 0.15 }) // fist, thumb up alongside
const R_HAND = shape({ thumb: 0.7, index: 0, middle: 0, ring: 1, pinky: 1 }, { spread: 0, thumbSide: -0.2 }) // index+middle together
const BENT = shape({ thumb: 0.5, index: 0.55, middle: 0.55, ring: 0.55, pinky: 0.55 }, { spread: 0.15 }) // bent flat hand

// A curated set of common ASL signs approximated as keyframe sequences.
// Movements are expressed as hand-root offsets; shapes reuse the presets above.
// The quick-phrase signs (HELLO, THANK YOU, HOW, ARE, YOU, NICE, TO, MEET,
// PLEASE, HELP, ME, GOOD, MORNING) are tuned to sit at their true ASL location
// on the body — HELLO at the temple, THANK YOU / GOOD at the chin, etc.
const WORDS: Record<string, Sign> = {
  // Flat hand salute at the temple that arcs outward.
  HELLO: {
    gloss: "HELLO",
    frames: [
      { right: FLAT, rightPos: [0.1, 0.64, 0.08], wrist: [0, 0, 8], hold: 220 },
      { right: FLAT, rightPos: [0.28, 0.58, 0.12], wrist: [0, 0, -10], hold: 260 },
    ],
  },
  HI: {
    gloss: "HI",
    frames: [
      { right: FLAT, rightPos: [0.1, 0.64, 0.08], wrist: [0, 0, 8], hold: 200 },
      { right: FLAT, rightPos: [0.26, 0.58, 0.12], wrist: [0, 0, -10], hold: 240 },
    ],
  },
  BYE: {
    gloss: "BYE",
    frames: [
      { right: FIVE, rightPos: [0.12, 0.5, 0.06], hold: 200 },
      { right: shape({ thumb: 0.2, index: 0.7, middle: 0.7, ring: 0.7, pinky: 0.7 }, { spread: 0.5 }), rightPos: [0.12, 0.5, 0.06], hold: 200 },
      { right: FIVE, rightPos: [0.12, 0.5, 0.06], hold: 200 },
    ],
  },
  YES: {
    gloss: "YES",
    frames: [
      { right: shape({ thumb: 0.4, index: 1, middle: 1, ring: 1, pinky: 1 }, { thumbSide: -0.3, wrist: [20, 0, 0] }), rightPos: [0.05, 0.28, 0.14], hold: 180 },
      { right: shape({ thumb: 0.4, index: 1, middle: 1, ring: 1, pinky: 1 }, { thumbSide: -0.3, wrist: [55, 0, 0] }), rightPos: [0.05, 0.22, 0.14], hold: 180 },
      { right: shape({ thumb: 0.4, index: 1, middle: 1, ring: 1, pinky: 1 }, { thumbSide: -0.3, wrist: [20, 0, 0] }), rightPos: [0.05, 0.28, 0.14], hold: 180 },
    ],
  },
  NO: {
    gloss: "NO",
    frames: [
      { right: shape({ thumb: 0.2, index: 0, middle: 0, ring: 1, pinky: 1 }, { spread: 0.3 }), rightPos: [0.05, 0.34, 0.12], hold: 180 },
      { right: shape({ thumb: 0.7, index: 0.6, middle: 0.6, ring: 1, pinky: 1 }, { spread: 0.1 }), rightPos: [0.05, 0.34, 0.12], hold: 220 },
    ],
  },
  // Flat open hand on the chest, rubbed in a circular motion.
  PLEASE: {
    gloss: "PLEASE",
    frames: [
      { right: FLAT, rightPos: [0, 0.26, 0.12], wrist: [10, 0, 0], hold: 130 },
      { right: FLAT, rightPos: [0.06, 0.22, 0.12], wrist: [10, 0, 0], hold: 130 },
      { right: FLAT, rightPos: [0, 0.18, 0.12], wrist: [10, 0, 0], hold: 130 },
      { right: FLAT, rightPos: [-0.06, 0.22, 0.12], wrist: [10, 0, 0], hold: 130 },
      { right: FLAT, rightPos: [0, 0.26, 0.12], wrist: [10, 0, 0], hold: 150 },
    ],
  },
  // Flat hand: fingertips at the chin, then move down-and-forward to the listener.
  "THANK YOU": {
    gloss: "THANK-YOU",
    frames: [
      { right: OPEN_B, rightPos: [0.02, 0.58, 0.06], wrist: [35, 0, 0], hold: 220 },
      { right: OPEN_B, rightPos: [0.04, 0.42, 0.2], wrist: [8, 0, 0], hold: 260 },
    ],
  },
  THANKS: {
    gloss: "THANK-YOU",
    frames: [
      { right: OPEN_B, rightPos: [0.02, 0.58, 0.06], wrist: [35, 0, 0], hold: 220 },
      { right: OPEN_B, rightPos: [0.04, 0.42, 0.2], wrist: [8, 0, 0], hold: 260 },
    ],
  },
  // "A" handshape (fist, thumb up alongside) rubbed on the chest in a circle.
  SORRY: {
    gloss: "SORRY",
    frames: [
      { right: A_HAND, rightPos: [0, 0.28, 0.14], hold: 140 },
      { right: A_HAND, rightPos: [0.06, 0.24, 0.14], hold: 140 },
      { right: A_HAND, rightPos: [0, 0.2, 0.14], hold: 140 },
      { right: A_HAND, rightPos: [-0.06, 0.24, 0.14], hold: 140 },
      { right: A_HAND, rightPos: [0, 0.28, 0.14], hold: 160 },
    ],
  },
  LOVE: {
    gloss: "LOVE",
    twoHanded: true,
    frames: [
      { right: FIST, rightPos: [-0.04, 0.26, 0.12], left: FIST, leftPos: [0.04, 0.26, 0.12], hold: 420 },
    ],
  },
  HELP: {
    gloss: "HELP",
    twoHanded: true,
    frames: [
      { right: THUMB_UP, rightPos: [0, 0.16, 0.16], left: OPEN_B, leftPos: [0, 0.08, 0.18], wrist: [0, 0, 0], hold: 220 },
      { right: THUMB_UP, rightPos: [0, 0.3, 0.16], left: OPEN_B, leftPos: [0, 0.22, 0.18], hold: 240 },
    ],
  },
  NAME: {
    gloss: "NAME",
    twoHanded: true,
    frames: [
      { right: R_HAND, rightPos: [0.02, 0.24, 0.16], left: R_HAND, leftPos: [-0.02, 0.2, 0.16], hold: 200 },
      { right: R_HAND, rightPos: [-0.02, 0.2, 0.16], left: R_HAND, leftPos: [0.02, 0.24, 0.16], hold: 220 },
    ],
  },
  // Flat hand at the chin (fingertips up), moves down and forward = "good".
  GOOD: {
    gloss: "GOOD",
    frames: [
      { right: OPEN_B, rightPos: [0, 0.56, 0.08], wrist: [30, 0, 0], hold: 200 },
      { right: OPEN_B, rightPos: [0.02, 0.36, 0.2], wrist: [5, 0, 0], hold: 240 },
    ],
  },
  BAD: {
    gloss: "BAD",
    frames: [
      { right: OPEN_B, rightPos: [0, 0.56, 0.08], wrist: [30, 0, 0], hold: 200 },
      { right: OPEN_B, rightPos: [0.06, 0.32, 0.16], wrist: [0, 0, 180], hold: 240 },
    ],
  },
  EAT: {
    gloss: "EAT",
    frames: [
      { right: shape({ thumb: 0.45, index: 0.55, middle: 0.6, ring: 0.6, pinky: 0.6 }, { thumbSide: 0.3 }), rightPos: [0, 0.5, 0.16], hold: 200 },
      { right: shape({ thumb: 0.45, index: 0.55, middle: 0.6, ring: 0.6, pinky: 0.6 }, { thumbSide: 0.3 }), rightPos: [0, 0.58, 0.1], hold: 220 },
    ],
  },
  DRINK: {
    gloss: "DRINK",
    frames: [
      { right: CLAW, rightPos: [0.02, 0.48, 0.14], wrist: [0, 0, 20], hold: 200 },
      { right: CLAW, rightPos: [0.04, 0.56, 0.08], wrist: [40, 0, 20], hold: 240 },
    ],
  },
  WATER: {
    gloss: "WATER",
    frames: [
      { right: shape({ thumb: 0.2, index: 0, middle: 0, ring: 0, pinky: 0 }, { spread: 0.3 }), rightPos: [0.04, 0.5, 0.14], hold: 180 },
      { right: shape({ thumb: 0.2, index: 0, middle: 0, ring: 0, pinky: 0 }, { spread: 0.3 }), rightPos: [0.04, 0.46, 0.14], hold: 180 },
    ],
  },
  MORE: {
    gloss: "MORE",
    twoHanded: true,
    frames: [
      { right: shape({ thumb: 0.3, index: 0.6, middle: 0.6, ring: 0.6, pinky: 0.6 }, { thumbSide: 0.4 }), rightPos: [0.06, 0.26, 0.14], left: shape({ thumb: 0.3, index: 0.6, middle: 0.6, ring: 0.6, pinky: 0.6 }, { thumbSide: 0.4 }), leftPos: [-0.12, 0.26, 0.14], hold: 200 },
      { right: shape({ thumb: 0.3, index: 0.6, middle: 0.6, ring: 0.6, pinky: 0.6 }, { thumbSide: 0.4 }), rightPos: [0.02, 0.26, 0.14], left: shape({ thumb: 0.3, index: 0.6, middle: 0.6, ring: 0.6, pinky: 0.6 }, { thumbSide: 0.4 }), leftPos: [-0.08, 0.26, 0.14], hold: 220 },
    ],
  },
  STOP: {
    gloss: "STOP",
    twoHanded: true,
    frames: [
      { right: OPEN_B, rightPos: [0.04, 0.22, 0.16], wrist: [0, 0, 90], left: OPEN_B, leftPos: [-0.08, 0.14, 0.16], hold: 360 },
    ],
  },
  GO: {
    gloss: "GO",
    twoHanded: true,
    frames: [
      { right: POINT, rightPos: [0.04, 0.32, 0.14], wrist: [30, 0, 0], left: POINT, leftPos: [-0.08, 0.32, 0.14], hold: 200 },
      { right: POINT, rightPos: [0.1, 0.22, 0.2], wrist: [50, 0, 0], left: POINT, leftPos: [-0.02, 0.22, 0.2], hold: 220 },
    ],
  },
  // Point the index finger out toward the listener.
  YOU: {
    gloss: "YOU",
    frames: [{ right: POINT, rightPos: [0.04, 0.3, 0.24], wrist: [15, 0, 0], hold: 360 }],
  },
  // Point the index finger back at your own chest.
  ME: {
    gloss: "ME",
    frames: [{ right: POINT, rightPos: [0, 0.24, 0.05], wrist: [35, 0, 0], hold: 360 }],
  },
  I: {
    gloss: "ME",
    frames: [{ right: POINT, rightPos: [0, 0.24, 0.05], wrist: [35, 0, 0], hold: 360 }],
  },
  // Two bent hands, palms toward you, roll up and forward.
  HOW: {
    gloss: "HOW",
    twoHanded: true,
    frames: [
      { right: BENT, rightPos: [0.02, 0.24, 0.16], left: BENT, leftPos: [-0.06, 0.24, 0.16], wrist: [40, 0, 0], hold: 200 },
      { right: BENT, rightPos: [0.02, 0.28, 0.13], left: BENT, leftPos: [-0.06, 0.28, 0.13], wrist: [-5, 0, 0], hold: 220 },
    ],
  },
  // Lexicalized "ARE": R handshape moves forward from near the lips.
  ARE: {
    gloss: "ARE",
    frames: [
      { right: R_HAND, rightPos: [0.02, 0.5, 0.12], hold: 170 },
      { right: R_HAND, rightPos: [0.05, 0.46, 0.24], hold: 200 },
    ],
  },
  WHAT: {
    gloss: "WHAT",
    twoHanded: true,
    frames: [
      { right: FIVE, rightPos: [0.06, 0.24, 0.16], left: FIVE, leftPos: [-0.12, 0.24, 0.16], hold: 360 },
    ],
  },
  WHO: {
    gloss: "WHO",
    frames: [
      { right: shape({ thumb: 0.5, index: 0.3, middle: 1, ring: 1, pinky: 1 }, { thumbSide: 0.2 }), rightPos: [0.02, 0.5, 0.12], hold: 200 },
      { right: shape({ thumb: 0.5, index: 0.6, middle: 1, ring: 1, pinky: 1 }, { thumbSide: 0.2 }), rightPos: [0.02, 0.5, 0.12], hold: 200 },
    ],
  },
  WHERE: {
    gloss: "WHERE",
    frames: [
      { right: POINT, rightPos: [-0.06, 0.44, 0.16], wrist: [0, 0, 0], hold: 150 },
      { right: POINT, rightPos: [0.08, 0.44, 0.16], wrist: [0, 0, 0], hold: 150 },
      { right: POINT, rightPos: [-0.06, 0.44, 0.16], wrist: [0, 0, 0], hold: 150 },
    ],
  },
  LEARN: {
    gloss: "LEARN",
    twoHanded: true,
    frames: [
      { right: FIVE, rightPos: [0.02, 0.14, 0.16], left: OPEN_B, leftPos: [0, 0.06, 0.18], hold: 200 },
      { right: CLAW, rightPos: [0.02, 0.4, 0.12], left: OPEN_B, leftPos: [0, 0.06, 0.18], hold: 240 },
    ],
  },
  SIGN: {
    gloss: "SIGN",
    twoHanded: true,
    frames: [
      { right: POINT, rightPos: [0.06, 0.28, 0.16], wrist: [30, 0, 0], left: POINT, leftPos: [-0.1, 0.36, 0.16], hold: 180 },
      { right: POINT, rightPos: [0.06, 0.38, 0.16], wrist: [30, 0, 0], left: POINT, leftPos: [-0.1, 0.26, 0.16], hold: 200 },
    ],
  },
  DEAF: {
    gloss: "DEAF",
    frames: [
      { right: POINT, rightPos: [0.06, 0.56, 0.1], wrist: [0, 0, 0], hold: 180 },
      { right: POINT, rightPos: [0.04, 0.46, 0.12], wrist: [0, 0, 30], hold: 220 },
    ],
  },
  FRIEND: {
    gloss: "FRIEND",
    twoHanded: true,
    frames: [
      { right: shape({ thumb: 0.5, index: 0.55, middle: 1, ring: 1, pinky: 1 }, { wrist: [0, 0, 0] }), rightPos: [0, 0.26, 0.16], left: shape({ thumb: 0.5, index: 0.55, middle: 1, ring: 1, pinky: 1 }, { wrist: [180, 0, 0] }), leftPos: [-0.02, 0.22, 0.16], hold: 360 },
    ],
  },
  HOME: {
    gloss: "HOME",
    frames: [
      { right: shape({ thumb: 0.45, index: 0.55, middle: 0.6, ring: 0.6, pinky: 0.6 }, { thumbSide: 0.3 }), rightPos: [-0.02, 0.5, 0.14], hold: 200 },
      { right: shape({ thumb: 0.45, index: 0.55, middle: 0.6, ring: 0.6, pinky: 0.6 }, { thumbSide: 0.3 }), rightPos: [0.06, 0.5, 0.12], hold: 220 },
    ],
  },
  WORK: {
    gloss: "WORK",
    twoHanded: true,
    frames: [
      { right: FIST, rightPos: [0.02, 0.24, 0.16], wrist: [0, 0, 0], left: FIST, leftPos: [-0.02, 0.18, 0.16], hold: 180 },
      { right: FIST, rightPos: [0.04, 0.26, 0.16], wrist: [0, 0, 20], left: FIST, leftPos: [-0.02, 0.18, 0.16], hold: 200 },
    ],
  },
  NICE: {
    gloss: "NICE",
    twoHanded: true,
    frames: [
      { right: OPEN_B, rightPos: [-0.08, 0.2, 0.16], wrist: [0, 0, 0], left: OPEN_B, leftPos: [-0.02, 0.16, 0.18], hold: 180 },
      { right: OPEN_B, rightPos: [0.1, 0.2, 0.16], wrist: [0, 0, 0], left: OPEN_B, leftPos: [-0.02, 0.16, 0.18], hold: 220 },
    ],
  },
  MEET: {
    gloss: "MEET",
    twoHanded: true,
    frames: [
      { right: POINT, rightPos: [0.1, 0.26, 0.16], wrist: [20, 0, 0], left: POINT, leftPos: [-0.14, 0.26, 0.16], hold: 180 },
      { right: POINT, rightPos: [0.02, 0.26, 0.16], wrist: [20, 0, 0], left: POINT, leftPos: [-0.06, 0.26, 0.16], hold: 220 },
    ],
  },
  // Two "1" hands, fingers pointing up; tips approach and touch.
  TO: {
    gloss: "TO",
    twoHanded: true,
    frames: [
      { right: shape({ thumb: 0.6, index: 0, middle: 1, ring: 1, pinky: 1 }, { thumbSide: -0.1 }), rightPos: [0.1, 0.28, 0.18], left: shape({ thumb: 0.6, index: 0, middle: 1, ring: 1, pinky: 1 }, { thumbSide: -0.1 }), leftPos: [-0.14, 0.28, 0.18], hold: 180 },
      { right: shape({ thumb: 0.6, index: 0, middle: 1, ring: 1, pinky: 1 }, { thumbSide: -0.1 }), rightPos: [0.0, 0.28, 0.18], left: shape({ thumb: 0.6, index: 0, middle: 1, ring: 1, pinky: 1 }, { thumbSide: -0.1 }), leftPos: [-0.04, 0.28, 0.18], hold: 220 },
    ],
  },
  // The flat "sun" hand rises up from behind the horizontal forearm.
  MORNING: {
    gloss: "MORNING",
    twoHanded: true,
    frames: [
      { right: FLAT, rightPos: [-0.02, 0.12, 0.16], wrist: [50, 0, 0], left: FLAT, leftPos: [-0.06, 0.2, 0.2], hold: 200 },
      { right: FLAT, rightPos: [0.02, 0.34, 0.12], wrist: [10, 0, 0], left: FLAT, leftPos: [-0.06, 0.2, 0.2], hold: 250 },
    ],
  },
}

// Normalize a lookup key.
function key(word: string): string {
  return word.trim().toUpperCase().replace(/[.,!?;:]/g, "")
}

export function wordSign(word: string): Sign | null {
  return WORDS[key(word)] ?? null
}

export function hasWordSign(word: string): boolean {
  return key(word) in WORDS
}

export const KNOWN_WORDS = Object.keys(WORDS)

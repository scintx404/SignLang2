(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/avatar/hand.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Hand",
    ()=>Hand
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-experimental/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-experimental/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const SKIN = "#e2a17a";
const SKIN_DARK = "#c98a63";
// Right-hand finger layout. Palm centered so the wrist sits at the group origin
// (y = 0) and the knuckles are along the top edge (y ~ 0.1). Fingers extend +Y.
const FINGERS = [
    {
        name: "index",
        knuckle: [
            -0.03,
            0.1,
            0.004
        ],
        segments: [
            0.04,
            0.026,
            0.02
        ],
        spreadDir: 1
    },
    {
        name: "middle",
        knuckle: [
            -0.009,
            0.104,
            0.004
        ],
        segments: [
            0.045,
            0.03,
            0.022
        ],
        spreadDir: 0.4
    },
    {
        name: "ring",
        knuckle: [
            0.012,
            0.1,
            0.004
        ],
        segments: [
            0.04,
            0.027,
            0.02
        ],
        spreadDir: -0.4
    },
    {
        name: "pinky",
        knuckle: [
            0.032,
            0.092,
            0.004
        ],
        segments: [
            0.031,
            0.021,
            0.017
        ],
        spreadDir: -1
    },
    {
        name: "thumb",
        knuckle: [
            -0.042,
            0.028,
            0.02
        ],
        segments: [
            0.034,
            0.028,
            0.022
        ],
        spreadDir: 0,
        isThumb: true
    }
];
// Per-joint curl gain (MCP, PIP, DIP). PIP bends the most.
const CURL_GAIN = [
    1.25,
    1.6,
    1.0
];
const THUMB_GAIN = [
    0.9,
    1.0,
    0.8
];
const Hand = /*#__PURE__*/ _s((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = _s(function Hand({ side }, ref) {
    _s();
    const jointStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({});
    // Build the finger hierarchy once as THREE objects, so we can mutate joint
    // rotations imperatively every frame without React re-renders.
    const { palm, fingerRoots } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Hand.Hand.useMemo": ()=>{
            const skinMat = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                color: SKIN,
                roughness: 0.72,
                metalness: 0.02
            });
            const skinMatDark = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                color: SKIN_DARK,
                roughness: 0.72,
                metalness: 0.02
            });
            // Palm block.
            const palmGeo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BoxGeometry"](0.084, 0.1, 0.03);
            const palmMesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](palmGeo, skinMat);
            palmMesh.position.set(0, 0.05, 0);
            palmMesh.castShadow = true;
            const palmGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
            palmGroup.add(palmMesh);
            const roots = [];
            const store = {};
            for (const cfg of FINGERS){
                const groups = [];
                let parent = null;
                const mcp = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
                mcp.position.set(cfg.knuckle[0], cfg.knuckle[1], cfg.knuckle[2]);
                if (cfg.isThumb) {
                    // Seat the thumb lower and rotate it out to the side of the palm.
                    mcp.rotation.set(0.3, 0, side === "right" ? 0.9 : -0.9);
                }
                parent = mcp;
                groups.push(mcp);
                for(let i = 0; i < cfg.segments.length; i++){
                    const len = cfg.segments[i];
                    const radius = cfg.isThumb ? 0.011 - i * 0.001 : 0.0105 - i * 0.0012;
                    const geo = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CapsuleGeometry"](radius, len - radius, 4, 8);
                    const mesh = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mesh"](geo, i === cfg.segments.length - 1 ? skinMatDark : skinMat);
                    mesh.position.set(0, len / 2, 0);
                    mesh.castShadow = true;
                    const joint = i === 0 ? mcp : new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"]();
                    if (i > 0) {
                        joint.position.set(0, cfg.segments[i - 1], 0);
                        groups.push(joint);
                        parent.add(joint);
                    }
                    joint.add(mesh);
                    parent = joint;
                }
                store[cfg.name] = {
                    groups,
                    config: cfg
                };
                roots.push(mcp);
            }
            jointStore.current = store;
            return {
                palm: palmGroup,
                fingerRoots: roots
            };
        }
    }["Hand.Hand.useMemo"], [
        side
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useImperativeHandle"])(ref, {
        "Hand.Hand.useImperativeHandle": ()=>({
                applyShape (shape) {
                    const store = jointStore.current;
                    for (const cfg of FINGERS){
                        const entry = store[cfg.name];
                        if (!entry) continue;
                        const curl = shape.curl[cfg.name];
                        const gain = cfg.isThumb ? THUMB_GAIN : CURL_GAIN;
                        for(let i = 0; i < entry.groups.length; i++){
                            const g = entry.groups[i];
                            const angle = curl * gain[i] * 1.05;
                            // Curl bends fingertips toward the palm (-Z).
                            g.rotation.x = -angle;
                            if (i === 0 && !cfg.isThumb) {
                                // Fan fingers out from the knuckle.
                                g.rotation.z = cfg.spreadDir * shape.spread * 0.28 * (side === "right" ? 1 : -1);
                            }
                        }
                        if (cfg.isThumb) {
                            const mcp = entry.groups[0];
                            // thumbSide: -1 tucked across palm, +1 abducted out.
                            const base = side === "right" ? 0.9 : -0.9;
                            mcp.rotation.z = base - shape.thumbSide * 0.7 * (side === "right" ? 1 : -1);
                            mcp.rotation.y = shape.thumbSide * 0.3 * (side === "right" ? 1 : -1);
                        }
                    }
                }
            })
    }["Hand.Hand.useImperativeHandle"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        scale: side === "left" ? [
            -1,
            1,
            1
        ] : [
            1,
            1,
            1
        ],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
                object: palm
            }, void 0, false, {
                fileName: "[project]/components/avatar/hand.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            fingerRoots.map((root, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
                    object: root
                }, i, false, {
                    fileName: "[project]/components/avatar/hand.tsx",
                    lineNumber: 132,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/components/avatar/hand.tsx",
        lineNumber: 129,
        columnNumber: 5
    }, this);
}, "aEunHdP8VTtW0hbiSW1gVLl+tTM=")), "aEunHdP8VTtW0hbiSW1gVLl+tTM=");
_c1 = Hand;
var _c, _c1;
__turbopack_context__.k.register(_c, "Hand$forwardRef");
__turbopack_context__.k.register(_c1, "Hand");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/avatar/signer-avatar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SignerAvatar",
    ()=>SignerAvatar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-experimental/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-experimental/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-b389eeca.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$avatar$2f$hand$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/avatar/hand.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const SKIN = "#e2a17a";
const SHIRT = "#2c3350";
const SHIRT_DARK = "#232942";
const HAIR = "#3a2c25";
// Body anchor points (avatar units, ~meters).
const SHOULDER_R = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0.2, 1.4, 0.02);
const SHOULDER_L = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](-0.2, 1.4, 0.02);
const UPPER_LEN = 0.3;
const FORE_LEN = 0.29;
// Reusable temporaries to avoid per-frame allocation.
const _toT = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const _dir = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const _mid = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const _pole = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const _poleProj = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const _elbow = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const _wrist = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const _xA = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const _yA = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const _zA = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const _zHint = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 1);
const _basis = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Matrix4"]();
const _q = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
const _qWrist = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
const _eWrist = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Euler"]();
const UP = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0);
const DEG = Math.PI / 180;
function solveArm(shoulder, target, side, refs, shape) {
    _toT.subVectors(target, shoulder);
    const d = _toT.length();
    _dir.copy(_toT).normalize();
    const reach = UPPER_LEN + FORE_LEN - 1e-3;
    const dc = Math.min(d, reach);
    // Elbow via law of cosines, bent toward a downward/back pole.
    const a = (UPPER_LEN * UPPER_LEN - FORE_LEN * FORE_LEN + dc * dc) / (2 * dc);
    const h = Math.sqrt(Math.max(0, UPPER_LEN * UPPER_LEN - a * a));
    _mid.copy(shoulder).addScaledVector(_dir, a);
    _pole.set(side * 0.35, -1, -0.45).normalize();
    _poleProj.copy(_pole).addScaledVector(_dir, -_pole.dot(_dir));
    if (_poleProj.lengthSq() < 1e-6) _poleProj.set(0, -1, 0);
    _poleProj.normalize();
    _elbow.copy(_mid).addScaledVector(_poleProj, h);
    _wrist.copy(shoulder).addScaledVector(_dir, dc);
    // Upper arm: shoulder -> elbow.
    refs.upper.position.copy(shoulder);
    _dir.subVectors(_elbow, shoulder).normalize();
    refs.upper.quaternion.setFromUnitVectors(UP, _dir);
    // Forearm: elbow -> wrist.
    refs.fore.position.copy(_elbow);
    _dir.subVectors(_wrist, _elbow).normalize();
    refs.fore.quaternion.setFromUnitVectors(UP, _dir);
    // Hand: seat at wrist, align +Y to forearm, keep palm facing forward, then
    // apply the frame's wrist rotation offset.
    refs.handWrap.position.copy(_wrist);
    _yA.copy(_dir);
    _xA.crossVectors(_yA, _zHint);
    if (_xA.lengthSq() < 1e-6) _xA.set(1, 0, 0);
    _xA.normalize();
    _zA.crossVectors(_xA, _yA).normalize();
    _basis.makeBasis(_xA, _yA, _zA);
    _q.setFromRotationMatrix(_basis);
    if (shape.wrist) {
        _eWrist.set(shape.wrist[0] * DEG, shape.wrist[1] * DEG, shape.wrist[2] * DEG);
        _qWrist.setFromEuler(_eWrist);
        _q.multiply(_qWrist);
    }
    refs.handWrap.quaternion.copy(_q);
}
function SignerAvatar({ playerRef }) {
    _s();
    const rUpper = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rFore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rHandWrap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rHand = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lUpper = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lFore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lHandWrap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lHand = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const torso = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const head = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const targetR = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
    const targetL = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "SignerAvatar.useFrame": (state, delta)=>{
            const dt = Math.min(delta, 0.05);
            const pose = playerRef.current.update(dt);
            if (rUpper.current && rFore.current && rHandWrap.current && rHand.current) {
                targetR.current.set(pose.right.pos[0], pose.right.pos[1], pose.right.pos[2]);
                solveArm(SHOULDER_R, targetR.current, 1, {
                    upper: rUpper.current,
                    fore: rFore.current,
                    handWrap: rHandWrap.current,
                    hand: rHand.current
                }, pose.right.shape);
                rHand.current.applyShape(pose.right.shape);
            }
            if (lUpper.current && lFore.current && lHandWrap.current && lHand.current) {
                targetL.current.set(pose.left.pos[0], pose.left.pos[1], pose.left.pos[2]);
                solveArm(SHOULDER_L, targetL.current, -1, {
                    upper: lUpper.current,
                    fore: lFore.current,
                    handWrap: lHandWrap.current,
                    hand: lHand.current
                }, pose.left.shape);
                lHand.current.applyShape(pose.left.shape);
            }
            // Subtle breathing + idle sway so the figure feels alive.
            const t = state.clock.elapsedTime;
            if (torso.current) {
                torso.current.scale.y = 1 + Math.sin(t * 1.1) * 0.006;
                torso.current.rotation.y = Math.sin(t * 0.5) * 0.02;
            }
            if (head.current) {
                head.current.rotation.y = Math.sin(t * 0.4) * 0.05;
                head.current.rotation.x = Math.sin(t * 0.7) * 0.02;
            }
        }
    }["SignerAvatar.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
        position: [
            0,
            0,
            0
        ],
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                ref: torso,
                position: [
                    0,
                    0,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            1.12,
                            0
                        ],
                        castShadow: true,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("capsuleGeometry", {
                                args: [
                                    0.24,
                                    0.34,
                                    8,
                                    20
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/avatar/signer-avatar.tsx",
                                lineNumber: 156,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                color: SHIRT,
                                roughness: 0.85
                            }, void 0, false, {
                                fileName: "[project]/components/avatar/signer-avatar.tsx",
                                lineNumber: 157,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/avatar/signer-avatar.tsx",
                        lineNumber: 155,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            1.4,
                            0.02
                        ],
                        rotation: [
                            0,
                            0,
                            Math.PI / 2
                        ],
                        castShadow: true,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("capsuleGeometry", {
                                args: [
                                    0.11,
                                    0.4,
                                    6,
                                    16
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/avatar/signer-avatar.tsx",
                                lineNumber: 161,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                color: SHIRT_DARK,
                                roughness: 0.85
                            }, void 0, false, {
                                fileName: "[project]/components/avatar/signer-avatar.tsx",
                                lineNumber: 162,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/avatar/signer-avatar.tsx",
                        lineNumber: 160,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            1.54,
                            0.01
                        ],
                        castShadow: true,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("cylinderGeometry", {
                                args: [
                                    0.055,
                                    0.07,
                                    0.12,
                                    16
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/avatar/signer-avatar.tsx",
                                lineNumber: 166,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                color: SKIN,
                                roughness: 0.7
                            }, void 0, false, {
                                fileName: "[project]/components/avatar/signer-avatar.tsx",
                                lineNumber: 167,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/avatar/signer-avatar.tsx",
                        lineNumber: 165,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/avatar/signer-avatar.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                ref: head,
                position: [
                    0,
                    1.64,
                    0.01
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        castShadow: true,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                                args: [
                                    0.13,
                                    32,
                                    32
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/avatar/signer-avatar.tsx",
                                lineNumber: 174,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                color: SKIN,
                                roughness: 0.68
                            }, void 0, false, {
                                fileName: "[project]/components/avatar/signer-avatar.tsx",
                                lineNumber: 175,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/avatar/signer-avatar.tsx",
                        lineNumber: 173,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0,
                            0.03,
                            -0.01
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                                args: [
                                    0.135,
                                    32,
                                    32,
                                    0,
                                    Math.PI * 2,
                                    0,
                                    Math.PI * 0.62
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/avatar/signer-avatar.tsx",
                                lineNumber: 179,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                color: HAIR,
                                roughness: 0.9
                            }, void 0, false, {
                                fileName: "[project]/components/avatar/signer-avatar.tsx",
                                lineNumber: 180,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/avatar/signer-avatar.tsx",
                        lineNumber: 178,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            0.045,
                            0.0,
                            0.115
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                                args: [
                                    0.016,
                                    16,
                                    16
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/avatar/signer-avatar.tsx",
                                lineNumber: 184,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                color: "#2a2320",
                                roughness: 0.4
                            }, void 0, false, {
                                fileName: "[project]/components/avatar/signer-avatar.tsx",
                                lineNumber: 185,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/avatar/signer-avatar.tsx",
                        lineNumber: 183,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                        position: [
                            -0.045,
                            0.0,
                            0.115
                        ],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("sphereGeometry", {
                                args: [
                                    0.016,
                                    16,
                                    16
                                ]
                            }, void 0, false, {
                                fileName: "[project]/components/avatar/signer-avatar.tsx",
                                lineNumber: 188,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                                color: "#2a2320",
                                roughness: 0.4
                            }, void 0, false, {
                                fileName: "[project]/components/avatar/signer-avatar.tsx",
                                lineNumber: 189,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/avatar/signer-avatar.tsx",
                        lineNumber: 187,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/avatar/signer-avatar.tsx",
                lineNumber: 172,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                ref: rUpper,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        0,
                        UPPER_LEN / 2,
                        0
                    ],
                    castShadow: true,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("capsuleGeometry", {
                            args: [
                                0.045,
                                UPPER_LEN,
                                6,
                                12
                            ]
                        }, void 0, false, {
                            fileName: "[project]/components/avatar/signer-avatar.tsx",
                            lineNumber: 196,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                            color: SHIRT,
                            roughness: 0.85
                        }, void 0, false, {
                            fileName: "[project]/components/avatar/signer-avatar.tsx",
                            lineNumber: 197,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/avatar/signer-avatar.tsx",
                    lineNumber: 195,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/avatar/signer-avatar.tsx",
                lineNumber: 194,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                ref: rFore,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        0,
                        FORE_LEN / 2,
                        0
                    ],
                    castShadow: true,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("capsuleGeometry", {
                            args: [
                                0.038,
                                FORE_LEN,
                                6,
                                12
                            ]
                        }, void 0, false, {
                            fileName: "[project]/components/avatar/signer-avatar.tsx",
                            lineNumber: 202,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                            color: SKIN,
                            roughness: 0.72
                        }, void 0, false, {
                            fileName: "[project]/components/avatar/signer-avatar.tsx",
                            lineNumber: 203,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/avatar/signer-avatar.tsx",
                    lineNumber: 201,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/avatar/signer-avatar.tsx",
                lineNumber: 200,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                ref: rHandWrap,
                scale: [
                    1.35,
                    1.35,
                    1.35
                ],
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$avatar$2f$hand$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Hand"], {
                    ref: rHand,
                    side: "right"
                }, void 0, false, {
                    fileName: "[project]/components/avatar/signer-avatar.tsx",
                    lineNumber: 207,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/avatar/signer-avatar.tsx",
                lineNumber: 206,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                ref: lUpper,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        0,
                        UPPER_LEN / 2,
                        0
                    ],
                    castShadow: true,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("capsuleGeometry", {
                            args: [
                                0.045,
                                UPPER_LEN,
                                6,
                                12
                            ]
                        }, void 0, false, {
                            fileName: "[project]/components/avatar/signer-avatar.tsx",
                            lineNumber: 213,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                            color: SHIRT,
                            roughness: 0.85
                        }, void 0, false, {
                            fileName: "[project]/components/avatar/signer-avatar.tsx",
                            lineNumber: 214,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/avatar/signer-avatar.tsx",
                    lineNumber: 212,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/avatar/signer-avatar.tsx",
                lineNumber: 211,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                ref: lFore,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("mesh", {
                    position: [
                        0,
                        FORE_LEN / 2,
                        0
                    ],
                    castShadow: true,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("capsuleGeometry", {
                            args: [
                                0.038,
                                FORE_LEN,
                                6,
                                12
                            ]
                        }, void 0, false, {
                            fileName: "[project]/components/avatar/signer-avatar.tsx",
                            lineNumber: 219,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meshStandardMaterial", {
                            color: SKIN,
                            roughness: 0.72
                        }, void 0, false, {
                            fileName: "[project]/components/avatar/signer-avatar.tsx",
                            lineNumber: 220,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/avatar/signer-avatar.tsx",
                    lineNumber: 218,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/avatar/signer-avatar.tsx",
                lineNumber: 217,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                ref: lHandWrap,
                scale: [
                    1.35,
                    1.35,
                    1.35
                ],
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$avatar$2f$hand$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Hand"], {
                    ref: lHand,
                    side: "left"
                }, void 0, false, {
                    fileName: "[project]/components/avatar/signer-avatar.tsx",
                    lineNumber: 224,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/avatar/signer-avatar.tsx",
                lineNumber: 223,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/avatar/signer-avatar.tsx",
        lineNumber: 152,
        columnNumber: 5
    }, this);
}
_s(SignerAvatar, "voiMoVcTwvHsRVp+hOwJ1zgLeuk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = SignerAvatar;
var _c;
__turbopack_context__.k.register(_c, "SignerAvatar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/avatar/fbx-signer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FBXSigner",
    ()=>FBXSigner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-experimental/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * Rigged FBX signer.
 *
 * Drives the imported rigged model (public/models/SignerModelRigged7.fbx) from
 * the SAME PosePlayer output that fed the old procedural avatar. The abstract
 * per-frame hand targets and finger curls are mapped onto the model's real
 * skeleton:
 *
 *   - Each arm is posed with analytic two-bone IK (upperarm + forearm) that
 *     aims the model's actual bones at a world-space wrist target. The pose
 *     targets are the exact positions that were tuned for the old avatar, so
 *     the signing motion stays framed the same way on screen.
 *   - Each finger's three phalanx bones are curled around the finger's natural
 *     bend axis, relative to the model's bind pose.
 *
 * The rig was introspected offline: it is a Reallusion-style "CC_Base_*"
 * skeleton where every bone's child extends along its local +Y axis and
 * fingers bend about local +X. The shoulders sit at model-local Y ≈ 33.8.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-experimental/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/events-b389eeca.esm.js [app-client] (ecmascript) <export D as useFrame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Fbx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/Fbx.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$utils$2f$SkeletonUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/examples/jsm/utils/SkeletonUtils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
// The model faces +Z (toward the camera), so its anatomical LEFT arm sits on
// the +x side of the screen. To preserve the exact on-screen placement of the
// previous avatar we drive:
//   pose.right (screen +x) -> model's L_* arm
//   pose.left  (screen -x) -> model's R_* arm
const ARMS = [
    {
        poseKey: "right",
        prefix: "CC_Base_L_"
    },
    {
        poseKey: "left",
        prefix: "CC_Base_R_"
    }
];
const FINGER_BONE = {
    thumb: "Thumb",
    index: "Index",
    middle: "Mid",
    ring: "Ring",
    pinky: "Pinky"
};
// Curl tuning. Introspecting the rig shows each finger bone's child extends
// along local +Y, while the flexion hinge (the medial-lateral axis running
// ACROSS the fingers) is local +Z — NOT local +X, which points along world
// vertical and was previously swinging the fingers sideways instead of
// curling them. Rotating about local -Z folds the fingertips toward the palm
// (a positive angle hyperextended them backward over the back of the hand).
const CURL_SIGN = -1;
const FINGER_GAIN = [
    0.9,
    1.15,
    1.0
] // proximal, middle, distal phalanx
;
const THUMB_GAIN = [
    0.55,
    0.85,
    0.7
];
const BEND_AXIS = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0, 1);
// The thumb's local frame is rotated ~45° off the other fingers, so it flexes
// about a blended axis rather than pure +Z.
const THUMB_BEND_AXIS = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 0.35, 1).normalize();
const CHILD_AXIS = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](0, 1, 0) // every bone's child is along +Y
;
// The old procedural avatar placed its shoulder line at local Y = 1.4 inside
// the stage group; the camera framing was tuned around that. SIZE shrinks the
// whole figure (and, below, the pose targets with it) relative to that
// framing so the model doesn't dominate the viewport.
const SIZE = 0.82;
const TARGET_SHOULDER_LOCAL_Y = 1.4 * SIZE;
// The pose targets were authored for the old avatar whose chest front sat at
// stage-local z ≈ 0.16 with anchors at |x| ≈ 0.14. This model's torso is
// deeper and wider, so targets are re-anchored at runtime: pushed forward so
// they clear the measured chest front, and nudged outward from the sternum.
const OLD_ANCHOR_Z = 0.16;
const FORWARD_MARGIN = 0.09;
const X_GAIN = 1.25;
// Per-frame scratch objects (no allocation in the render loop).
const _dir = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const _target = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const _toT = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const _mid = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const _pole = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const _poleProj = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const _elbow = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const _wrist = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const _pWorldQ = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
const _invPQ = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
const _desiredLocal = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
const _aimQ = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
const _curlQ = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
const _outQ = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
const _twistQ = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
const _handWorldQ = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Quaternion"]();
const _faxis = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
function findBone(root, name) {
    let hit = null;
    root.traverse((o)=>{
        if (!hit && o.isBone && o.name === name) hit = o;
    });
    return hit;
}
// Aim `bone` so its child (local +Y) points along `worldDir`.
function aimBone(bone, worldDir) {
    const parent = bone.parent;
    if (!parent) return;
    parent.getWorldQuaternion(_pWorldQ);
    _invPQ.copy(_pWorldQ).invert();
    _desiredLocal.copy(worldDir).applyQuaternion(_invPQ).normalize();
    _aimQ.setFromUnitVectors(CHILD_AXIS, _desiredLocal);
    bone.quaternion.copy(_aimQ);
    bone.updateWorldMatrix(false, false);
}
// Max wrist pronation applied at full rest so the palm rolls in to face the
// thigh instead of presenting forward/up. Radians.
const REST_PRONATION = 1.5;
// Analytic two-bone IK: aim the model's upperarm + forearm bones so the wrist
// reaches `target` (world space), bending the elbow toward a downward pole.
// `restT` (0..1) blends in a pronation twist so the palm faces the body when
// the arm is hanging at rest.
function solveArm(rig, target, restT = 0) {
    const S = rig.shoulderWorld;
    _toT.subVectors(target, S);
    const total = rig.upperLen + rig.foreLen;
    const d = Math.min(_toT.length(), total - 1e-4);
    _dir.copy(_toT).normalize();
    const a = (rig.upperLen * rig.upperLen - rig.foreLen * rig.foreLen + d * d) / (2 * d);
    const h = Math.sqrt(Math.max(0, rig.upperLen * rig.upperLen - a * a));
    _mid.copy(S).addScaledVector(_dir, a);
    // Pole bends the elbow backward and slightly outward, which is how a human
    // arm naturally hangs at rest (elbow behind the shoulder plane). During
    // signing the targets are forward of the chest so the pole has less
    // influence there and the motion reads correctly.
    _pole.set(rig.poleSign * 0.15, -0.8, -0.6).normalize();
    _poleProj.copy(_pole).addScaledVector(_dir, -_pole.dot(_dir));
    if (_poleProj.lengthSq() < 1e-6) _poleProj.set(0, -1, 0);
    _poleProj.normalize();
    _elbow.copy(_mid).addScaledVector(_poleProj, h);
    _wrist.copy(S).addScaledVector(_dir, d);
    _dir.subVectors(_elbow, S).normalize();
    aimBone(rig.upper, _dir);
    _dir.subVectors(_wrist, _elbow).normalize();
    aimBone(rig.fore, _dir);
    // Hand follows the forearm at its bind orientation.
    rig.hand.quaternion.copy(rig.handRest);
    rig.hand.updateWorldMatrix(false, false);
    // Rest-only pronation: roll the hand about the forearm's world axis
    // (elbow -> wrist) so the palm rolls in to face the thigh instead of
    // presenting forward. Done in world space then converted back to local so
    // it is true supination/pronation regardless of the bone's local axes.
    // At restT=0 (signing) nothing is applied.
    if (restT > 0) {
        _faxis.subVectors(_wrist, _elbow).normalize();
        _twistQ.setFromAxisAngle(_faxis, rig.poleSign * REST_PRONATION * restT);
        rig.hand.getWorldQuaternion(_handWorldQ);
        _handWorldQ.premultiply(_twistQ);
        const parent = rig.hand.parent;
        if (parent) {
            parent.getWorldQuaternion(_pWorldQ);
            _invPQ.copy(_pWorldQ).invert();
            rig.hand.quaternion.copy(_invPQ).multiply(_handWorldQ);
        } else {
            rig.hand.quaternion.copy(_handWorldQ);
        }
        rig.hand.updateWorldMatrix(false, false);
    }
}
function applyFingers(rig, shape) {
    for (const finger of Object.keys(FINGER_BONE)){
        const chain = rig.fingers[finger];
        if (!chain || !chain.length) continue;
        const curl = shape.curl[finger] ?? 0;
        const isThumb = finger === "thumb";
        const gain = isThumb ? THUMB_GAIN : FINGER_GAIN;
        const axis = isThumb ? THUMB_BEND_AXIS : BEND_AXIS;
        // The two hands are mirrored: each finger bone's child direction points to
        // opposite world sides, so a shared rotation sign curls one hand inward and
        // the other outward. Flip the sign for the left rig so both fold toward
        // their own palm.
        const sideSign = rig.poseKey === "left" ? -1 : 1;
        for(let i = 0; i < chain.length; i++){
            const { bone, rest } = chain[i];
            const angle = CURL_SIGN * sideSign * curl * (gain[i] ?? 1);
            _curlQ.setFromAxisAngle(axis, angle);
            _outQ.copy(rest).multiply(_curlQ);
            bone.quaternion.copy(_outQ);
        }
    }
}
function FBXSigner({ playerRef, url = "/models/SignerModelRigged7.fbx" }) {
    _s();
    const fbx = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Fbx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFBX"])(url);
    const model = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FBXSigner.useMemo[model]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$examples$2f$jsm$2f$utils$2f$SkeletonUtils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clone"])(fbx)
    }["FBXSigner.useMemo[model]"], [
        fbx
    ]);
    const arms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const zShiftRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FBXSigner.useEffect": ()=>{
            // The FBX ships a single UV-mapped material whose color comes from an
            // external "baseColor.jpg" texture (referenced by relative path, NOT
            // embedded in the file). We build one shared MeshStandardMaterial that
            // keeps the model's UVs and try to load that texture from
            // `/models/baseColor.jpg`. If the texture is present it shows the real
            // model colors; if it's missing we fall back to a neutral skin tone so the
            // figure is still clearly lit instead of rendering black.
            const skin = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshStandardMaterial"]({
                color: "#c8a488",
                roughness: 0.62,
                metalness: 0.0
            });
            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextureLoader"]().load("/models/baseColor.jpg", {
                "FBXSigner.useEffect": (tex)=>{
                    tex.colorSpace = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SRGBColorSpace"];
                    // FBX exports keep the default top-up texture orientation (unlike
                    // glTF), so we leave tex.flipY at its default (true) to match the UVs.
                    tex.anisotropy = 8;
                    skin.map = tex;
                    skin.color.set("#ffffff"); // let the texture drive the color unmodulated
                    skin.needsUpdate = true;
                    console.log("[v0] fbx rig: baseColor.jpg loaded, showing model textures");
                }
            }["FBXSigner.useEffect"], undefined, {
                "FBXSigner.useEffect": ()=>{
                    console.log("[v0] fbx rig: /models/baseColor.jpg not found — using skin fallback color");
                }
            }["FBXSigner.useEffect"]);
            model.traverse({
                "FBXSigner.useEffect": (o)=>{
                    const mesh = o;
                    if (mesh.isMesh || mesh.isSkinnedMesh) {
                        mesh.castShadow = true;
                        mesh.receiveShadow = true;
                        mesh.frustumCulled = false;
                        const old = mesh.material;
                        if (Array.isArray(old)) old.forEach({
                            "FBXSigner.useEffect": (m)=>m?.dispose?.()
                        }["FBXSigner.useEffect"]);
                        else old?.dispose?.();
                        mesh.material = skin;
                    }
                }
            }["FBXSigner.useEffect"]);
            const rShoulder = findBone(model, "CC_Base_R_Upperarm");
            // Scale the model so its shoulder line sits at TARGET_SHOULDER_LOCAL_Y in
            // the stage group. We measure the shoulder height in the model's own local
            // frame (parent-independent) so the math holds regardless of the group
            // offset. The camera frames the upper body, so shoulder height — not foot
            // height — is what must stay locked.
            model.scale.setScalar(1);
            model.position.set(0, 0, 0);
            model.updateWorldMatrix(true, true);
            const shoulderLocalUnscaled = rShoulder ? model.worldToLocal(rShoulder.getWorldPosition(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]())).y : 33.8;
            const scale = TARGET_SHOULDER_LOCAL_Y / (shoulderLocalUnscaled || 33.8);
            model.scale.setScalar(scale);
            // Feet at group-local 0: shoulder height above origin is now
            // shoulderLocalUnscaled * scale === TARGET_SHOULDER_LOCAL_Y, so origin sits
            // at 0 and the shoulder lands exactly on target.
            model.position.y = TARGET_SHOULDER_LOCAL_Y - shoulderLocalUnscaled * scale;
            // NOTE: must be updateMatrixWorld (not updateWorldMatrix) so SkinnedMesh's
            // override refreshes bindMatrixInverse after the rescale; otherwise
            // skinned-vertex sampling below reads through a stale bind matrix.
            model.updateMatrixWorld(true);
            // Measure the REAL deformed body bounds by sampling skinned vertices.
            // Box3.setFromObject is useless here: it reads raw (un-skinned) geometry,
            // which for this FBX collapses to a ~10cm blob at the feet.
            const box = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Box3"]();
            const _v = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]();
            model.traverse({
                "FBXSigner.useEffect": (o)=>{
                    const m = o;
                    if (!m.isMesh && !m.isSkinnedMesh) return;
                    const posAttr = m.geometry?.attributes?.position;
                    if (!posAttr) return;
                    m.skeleton?.update();
                    const stride = Math.max(1, Math.floor(posAttr.count / 5000));
                    for(let i = 0; i < posAttr.count; i += stride){
                        if (m.isSkinnedMesh) {
                            m.getVertexPosition(i, _v);
                            _v.applyMatrix4(m.matrixWorld);
                        } else {
                            _v.fromBufferAttribute(posAttr, i).applyMatrix4(m.matrixWorld);
                        }
                        box.expandByPoint(_v);
                    }
                }
            }["FBXSigner.useEffect"]);
            // Center horizontally on the sampled bounds.
            const parent = model.parent;
            const centerX = (box.min.x + box.max.x) / 2;
            model.position.x += (parent ? parent.position.x : 0) - centerX;
            model.updateMatrixWorld(true);
            // Measure the front of the body (stage-group local z; the group has no
            // rotation/scale, so world z equals stage-local z). Pose targets whose z
            // was authored against the old avatar's chest (z ≈ 0.16) are shifted so
            // the same offsets now land just in front of THIS model's chest.
            const chestFrontZ = box.max.z;
            zShiftRef.current = chestFrontZ + FORWARD_MARGIN - OLD_ANCHOR_Z * SIZE;
            console.log("[v0] fbx rig: scale=", scale.toFixed(4), "box=", JSON.stringify({
                min: box.min.toArray().map({
                    "FBXSigner.useEffect": (n)=>+n.toFixed(2)
                }["FBXSigner.useEffect"]),
                max: box.max.toArray().map({
                    "FBXSigner.useEffect": (n)=>+n.toFixed(2)
                }["FBXSigner.useEffect"])
            }), "chestFrontZ=", chestFrontZ.toFixed(3), "zShift=", zShiftRef.current.toFixed(3));
            const rigs = [];
            for (const arm of ARMS){
                const upper = findBone(model, `${arm.prefix}Upperarm`);
                const fore = findBone(model, `${arm.prefix}Forearm`);
                const hand = findBone(model, `${arm.prefix}Hand`);
                if (!upper || !fore || !hand) continue;
                const sPos = upper.getWorldPosition(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
                const ePos = fore.getWorldPosition(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
                const wPos = hand.getWorldPosition(new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"]());
                const upperLen = sPos.distanceTo(ePos);
                const foreLen = ePos.distanceTo(wPos);
                const fingers = {};
                for (const finger of Object.keys(FINGER_BONE)){
                    const chain = [];
                    for(let i = 1; i <= 3; i++){
                        const b = findBone(model, `${arm.prefix}${FINGER_BONE[finger]}${i}`);
                        if (b) chain.push({
                            bone: b,
                            rest: b.quaternion.clone()
                        });
                    }
                    fingers[finger] = chain;
                }
                const poleSign = Math.sign(sPos.x) || 1;
                // Natural hanging-arm rest target: wrist hangs ~85% of full reach below
                // the shoulder, nudged outward by 4% of total arm length so the IK pole
                // has a stable lateral direction. z matches the shoulder so the arm
                // drapes straight down without reaching forward or backward.
                const reach = upperLen + foreLen;
                const restWorld = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Vector3"](sPos.x + poleSign * reach * 0.04, sPos.y - reach * 0.85, sPos.z);
                rigs.push({
                    poseKey: arm.poseKey,
                    upper,
                    fore,
                    hand,
                    shoulderWorld: sPos,
                    upperLen,
                    foreLen,
                    poleSign,
                    handRest: hand.quaternion.clone(),
                    restWorld,
                    fingers
                });
            }
            arms.current = rigs;
        }
    }["FBXSigner.useEffect"], [
        model
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"])({
        "FBXSigner.useFrame": (_, delta)=>{
            const pose = playerRef.current.update(Math.min(delta, 0.05));
            const rigs = arms.current;
            const parent = model.parent;
            for(let i = 0; i < rigs.length; i++){
                const rig = rigs[i];
                const hand = rig.poseKey === "right" ? pose.right : pose.left;
                // Convert the pose target from stage-group local space to world space.
                _target.set(hand.pos[0] * SIZE * X_GAIN, hand.pos[1] * SIZE, hand.pos[2] * SIZE + zShiftRef.current);
                if (parent) parent.localToWorld(_target);
                // When the hand dips below the signing zone, blend the IK target toward
                // the rig's pre-computed natural hanging-arm position so the arm looks
                // correct in rest regardless of the pose-player constants.
                // Signing anchors sit at world y ≈ shoulder.y - 0.30; rest starts
                // blending at shoulder.y - 0.35 and is fully in effect at - 0.50.
                const blendStart = rig.shoulderWorld.y - 0.35;
                const t = Math.max(0, Math.min(1, (blendStart - _target.y) / 0.15));
                if (t > 0) {
                    _target.lerp(rig.restWorld, t);
                }
                solveArm(rig, _target, t);
                applyFingers(rig, hand.shape);
            }
        }
    }["FBXSigner.useFrame"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("primitive", {
        object: model
    }, void 0, false, {
        fileName: "[project]/components/avatar/fbx-signer.tsx",
        lineNumber: 421,
        columnNumber: 10
    }, this);
}
_s(FBXSigner, "VyQZLi9kZ3p/LwRqIA+5/s5i5/c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Fbx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFBX"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$b389eeca$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__["useFrame"]
    ];
});
_c = FBXSigner;
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Fbx$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFBX"].preload("/models/SignerModelRigged7.fbx");
var _c;
__turbopack_context__.k.register(_c, "FBXSigner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/avatar/avatar-stage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AvatarStage",
    ()=>AvatarStage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-experimental/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-experimental/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$OrbitControls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/OrbitControls.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$ContactShadows$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@react-three/drei/core/ContactShadows.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$avatar$2f$signer$2d$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/avatar/signer-avatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$avatar$2f$fbx$2d$signer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/avatar/fbx-signer.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
// Default rigged signer shipped with the app.
const DEFAULT_MODEL_URL = "/models/SignerModelRigged7.fbx";
/**
 * Catches errors thrown while loading/parsing the rigged model (e.g. a missing
 * or corrupt FBX) and renders the procedural avatar instead so the stage never
 * goes blank.
 */ class ModelBoundary extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Component"] {
    state = {
        failed: false
    };
    static getDerivedStateFromError() {
        return {
            failed: true
        };
    }
    componentDidCatch(error) {
        console.log("[v0] Rigged model failed to load, using procedural fallback:", error);
    }
    render() {
        return this.state.failed ? this.props.fallback : this.props.children;
    }
}
function AvatarStage({ playerRef, onProgress, modelUrl = DEFAULT_MODEL_URL }) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AvatarStage.useEffect": ()=>{
            playerRef.current.onProgress = ({
                "AvatarStage.useEffect": (label, i, total)=>onProgress?.(label, i, total)
            })["AvatarStage.useEffect"];
        }
    }["AvatarStage.useEffect"], [
        playerRef,
        onProgress
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["Canvas"], {
        shadows: true,
        dpr: [
            1,
            2
        ],
        camera: {
            position: [
                0,
                0.6,
                3.1
            ],
            fov: 32
        },
        gl: {
            antialias: true,
            toneMapping: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ACESFilmicToneMapping"]
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("color", {
                attach: "background",
                args: [
                    "#26232f"
                ]
            }, void 0, false, {
                fileName: "[project]/components/avatar/avatar-stage.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("fog", {
                attach: "fog",
                args: [
                    "#26232f",
                    3.5,
                    7
                ]
            }, void 0, false, {
                fileName: "[project]/components/avatar/avatar-stage.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ambientLight", {
                intensity: 0.7
            }, void 0, false, {
                fileName: "[project]/components/avatar/avatar-stage.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                position: [
                    2,
                    4,
                    3
                ],
                intensity: 1.5,
                castShadow: true,
                "shadow-mapSize": [
                    2048,
                    2048
                ],
                "shadow-bias": -0.0002
            }, void 0, false, {
                fileName: "[project]/components/avatar/avatar-stage.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("directionalLight", {
                position: [
                    -3,
                    2,
                    -2
                ],
                intensity: 0.4,
                color: "#ffd9b0"
            }, void 0, false, {
                fileName: "[project]/components/avatar/avatar-stage.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hemisphereLight", {
                args: [
                    "#fff6ea",
                    "#8a7a63",
                    0.6
                ]
            }, void 0, false, {
                fileName: "[project]/components/avatar/avatar-stage.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pointLight", {
                position: [
                    0,
                    2,
                    2
                ],
                intensity: 0.5,
                color: "#fff2e0"
            }, void 0, false, {
                fileName: "[project]/components/avatar/avatar-stage.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("group", {
                position: [
                    0,
                    -1.0,
                    0
                ],
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ModelBoundary, {
                        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$avatar$2f$signer$2d$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SignerAvatar"], {
                            playerRef: playerRef
                        }, void 0, false, {
                            fileName: "[project]/components/avatar/avatar-stage.tsx",
                            lineNumber: 72,
                            columnNumber: 34
                        }, this),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                            fallback: null,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$avatar$2f$fbx$2d$signer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FBXSigner"], {
                                playerRef: playerRef,
                                url: modelUrl
                            }, void 0, false, {
                                fileName: "[project]/components/avatar/avatar-stage.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/avatar/avatar-stage.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/avatar/avatar-stage.tsx",
                        lineNumber: 72,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$ContactShadows$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ContactShadows"], {
                        position: [
                            0,
                            0.01,
                            0
                        ],
                        opacity: 0.35,
                        scale: 4,
                        blur: 2.4,
                        far: 2,
                        color: "#7a6a55"
                    }, void 0, false, {
                        fileName: "[project]/components/avatar/avatar-stage.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/avatar/avatar-stage.tsx",
                lineNumber: 69,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$experimental$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$OrbitControls$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OrbitControls"], {
                enablePan: false,
                minDistance: 1.2,
                maxDistance: 4,
                minPolarAngle: Math.PI * 0.25,
                maxPolarAngle: Math.PI * 0.62,
                target: [
                    0,
                    0.3,
                    0
                ]
            }, void 0, false, {
                fileName: "[project]/components/avatar/avatar-stage.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/avatar/avatar-stage.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
}
_s(AvatarStage, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = AvatarStage;
var _c;
__turbopack_context__.k.register(_c, "AvatarStage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/avatar/avatar-stage.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/components/avatar/avatar-stage.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=components_avatar_1mm254t._.js.map
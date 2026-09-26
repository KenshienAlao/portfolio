# Chatbot Widget — UI/UX Design Specification

**Version:** 1.0
**Style:** Simple, professional, draggable
**Status:** Design reference for implementation

---

## 1. Design Principles

| Principle                | Meaning                                                                             |
| ------------------------ | ----------------------------------------------------------------------------------- |
| **Simple**               | Minimal chrome, one accent color, no visual clutter. Every element earns its place. |
| **Professional**         | Muted neutral base palette, consistent spacing/radius scale, restrained motion.     |
| **Draggable**            | The widget is a floating panel the user can reposition anywhere on screen.          |
| **Readable by contract** | Text color is _never_ chosen independently of its background — see Rule below.      |

---

## 2. The Contrast Rule (non-negotiable)

> **If a surface is light, the content on it must be dark.**
> **If a surface is dark, the content on it must be light.**
> Light-on-light and dark-on-dark are never allowed, anywhere in this UI — bubbles, buttons, headers, badges, inputs.

Minimum contrast targets (WCAG 2.1):

- Body text / message text: **≥ 4.5:1**
- Large text (≥18px or bold ≥14px), icons, borders: **≥ 3:1**

### 2.1 Approved surface/text pairs

| Surface (bg)        | Hex       | Text color | Hex       | Approx. ratio | Use                                         |
| ------------------- | --------- | ---------- | --------- | ------------- | ------------------------------------------- |
| Off-white           | `#F1F3F5` | Near-black | `#1A1A1A` | ~15.8:1       | Bot/incoming bubble                         |
| White               | `#FFFFFF` | Charcoal   | `#1F2937` | ~15.5:1       | Chat panel background, input field          |
| Deep indigo         | `#3730A3` | White      | `#FFFFFF` | ~9:1          | User/outgoing bubble, primary button        |
| Dark slate (header) | `#111827` | White      | `#FFFFFF` | ~17:1         | Header bar, drag handle                     |
| Muted gray          | `#E5E7EB` | Dark gray  | `#374151` | ~7.7:1        | Timestamps, system messages, disabled state |

> Treat these as **paired tokens** — never use one half of a pair with a color from another row. See §4 for token naming that enforces this.

### 2.2 Anti-patterns (do not ship these)

| Bad pairing                                                             | Why                                      |
| ----------------------------------------------------------------------- | ---------------------------------------- |
| Light gray bubble `#EEEEEE` + white text `#FFFFFF`                      | Light on light — fails contrast          |
| Dark navy bubble `#1E293B` + dark gray text `#4B5563`                   | Dark on dark — fails contrast            |
| Colored bubble chosen for "brand feel" without checking text against it | Contrast must be verified, never assumed |

**Before shipping any new color combo:** run it through a contrast checker (e.g. WebAIM Contrast Checker) — the ratios above are reference points, not a substitute for verifying final hex values.

---

## 3. Color Palette (design tokens)

```css
:root {
  /* Neutral surfaces */
  --surface-panel: #ffffff;
  --surface-bot-bubble: #f1f3f5;
  --surface-input: #ffffff;
  --surface-header: #111827;
  --surface-muted: #e5e7eb;

  /* Text — always paired with the surface above it */
  --text-on-panel: #1f2937;
  --text-on-bot-bubble: #1a1a1a;
  --text-on-header: #ffffff;
  --text-on-muted: #374151;

  /* Accent (user bubble / primary actions) */
  --accent-bg: #3730a3;
  --text-on-accent: #ffffff;
  --accent-bg-hover: #322e8c;

  /* Status */
  --success: #15803d;
  --error: #b91c1c;
  --text-on-success-bg: #ffffff;
  --text-on-error-bg: #ffffff;

  /* Structure */
  --border: #e2e4e9;
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --shadow-resting: 0 2px 8px rgba(16, 24, 40, 0.08);
  --shadow-dragging: 0 12px 28px rgba(16, 24, 40, 0.22);
}
```

**Naming convention:** every `--surface-*` token has a matching `--text-on-*` token. A developer should never write a color hex directly into a component — only reference a pair. This structurally prevents the light/dark mismatch.

---

## 4. Layout & Anatomy

```
┌─────────────────────────────────────────┐
│ ●  Support Chat            ─  ✕         │  ← Header (drag handle, dark surface)
├─────────────────────────────────────────┤
│                                           │
│  ┌───────────────────────┐               │
│  │ Bot: How can I help?  │               │  ← Bot bubble (light surface, dark text)
│  └───────────────────────┘               │
│                                           │
│               ┌───────────────────────┐  │
│               │ Need pricing info     │  │  ← User bubble (dark accent, light text)
│               └───────────────────────┘  │
│                                           │
│  ┌───────────────────────┐               │
│  │ ● ● ●  (typing...)     │               │  ← Typing indicator
│  └───────────────────────┘               │
│                                           │
├─────────────────────────────────────────┤
│  [ Type a message...          ] [ Send ] │  ← Input row (light surface, dark text)
└─────────────────────────────────────────┘
```

### Spacing scale

`4 / 8 / 12 / 16 / 24 / 32 px` — no arbitrary values outside this scale.

### Radius scale

- Panel container: `--radius-lg` (16px)
- Bubbles: `--radius-md` (12px), with the corner nearest the sender flattened to `4px` to imply direction (optional "tail" effect)
- Buttons, input: `--radius-sm` (6px)

### Dimensions

- Collapsed launcher button: `56×56px`, fixed bottom-right, `24px` inset from viewport edge
- Expanded panel: `360px` wide × `520px` tall (desktop); full-screen on viewports `<480px`
- Message bubble max-width: `75%` of panel width

---

## 5. Chat Bubble Component

| Property   | Bot bubble (incoming)                           | User bubble (outgoing)                |
| ---------- | ----------------------------------------------- | ------------------------------------- |
| Background | `--surface-bot-bubble`                          | `--accent-bg`                         |
| Text       | `--text-on-bot-bubble`                          | `--text-on-accent`                    |
| Alignment  | Left                                            | Right                                 |
| Padding    | `10px 14px`                                     | `10px 14px`                           |
| Radius     | `--radius-md`, bottom-left flattened            | `--radius-md`, bottom-right flattened |
| Timestamp  | `--surface-muted` text below, `--text-on-muted` | Same, right-aligned                   |
| Max width  | 75% of panel                                    | 75% of panel                          |

Font: 14px body text, 12px timestamps, line-height 1.4.

---

## 6. Draggable Behavior

- **Drag handle:** the header bar only (not the whole panel) — signals intent clearly and avoids interfering with message scrolling.
- **Cursor:** `cursor: grab` on hover over header; `cursor: grabbing` while active drag is in progress.
- **Elevation change:** shadow switches from `--shadow-resting` to `--shadow-dragging` during drag, panel scales to `1.01` for tactile feedback.
- **Boundary constraint:** panel position is clamped so at least the header remains within the viewport — it should never be draggable fully off-screen.
- **Persistence:** last position is remembered for the session (not required to persist across reloads unless specified).
- **Keyboard alternative:** when the header is focused, arrow keys move the panel in `10px` increments, so dragging is not the only way to reposition it — this keeps the feature usable without a mouse.
- **ARIA:** header has `role="button"` and `aria-grabbed` state; panel has `aria-label="Chat window"`.

---

## 7. Interactive States

| Element               | Default                             | Hover                   | Active/Focus                                 | Disabled                                |
| --------------------- | ----------------------------------- | ----------------------- | -------------------------------------------- | --------------------------------------- |
| Send button           | `--accent-bg` / `--text-on-accent`  | `--accent-bg-hover`     | 2px focus ring, `--accent-bg` at 40% opacity | `--surface-muted` bg, `--text-on-muted` |
| Input field           | `--surface-input` border `--border` | border darkens slightly | 2px focus ring in accent color               | reduced opacity, no ring                |
| Launcher button       | accent bg, subtle shadow            | scale `1.05`            | focus ring                                   | —                                       |
| Close / minimize icon | `--text-on-header` at 80%           | 100% opacity            | focus ring                                   | —                                       |

**Typing indicator:** three dots, `--text-on-bot-bubble` at reduced opacity, gentle staggered fade animation (respect `prefers-reduced-motion` — fall back to a static "Typing…" label).

---

## 8. Accessibility Checklist

- [ ] Every surface/text pair checked against §2.1 — no exceptions for "just this one badge."
- [ ] All interactive elements have a visible focus ring (not color alone).
- [ ] Message list has `role="log"` and `aria-live="polite"` so new messages are announced.
- [ ] Drag interaction has a non-drag (keyboard) equivalent.
- [ ] Motion (typing dots, panel open/close) respects `prefers-reduced-motion`.
- [ ] Minimum tap target `44×44px` for icon buttons on touch devices.

---

## 9. Responsive Behavior

| Breakpoint | Behavior                                                                                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `≥ 768px`  | Floating draggable panel, fixed size (§4)                                                                                      |
| `< 480px`  | Panel expands to full-screen; dragging disabled (not needed at that size); header becomes a fixed top bar with back/close only |

---

## 10. Summary — Do / Don't

| Do                                                      | Don't                                                      |
| ------------------------------------------------------- | ---------------------------------------------------------- |
| Pair every surface token with its designated text token | Hardcode a hex color inline without checking its pair      |
| Keep one accent color for all primary actions           | Introduce a new color per feature without a contrast check |
| Make the header the only drag handle                    | Make the entire panel draggable (breaks scroll/selection)  |
| Provide a keyboard way to reposition the panel          | Rely on drag-only interaction                              |
| Test every new bubble/status color against WCAG AA      | Assume a color "looks fine" without measuring              |

Two additions:

§2/§4 — full dark-mode token set alongside light mode, using prefers-color-scheme + a [data-theme="dark"] override so it respects both OS setting and a manual toggle. Same contrast rule applies in each theme independently.
§3 — a new rule to always check global.css first and map onto existing tokens (--background, --primary, etc.) instead of building a parallel palette, plus hooking into whatever dark-mode toggle your app already uses rather than adding a second one.
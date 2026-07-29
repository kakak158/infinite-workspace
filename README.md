# Infinite Workspace

Infinite Workspace is an inifinite canvas with drag-and-drop cards that you can use to plan projects, set reminders, and even just relax.

The [Infinite Workspace website](https://infinite-workspace.netlify.app/) is free for all to see.

## Features

### Note Card

The note card is a card that can contain text, and a title. It is an integral part of the experience, as you can use it to express yourself in the canvas. It is also useful in labeling other cards or giving context to, say, the image in the image card

### Image Card

### Parent Card

### Task Card

# Infinite Workspace

**Infinite Workspace** is an interactive, infinite canvas built for organizing ideas, planning projects, tracking tasks, and even relaxing. Drag, drop, connect, and structure your thoughts freely with custom card nodes.

**Live Demo:** [infinite-workspace.netlify.app](https://infinite-workspace.netlify.app/)

---

## Features

### Card Types

- **Note Card:** Write and format notes with titles and rich text support (`⌘B`, `⌘I`, `⌘U`). Use them to express ideas or add context to surrounding cards.
- **Task Card:** Track goals and check off items with a polished, progress-focused UI and fluid task animations.
- **Parent Card:** Act as root/folder nodes to group topics and fields together. Features real-time stat stacking from child cards.
- **Image Card:** Display visual content directly on the canvas to complement your notes and project layouts.

### Custom Connection Hierarchy

- Connect nodes freely across the infinite canvas.
- **Parent-Child Logic:** Connect a **green connector** to a **red connector** on a Parent Card to establish child dependencies and hierarchy.
- **Aggregated Stats:** Parent cards automatically stack and display stats from connected child nodes.

### Canvas & Workflow

- **Drag-and-Drop Sidebar:** Easily spawn new card nodes directly onto the canvas.
- **Auto-Save:** Your workspace state persists automatically in your browser's `localStorage`.
- **Smooth Animations:** Powered by **Motion** and **GSAP** for responsive UI interactions, card creation, task buttons, and loading screens.

---

## Built With

- **Frontend:** React, TailwindCSS, ReactFlow
- **Animations:** [Motion](https://motion.dev/) & [GSAP](https://gsap.com/)
- **Persistence:** Browser `localStorage`
- **Hosting:** Netlify

---

## Shortcuts & Controls

| Action                         | Shortcut                 |
| :----------------------------- | :----------------------- |
| **Bold Text** (Note Card)      | `⌘ + B` / `Ctrl + B`     |
| **Italicize Text** (Note Card) | `⌘ + I` / `Ctrl + I`     |
| **Underline Text** (Note Card) | `⌘ + U` / `Ctrl + U`     |
| **Add Cards**                  | Drag & drop from sidebar |

---

## Soon to come

- Auth with **Clerk**
- Backend with **Supabase**

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

| Action                         | Shortcut                     |
| :----------------------------- | :--------------------------- |
| **Bold Text** (Note Card)      | `⌘ + B` / `Ctrl + B`         |
| **Italicize Text** (Note Card) | `⌘ + I` / `Ctrl + I`         |
| **Underline Text** (Note Card) | `⌘ + U` / `Ctrl + U`         |
| **Add Cards**                  | **Drag & drop from sidebar** |

---

## AI usage

- AI was used only for bugfixing. All the ideation and most of the programming was made by me! And, no code was pasted into my project without me fully understanding it.
- I tried really hard on this, and I know the project looks generic, but that's just my style of programming. Don't discount the project over it "looking like a generic site", because I physically can't code in any other way.
- Also the last reviewer said the sidebar didn't work. It's **drag and drop**, and it does work.

---

## Soon to come

- Auth with **Clerk**
- Backend with **Supabase**

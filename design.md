# Enterprise Admin & Supercar Showcase Design Contract

## Product language

- All visible UI text is English.
- Code comments, when needed, are Vietnamese and explain non-obvious flow, business abbreviations, or integration constraints.

## Visual direction

- Notion-inspired: calm neutral canvas, strong typography hierarchy, compact navigation, generous whitespace, and restrained borders.
- Supercar showcase: premium dark hero, cinematic blurred motion, high-contrast vehicle imagery, and restrained accent color.
- Avoid visual noise, excessive gradients, decorative dashboards, and animations that compete with data.

## UI foundations

- Use a consistent spacing scale, semantic color tokens, keyboard-visible focus states, and responsive layouts.
- Prefer reusable primitives for buttons, inputs, cards, tables, badges, dialogs, charts, loading states, empty states, and error states.
- Every async surface must define loading, empty, success, and error states.
- All interactive elements must be keyboard accessible.
- Respect `prefers-reduced-motion`; animation is progressive enhancement, never required to understand content.

## Application structure

- Feature-based folders: each domain owns its pages, components, schemas, services, and tests.
- Shared UI and utilities remain framework-agnostic where practical.
- Keep server, database, and client contracts typed and explicit.
- No secrets or private asset URLs are committed.

## Admin experience

- Primary areas: Overview, Finance, People, Payroll, Products, Advertising, and Settings.
- Sidebar navigation is persistent on desktop and collapsible on smaller screens.
- Overview prioritizes revenue, expenses, net income, payroll total, active people, product value, and campaign performance.
- Tables support clear column labels, sorting/filter affordances, pagination or bounded data, and descriptive empty states.

## Supercar landing experience

- Hero includes a short optimized video with poster image and static fallback.
- Use subtle entrance, parallax, and hover motion; never autoplay audio.
- CTA labels and product copy remain concise and in English.

## Quality rules

- Every business or utility function has a focused unit test.
- Important forms, permission rules, and end-to-end flows have integration or component coverage.
- Before each code change, read this file and the relevant domain files.
- Update this contract when visual or interaction behavior changes.

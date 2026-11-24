# HongT — Supercar Showroom Management

## Product
HongT Enterprise — a premium showroom management controller for supercar dealerships. Staff manage vehicle inventory, sales transactions, employees, and marketing campaigns through a single dashboard.

## Audience
- Showroom managers (daily use, need to scan inventory and sales at a glance)
- Sales associates (lookup vehicle specs, log transactions)
- Administrators (manage employees, campaigns, user roles)
- Finance (review transactions, approvals)

## Tone
Refined, technical, calm. Premium automotive feel — dark surfaces, metallic accents, generous whitespace, typography-first hierarchy. Not playful, not industrial.

## Constraints
- Framework: React 19 + TypeScript + Vite
- Styling: Tailwind CSS (via design tokens), dark mode by default
- Icons: lucide-react
- Charts: recharts (Recharts already in dependencies)
- Accessibility: WCAG 2.1 AA, visible focus states, touch targets >= 44px
- Responsive: mobile (390x844) and desktop (1440x900)
- Roles: OWNER, ADMIN, HR, FINANCE, MARKETING, VIEWER (from Prisma schema)

## Memorable Detail
Each vehicle card shows a subtle "spotlight" glow on hover, echoing showroom floor lighting. Primary accent is Sonata Gold (#D4AF37) on deep charcoal (#0B0C10).

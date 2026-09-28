# Implementation Plan: Clean Header & Categorized Mega-Menu Redesign

Redesign the application header to deliver a modern, uncluttered, and high-performance navigation experience. Organize all 16+ interactive EV tools into an intuitive 4-column categorized desktop Mega-Menu, streamline top-level menu items to 4 primary anchors, and build an accessible, searchable mobile navigation drawer.

---

## 1. Architectural & Layout Design

### Desktop Navigation Structure (Clean & Minimal)
Streamline desktop top-level links to 4 core anchors:
1. **Calculators & Simulators** *(Triggers 4-column categorized Mega-Menu with icons, tags, and quick descriptions)*
2. **EV Curves** (`/curve`) *(Interactive charging curve directory for 25+ EVs)*
3. **Research** (`/research`) *(Empirical research whitepapers, telemetry datasets, CSV exports)*
4. **Topic Hubs** (`/topics`) *(12 core knowledge pillars)*

*Note: Secondary informational pages (Methodology, Data Sources, Authors, Blog) are gracefully accessible from the Footer and the Mega-Menu bottom bar, keeping the top navigation bar clean and uncluttered.*

### 4-Column Tool Taxonomy in Mega-Menu
Group all 16+ interactive tools logically:

| Category 1: DC Fast & Road Trips | Category 2: Battery & Range Physics | Category 3: Home Charging & Grid | Category 4: Economics & Sustainability |
| :--- | :--- | :--- | :--- |
| **DC Fast Simulator** (`/`) | **Battery Health & Degradation** (`/battery-health`) | **Home Charging Economics** (`/home-charging`) | **EV vs Gas 5-Yr TCO** (`/tco-calculator`) |
| **Compare EV Charging Speed** (`/compare`) | **Winter & Towing Range Loss** (`/range-loss`) | **Home Panel Capacity Sizer** (`/panel-capacity`) | **EV Charging Cost & Savings** (`/ev-charging-cost`) |
| **Cold-Gate vs Preconditioning** (`/preconditioning`) | **kW to Miles Replenish Speed** (`/kw-to-miles`) | **V2H Outage Backup Sizer** (`/v2h-backup`) | **Battery Replacement Cost** (`/battery-replacement`) |
| **Destination & Hotel Sizer** (`/destination-charging`) | **Vampire & Idle Drain Sizer** (`/idle-drain`) | **Solar Array to EV Sizer** (`/solar-to-ev`) | **Carbon Offset Matrix** (`/carbon-offset`) |

---

## 2. Desktop Mega-Menu Engineering (`components/Navbar.tsx`)

- **Full-Width / Centered Mega-Menu Panel**: High-blur backdrop (`backdrop-blur-xl bg-[#0F141E]/95`) with smooth transition, subtle borders, and glow accents.
- **Interactive Tool Cards**: Each tool has:
  - Lucide icon with category-specific color accents (Emerald, Cyan, Indigo, Amber).
  - Name, short descriptive subtitle, and active state highlight.
- **Quick Action Bar (Bottom of Mega-Menu)**:
  - Direct links to **Custom EV Studio (+ Custom EV)**, **Open Telemetry Repository**, and **Testing Methodology**.
- **Compact Right-Side Utility Cluster**:
  - Distance unit switcher (`MI` / `KM`).
  - Currency dropdown (`USD`, `EUR`, `GBP`, `CAD`, `AUD`, `INR`, etc.).
  - `+ Custom EV` button.

---

## 3. Mobile Layout & Responsive Drawer Experience

- **Searchable Mobile Menu**: Instant real-time filter input at the top of the drawer to quickly find any calculator or topic.
- **Categorized Collapsible Accordions**: Expandable category sections so mobile users can navigate without an endless vertical list.
- **Thumb-Friendly Touch Targets**: Minimum 44px touch targets compliant with mobile accessibility standards (WCAG AAA).
- **Embedded Currency & Unit Controls**: Clean pill toggles located in the sticky bottom drawer tray.

---

## 4. Verification & Testing

1. Test desktop Mega-Menu keyboard accessibility (`Esc` to close, `Tab` navigation).
2. Test mobile responsiveness across phone viewports (360px, 390px, 414px) and tablet breakpoints.
3. Run `compile_applet` and `lint_applet` to confirm zero compilation or lint errors.

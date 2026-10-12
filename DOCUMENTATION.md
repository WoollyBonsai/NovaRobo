# 🛰️ Nova Robo — Digital Experience & Hardware Platform Documentation

**Platform Version:** `v2.4.0-Production`  
**Deployment Target:** Next.js 15 (App Router), React 18, Tailwind CSS, Spline 3D  
**Target Audience:** Engineering Team Collaborators, Hardware Architects, and Web Maintainers  
**Last Updated:** October 2026

---

## 📌 Executive Overview

This repository hosts the official brand website, robotics e-commerce store, hardware documentation lab, and administrative management console for **Nova Robo** (`Build. Automate. Innovate.`).

The web application bridges digital simulation and physical hardware, combining an interactive **3D Spline robotic arm model**, real-time joint telemetry HUD, full robotics and electronic components store, institutional procurement checkout, customer accounts, and a password-protected **Admin Panel** (`/admin`) for live product and inventory management.

---

## 🚀 Quickstart for Collaborators

### 1. Prerequisites
- **Node.js**: v18.18+ or v20+
- **Package Manager**: `npm`

### 2. Local Setup
```bash
# Clone the repository
git clone https://github.com/WoollyBonsai/NovaRobo.git
cd NovaRobo

# Install dependencies
npm install

# Start local development server on port 3000
npm run dev -- -p 3000
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 3. Production Build & Verification
```bash
# Verify TypeScript and build static output
npm run build

# Start production server
npm run start
```

---

## 🔐 Administrative Console & Product Listing Manager

Collaborators can add, edit, and delete products, adjust component inventory, advance order production lines, and approve custom quotations without touching code.

- **Access URL:** `http://localhost:3000/admin`  
  *(Also accessible via the **Admin Shield button** in the top navigation bar).*
- **Master Admin Passkey:** `notadmin`

### Admin Features Available:
1. **Robotics Catalogue Management**:
   - **View all robots**: Real-time table displaying image, model name, category, price, lead time, payload, and reach.
   - **Add New Robot**: Modal form to add a new manipulator, AMR, or gripper with custom images, specifications, tolerances, and ROS2 commands.
   - **Edit Robot**: Modify unit price, lead time, descriptions, and stock status.
   - **Stock Status Toggle**: One-click switch between `In Stock` and `Out of Stock`.
   - **Delete Robot**: Safely removes a product from the live catalog.
2. **Electronic Components Management**:
   - View all hardware parts categorized by bus protocol (`CAN-FD`, `EtherCAT`, `UART`, `SPI`).
   - **Add Component SKU**: Form for motor drivers, harmonic gearboxes, LiDAR, and carrier boards.
   - **Live Stock Stepper (`+` / `-`)**: Increase or decrease stock unit counts instantly.
3. **Assembly Pipeline Orders**:
   - Track lab procurement orders with an advance stage selector:  
     `Fabrication` $\to$ `SMT Assembly` $\to$ `CNC Milling` $\to$ `QA & Calibration` $\to$ `Dispatched` $\to$ `Delivered`.
4. **Custom Project Enquiries**:
   - Inspect client requirements (payload, reach, environment, budget).
   - One-click approve custom hardware quotes.
5. **Factory Reset**:
   - One-click button to restore default factory catalog specifications if needed.

*Note: All catalog changes persist to browser `localStorage` and synchronize immediately with the storefront.*

---

## 🎨 Visual & Engineering Aesthetics

### 1. Dark Grey Theme (Non-Pitch Black)
- **Base Background:** `#12161f` (Matte aerospace slate charcoal).
- **Elevated Surfaces:** `#1a202c` and `#222a3a`.
- **Card Borders:** `rgba(148, 163, 184, 0.18)` with subtle copper glow (`#f59e0b`).
- **Spline Masking:** The Spline 3D branding mask seamlessly matches `#12161f`.

### 2. Animated PCB Background (`PcbBackground.tsx`)
- SVG circuit traces routed across the background with standard 45-degree angled trace geometry.
- **Animated energy packets:** Cyan (`#38bdf8`) and copper/gold (`#fbbf24`) current pulses flowing through copper buses continuously.
- Plated copper vias with drill hole cores.
- IC component footprints: `STM32H753 MCU`, QFP pin arrays, and test pads (`TP1_3V3`, `TP2_GND`, `TP3_CAN_H`, `TP4_CAN_L`, `TP5_ETH_CLK`).
- Silkscreen markings: `[DIFF_PAIR_100Ω]`, `[VIA_GRID_0.8mm]`, `[TOP_COPPER_L1]`.

### 3. Scroll Reveal Animation Engine (`ScrollReveal.tsx`)
- Elements smoothly fade and slide into view as visitors scroll down the page.
- Utilizes browser-compositor **CSS `view-timeline`** where supported with an **`IntersectionObserver`** fallback.
- Staggered delays (`idx * 75ms`) allow cards in grids to reveal sequentially.
- Respects `prefers-reduced-motion` accessibility standards.

### 4. Fast Interactive System Loader (`WebsiteLoader.tsx`)
- Branded network topology node animation with Nova Robo logo.
- **Guaranteed Max Safety Fallback (`2.4s`)**: Failsafe ensures the loader never hangs indefinitely, even on slow connections or if the external Spline iframe stalls.
- **Click to Skip**: Users can click anywhere on screen or press `Escape` / `Enter` / `Space` to enter immediately.

---

## 📦 Core Storefront Modules Breakdown

| Component | File Path | Description |
|---|---|---|
| **Hero & 3D Stage** | `src/components/HeroStage.tsx` | Embeds the Spline 3D robot arm (`https://my.spline.design/robotarm-dGeMfZX19JuyBr3QIR55NJ6g/`), displays real-time 6-DOF joint angles telemetry HUD (`J1-J6`), and key quick actions. |
| **Brand Showcase** | `src/components/BrandShowcase.tsx` | Explains 4 core pillars: Precision Kinematics (±0.02mm), Real-Time Embedded Stack (1,000 Hz FOC), Aerospace Material Craft (7075-T6 CNC), and Hardware Agility (<14 Days). Shows MSME & ISO credentials. |
| **Robotics Catalogue** | `src/components/CatalogueModule.tsx` | Filterable catalogue of manipulator arms, mobile robots, and research kits with payload badges and Add to Cart triggers. |
| **Components Store** | `src/components/ComponentsStoreModule.tsx` | Hardware store for FOC servo drivers, harmonic gearboxes, dToF LiDAR, and Jetson carrier boards filterable by bus (`CAN-FD`, `EtherCAT`, `UART`, `SPI`). |
| **Product Detail Modal** | `src/components/ProductDetailModal.tsx` | Tabbed deep-dive: Highlights, full Engineering Specs table, Bill of Materials (BOM) with tolerances and manufacturing origins, 3D CAD (.STEP / .URDF) downloads, and ROS2 Jazzy / Humble launch commands. |
| **Cart Drawer** | `src/components/CartDrawer.tsx` | Slide-over drawer with item quantity adjustments and warranty tier selection (Standard 1-Year vs Enterprise 3-Year Hot-Swap). |
| **Multi-Step Checkout** | `src/components/CheckoutModal.tsx` | 3-step procurement flow: Shipping address, freight crate options, and Net-30 Corporate PO / Lab Invoice. |
| **Customer Account Portal** | `src/components/CustomerAccountModal.tsx` | Customer portal tracking orders across 6 fabrication stages, saved wishlist items, and custom project quotes. |
| **Custom Project Enquiry** | `src/components/CustomProjectModal.tsx` | Hardware project spec builder (payload, reach, environment, budget, CAD file upload simulation) with instant quote calculation and 24h engineering SLA. |
| **Nova Robo Lab** | `src/components/NovaLabModule.tsx` | Technical documentation reader with ROS2 bringup commands and copyable Python SDK code snippets. |
| **Engineering Support** | `src/components/SupportModal.tsx` | Real-time ticket submission and messaging conversation thread with hardware specialists. |
| **Admin Dashboard Modal** | `src/components/AdminDashboardModal.tsx` | Popup admin view protected with `"notadmin"` passkey and direct link to the full `/admin` page. |
| **PCB Background** | `src/components/PcbBackground.tsx` | Animated SVG circuit board with flowing current pulses, vias, and PCB header lockups. |
| **Scroll Reveal** | `src/components/ScrollReveal.tsx` | IntersectionObserver and CSS scroll-driven reveal wrapper for smooth page scroll entries. |

---

## 🗄️ Application Architecture & State Management

```
NOVAROBO/
├── app/
│   ├── layout.tsx            # Global RootLayout, dark grey background, wraps StoreProvider
│   ├── page.tsx              # Main homepage entry point (renders src/App.tsx)
│   └── admin/
│       └── page.tsx          # Fullscreen Admin Management Console (passkey: "notadmin")
├── components/
│   └── WebsiteLoader.tsx     # Fullscreen tech intro loader with 2.4s fallback & click-skip
├── src/
│   ├── App.tsx               # Main layout orchestrating hero, showcase, stores, lab, and modals
│   ├── styles.css            # Tailwind directives, PCB track themes, and scroll-reveal keyframes
│   ├── context/
│   │   └── StoreContext.tsx  # Central state: products, components, cart, orders, wishlist, admin auth
│   ├── data/
│   │   └── products.ts       # Initial catalog data, specs, BOMs, CAD links, and lab docs
│   └── components/           # All UI, modal, store, and visual components
├── tailwind.config.mjs       # Tailwind configuration with dark grey & copper color tokens
└── package.json              # Next.js 15, React 18, Lucide React, Tailwind CSS
```

### State Persistence Model (`StoreContext.tsx`)
- `novarobo_products`: Dynamic products catalog (updates from Admin).
- `novarobo_components`: Dynamic components catalog (updates from Admin).
- `novarobo_cart`: Active items in shopping cart.
- `novarobo_wishlist`: Saved product IDs.
- `novarobo_orders`: Placed customer orders with fabrication stages.
- `novarobo_enquiries`: Custom hardware project quotation inquiries.
- `novarobo_admin_auth`: SessionStorage flag verifying `"notadmin"` passkey login.

---

## 🛠️ Testing & Verification Checklist

- [x] **3D Model**: Spline 3D robot arm loads smoothly on `#hero` with real-time 6-DOF joint angles telemetry HUD.
- [x] **Loader**: Exits smoothly within ~1.6 - 2.4s and dismisses instantly upon click or Escape key.
- [x] **Theme**: Dark grey background (`#12161f`) with animated PCB traces and energy packets.
- [x] **Scroll Animations**: Sections and cards reveal smoothly into view as the user scrolls down.
- [x] **Store Functionality**: Products and components can be added to cart, configured with warranty tiers, and checked out.
- [x] **Admin Authentication**: Passkey `"notadmin"` successfully unlocks the `/admin` page and admin modal.
- [x] **Admin Operations**: Adding/editing products and adjusting stock quantities instantly updates the homepage catalog.
- [x] **Build & Typing**: `npm run build` completes with 0 errors and generates static pages for `/`, `/admin`, and `/_not-found`.

---

## 🤝 Contributing Guidelines

1. **Commit Messages**: Use simple, informal, and clear messages (e.g. *"added component stock controls and fixed mobile view"*).
2. **Preserve Spline Iframe**: Do not modify or remove `https://my.spline.design/robotarm-dGeMfZX19JuyBr3QIR55NJ6g/` or the badge mask.
3. **Purity in React 19 / Compiler**: Avoid executing non-deterministic calls like `Date.now()` during render; use event callbacks or module-level helpers.
4. **Git Pushes**: Always coordinate pushes with team leads.

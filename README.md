# THREADWORKS BD — Multi-Landing-Page Animation Demo

A pitch and concept gallery demo built for a premier **Bangladesh Textile & Apparel Buying House**. The project features **4 distinct, fully-realized creative directions** switchable through a persistent global navigation bar, each engineered with a signature bespoke animation engine, tailored typography, custom color tokens, and substantive industry data (AQL 1.5 rigor, GOTS certification, LEED Platinum factory network, 21-day fast-track logistics).

---

## 🎨 The 4 Creative Directions

### 1. Heritage & Craftsmanship (`/heritage`)
- **Core Narrative**: 500-year living lineage of Bengal weaving—from the legendary sheer Dhaka Muslin to modern computerized jacquard looms.
- **Palette**:
  - `Bengal Indigo`: `#142238`
  - `Terracotta`: `#C45525`
  - `Jute Ecru`: `#F7F2EB`
  - `Raw Clay`: `#D4B996`
  - `Deep Charcoal`: `#1C1C21`
- **Typography Pairing**: *Cormorant Garamond* (Editorial Display Serif) + *Plus Jakarta Sans* (Body) + *Syne* (Accents)
- **Signature Hero Animation**: **Interactive Canvas Loom Weaving Engine**. Real-time simulation of vertical warp and horizontal weft threads interlacing row-by-row on load with an active flying wooden shuttle, plus dynamic spring-tension thread displacement on mouse drag.
- **Key Substantive Features**:
  - Historical provenance narrative (16th-century Mughal Dhaka muslin to modern GOTS certified clusters)
  - Interactive **Tactile Fabric Swatch Viewer** with micro-zoom magnification loupe & technical specs (Indigo Selvedge, Jute-Cotton Twill, High-Count Voile, French Terry)
  - Regional manufacturing cluster breakdown (Narayanganj, Gazipur, Chittagong EPZ)

---

### 2. Precision & Quality Control (`/precision`)
- **Core Narrative**: Zero-defect optical inspection, in-house ISO 17025 accredited laboratory testing, and statistical AQL 1.5 audit compliance.
- **Palette**:
  - `Slate Technical Blue`: `#0D1721`
  - `Laser Cyan`: `#00E5C8`
  - `Clean Lab White`: `#F8FAFC`
  - `Metric Gold`: `#E5B94E`
  - `Grid Slate`: `rgba(226, 232, 240, 0.08)`
- **Typography Pairing**: *Space Grotesk* (Tech Display) + *JetBrains Mono* (Telemetry HUD) + *Inter* (Crisp Body)
- **Signature Hero Animation**: **Interactive Optical QC Inspection Scanner HUD**. Real-time cursor crosshair tracking, animated horizontal laser sweep beam across fabric matrix, live tolerance readout card (Fabric Weight, Color Fastness Grade, Tensile Burst, Shrinkage), and an interactive defect simulator (Zero-Flaw vs Slub Anomaly vs Delta-E Shade Variation).
- **Key Substantive Features**:
  - **7-Stage Quality Gate Framework** (from raw yarn Uster evenness to final carton sealing)
  - Interactive **AQL 1.5 / 2.5 Sampling Tool** (ISO 2859-1 / ANSI ASQ Z1.4 sampling calculator with lot size presets)
  - Accredited Laboratory Verification Vault (ISO 17025, OEKO-TEX Standard 100 Class I, WRAP Gold, BSCI Grade A, Sedex SMETA)

---

### 3. Momentum & Speed-to-Market (`/momentum`)
- **Core Narrative**: Rapid turnaround, 21-day fast-track garment execution, 12.4M monthly units, and multimodal seaport/airfreight corridors.
- **Palette**:
  - `Kinetic Amber`: `#FF6B2B`
  - `Signal Coral`: `#FF4625`
  - `Aerodynamic Midnight`: `#0B0F19`
  - `Warm Ivory`: `#FAF7F2`
  - `Logistics Slate`: `#2E3B52`
- **Typography Pairing**: *Archivo / Clash Display* (High-Velocity Sans) + *Plus Jakarta Sans* (Body) + *Space Mono* (Logistics Badges)
- **Signature Hero Animation**: **Kinetic Supply Chain Velocity Stream**. Flowing multi-layer infinite marquee of shipping vessels, cargo flights, and production metrics, with an interactive **Fast-Track Lead-Time Accelerator** (21-Day Capsule vs 28-Day Expedited vs 45-Day Mainline with live milestone breakdown).
- **Key Substantive Features**:
  - 48-Hour **3D CLO & Browzwear Virtual Prototyping** workflow
  - Interactive **Live Factory Capacity Allocator** (real-time slot availability across knit, woven, denim, and outerwear)
  - Global Multimodal Logistics Corridor schedule (Chittagong Port to Rotterdam, Hamburg, Los Angeles, and direct Dhaka DAC airfreight)

---

### 4. Sustainable & Ethical Sourcing (`/sustainable`)
- **Core Narrative**: Highlighting Bangladesh's global leadership in green manufacturing (housing over 200+ USGBC LEED Platinum garment mills), 100% GOTS organic cotton, and zero-discharge closed-loop dyeing.
- **Palette**:
  - `Sage Leaf`: `#2D5033`
  - `Forest Moss`: `#152819`
  - `Cotton Seed Cream`: `#FAF8F3`
  - `Sand Dune`: `#E5DDD0`
  - `Earth Ochre`: `#9B6840`
- **Typography Pairing**: *Fraunces* (Warm Organic Display Serif) + *Outfit / Epilogue* (Humanist Body) + *Space Mono* (ESG Ticker)
- **Signature Hero Animation**: **Generative Organic Cotton Particle Field**. Canvas 2D physics simulation with floating organic cotton seed fibers drifting with ambient wind currents, gently repelling from user cursor proximity, accompanied by a live ESG resource conservation ticker.
- **Key Substantive Features**:
  - USGBC LEED Platinum facility showcase (Greenfield Eco-Knit, Envoy Denim, Plummy Fashions)
  - Interactive **ESG Carbon & Water Savings Calculator** (LCA Scope-3 reduction modeler calculating liters of water saved and tonnes of CO2 avoided)
  - Zero Liquid Discharge (ZLD) closed-loop water treatment & 100% Living Wage social audit standards

---

## 🛠️ Architecture & Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Motion & Physics**: Custom HTML5 Canvas 2D Physics Engines, GSAP + ScrollTrigger, Framer Motion
- **Audio Feedback**: Bespoke Web Audio API tactile audio synthesizer (zero external mp3 lag or missing assets) with toggle in persistent nav
- **Interactive Modals**:
  - Persistent **Global Navigation Bar** with concept indicators
  - **Buyer RFQ & Swatch Docket Modal** with target delivery, volume estimations, and instant confirmation
  - **Creative Direction Comparison Matrix Modal** for quick side-by-side pitch evaluation

---

## 🚀 Running the Local Dev Server

1. Install dependencies (already installed):
   ```bash
   npm install
   ```

2. Start the local development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

4. Switch between the 4 concepts using the top navigation bar or the "Concept Matrix" comparison button.

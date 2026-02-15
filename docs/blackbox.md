
# ZiPPaY: The Blackbox Blueprint

This document contains the complete technical blueprint for the **ZiPPaY** micro-payment ecosystem. It serves as a master reference for rebuilding or extending the application.

## 1. Concept & Positioning
- **Name**: ZiPPaY (Micro-Payment Sandbox)
- **Primary Goal**: Extreme speed for small transactions (₹1 - ₹200).
- **Secondary Goal**: High-fidelity sensory experience simulating hardware interactions.
- **Tertiary Goal**: Financial education through Proactive AI Coaching.

## 2. Core Business Logic (The Golden Rules)
1. **Wallet Capacity**: Maximum balance allowed in the watch wallet is **₹500**.
2. **Transaction Cap**: Maximum single payment allowed is **₹200**.
3. **Offline Trust**: Up to **5 transactions** can be stored locally on the watch without a phone sync.
4. **Emergency Credit**: One "Emergency ZiP" is allowed when balance is insufficient, carrying a **4% convenience fee**.
5. **Auto-Reload**: When enabled, the system automatically refills the wallet to **₹200** if it drops below **₹50**.
6. **Geo-Fencing**: Transactions are strictly blocked if the device coordinates collide with a defined "High Risk" or "Sanctioned" zone.

## 3. Frontend Architecture
- **State Management**: A centralized `GlobalState` interface in `types.ts` defines the structure for wallets, connectivity, and pending requests.
- **Persistence**: `localStorage` stores the state as a JSON string under the key `flashpay_prototype_state`.
- **Component Strategy**:
    - `App.tsx`: Orchestrator of state transitions and cross-device logic.
    - `SmartphoneUPI.tsx`: Dashboard for management and deep analytics.
    - `Smartwatch.tsx`: Specialized circular UI component.
    - `MerchantApp.tsx`: Terminal interface for triggering requests.
    - `AIAssistant.tsx`: Proactive coach with pattern recognition.

## 4. Technical Specifications

### A. Sensory Engineering
- **Audio (`utils/audio.ts`)**: Uses `AudioContext` to generate oscillators. 
    - Success: Rising sine waves (C5 to C6).
    - Error: Falling sawtooth waves (220Hz to 110Hz).
- **Haptics (`utils/haptics.ts`)**: Uses `navigator.vibrate` for tactile patterns.
    - Success: `[60, 40, 60]`
    - Error: `[100, 50, 100, 50, 100]`
- **Voice Synthesis (Dual-Layer)**:
    - **Primary**: Google Gemini TTS (`gemini-2.5-flash-preview-tts`) for natural intonation.
    - **Fallback**: Browser native `speechSynthesis` API if API quotas are exhausted (429 errors) or network fails.

### B. Analytics Engine
- **Data Visualization**: Custom SVG paths rendered based on a prototype 7-day dataset.
- **Chart Types**: `Area`, `Line`, `Columns`, `Step-Line`, `Candles`, `Trend Analysis`.
- **Responsiveness**: Charts are hard-constrained to **280px width** to ensure zero-overflow on standard smartphone viewports.

### C. AI Integration (ZiP Coach V5)
- **Model**: `gemini-3-pro-preview`.
- **Proactive Logic**: Implemented via `useMemo` hooks that scan the user's `GlobalState` for low-balance scenarios or high-value transaction clusters (>₹150).
- **Coaching Archetype**: Financial Strategist. Focuses on micro-savings, anomaly detection (unusual activity), and credit avoidance.
- **Strategy Menu**: A dropdown interface providing 8 distinct coaching paths:
    1. Patterns Analysis
    2. Monthly Savings
    3. Anomaly Detection
    4. Top-up Strategy
    5. ₹1000 Goal Planning
    6. Spending Caps
    7. Debt/Emergency Frequency
    8. Bank Liquidity Management
- **Context Payload**: Injects current balances, full transaction history snippet, and connectivity status into every prompt.

### D. Geo-Compliance Engine (Simulation)
- **Mechanism**: Interactive drag-and-drop interface on the Smartphone dashboard.
- **Coordinate System**: Percentage-based positioning (0-100%) relative to the map container.
- **Collision Logic**: Euclidean distance calculation between the draggable user dot and fixed risk zone centers.
    - **Zone 1 (Sanctioned)**: Centered at {x:20, y:30}.
    - **Zone 2 (High Risk)**: Centered at {x:80, y:70}.
    - **Threshold**: 15% radius.
- **State Behavior**: Entering a zone triggers `geoStatus = 'risk'`, disabling the "Load" and "Pay" buttons globally. Default state is "Safe" (PONDICHERRY UNIVERSITY).

## 5. UI/UX Design System
- **Color Palette**: Slate-950 (BG), Indigo-600 (Primary), Green-500 (Credit), Red-500 (Debt/Alert).
- **Animations**: Framer-motion inspired CSS transitions, `watch-shake` for errors, `status-fade` for state changes.

## 6. Security (Simulated)
- **Bluetooth/Wi-Fi Logic**: funding and syncing require active connectivity flags.
- **Sync Locking**: Payments are blocked after 5 offline uses until a sync occurs.

## 7. Rebuild Instructions
1. Initialize a React 19 project with Tailwind CSS.
2. Implement the `types.ts` structure first.
3. Build the `Audio` and `Haptic` managers.
4. Develop `App.tsx` logic for processing payments and handling the "Emergency ZiP" logic.
5. Create the specialized UI components following the frame-within-frame design pattern.
6. Integrate `GoogleGenAI` with `gemini-3-pro-preview` and the enhanced coaching system prompt for `AIAssistant.tsx`.

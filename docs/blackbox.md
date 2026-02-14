# ZiPPaY: The Blackbox Blueprint

This document contains the complete technical blueprint for the **ZiPPaY** micro-payment ecosystem. It serves as a master reference for rebuilding or extending the application.

## 1. Concept & Positioning
- **Name**: ZiPPaY (Micro-Payment Sandbox)
- **Primary Goal**: Extreme speed for small transactions (₹1 - ₹200).
- **Secondary Goal**: High-fidelity sensory experience simulating hardware interactions.
- **Tertiary Goal**: Financial education through AI and visual analytics.

## 2. Core Business Logic (The Golden Rules)
1. **Wallet Capacity**: Maximum balance allowed in the watch wallet is **₹500**.
2. **Transaction Cap**: Maximum single payment allowed is **₹200**.
3. **Offline Trust**: Up to **5 transactions** can be stored locally on the watch without a phone sync.
4. **Emergency Credit**: One "Emergency ZiP" is allowed when balance is insufficient, carrying a **4% convenience fee**.
5. **Auto-Reload**: When enabled, the system automatically refills the wallet to **₹200** if it drops below **₹50**.

## 3. Frontend Architecture
- **State Management**: A centralized `GlobalState` interface in `types.ts` defines the structure for wallets, connectivity, and pending requests.
- **Persistence**: `localStorage` stores the state as a JSON string under the key `flashpay_prototype_state`.
- **Component Strategy**:
    - `App.tsx`: Orchestrator of state transitions, payment processing, and cross-device logic.
    - `SmartphoneUPI.tsx`: Dashboard for high-level management and deep analytics.
    - `Smartwatch.tsx`: Specialized circular UI component focused on input and approval.
    - `MerchantApp.tsx`: Terminal interface for triggering payment requests.

## 4. Technical Specifications

### A. Sensory Engineering
- **Audio (`utils/audio.ts`)**: Uses `AudioContext` to generate oscillators. 
    - Success: Rising sine waves (C5 to C6).
    - Error: Falling sawtooth waves (220Hz to 110Hz).
- **Haptics (`utils/haptics.ts`)**: Uses `navigator.vibrate` for tactile patterns.
    - Success: `[60, 40, 60]`
    - Error: `[100, 50, 100, 50, 100]`

### B. Analytics Engine
- **Data Visualization**: Custom SVG paths rendered based on a prototype 7-day dataset.
- **Chart Types**: `Area`, `Line`, `Columns`, `Step-Line`, `Candles`, `Trend Analysis`.
- **Interactivity**: Mouse coordinate mapping to chart indices for real-time tooltips.

### C. AI Integration
- **Model**: `gemini-3-flash-preview`.
- **System Prompt**: Personalized persona named "ZiP".
- **Context Injection**: Every user query is prefixed with current wallet balances and recent transaction snippets to provide grounded advice.

## 5. UI/UX Design System
- **Color Palette**: 
    - Slate-950 (Background)
    - Indigo-600 (Primary Action)
    - Green-500 (Success/Credit)
    - Red-500 (Error/Emergency)
- **Animations**:
    - Framer-motion inspired CSS transitions.
    - `animate-in`, `fade-in`, `slide-in`, `zoom-in`.
    - Custom `watch-shake` animations for error feedback.
- **Layout**: Mobile-first frame emulation for both Smartphone and Smartwatch components.

## 6. Security (Simulated)
- **Bluetooth/Wi-Fi Logic**: Most funding and syncing operations require active connectivity flags to be `true`.
- **Sync Locking**: Payments are blocked after 5 offline uses until a sync clears the `pendingSync` queue.

## 7. Rebuild Instructions
1. Initialize a React 19 project with Tailwind CSS.
2. Implement the `types.ts` structure first to define the data contract.
3. Build the `Audio` and `Haptic` managers to establish the sensory foundation.
4. Develop `App.tsx` logic for processing payments and handling the "Emergency ZiP" logic.
5. Create the specialized UI components (`SmartphoneUPI`, `Smartwatch`, `MerchantApp`) following the frame-within-frame design pattern.
6. Integrate `GoogleGenAI` for the `AIAssistant` component.

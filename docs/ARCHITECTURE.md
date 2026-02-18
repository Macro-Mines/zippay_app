
# ZiPPaY Architecture & Workflow

This document outlines the technical design and operational logic of the ZiPPaY micro-payment system.

## 1. System Overview
ZiPPaY operates as a distributed state system across three virtual "nodes":
1. **Smartphone (UPI App)**: The "Command Center" for funding, syncing, visual analytics, and **3D device management**.
2. **Smartwatch (ZiP Wallet)**: The "Transaction Edge" for executing payments locally.
3. **Merchant Terminal**: The "Point of Sale" for initiating requests.
4. **ZiP AI Coach**: A Google Gemini-powered intelligence service.

## 2. Key Technical Components

### A. State Management
- **Global State**: Unified in the project root to simulate a local network.
- **Transaction History**: Divided into `transactions` (synced) and `pendingSync` (watch-local).
- **Geo-Compliance State**: Tracks `geoStatus` ('safe' | 'risk' | 'scanning') and `currentLocation` to simulate regulatory fencing.
- **Sorting Hook**: Uses `useMemo` with `SortType` ('date-desc', 'date-asc', 'amt-desc', 'amt-asc') to provide instant list reordering.

### B. AI Analysis Engine (The Coach)
- **Proactive Scanning**: On initialization, the AI component analyzes the `GlobalState` for patterns (low balance, high frequency, debt).
- **Context Injection**: Every user query is enriched with real-time financial data to provide grounded, personalized coaching.
- **Anomaly Logic**: The prompt includes specific instructions to flag transactions exceeding typical micro-payment thresholds (e.g., >₹150).

### C. Validation Engine
- **Load Limit**: Prevents loading if `amount > 500` or `balance + amount > 500`.
- **Payment Limit**: Hard cap of ₹200 per transaction to ensure micro-payment safety.
- **Sync Limit**: Maximum 5 offline transactions allowed before a Bluetooth sync is mandatory.
- **Geo-Block**: Transactions are rejected if `geoStatus` is 'risk'.

### D. Visual Analytics & Interaction
- **SVG Engine**: Custom rendering for financial charts (Area, Line, Step, Columns, Candles, Trend).
- **Interactive Map**: Draggable UI element for simulating GPS movement and collision detection with "Risk Zones".
- **Analysis Stats**: Aggregated data to calculate weekly totals, max spend, and transaction frequency.

### E. Sensory System
- **Audio**: `SoundManager` uses `AudioContext` to synthesize success/error tones.
- **Haptics**: `HapticManager` provides discrete vibration patterns for tactile feedback.

### F. Immersive 3D Rendering
- **Engine**: Spline Runtime (`@splinetool/react-spline`).
- **Integration**: Embeds a high-fidelity 3D model of the smartwatch within the React DOM.
- **Performance**: Uses WebGL for real-time rendering without blocking the React render cycle.

## 3. Workflow Logics

### Emergency ZiP
If `balance < requestedAmount` AND `balance >= 0`:
1. Apply 4% convenience fee.
2. Allow transaction to proceed into negative balance.
3. AI Coach flags this state as a "High Priority" for the user to resolve.

### Auto-Reload
If `isAutoReloadEnabled` AND `balance < 50`:
1. Check phone connectivity (Wi-Fi + BT).
2. Verify Geo-Compliance status (Must be 'safe').
3. Transfer funds from `phoneBalance` to reach ₹200.
4. Auto-sync the transaction to the ledger.

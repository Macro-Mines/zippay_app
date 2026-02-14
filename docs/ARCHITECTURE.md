# ZiPPaY Architecture & Workflow

This document outlines the technical design and operational logic of the ZiPPaY micro-payment system.

## 1. System Overview
ZiPPaY operates as a distributed state system across three virtual "nodes":
1. **Smartphone (UPI App)**: The "Command Center" for funding, syncing, and visual analytics.
2. **Smartwatch (ZiP Wallet)**: The "Transaction Edge" for executing payments locally.
3. **Merchant Terminal**: The "Point of Sale" for initiating requests.
4. **ZiP AI Assistant**: A Google Gemini-powered service for analyzing spending patterns.

## 2. Data Model (`GlobalState`)
The state is unified in the project root to simulate a real-time local network:
- **User Wallet**: Balance, Bank Balance, Transactions, and `pendingSync` (watch-only).
- **Spending Data**: A 7-day prototype dataset (MON-SUN) used for rendering high-fidelity visualizations.
- **Profile**: Phone-linked identity state including VPA and bank ledger details.
- **Connectivity**: Boolean flags for Bluetooth and Wi-Fi status.

## 3. Key Workflows

### A. Funding the Wallet (Load)
- **Condition**: Requires Bluetooth (Phone -> Watch) AND Wi-Fi (Phone -> Bank).
- **Logic**: Deducts from `phoneBalance` and adds to `userWallet.balance`.

### B. The Offline Payment
- **Condition**: Watch must be `ACTIVE`.
- **Limit Check**: Watch allows 5 transactions (`offlineCount`) before requiring a sync.

### C. Visual Analytics Engine
- **Engine**: Custom SVG-based rendering for 6 chart types.
- **Interaction**: Real-time RSSI-style hover effects and coordinate tracking for data tooltips.
- **Analysis**: Statistical reduction of transaction history to calculate Max Spend, Avg Daily, and feature usage counts (Emergency/Auto-Load).

### D. User Verification & Identity
- **Linking**: Users enter a 10-digit mobile number to verify. 
- **Avatars**: Integrated with Dicebear API to provide unique visual identities based on the linked phone number.
- **VPA**: Automatically generates a `{phone}@zippay` address for the merchant discovery network.

### E. Emergency ZiP (Offline Credit)
- **Logic**: Triggered if `balance < requestedAmount` AND `balance >= 0`.
- **Fee**: 4% convenience fee applied to the total debit.

### F. AI Insights (ZiP Assistant)
- **Engine**: Gemini 3 Flash.
- **Context Injection**: The AI is fed the current balance, bank balance, recent 5 transactions, and offline count to provide personalized financial advice.

## 4. Sensory Design
- **Success**: High-pitched rising sine waves + double haptic pulse + SVG checkmark animation.
- **Error/Cancel**: Low-pitched falling sawtooth waves + triple haptic pulse.
- **Charts**: Smooth CSS transitions and SVG `stroke-dashoffset` animations.
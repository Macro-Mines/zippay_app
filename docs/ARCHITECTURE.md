# ZiPPaY Architecture & Workflow

This document outlines the technical design and operational logic of the ZiPPaY micro-payment system.

## 1. System Overview
ZiPPaY operates as a distributed state system across three virtual "nodes":
1. **Smartphone (UPI App)**: The "Command Center" for funding, syncing, and visual analytics.
2. **Smartwatch (ZiP Wallet)**: The "Transaction Edge" for executing payments locally.
3. **Merchant Terminal**: The "Point of Sale" for initiating requests.
4. **ZiP AI Assistant**: A Google Gemini-powered service for analyzing spending patterns.

## 2. Key Technical Components

### A. State Management
- **Global State**: Unified in the project root to simulate a local network.
- **Transaction History**: Divided into `transactions` (synced) and `pendingSync` (watch-local).
- **Sorting Hook**: Uses `useMemo` with `SortType` ('date-desc', 'date-asc', 'amt-desc', 'amt-asc') to provide instant list reordering.

### B. Validation Engine
- **Load Limit**: Prevents loading if `amount > 500` or `balance + amount > 500`.
- **Payment Limit**: Hard cap of ₹200 per transaction to ensure micro-payment safety.
- **Sync Limit**: Maximum 5 offline transactions allowed before a Bluetooth sync is mandatory.

### C. Visual Analytics
- **SVG Engine**: Custom rendering for financial charts (Area, Line, Step, Columns, Candles, Trend).
- **Analysis Stats**: Aggregated data using `useMemo` to calculate weekly totals, max spend, and transaction frequency.

### D. Sensory System
- **Audio**: `SoundManager` uses `AudioContext` to synthesize success/error tones.
- **Haptics**: `HapticManager` provides discrete vibration patterns for tactile feedback.

## 3. Workflow Logics

### Emergency ZiP
If `balance < requestedAmount` AND `balance >= 0`:
1. Apply 4% convenience fee.
2. Allow transaction to proceed into negative balance.
3. Block further payments until balance is restored.

### Auto-Reload
If `isAutoReloadEnabled` AND `balance < 50`:
1. Check phone connectivity (Wi-Fi + BT).
2. Transfer funds from `phoneBalance` to reach ₹200.
3. Auto-sync the transaction to the ledger.

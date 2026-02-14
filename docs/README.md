# ZiPPaY (Prototype)

**ZiPPaY** is a high-fidelity smartwatch-based micro-payment prototype designed to demonstrate a seamless, "offline-first" transaction experience. It bridges the gap between traditional UPI apps and wearable technology, focusing on speed, convenience, and reliability in low-connectivity environments.

## 🚀 Vision
To make small-value transactions (micro-payments) as fast as a "ZiP" by moving the payment trigger from the pocket (phone) to the wrist (watch), while maintaining the security and control of a primary banking app.

## ✨ Core Features
- **Smartwatch Interface**: A realistic circular Wear OS-style watch face for approving payments and checking local balances.
- **Spending Analytics (New)**: Interactive "Spending Insights" dashboard with 6 different chart types (Area, Candles, Trend, etc.) and a deep-dive statistical analysis overlay featuring a high-contrast Pie Chart.
- **Identity & Bank Linking (New)**: User profile section for linking phone numbers to bank accounts, featuring dynamic avatar generation and VPA management.
- **Micro-Payment Limit**: Specialized for small transactions (up to ₹200) to minimize risk.
- **Offline Capability**: Allows up to 5 transactions on the watch without an active internet connection.
- **Auto-Reload (Rule-Based)**: Automatically tops up the watch wallet from the bank when the balance drops below ₹50.
- **Emergency ZiP**: A unique credit feature allowing one transaction even at zero balance (includes a 4% convenience fee).
- **Merchant Terminal**: A simplified POS interface for requesting payments and settling funds to a bank account.
- **Sensory Feedback**: Custom-engineered audio cues and haptic patterns for transaction states.

## 🛠 Tech Stack
- **React 19**: Modern component-based architecture.
- **Tailwind CSS**: For high-performance, responsive UI styling.
- **SVG Visualizations**: Custom path animations and interaction logic for financial charts.
- **Web Audio API**: Real-time sound synthesis for transaction feedback.
- **Vibration API**: Tactile haptic feedback simulation.
- **Local Storage**: Persistence of wallet balances and transaction history across sessions.

## 📱 Project Structure
- `/components`: UI for Smartphone, Smartwatch, and Merchant modes.
- `/utils`: Managers for Audio and Haptics.
- `App.tsx`: Central state machine and business logic coordinator.
- `types.ts`: Shared data structures and interfaces.
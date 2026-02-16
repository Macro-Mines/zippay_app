
# 🏆 Bancquest 2026 Project Submission

## 1. Project Title
**ZiPPaY**

---

## 2. Tagline
**"The Offline-First Eco-Smartwatch Wallet: Tap, Pay, & Heal the Planet."**

---

## 3. Problem Statement

### **The Connectivity & Consciousness Gap in Fintech**

While India leads the world in digital payments via UPI, the ecosystem faces three critical challenges:

1.  **The "Server Down" & Connectivity Crisis**: UPI is heavily dependent on real-time internet connectivity and bank server uptime. In rural areas, crowded events (like university fests), or disaster zones, transactions fail, leaving users stranded.
2.  **The Hardware Friction**: Pulling out a smartphone, unlocking it, scanning a QR code, and entering a PIN is a high-friction process for high-frequency micro-payments (e.g., buying tea, bus tickets).
3.  **The Missing ESG Link**: Despite the boom in Fintech, "Green Banking" remains a corporate buzzword. There is no direct mechanism for the average consumer to contribute to climate action through their daily micro-transactions.

**Relevance:** As we move towards CBDCs (Central Bank Digital Currencies) and IoT banking, solving the "offline" problem while integrating "sustainability" is the next frontier in Banking Technology.

---

## 4. Proposed Solution

**ZiPPaY** is a high-fidelity prototype of a **smartwatch-based micro-payment ecosystem** that introduces **"Green Wallet"** tokenomics. It decouples the transaction layer from the internet layer, allowing seamless payments anywhere, anytime.

### **Key Features:**
*   **⌚️ Offline-First Architecture**: Uses a cryptographic ledger to store up to 5 transactions locally on the watch. These sync to the bank/phone when connectivity is restored.
*   **🌿 The Green Wallet (Eco-System)**: A novel revenue model where "Emergency ZiP" (Overdraft) fees are not taken as profit but are diverted to a dedicated "Green Wallet" for planting trees.
*   **⚡️ Emergency ZiP**: A "Buy Now, Pay Later" (BNPL) feature for micro-amounts (up to ₹200) when the user has insufficient funds, ensuring they are never stranded.
*   **🧠 Gemini AI Financial Coach**: A multimodal AI that analyzes spending patterns to prevent debt traps and suggests savings goals.
*   **📍 Geo-Compliance Fencing**: Uses location data to ensure transactions only happen in sanctioned zones (e.g., preventing usage in high-risk sectors), aiding regulatory compliance.

---

## 5. Working Concept / Methodology

The system operates on a **Distributed State Machine** model simulating three nodes: The Smartphone (Bank), The Smartwatch (Wallet), and The Merchant (POS).

### **Workflow:**

1.  **Loading (Online)**: User loads funds (e.g., ₹500) from the Smartphone App to the Watch via Bluetooth.
2.  **Spending (Offline/Online)**:
    *   User taps the watch at a Merchant terminal.
    *   **Logic Check**: `If Balance > Amount` → Approve.
    *   **Emergency Logic**: `If Balance < Amount` → Approve via Overdraft (+4% Fee).
    *   **ESG Logic**: The 4% fee is auto-routed to the **Green Wallet**.
3.  **Syncing**: When the watch reconnects to the phone, the local ledger is merged with the cloud ledger, and the Green Wallet is updated with new trees if milestones are met.

### **Technology Stack:**
*   **Frontend**: React 19, TypeScript, Vite.
*   **AI Engine**: Google Gemini Multimodal Live API (for coaching and TTS).
*   **3D Visualization**: Spline (for immersive device simulation).
*   **Sensory**: Web Audio API (Oscillators) & Haptics API (Vibration patterns).

---

## 6. Feasibility & Novelty

### **Technical Feasibility**
The project is built on **React 19**, ensuring high performance. It uses standard web APIs (`localStorage` for offline persistence, `navigator.vibrate` for haptics) which are readily available in all modern browsers and WebView containers (Android/WearOS). The resource cost is minimal as it relies on edge computing (client-side logic) rather than heavy server loads.

### **Novelty & Uniqueness**
| Feature | Traditional UPI | **ZiPPaY** |
| :--- | :--- | :--- |
| **Connectivity** | 100% Online Required | **Works Offline (Sync Later)** |
| **Device** | Smartphone Only | **Wrist-First (Wearable)** |
| **Overdraft** | Complex/Credit Card | **Instant Micro-Credit (Emergency ZiP)** |
| **Impact** | None | **Green Wallet (Auto-Reforestation)** |

**Comparison**: Unlike "UPI Lite" which is wallet-based but phone-dependent, ZiPPaY simulates a true wearable extension that works even if the phone is dead.

---

## 7. Applications & Impact

### **Real-World Applications**
1.  **University Campuses (e.g., Pondicherry University)**: Students can pay for canteen meals/shuttles without carrying phones.
2.  **Rural Banking**: Villages with spotty internet can transact digitally and sync when a signal is available.
3.  **Disaster Relief**: Distributing funds to victims in zones where cell towers are down.

### **Social & Environmental Impact**
*   **Financial Inclusion**: Simplifies digital payments for the non-tech-savvy via simple gestures and audio cues.
*   **Environmental Impact**: The **Green Wallet** gamifies climate action. If 1 million users use "Emergency ZiP" once a month with a ₹5 fee, that funds **500,000 trees/year**.
*   **Financial Literacy**: The AI Coach prevents the "BNPL Debt Trap" by proactively educating users.

---

## 8. References

1.  *Reserve Bank of India (RBI)*. "Framework for Facilitating Small Value Digital Payments in Offline Mode." (2022).
2.  *Google AI for Developers*. "Gemini API Documentation & Multimodal Capabilities." ai.google.dev.
3.  *United Nations Environment Programme (UNEP)*. "Fintech and Sustainable Development: Assessing the Implications." (2023).
4.  *React Documentation*. "React 19 Beta: Actions and Server Components." react.dev.
5.  *National Payments Corporation of India (NPCI)*. "UPI Lite: On-Device Wallet Specifications." npci.org.in.

---

*Submitted for Bancquest 2026, Dept of Banking Technology, Pondicherry University.*

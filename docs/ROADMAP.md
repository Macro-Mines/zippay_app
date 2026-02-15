
# ZiPPaY Roadmap

Planned enhancements and future milestones for the ZiPPaY ecosystem.

## ✅ Phase 1: Core Experience (Completed)
- [x] **Smartwatch Micro-payments**: Basic circular UI and payment flow.
- [x] **Offline Mode**: Local storage based pending sync system.
- [x] **Advanced Sorting**: History sorting by date/amount on all devices.
- [x] **Limit Enforcement**: Visual feedback for wallet capacity (₹500).
- [x] **Spending Analytics**: 6-type interactive chart engine.
- [x] **Advanced AI Coach**: Gemini-powered proactive coaching and anomaly detection.

## 🚀 Phase 2: Security & Control (Upcoming)
- [ ] **Daily Spending Limits**: User-defined cap on total watch transactions per day.
- [ ] **Biometric Lock**: Require phone fingerprint to enable "Active Mode".
- [ ] **Transaction Receipts**: PDF/Image export for significant payments.

## 📊 Phase 3: Ecosystem Expansion
- [ ] **Merchant Subscriptions**: Low-value recurring payments (News, Coffee).
- [ ] **Group Splits**: Send split requests from watch to nearby ZiPPaY users.
- [ ] **Wear OS / WatchOS Ports**: Migrating from web simulation to native binaries.

---

## 🔮 Innovation Themes & Feature Backlog

Detailed breakdown of suggested AI and Sensory features for future implementation.

### Theme 1: Regulatory Compliance & Risk Management
*Leveraging AI to solve compliance challenges in real-time.*

1.  **"The Smurf Watcher" (Anti-Structuring AI)**: Sliding-window algorithm analyzing transaction velocity to flag "structuring" (breaking large illegal txns into small ones).
2.  **"Merchant MCC" Risk Scoring**: AI evaluates Merchant Category Codes against user risk profiles (e.g., blocking "Gambling" for student profiles).
3.  **Dynamic "Trust Thermometer"**: Behavior-based limits. High compliance = Green (₹2000 limit); Risk detected = Red (Throttle to 1 offline txn).
4.  **"Reg-Bot" Policy Engine**: Ingests plain-text regulatory news via Gemini to auto-update validation logic/limits without code deploys.
5.  **Geo-Compliance Fencing**: GPS context blocks payments in "High Risk Zones" or cross-border sanction regions.
6.  **"Shadow Audit" Ledger**: Enhanced sync that retroactively analyzes offline transactions for intentional rule-bypassing patterns.
7.  **"Know Your Vendor" (KYV) Real-Time Scan**: Sanctions database ping during QR/BLE scan to block blacklisted merchant IDs.

### Theme 2: Behavioural Biometrics Fraud
*Verifying "who" is behind the device based on interaction patterns.*

1.  **"The Bio-Swipe" Signature**: Authenticates users based on the velocity, acceleration, and angle of their "Swipe Up" gesture.
2.  **"Rhythm-ID" Keypad**: Analyzes keystroke dynamics (flight time/dwell time) to distinguish owners from fraudsters guessing PINs.
3.  **"Wrist-Twist" Authentication**: Uses gyroscope data to model the user's unique arm movement/muscle memory when paying.
4.  **"Tremor & Duress" Detection**: Detects abnormal hand tremors or erratic navigation to identify coercion/mugging scenarios.
5.  **"Bot-Buster" Touch Heatmaps**: Identifies non-human interaction patterns (perfect coordinates, zero latency) to block automated attacks.
6.  **"Gait-Auth" (Passive Verification)**: Background monitoring of walking patterns to increase trust scores for frictionless payments.

### Theme 3: Emotion-Aware Banking
*An empathetic UI that utilizes sentiment analysis to humanize interactions.*

1.  **The "Sentiment Skin"**: Dynamic UI color/motion shifts based on financial anxiety (e.g., "Calm Mode" for negative balances).
2.  **"Rage-Tap" Rescue**: Detects aggressive tapping/shaking and triggers an empathetic AI intervention instead of generic errors.
3.  **Tonal-Shift AI Assistant**: Gemini persona shifts tone (Apologetic, Explanatory, Celebratory) based on user sentiment.
4.  **"Heartbeat" Haptics**: Uses soft, rhythmic vibrations for reassurance during delays, rather than jarring buzzes.
5.  **"Financial De-Escalation" Mode**: Introduces "Positive Friction" (pauses/checks) during detected panic spending bursts.
6.  **Voice Stress Analysis**: Detects vocal stress markers in voice commands to flag potential duress.
7.  **The "Bad News" Buffer**: AI schedules negative notifications for times when the user is most relaxed/active.

### Theme 4: Green Banking & ESG Wallet (Active)
*Transforming the wallet into a conscious, sustainability-driven tool.*

1.  **Carbon Ledger & Icons**: Visual indicators (Leaves/Clouds) tracking the estimated carbon impact of transactions.
2.  **AI Eco-Estimation**: Real-time analysis of merchant category/peer to calculate CO2 footprint.
3.  **Green Mode UI**: "Emerald" theme toggle that shifts the dashboard focus to environmental impact.
4.  **The "Bloom" Animation**: Rewarding nature-inspired animations/haptics for sustainable purchasing choices.
5.  **Merchant Green Certification**: Toggle for merchants to signal sustainability, unlocking rewards.
6.  **"Offset" Gamification**: Leaderboards for carbon offset and "trees planted" based on spending behavior.

### Theme 5: Inclusive & Voice-First Banking
*Ensuring financial access for the visually impaired and elderly.*

1.  **"Hey ZiP" Wake Word**: Always-on listening for hands-free wallet activation.
2.  **Semantic Action Mapping**: executing complex intents like "Send 50 to the coffee shop" by matching context.
3.  **Audio-Spatial UI**: Using 3D audio cues to indicate menu position or transaction status for blind navigation.
4.  **Voice Biometric ID**: "My Voice is my Password" authentication layer for high-value transactions.
5.  **High-Contrast "Elder Mode"**: Simplified UI with massive typography and slowed animations.

### Theme 6: Digital Banking for Last-Mile
*Design an inclusive banking solution that works seamlessly for users with low literacy or limited internet connectivity.*

1.  **"Pictogram" Mode (Text-Free UI)**: Replaces financial text with localized, universal iconography (e.g., crops for agri-loans) for illiterate users.
2.  **"Mesh-Net" Transaction Relay**: Uses peer-to-peer Bluetooth to hop encrypted payment packets through nearby devices until a signal is found.
3.  **"Audio-Ledger" & Vernacular Voice**: Replaces visual history tables with an interactive voice readout in local dialects.
4.  **"Agent-Assist" Dual Auth**: Allows certified field agents to setup transactions that users approve via simple biometrics/voice, removing technical friction.
5.  **Low-Bandwidth "Lite" Protocol**: Extreme data-saver mode stripping UI assets to transmit transactions over 2G/EDGE networks.
6.  **"Offline Trust" Token Exchange**: Cryptographically signed offline tokens acting as digital cash, redeemable upon reconnection.

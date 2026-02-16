
# ❓ Bancquest 2026: Judges' Q&A Defense Guide

Use this guide to confidently answer technical, operational, and business questions regarding ZiPPaY.

---

## 🏗️ Core Mechanics (The "How" Questions)

### Q1. How does offline payment actually work?
**Answer:**
"It works on the principle of a **Stored Value Component**, similar to how a Metro card works, but smarter.
1.  **Tokenization:** When I load money (online), the bank issues a cryptographically signed 'Balance Token' to the watch.
2.  **Local Ledger:** The watch maintains a local, encrypted ledger of transactions.
3.  **Handshake:** When I pay, the watch sends a signed data packet to the merchant terminal via Bluetooth/NFC.
4.  **Verification:** The merchant terminal verifies the signature (using a public key) to ensure the money is real, updates its own local tally, and accepts the payment. All without hitting a central server."

### Q2. Tell me the complete process from loading to merchant settlement.
**Answer:**
1.  **Load:** User transfers ₹500 from Bank Account → Phone App → Watch (via Bluetooth). The Watch balance updates to ₹500.
2.  **Pay (Offline):** User buys tea (₹20). Watch creates a transaction record `{-20}`. Watch Balance becomes ₹480. Merchant Terminal records `{+20}`.
3.  **Sync (User):** User connects Watch to Phone. Phone uploads the debit record to the Bank Server.
4.  **Sync (Merchant):** Merchant connects their terminal to the internet. They upload their `{+20}` credit record.
5.  **Settlement:** The Bank reconciles the two records. If they match, the actual money is moved from User's Bank Account to Merchant's Bank Account.

---

## 🛡️ Security & Trust

### Q3. How do you validate authenticity without the internet? (Any chances of fraud?)
**Answer:**
"Offline payments do carry a calculated risk, which is why the RBI limits them to **small values** (₹200 per transaction, ₹2000 total limit).
We mitigate fraud via:
1.  **Digital Signatures:** Every offline packet is signed by the Bank's private key during the 'Load' phase. The watch cannot 'invent' money.
2.  **Counter-Signing:** The watch increments a counter (1, 2, 3...). If the server sees a duplicate counter or a gap, it flags fraud.
3.  **Shadow Sync:** If a user tries to tamper with the watch (e.g., reset it to restore balance), the next time they connect online, the server logs mismatching hash values and freezes the account."

### Q4. What happens if I lose the watch?
**Answer:**
"Since the wallet is limited to ₹500 (or ₹2000 per RBI norms), the loss is capped, similar to losing a physical wallet. However, we can implement a **'Kill Switch'** on the phone app. The next time that specific watch serial number tries to sync or interact with an online terminal, it gets bricked/blocked."

---

## 💰 Feasibility & Finance

### Q5. How to build this watch in reality? (Hardware implementation)
**Answer:**
"We don't need to invent new hardware. This software can run on:
1.  **Existing WearOS Devices:** Galaxy Watch, Pixel Watch (using NFC capabilities).
2.  **Budget Hardware:** We can build a low-cost dedicated band using an **ESP32 Microcontroller** with an **NFC/RFID module (PN532)** and a small OLED screen. The cost of materials would be under ₹1,500."

### Q6. What is the expense to build this ZiPPaY ecosystem?
**Answer:**
"For the prototype phase:
1.  **Software:** Free (Open source tech stack: React, Node.js).
2.  **Cloud:** Google Firebase/AWS Free Tier for initial backend.
3.  **Hardware Prototype:** Approx ₹3,000 for development boards (ESP32, NFC tags, casings).
4.  **Gemini AI:** Utilizing the free tier for developers, scaling to pay-as-you-go."

### Q7. What will you do if you win the prize money of ₹12,000?
**Answer:**
"This seed money is crucial for moving from 'Software Simulation' to 'Hardware Reality'.
1.  **₹5,000**: Purchasing programmable NFC modules and ESP32 microcontrollers to build the physical merchant terminal and watch band.
2.  **₹3,000**: Cloud hosting credits to deploy a live backend for the university demo.
3.  **₹4,000**: 3D Printing the custom watch casing and merchant stand to give it a finished, market-ready look for the next pitch."

---

## 🌿 The "Green" Differentiator

### Q8. Why link trees to overdraft fees? Why not just profit?
**Answer:**
"This is our **Psychological Moat**.
1.  **User Behavior:** People hate paying 'fines' or 'late fees'. By telling them 'Your fee planted a tree', we turn a negative emotion (paying extra) into a positive one (helping the planet).
2.  **Marketing:** It differentiates us from Paytm or PhonePe. We are the 'Ethical Wallet'.
3.  **CSR:** Banks spend millions on Corporate Social Responsibility. This feature automates that spend."

---

## 🧠 Curveball Questions (Be Prepared!)

### Q9. Why hasn't GPay or Paytm done this yet?
**Answer:**
"They have launched 'UPI Lite', which is a step in this direction, but it is still phone-dependent. ZiPPaY focuses on the **Wearable** aspect—removing the phone entirely from the equation—which is the necessary next step for true friction-less payments."

### Q10. Can this work on a feature phone (Keypad phone)?
**Answer:**
"The *merchant* side requires a smartphone/tablet or a dedicated POS device. However, the user side (the watch/band) is just an NFC token. We could technically embed this chip into a keychain or a card for feature phone users, making it fully inclusive."

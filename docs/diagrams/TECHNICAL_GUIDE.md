# ZiPPaY Workflow Diagrams - Technical Edition
## 4 Phases with Encryption & e-Rupee Details

---

## 🎯 Key Technical Terms (Explained Simply)

### **Cryptography & Security**

| Term | What It Does | Example |
|------|---|---|
| **TLS 1.3** | Encrypts data over internet | Phone ↔ RBI secure channel |
| **BLE** (Bluetooth Low Energy) | Encrypts data over short distance | Phone ↔ Watch connection |
| **NFC** | Wireless payment at very close range | Watch ↔ Terminal (4cm tap) |
| **ECDSA** | Digital signature (proves "it's really you") | Watch signs every payment |
| **RSA-2048** | Super strong encryption for keys | Bank signs settlement batch |
| **AES-256** | Powerful encryption for storage | Watch stores e-Rupee safely |
| **SHA-256** | Fingerprint of data (detects tampering) | Verify ledger hasn't changed |
| **Nonce** | Random number (prevents replay attacks) | Used once, can't be reused |

---

## 📊 Complete 4-Phase Workflow

### **PHASE 1: LOAD e-RUPEE** (2-3 seconds)
**What Happens:**
1. You open phone app, enter ₹500
2. Fingerprint confirms "it's you"
3. Phone sends encrypted request to RBI (TLS 1.3)
4. RBI checks your bank account ✓
5. RBI creates e-Rupee token (official digital money)
6. RBI signs it with own private key (ECDSA)
7. RBI encrypts it with watch public key (AES-256)
8. Phone sends via BLE to watch (encrypted)
9. Watch decrypts using its private key
10. Watch verifies RBI signature ✓
11. Watch stores in hardware vault (Secure Element)
12. Balance updates: ₹500 loaded ✓

**Key Security:** 
- ✓ Biometric + 2FA required
- ✓ Multiple encryption layers (TLS + AES + RSA)
- ✓ RBI signature guarantees authenticity
- ✓ Private key never leaves watch

---

### **PHASE 2: OFFLINE PAYMENT** (5 seconds, NO INTERNET)
**What Happens:**
1. Merchant enters ₹50 on terminal
2. Terminal generates unique TransactionID (UUID)
3. Terminal activates NFC reader (13.56 MHz frequency)
4. You tap watch on terminal (proximit 4-10cm)
5. Terminal sends: {MerchantID, Amount, Nonce, Timestamp}
6. Watch receives via NFC
7. Watch displays: "Tea Shop ₹50?" to confirm
8. You tap watch to approve
9. Watch triggers Secure Element (tamper-proof vault)
10. Secure Element creates payment certificate (contains all details)
11. Secure Element signs it with ECDSA-P256 private key
12. Signature = Math proof this is real
13. Certificate + signature encrypted (AES-256)
14. Sent back to terminal via NFC
15. Terminal decrypts & verifies signature using public key
16. If signature matches: "✓ AUTHORIZED"
17. If signature doesn't match: "❌ REJECTED" (fraud detected)
18. Watch updates balance: ₹500 → ₹450
19. Transaction recorded as PENDING_SYNC

**Why No Internet Needed:**
- Terminal has cached copy of your watch's public key (updated daily by RBI)
- Signature verification is pure math (works offline)
- Terminal stores transaction locally until sync

**Why It's Secure:**
- Only real watch can create signature (private key is inside, can't be stolen)
- Amount locked in signature (can't be changed)
- Nonce is random & one-time (can't replay old payment)
- Timestamp validated (no future-dated payments)

---

### **PHASE 3: SETTLEMENT** (Automatic, 2:00 AM - 2:25 AM)
**What Happens (Overnight Batch):**

**02:00 AM:**
1. Terminal wakes up automatically
2. Collects all day's transactions (≈150 payments, ₹15,280)
3. Creates batch file with merchant digital signature (RSA-2048)

**02:15 AM:**
4. Terminal sends to Merchant Bank (HTTPS TLS 1.3)
5. Bank validates signature ✓
6. Bank signs entire batch with own key (RSA-2048)
7. Bank submits to NPCI

**02:18 AM:**
8. NPCI receives batch
9. NPCI runs deduplication (checks for duplicate payments)
10. NPCI verifies each transaction's ECDSA signature
11. All 150 signatures valid ✓
12. NPCI submits to RBI

**02:20 AM:**
13. RBI receives settlement request
14. RBI verifies every single transaction:
    - ✓ Is signature real? (ECDSA verify)
    - ✓ Did user have enough balance? (timestamped check)
    - ✓ Is this first time we're seeing this? (no double-spending)
    - ✓ Timestamps in order? (no time-travel attacks)
    
15. All checks pass ✓
16. RBI creates blockchain entry (immutable record)
17. RBI starts atomic transaction (all-or-nothing)
18. RBI debits 150 users' accounts (total ₹15,280)
19. RBI credits merchant account (₹15,280)
20. RBI marks ledger as SETTLED

**02:22 AM:**
21. RBI sends confirmation to NPCI

**02:23 AM:**
22. NPCI sends debit instructions to Your Bank
23. Your Bank immediately debits accounts (T+0)
24. NPCI sends credit to Merchant Bank
25. Merchant Bank immediately credits merchant (T+0)

**02:25 AM:**
- Settlement complete ✓
- Money in merchant account ✓
- Money out of user accounts ✓
- Permanent RBI record created ✓

**Why This Is Secure:**
- Every signature verified (prevents fake payments)
- Deduplication check (prevents counting same payment twice)
- Atomic transaction (either ALL settle or NONE settle - no partial)
- Immutable ledger (RBI record can never be changed)
- Timestamp validation (prevents time-based attacks)

---

### **PHASE 4: SYNC & VERIFICATION** (When WiFi available)
**What Happens:**
1. You arrive home (WiFi available)
2. Phone auto-starts BLE scan
3. Watch discovers phone ✓
4. Both exchange device certificates (proof of identity)
5. ECDH key agreement (create shared encryption key)
6. BLE session becomes encrypted (AES-256-CCM)
7. Watch prepares LocalLedger for transfer
8. Watch creates Merkle hash (fingerprint of all pending payments)
9. Watch encrypts entire ledger (AES-256-GCM)
10. Watch computes HMAC (authentication tag)
11. Sends encrypted payload to phone via BLE
12. Phone receives & validates HMAC ✓
13. Phone decrypts ledger
14. Phone validates each transaction:
    - ✓ Signature format valid
    - ✓ Timestamp valid
    - ✓ Amount ≤ ₹200
    - ✓ Merchant ID valid
15. Phone merges into main ledger (database)
16. Phone goes online (WiFi)
17. Phone sends to RBI: "Please verify these"
18. RBI checks settlement records:
    - TX_001: Found & marked SETTLED ✓
    - TX_002: Found & marked SETTLED ✓
    - TX_003: Found & marked SETTLED ✓
19. RBI verifies balance:
    - Expected: ₹500 - ₹50 - ₹30 - ₹40 = ₹380
    - Actual: ₹380
    - ✓ Match!
20. RBI sends verification confirmation
21. Phone marks all transactions: VERIFIED_BY_RBI
22. Watch clears LocalLedger
23. Phone displays: "✓ All 3 transactions verified"

**Why This Phase Exists:**
- Confirms all offline payments actually settled
- Detects any fraud (double-spending, forged payments)
- Reconciles watch ↔ phone ↔ RBI ledgers
- Clears pending queue for next cycle

---

## 🔐 Security Features Summary

### **Multi-Layer Defense**

| Attack | Defense | How It Works |
|--------|---------|---|
| **Fraud Payment** | Signature requires private key | Only your watch can sign |
| **Payment Tampering** | Amount locked in signature | Changing amount breaks signature math |
| **Replay Attack** | Nonce + Timestamp | Old payments can't be used twice |
| **Infinite Payments** | Offline limit = 5 max | Forces periodic sync |
| **Double-Spending** | NPCI deduplication + RBI check | Can't spend same ₹50 twice |
| **Stolen Device** | Biometric on confirm | Even if watch stolen, can't pay |
| **Fake Terminal** | Terminal credentials verified | NPCI gives public keys only to real terminals |
| **Data Tampering** | SHA-256 checksum | Any change = different checksum |

---

## 💡 Simple Explanation for Non-Techs

**"ZiPPaY is like a physical cash wallet, but on your smartwatch:**

1. **Load** (weekly): You load ₹500 using fingerprint + bank confirmation
2. **Pay** (offline): You tap watch on merchant terminal - THAT'S IT. No internet needed.
3. **Secure**: Watch proves it's real using math (digital signature)
4. **Settlement**: At night, government system (RBI) carefully checks everything is safe, prevents fraud, and settles money
5. **Verify**: Next day when WiFi available, phone confirms all payments actually settled"

---

## 📋 Key Numbers

| Metric | Value |
|--------|-------|
| **Load time** | 2-3 seconds |
| **Payment time** | 5 seconds (NO internet) |
| **Settlement time** | 25 minutes (2:00 AM - 2:25 AM) |
| **Offline capacity** | Up to 5 payments before sync required |
| **Transaction limit** | ₹200 per transaction |
| **Daily limit** | ₹2,000 per user |
| **NFC range** | 4-10 cm (prevents remote fraud) |
| **Encryption** | AES-256, ECDSA-P256, RSA-2048 |
| **Signature verification** | Works completely offline |
| **Fraud detection** | NPCI deduplication + RBI balance check |

---

## 🎯 Export & Use

**For Presentations:**
```powershell
cd d:\Programming\PROJECTS\Finance\zippay_app-main\docs\diagrams

# Export to PNG (standard resolution)
mmdc -i 01-system-architecture-simple.mmd -o 01-system-architecture-simple.png
mmdc -i 02-phase1-load-simple.mmd -o 02-phase1-load-simple.png
mmdc -i 03-phase2-payment-simple.mmd -o 03-phase2-payment-simple.png
mmdc -i 04-phase3-settlement-simple.mmd -o 04-phase3-settlement-simple.png
mmdc -i 05-phase4-sync-simple.mmd -o 05-phase4-sync-simple.png

# Or high-resolution (2x quality)
mmdc -i 01-system-architecture-simple.mmd -o 01-system-architecture-simple-hires.png -s 2
```

---

## 📌 What's Different From Regular Payments

| Feature | Traditional UPI | ZiPPaY |
|---------|---|---|
| **Needs Internet** | At transaction time | Only at load time |
| **Device** | Smartphone (₹20K+) | Smartwatch (₹8K) |
| **Works Offline** | NO | YES (5 transactions) |
| **Signature Verification** | Server-side | Terminal-side (offline) |
| **Crypto Type** | Software-based | Hardware-backed (Secure Element) |
| **Settlement** | T+2 (deferred) | T+0 (same day) |

---

**Document Version**: 2.0 (Technical Edition)  
**Date**: Feb 21, 2026  
**Status**: Ready for judges & investor presentations

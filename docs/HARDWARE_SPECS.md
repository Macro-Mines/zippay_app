# ZiPPaY Hardware & Integration Specifications
## Device Compatibility Matrix & Technical Requirements

---

## 📱 Smartwatch Specifications

### **Recommended Specifications**

```yaml
PROCESSOR & MEMORY:
  CPU: ARM Cortex-M4 or A7 (Dual-core)
  Clock Speed: 1.0-1.5 GHz minimum
  RAM: 512 MB - 1 GB (1 GB recommended)
  Internal Storage: 8 GB eMMC minimum
  Cache: L1: 32KB per core, L2: 256KB

POWER:
  Battery: 400-600 mAh Li-Po battery
  Battery Life: 3-5 days normal use
                10+ days payments-only mode
                1+ year standby (with periodic sync)
  Charging: USB-C (15W, 30-45 minutes to full)
  Charging Cycles: 1000+ cycles supported

DISPLAY:
  Type: AMOLED (preferred) or IPS LCD
  Size: 1.4-1.6 inches diagonal
  Resolution: 454x454 pixels minimum (for circular displays)
  Aspect Ratio: 1:1 (square) or Round
  Brightness: 800+ nits (indoor readable)
             1000+ nits (outdoor readable)
  Refresh Rate: 60Hz normal, 1Hz AOD (always-on display)
  Pixel Density: 330+ PPI (sharp text)

CONNECTIVITY:
  Bluetooth: BLE 5.0+ (mandatory)
    - Range: 100+ meters line-of-sight
    - Power: 10-15 mW active, <1 µW idle
    - Profiles: GATT (Generic Attribute Profile)
  
  NFC: ISO/IEC 14443 Type A/B (mandatory)
    - Range: 4-10 cm
    - Data Rate: 106, 212, 424 kbps
    - Power: 50-70 mW
    - Standards: ISO 7816-4, ISO 14443-4
  
  Wi-Fi: Optional (for direct sync)
    - 802.11 b/g/n (2.4 GHz)
    - Not required for core functionality

SECURITY:
  Secure Element: NXP P71 or Infineon SLE78 (EAL4+ certified)
    - Tamper detection: Physical & voltage sensing
    - Extraction protection: Mesh wires + glue trapping
    - Certification: Common Criteria EAL4+, FIDO2
  
  TEE (Trusted Execution Environment): ARM TrustZone required
    - Processor cores with TrustZone: 1 core minimum
    - Secure Boot: Verified chain from ROM
    - Secure Storage: 4-8 KB for keys
  
  Cryptography Support:
    - RSA-2048 (asymmetric)
    - ECDSA P-256 (digital signatures)
    - AES-256-GCM (symmetric encryption)
    - SHA-256 (hashing)

BIOMETRIC (OPTIONAL but RECOMMENDED):
  Fingerprint Sensor: Capacitive (low power)
    - False Rejection Rate (FRR): <2%
    - False Acceptance Rate (FAR): <0.01%
    - Power: 50-80 mW
  
  Heart Rate Monitor: PPG (fotoplethysmography)
    - Detection range: 40-180 BPM
    - Purpose: Liveness detection in fraud scenarios

SENSORS:
  Accelerometer: 3-axis, ±16g range (gesture detection)
  Gyroscope: 3-axis (motion tracking)
  Barometer: (altitude detection for geo-compliance)

INPUT METHODS:
  Touchscreen: Capacitive multi-touch
  Physical Buttons: Rotating crown + 2 side buttons
  Voice Input: Built-in microphone (MEMs)
  Gestures: Tap, swipe, rotate, shake

AUDIO:
  Speaker: Stereo or mono piezo speaker
  Frequency: 200 Hz - 20 kHz
  Power: 50 mW peak
  Purpose: Payment alerts, error tones, feedback

HAPTICS:
  Motor Type: Linear motor (preferred) or eccentric rotating mass
  Frequency Range: 5-100 Hz
  Power: 100-200 mW
  Customization: Haptic patterns (≥3 distinct patterns)
  Latency: <50 ms from trigger to vibration

DURABILITY:
  Water Resistance: 5 ATM minimum (50m depth)
  Temperature Range: 0°C to 45°C operating
                     -10°C to 60°C storage
  Drop Test: 1.5m onto concrete (survives)
  Build Materials: Gorilla Glass 3+, Stainless Steel or Aluminum
```

---

## 🏪 Merchant Terminal Specifications

### **POS Terminal Device**

```yaml
FORM FACTOR:
  Type: Tablet-based POS terminal
  Size: 7-10 inch display
  Weight: 300-500g
  Material: Plastic/composite (shatterproof)
  Design: Portrait or landscape orientation

PROCESSOR & MEMORY:
  CPU: Snapdragon 4 Gen 1 or equivalent ARM
  Cores: 8 cores (2.5 GHz)
  RAM: 4 GB minimum (6 GB recommended)
  Storage: 64 GB eMMC or SSD
  OS: Android 11+ or iOS 15+

DISPLAY:
  Type: IPS LCD or AMOLED
  Size: 7-10 inches
  Resolution: 1920x1200 minimum
  Brightness: 500+ nits (for outdoor use)
  Touch: Capacitive multi-touch (5-point minimum)

CONNECTIVITY:
  NFC Reader Module:
    - Type A/B (ISO 14443)
    - Range: 5-15 cm (extended)
    - Power: 80-100 mW
    - Multiple card support: Contactless credit/debit cards, phones
  
  Wi-Fi 6 (802.11ax) / 4G LTE:
    - Primary connection for settlement uploads
    - Fallback: 4G/LTE with dedicated chip
    - Backup: WiFi hotspot (merchant provides)
  
  Bluetooth 5.0: Optional (for peripheral connection)
    - Barcode scanner, receipt printer
    - Keyboard for PIN pad

POWER & BATTERY:
  Battery: 5,000 mAh Li-Po
  Standby Time: 8-10 hours
  Active Use: 4-6 hours (continuous transactions)
  Charging: Fast charging 30W+ (USB-C)
  Charging Time: 30-45 minutes to full
  Backup Power: Integrated or external UPS (30 min min)

USER INTERFACE:
  Keypad: Physical or virtual numeric keypad (0-9, decimal, clear)
  Buttons: OK, Cancel, Menu, Home
  Screen Layout: Large text (4+ pt font)
               Intuitive merchant workflow
               Accessibility high-contrast mode

PRINTING:
  Receipt Printer: Thermal 80mm (optional)
    - Print Speed: 250mm/s
    - Resolution: 203 DPI
    - Paper: thermal roll
    - Connection: USB or Serial
  
  Alternative: SMS/email receipt (if printer unavailable)

SECURITY:
  Secure Element: Same as smartwatch (EAL4+)
  Encryption: All communication via TLS 1.3
  PIN Pad: PCI DSS Level 1 encrypted
  Tamper Detection: Cabinet intrusion alarm
  Remote Wipe: Ability to erase merchant data remotely

PHYSICAL SECURITY:
  Mounting: Optional stand or dock
  Locks: Optional slot lock (Kensington-style)
  LED Indicators: Network, power, transaction status (3+ LEDs)
  Physical Size: 10" x 7" x 1.5" (approx)

REGULATORY:
  FCC Certified: For Wi-Fi & NFC
  CE Mark: For electromagnetic compatibility
  IC Certified: For Canadian operation
  ISI Mark: For Indian standards compliance
```

---

## 🔌 Communication Protocol Specifications

### **BLE (Bluetooth Low Energy) - Phone ↔ Watch**

```yaml
PROFILE SPECIFICATION:
  Version: BLE 5.0+
  
  SERVICE DEFINITION:
    Primary Service: "ZiPPay-Wallet"
    UUID: 550e8400-e29b-41d4-a716-446655440000
    
  CHARACTERISTICS:
    1. e-Rupee Balance (Read)
       UUID: 550e8400-e29b-41d4-a716-446655440001
       Property: Read, Notify
       Size: 8 bytes (uint64)
       Format: { balance: uint64 }
    
    2. Transaction Ledger (Write)
       UUID: 550e8400-e29b-41d4-a716-446655440002
       Property: Write, Notify
       Size: 256 bytes (per transaction)
       Format: { tx_id, merchant, amount, timestamp, signature }
    
    3. Sync Command (Read/Write)
       UUID: 550e8400-e29b-41d4-a716-446655440003
       Property: Read, Write, Notify
       Size: 4 bytes (command code)
       Commands: 0x01=StartSync, 0x02=EndSync, 0x03=Status

ENCRYPTION:
  Protocol: ECDH (Elliptic Curve Diffie-Hellman)
  Curve: NIST P-256
  Cipher: AES-256-CCM
  Authentication: HMAC-SHA256
  Session Key Rotation: Every 24 hours or 100 transactions

ADVERTISING:
  Interval: 100-1000 ms (configurable based on battery)
  Name: "ZiPPay-Watch"
  Flags: LE General Discoverable Mode, BR/EDR Not Supported
  Manufacturer Data: RBI e-Rupee identifier

PAIRING:
  Method: ECDH with Out-of-Band (OOB) authentication
  Process:
    1. Phone initiates BLE scan
    2. Watch responds with advertising packet
    3. Phone-Watch verify certificates
    4. Mutual authentication (HMAC-based)
    5. Shared session key established
    6. Encryption enabled

CONNECTION PARAMETERS:
  Min Interval: 20ms (phone), 150ms (watch)
  Max Interval: 2000ms
  Slave Latency: 8 (watch can skip connections)
  Supervision Timeout: 10 seconds
  MTU (Max Transmission Unit): 517 bytes

POWER CONSUMPTION:
  Active: 10-15 mW (both devices)
  Idle: <1 µW (watchboard asleep)
  Each sync cycle: <10 mJ (10 seconds @ 10mW)
  Daily power budget: 500 mJ (~3% of battery)
```

### **NFC (Near Field Communication) - Watch ↔ Merchant**

```yaml
ISO/IEC 14443 TYPE A PROTOCOL:
  
  INITIALIZATION:
  Terminal (Reader):
    ├─ Power on NFC coil
    ├─ Broadcast 13.56 MHz frequency
    ├─ Wait for field recognition (< 5ms)
    └─ Enter Reader mode
  
  Watch (Target/Card):
    ├─ Detect NFC field
    ├─ Wake up from sleep
    ├─ Respond with UID (Unique Identifier)
    └─ Enter Target mode

  COMMAND EXCHANGE:
  Terminal sends: APDU (Application Protocol Data Unit)
  
  Frame Format:
  ├─ Header (1 byte): 0x0A (Command)
  ├─ Length (1 byte): payload size
  ├─ Command (1 byte): 0xF0 (ZiPPay payment)
  ├─ MerchantID (8 bytes)
  ├─ TransactionID (16 bytes)
  ├─ Amount (4 bytes, uint32)
  ├─ Timestamp (4 bytes, uint32)
  ├─ Nonce (16 bytes random)
  └─ Checksum (2 bytes, CRC)

  Watch Response: APDU
  Frame Format:
  ├─ Header (1 byte): 0x0B (Response)
  ├─ Status (1 byte): 0x00 success, 0xFF error
  ├─ User Confirmation (1 byte): 0x01 (approved)
  ├─ Signature (64 bytes, ECDSA)
  ├─ Certificate (256 bytes, encrypted)
  ├─ Timestamp (4 bytes)
  └─ Checksum (2 bytes, CRC)

  Terminal Processing:
  ├─ Receive response
  ├─ Verify signature (using cached public key)
  ├─ Check timestamp ±30 seconds
  ├─ Verify nonce matches
  ├─ Display "Payment Authorized" or "Rejected"
  └─ Store transaction locally

DATA RATE:
  106 kbps: Standard rate (mandatory)
  212 kbps: Fast mode (if supported)
  424 kbps: Fastest mode (optional, high power)

RANGE & FIELD STRENGTH:
  Typical Range: 4-10 cm (depends on antenna quality)
  Field Strength: 37-73 mV minimum (ISO spec)
  RF Frequency: 13.56 ± 0.135 MHz

TIMEOUT BEHAVIOR:
  Idle timeout: 3 seconds (auto-disconnect)
  Transmission timeout: 500ms per frame
  Max transaction time: 10 seconds (full handshake + sign)

PHYSICAL STRUCTURE:
  Antenna Layout: Circular coil (for round smartwatch)
  Coil Size: 28-32mm diameter
  Number of Turns: 6-8 turns
  Operating Power: 50-70 mW
```

### **WiFi / 4G - Phone ↔ RBI & Terminal ↔ Bank**

```yaml
TRANSPORT LAYER (TCP/IP):
  Protocol: HTTPS / TLS 1.3 (mandatory)
  Port: 443 (standard HTTPS)
  Certificate Pinning: Yes (prevent MITM attacks)
  Timeout: 30 seconds per request
  Retry Logic: Exponential backoff (3 attempts)

APPLICATION LAYER (REST API):
  Format: JSON over HTTPS
  
  Endpoints:
    1. POST /api/v1/wallet/load
       Purpose: Load e-Rupee to watch
       Payload: { amount, user_id, device_id }
       Response: { token, timestamp, signature }
       Rate Limit: 10 requests/min per user
    
    2. POST /api/v1/transactions/verify
       Purpose: Post-sync verification with RBI
       Payload: { transactions[], merkle_root, user_id }
       Response: { status, verified_count, errors[] }
       Rate Limit: 5 requests/hour per user
    
    3. POST /api/v1/settlement/batch
       Purpose: Terminal settlement upload
       Payload: { transactions[], merchant_id, signature }
       Response: { batch_id, timestamp, status }
       Rate Limit: 2 requests/day per merchant
    
    4. GET /api/v1/keys/public
       Purpose: Fetch user public keys for verification
       Payload: { user_id, device_id }
       Response: { public_key, cert, expiry }
       Cache: 24 hours (on terminal)
       Rate Limit: Unlimited (public endpoint)

ENCRYPTION:
  Symmetric: AES-256 for payload
  Asymmetric: RSA-2048 for key exchange
  Hashing: SHA-256 for integrity
  Session Key: 256-bit, rotated hourly

BANDWIDTH USAGE:
  Single Transaction Upload: ~500 bytes
  Batch (100 transactions): ~50 KB
  Daily Load (50K transactions): ~25 MB
  Monthly Data: ~750 MB (moderate usage)

LATENCY REQUIREMENTS:
  Load Request: <5 seconds (user-facing)
  Verification: <10 seconds (automatic)
  Settlement: <30 seconds (batch upload)
  Public Key Fetch: <2 seconds (cached after first hit)
```

---

## 📊 Data Format Specifications

### **e-Rupee Token Structure**

```yaml
TOKEN ENVELOPE (Encrypted):
  Size: 256 bytes
  Encryption: AES-256-GCM
  
  Contents (decrypted):
  ├─ Token Header (4 bytes)
  │  ├─ Version: 0x01
  │  ├─ Type: 0x10 (e-Rupee allocation)
  │  └─ Reserved: 0x00 0x00
  │
  ├─ Token ID (16 bytes)
  │  └─ UUIDv4 (globally unique)
  │
  ├─ Amount (8 bytes)
  │  └─ uint64 (in paise, not rupees)
  │
  ├─ Timestamp (4 bytes)
  │  └─ Unix timestamp (seconds since epoch)
  │
  ├─ Expiry (4 bytes)
  │  └─ Unix timestamp (validity end)
  │
  ├─ Nonce (16 bytes)
  │  └─ Random, prevents replay
  │
  ├─ RBI Signature (64 bytes)
  │  └─ ECDSA signature over above fields
  │
  └─ Checksum (4 bytes)
     └─ CRC32 or HMAC tail
```

### **Transaction Certificate**

```yaml
TRANSACTION STRUCTURE (Signed):
  Size: 512 bytes
  Signature: ECDSA P-256

  Fields:
  ├─ Transaction ID (16 bytes)
  │  └─ UUIDv4 (unique per payment)
  │
  ├─ Merchant ID (8 bytes)
  │  └─ Encoded merchant number
  │
  ├─ User UUID (16 bytes)
  │  └─ Anonymized user identifier
  │
  ├─ Amount (8 bytes)
  │  └─ uint64 (paise)
  │
  ├─ Timestamp (4 bytes)
  │  └─ Unix timestamp (when signed)
  │
  ├─ Nonce (16 bytes)
  │  └─ From merchant terminal
  │
  ├─ Device Signature (64 bytes)
  │  └─ ECDSA(PrivateKey, Certificate_Hash)
  │
  └─ Metadata (16 bytes)
     └─ Flags, status, etc.
```

---

## 🔐 Key Management & Certificate Hierarchy

```yaml
CERTIFICATE HIERARCHY:
Level 1: RBI Root CA
  └─ Validity: 20 years
  └─ Purpose: Sign all intermediate CAs
  └─ Key: RSA-4096 (master key, offline)

Level 2: Bank Intermediate CA
  └─ Validity: 10 years
  └─ Per: Each participating bank
  └─ Signed By: RBI Root

Level 3: Device Certificates
  └─ Validity: 5 years
  └─ Per: Each smartwatch/terminal
  └─ Signed By: Bank Intermediate
  └─ Includes: Device ID, Serial, Public Key

KEY ROTATION:
  Device Private Keys:
    - Generated: At device initialization
    - Rotation: Never (lifetime of device)
    - Recovery: If lost, user must reset device
    - Revocation: Via RBI blacklist
  
  Session Keys (BLE/HTTPS):
    - Generated: At session establishment
    - Rotation: Every 24 hours or 100 transactions
    - Derivation: HMAC-based KDF
    - Perfect Forward Secrecy: Enabled

  RBI Keys (Root):
    - Rotation: Every 10 years or emergency
    - Backup: Geographically distributed cold storage
    - Emergency Rollover: RBI can issue new root
```

---

## ✅ Compatibility Matrix

### **Smartphones (for ZiPPay App)**

| OS | Min Version | Recommended | Tested Devices |
|----|-------------|------------|-----------------|
| Android | 10 | 12+ | Samsung S20+, Pixel 4+, OnePlus 8+ |
| iOS | 14 | 15+ | iPhone XS+, iPad Air 3+ |

### **Smartwatches**

| Manufacturer | Model | OS | Status | Notes |
|-------------|-------|----|----|-------|
| Samsung | Galaxy Watch 5 Pro | Wear OS 3 | ✅ Certified | Full NFC + BLE |
| Xiaomi | Watch 2 Pro | Wear OS 3 | ✅ Certified | Same specs |
| OnePlus | Watch 2 | Wear OS 3 | ✅ Certified | Compatible |
| Generic | Wear OS 3+ | Any | ✅ Supported | Must have NFC |
| Apple | Watch Series 6+ | watchOS | ⚠️ Limited | NFC limited to Apple Pay |

### **Merchant Terminals**

| Device Type | Examples | OS Requirements | Status |
|------------|----------|-----------------|--------|
| Android Tablet | Samsung Tab S7+ | Android 11+ | ✅ Supported |
| iPad | iPad Air 4+ | iOS 15+ | ✅ Supported |
| Dedicated POS | Verifone, PAX | Linux / Proprietary | 🔲 Integration needed |

---

## 🔧 Integration Checklist

- [ ] NFC Module initialized and certified
- [ ] BLE stack updated to 5.0+
- [ ] Secure Element provisioned with keys
- [ ] TEE secure boot verified
- [ ] ECDSA signing tested
- [ ] AES encryption/decryption working
- [ ] WiFi TLS 1.3 connection tested
- [ ] RBI API endpoints accessible
- [ ] NPCI settlement API connected
- [ ] Merchant bank integration verified
- [ ] User's bank API functional
- [ ] Compliance audit passed
- [ ] Security audit passed
- [ ] Beta testing with 100 users completed
- [ ] Performance testing under load passed

---

**Spec Version**: 1.0  
**Last Updated**: Feb 21, 2026  
**For**: Hardware/Software Integration Teams  
**Approval**: RBI/NPCI Compliance Officer

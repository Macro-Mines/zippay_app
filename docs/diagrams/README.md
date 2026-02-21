# ZiPPaY Workflow Diagrams - Export Guide
## 5 Mermaid Diagram Files Ready for Export

---

## 📊 Files Included

1. **01-system-architecture.mmd** - High-level ecosystem overview
2. **02-phase1-load.mmd** - Loading e-Rupee from phone to watch
3. **03-phase2-payment.mmd** - Offline NFC payment flow
4. **04-phase3-settlement.mmd** - Overnight settlement process
5. **05-phase4-sync.mmd** - Phone-watch sync and verification

---

## 🚀 Quick Export Methods

### **Method 1: Mermaid Live Editor (Easiest)** ⚡

1. Go to **[mermaid.live](https://mermaid.live)**
2. Click **+** button (new diagram)
3. Paste entire contents of any `.mmd` file
4. See live preview
5. Click **☰ menu** → **Download**
6. Choose **PNG** or **SVG**
7. Save with descriptive name

**Example:**
```
- Select: 02-phase1-load.mmd
- Copy all content
- Paste into mermaid.live
- Download as: "ZiPPaY-Phase1-Load.png"
```

---

### **Method 2: Command Line (Batch Export)** 🖥️

#### **Step 1: Install mermaid-cli**
```powershell
npm install -g @mermaid-js/mermaid-cli
```

#### **Step 2: Export All Diagrams**
```powershell
cd d:\Programming\PROJECTS\Finance\zippay_app-main\docs\diagrams

# Export each diagram
mmdc -i 01-system-architecture.mmd -o 01-system-architecture.png
mmdc -i 02-phase1-load.mmd -o 02-phase1-load.png
mmdc -i 03-phase2-payment.mmd -o 03-phase2-payment.png
mmdc -i 04-phase3-settlement.mmd -o 04-phase3-settlement.png
mmdc -i 05-phase4-sync.mmd -o 05-phase4-sync.png
```

#### **Step 3: High-Resolution Export (2x)**
```powershell
mmdc -i 01-system-architecture.mmd -o 01-system-architecture-hires.png -s 2
mmdc -i 02-phase1-load.mmd -o 02-phase1-load-hires.png -s 2
# ... repeat for others
```

#### **Step 4: Export as SVG (Scalable)**
```powershell
mmdc -i 01-system-architecture.mmd -o 01-system-architecture.svg
# ... repeat for others
```

#### **Step 5: Export as PDF**
```powershell
mmdc -i 01-system-architecture.mmd -o 01-system-architecture.pdf
```

---

### **Method 3: VS Code Extension** 📝

#### **Install Markdown Preview Mermaid Support**
1. Open VS Code
2. Extensions (Ctrl+Shift+X)
3. Search: `Markdown Preview Mermaid Support`
4. Click **Install**

#### **View & Export**
1. Open any `.mmd` file in VS Code
2. Right-click → **Open Preview to the Side** OR
3. Press **Ctrl+Shift+V**
4. Right-click diagram → **Save as Image**

---

### **Method 4: Batch Export Script** 🔄

**Create a PowerShell script** (`export-diagrams.ps1`):

```powershell
# Export all diagrams to PNG, SVG, and high-res
$diagrams = @(
    "01-system-architecture.mmd",
    "02-phase1-load.mmd",
    "03-phase2-payment.mmd",
    "04-phase3-settlement.mmd",
    "05-phase4-sync.mmd"
)

foreach ($diagram in $diagrams) {
    # PNG (standard)
    mmdc -i $diagram -o $diagram.Replace(".mmd", ".png")
    
    # PNG (high-res 2x)
    mmdc -i $diagram -o $diagram.Replace(".mmd", "-hires.png") -s 2
    
    # SVG (scalable)
    mmdc -i $diagram -o $diagram.Replace(".mmd", ".svg")
    
    Write-Host "✓ Exported $diagram to PNG, PNG (2x), and SVG"
}

Write-Host "✓ All diagrams exported successfully!"
```

**Run:**
```powershell
cd d:\Programming\PROJECTS\Finance\zippay_app-main\docs\diagrams
.\export-diagrams.ps1
```

---

## 📋 File Contents Preview

### **01-system-architecture.mmd**
Shows 3 main ecosystems:
- **User**: Smartphone + Smartwatch
- **Merchant**: NFC Terminal + Merchant Bank
- **Infrastructure**: NPCI + RBI + User's Bank

**Best for:** Presentation intro, explaining ecosystem

---

### **02-phase1-load.mmd**
Sequence diagram covering:
- User opens app, enters ₹500
- Biometric + 2FA verification
- RBI token generation & encryption
- BLE transfer to watch
- Secure Element storage

**Best for:** Explaining initial setup, security features

---

### **03-phase2-payment.mmd**
Detailed payment sequence (NO INTERNET):
- Merchant enters ₹50
- Watch displays confirmation
- User taps to confirm
- Cryptographic signing in Secure Element
- NFC transmission & verification
- Watch balance update

**Best for:** Core functionality demo, offline capability

---

### **04-phase3-settlement.mmd**
Overnight settlement flow:
- Terminal batch upload (02:15 AM)
- Merchant bank processing
- NPCI validation & deduplication
- RBI atomic ledger update
- Double-spend prevention
- User bank debit & Merchant bank credit

**Best for:** Explaining backend, fraud prevention

---

### **05-phase4-sync.mmd**
Phone-watch synchronization:
- BLE handshake & authentication
- Encrypted ledger transfer
- Post-sync RBI verification
- Balance reconciliation
- AI analysis & dashboard update

**Best for:** Explaining reconciliation, verification

---

## 🎨 Export Options Comparison

| Feature | PNG | SVG | PDF | JPG |
|---------|-----|-----|-----|-----|
| Quality | High | Perfect (scalable) | High | High |
| File Size | Medium | Small | Large | Small |
| Editing | No | Yes (text-based) | No | No |
| Web Use | ✓ | ✓ | ✓ | ✓ |
| Print | ✓ | ✓ | ✓✓ | ✓ |
| Scaling | No | Yes | No | No |

**Recommendation:**
- **Presentations**: PNG (1920x1080) or SVG
- **Printing**: PDF or high-res PNG
- **Web**: SVG or PNG
- **Editing**: SVG

---

## 🔧 Best Export Settings

### **For Presentations (PowerPoint/Google Slides)**
```powershell
mmdc -i diagram.mmd -o diagram.png -s 2 -b white
# - Resolution: 2x (high quality)
# - Background: White
```

### **For Web/Blog**
```powershell
mmdc -i diagram.mmd -o diagram.svg
# - Format: SVG (scalable for any screen)
# - Smaller file size
```

### **For Printing (A4/Poster)**
```powershell
mmdc -i diagram.mmd -o diagram.pdf -s 1.5
# - Format: PDF (print-friendly)
# - Resolution: 1.5x
```

### **For High-Resolution Display**
```powershell
mmdc -i diagram.mmd -o diagram-4k.png -s 4
# - Resolution: 4x (4K screens)
# - Very large file
```

---

## 📂 Output Directory Structure

After exporting, your `/diagrams` folder will look like:

```
diagrams/
├── 01-system-architecture.mmd
├── 01-system-architecture.png
├── 01-system-architecture-hires.png
├── 01-system-architecture.svg
├── 02-phase1-load.mmd
├── 02-phase1-load.png
├── 02-phase1-load-hires.png
├── 02-phase1-load.svg
├── 03-phase2-payment.mmd
├── 03-phase2-payment.png
├── 03-phase2-payment-hires.png
├── 03-phase2-payment.svg
├── 04-phase3-settlement.mmd
├── 04-phase3-settlement.png
├── 04-phase3-settlement-hires.png
├── 04-phase3-settlement.svg
├── 05-phase4-sync.mmd
├── 05-phase4-sync.png
├── 05-phase4-sync-hires.png
├── 05-phase4-sync.svg
└── README.md (this file)
```

---

## 💻 System Requirements

### **For CLI Export (mmdc)**
- Node.js 16+ installed
- npm installed
- Playwright browser (auto-installed with mmdc)

### **For Web Export (mermaid.live)**
- Internet connection
- Modern browser (Chrome, Firefox, Safari, Edge)
- No installation needed

### **For VS Code Extension**
- VS Code installed
- Extension installed (2-minute setup)
- No CLI tools needed

---

## ✅ Quick Checklist

- [ ] Choose export method (recommend: mermaid.live or CLI)
- [ ] Have Node.js/npm installed (if using CLI)
- [ ] Copy all `.mmd` files to safe location
- [ ] Export diagrams to PNG/SVG
- [ ] Organize exported files by use case
- [ ] Add to presentation/documentation
- [ ] Share with judges/investors

---

## 🎯 Use Cases After Export

### **For Bancquest Judges**
- Export Phase 2 (Payment) at high-res
- Use in presentation as fullscreen diagram
- Print as backup handout

### **For Investors**
- Export all diagrams as SVG
- Add to PowerPoint presentation
- Include in business plan PDF

### **For Bank Partners**
- Export Phase 3 (Settlement) in detail
- Use in technical meeting
- Print for reference material

### **For Website**
- Export all as SVG
- Embed in "How It Works" section
- Link to full documentation

---

## 🐛 Troubleshooting

### **mmdc command not found**
```powershell
# Reinstall globally
npm install -g @mermaid-js/mermaid-cli

# Verify installation
mmdc --version
```

### **Export quality too low**
```powershell
# Use higher scale factor
mmdc -i diagram.mmd -o diagram.png -s 3
# Options: -s 1 (default), -s 2, -s 3, -s 4
```

### **File size too large**
```powershell
# Use SVG instead
mmdc -i diagram.mmd -o diagram.svg
# SVG is smaller and scalable
```

### **Mermaid syntax error**
- Check for special characters
- Ensure quotes are balanced
- Verify indentation in diagram
- Try opening in mermaid.live for error message

---

## 📞 Support

**If export fails:**
1. Try mermaid.live (web version) first
2. Copy error message from CLI
3. Check Node.js version: `node --version`
4. Verify mmdc: `mmdc --version`

---

## 🚀 Next Steps

1. **Export all diagrams** using preferred method
2. **Organize files**: Create `/presentations` folder for organized exports
3. **Quality check**: Open each exported file
4. **Share with stakeholders**: Use in pitches/meetings
5. **Archive**: Keep `.mmd` files for future updates

---

**Last Updated**: Feb 21, 2026  
**Status**: Ready for export  
**All 5 diagrams**: Complete and ready

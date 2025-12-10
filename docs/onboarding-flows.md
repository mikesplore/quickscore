# LenderVision Onboarding & Activation Flows

## Phase 1: Landing & Authentication (Unified Entry)

### 1.1 Landing Page Flow

**Goal:** Simple, high-converting entry point that doesn't force role selection upfront.

```
User Visits lendervision.com
│
├─→ [Landing Page]
│   ├─ Headline: "Get Instant Loan Decisions powered by AI"
│   ├─ CTA: "Get Started" (single button)
│   └─ Secondary: "Already have an account? Log In"
│
└─→ User Clicks "Get Started"
    └─→ [Auth Modal/Page: Sign Up]
```

### 1.2 Authentication Screen (Sign Up)

**Two Options for User Sign-up:**

```
[SIGN UP SCREEN]
Title: "Create Your Account"
Subtitle: "Join thousands getting instant loan decisions"

Option A: Phone Number + OTP
├─ Input: Phone Number (E.164 Format)
├─ Action: "Send OTP"
├─ Verify: "Enter 6-digit OTP"
└─ System: Validates & Stores Phone

Option B: Email + Password
├─ Input: Email Address
├─ Input: Password (8+ chars, complexity rules)
├─ Action: "Create Account" 
└─ System: Sends Verification Email
```

**Flow Logic:**
- If Phone OTP: Verify → Session Created → Proceed to Role Selection
- If Email: Verify → Session Created → Proceed to Role Selection

### 1.3 Role Selection Screen

**Critical Decision Point** (Immediately after OTP/Email verification)

```
[ROLE SELECTION SCREEN]
Title: "Who are you?"
Subtitle: "We'll tailor the experience to your needs"

┌────────────────────────────────────────────┐
│                                            │
│  ┌──────────────┐  ┌──────────────┐      │
│  │ Individual   │  │  Business    │      │
│  │ Borrower     │  │  Borrower    │      │
│  │              │  │              │      │
│  │ Looking for  │  │ Growing your │      │
│  │ personal     │  │ business &   │      │
│  │ credit       │  │ need capital │      │
│  └──────────────┘  └──────────────┘      │
│                                            │
│              ┌──────────────┐             │
│              │   Lender     │             │
│              │              │             │
│              │ Fund loans &  │             │
│              │ earn returns  │             │
│              └──────────────┘             │
│                                            │
└────────────────────────────────────────────┘

User Selection → Stores Role → Routes to Track
```

---

## Phase 2: Role-Specific Onboarding Flows

### Track A: Individual Borrower Flow

**Overall Goal:** Speed + Assessment. Gather data for AI credit model in 5-8 minutes.

```
INDIVIDUAL BORROWER ONBOARDING FLOW

Step 1: Identity Verification
├─ Screen: "Verify Your Identity"
├─ Actions:
│  ├─ [Liveness Detection] (Selfie + Live Face Detection)
│  ├─ [Document Upload] (National ID Front + Back)
│  └─ [Extraction] (AI reads name, DOB, ID number)
├─ Data Collected:
│  ├─ Face Hash (for liveness)
│  ├─ ID Document Images
│  ├─ Extracted: Full Name, DOB, ID Number
│  └─ Verification Status: PENDING → VERIFIED
├─ System Feedback:
│  ├─ "Analyzing your identity..."
│  ├─ ✓ "Identity verified successfully"
│  └─ [Progress: 20%]
└─ Next: Personal Details

Step 2: Personal Details
├─ Screen: "Your Information"
├─ Auto-filled: Name, DOB (from ID)
├─ User Inputs:
│  ├─ Email (if not signed up via email)
│  ├─ Phone Number (if not signed up via phone)
│  ├─ Residential Address
│  ├─ Employment Status (Employed / Self-Employed / Unemployed)
│  ├─ Employer Name (if employed)
│  └─ Monthly Income Range (optional but incentivized)
├─ Data Collected: Personal profile
├─ System Feedback:
│  ├─ "Profile updated"
│  └─ [Progress: 40%]
└─ Next: Financial Data Linking

Step 3: Financial Data Linking
├─ Screen: "Connect Your Finances"
├─ Options (Choose at least ONE):
│  ├─ Option A: M-Pesa/Mobile Money
│  │  ├─ Phone: Re-confirm phone
│  │  ├─ Connection: "Connect to M-Pesa" (OAuth/API)
│  │  ├─ Consent: "Allow access to last 90 days?"
│  │  └─ Data: Transaction history, balance patterns
│  │
│  ├─ Option B: Bank Account
│  │  ├─ Bank Selection dropdown
│  │  ├─ Account Type (Checking/Savings)
│  │  ├─ Connection: OAuth or Account Number + OTP
│  │  └─ Data: 6-12 months statements
│  │
│  └─ Option C: Skip for Now (Not Recommended)
│     └─ Warning: "Limited assessment without financial data"
│
├─ Data Collected:
│  ├─ Connected account ID
│  ├─ Transaction history (encrypted)
│  ├─ Balance patterns
│  └─ Income verification markers
│
├─ System Feedback:
│  ├─ "Connecting to M-Pesa..." → ✓ "Connected"
│  ├─ "AI is analyzing your spending patterns..."
│  ├─ [Progress: 80%]
│  └─ "Assessment in progress..."
└─ Next: Application Submitted

Step 4: Assessment Complete
├─ Screen: "Your Assessment is Ready"
├─ Displays:
│  ├─ Estimated Credit Score (0-100)
│  ├─ Assessment Status: APPROVED / CONDITIONALLY APPROVED / UNDER REVIEW
│  ├─ Recommended Loan Amount
│  ├─ Interest Rate Range
│  ├─ Key Insights: "Your consistent income history..."
│  └─ Next Steps: "View available loans" or "Dashboard"
├─ Actions:
│  ├─ Button: "View Available Loans"
│  └─ Button: "Go to Dashboard"
├─ [Progress: 100%]
└─ Email confirmation sent

Data Summary for AI Model:
├─ Identity Verified ✓
├─ Personal Profile ✓
├─ Financial Data (90+ days) ✓
└─ Result: Credit Score Generated
```

---

### Track B: Lender Flow

**Overall Goal:** Trust & Configuration. Verify legitimacy and set up loan products.

```
LENDER ONBOARDING FLOW

Step 1: Institution Verification
├─ Screen: "About Your Institution"
├─ Inputs:
│  ├─ Institution Name (e.g., "FastCredit Finance Ltd")
│  ├─ Registration Number (e.g., "REG/2023/12345")
│  ├─ Country of Operation
│  ├─ Business Type (Bank / Microfinance / P2P Lender / Other)
│  └─ Website (optional)
├─ Data Collected: Institutional metadata
├─ System Feedback: "Institution details saved"
├─ [Progress: 25%]
└─ Next: Certificate Upload

Step 2: Certificate of Lending/Operations Upload
├─ Screen: "Upload Your Licensing Certificate"
├─ Upload: Certificate of Lending Operations
│  ├─ Accepted Formats: PDF, JPG, PNG
│  ├─ Max Size: 10MB
│  ├─ Multiple documents allowed
│  └─ Hint: "Government-issued cert authorizing lending operations"
│
├─ OCR/Manual Verification:
│  ├─ System extracts: Cert Number, Issue Date, Expiry Date
│  ├─ Manual Review: Compliance team verifies authenticity
│  └─ Status: PENDING REVIEW → APPROVED → ACTIVE
│
├─ If Rejected:
│  ├─ Reason provided
│  ├─ Prompt to re-upload
│  └─ Support contact: compliance@lendervision.com
│
├─ Data Collected: Certificate metadata + images
├─ System Feedback:
│  ├─ "Certificate uploaded"
│  ├─ "Our compliance team is reviewing..."
│  └─ [Progress: 50%]
└─ Next: Admin Profile Setup

Step 3: Admin Profile Setup (Super Admin)
├─ Screen: "Account Administrator"
├─ Inputs:
│  ├─ Full Name
│  ├─ Email Address
│  ├─ Phone Number
│  ├─ Job Title (e.g., "CEO", "Credit Officer")
│  └─ Personal ID Number (for KYC)
│
├─ Verification:
│  ├─ Email Verification Link sent
│  ├─ Phone OTP verification
│  └─ Personal ID validation (optional secondary ID upload)
│
├─ Data Collected: Admin contact + ID info
├─ System Feedback:
│  ├─ "Verification link sent to email"
│  ├─ ✓ "Admin verified"
│  └─ [Progress: 75%]
└─ Next: Loan Product Configuration

Step 4: Loan Product Setup
├─ Screen: "Configure Your Loan Products"
├─ Product 1: Default Loan Product
│  ├─ Product Name (e.g., "Quick Personal Loan")
│  ├─ Loan Type (Personal / Business / Education / Mortgage)
│  ├─ Min Loan Amount (e.g., 10,000)
│  ├─ Max Loan Amount (e.g., 500,000)
│  ├─ Min Interest Rate (e.g., 8% p.a.)
│  ├─ Max Interest Rate (e.g., 25% p.a.)
│  ├─ Min Repayment Period (months): e.g., 3
│  ├─ Max Repayment Period (months): e.g., 60
│  ├─ Processing Fee (%): e.g., 2%
│  ├─ Insurance Required? (Yes/No)
│  └─ Save Product
│
├─ Add More Products: Button to add additional loan products
├─ Data Collected: Loan product configuration
├─ System Feedback:
│  ├─ "Product configured"
│  ├─ [Progress: 100%]
│  └─ "Ready to start approving loans!"
└─ Next: Onboarding Complete

Step 5: Onboarding Complete
├─ Screen: "Welcome to LenderVision!"
├─ Displays:
│  ├─ Institution Name
│  ├─ Status: "ACTIVE LENDER"
│  ├─ Admin: [Admin Name]
│  ├─ Loan Products: [Count of configured products]
│  ├─ Next Step Instructions:
│  │  ├─ "Review loan applications"
│  │  ├─ "Set up webhooks (if API)"
│  │  ├─ "Invite additional admins/officers"
│  │  └─ "Review documentation"
│  └─ CTA: "Go to Dashboard"
│
├─ Email sent with:
│  ├─ Dashboard login link
│  ├─ API documentation (if applicable)
│  └─ Support contact info
└─ Redirect: Lender Dashboard

Additional Configuration Available Later:
├─ Add more loan products
├─ Configure interest rate tiers
├─ Set up automated approval rules
├─ Manage team members
└─ View applicant pipeline
```

---

### Track C: Business Borrower Flow

**Overall Goal:** KYB & Business Health Assessment. Verify business existence and revenue viability.

```
BUSINESS BORROWER ONBOARDING FLOW

Step 1: Authorized Representative Verification
├─ Screen: "Who is applying for this loan?"
├─ Inputs:
│  ├─ Full Name (auto-filled if from ID)
│  ├─ Relationship to Business:
│  │  ├─ ☐ Owner (≥51% stake)
│  │  ├─ ☐ Director
│  │  ├─ ☐ Manager/Authorized Signatory
│  │  └─ ☐ Other (specify)
│  ├─ Personal ID Number
│  └─ Email & Phone
│
├─ Identity Verification:
│  ├─ Option: Use ID from earlier (if already verified as Individual Borrower first)
│  ├─ Or: Conduct Liveness + ID Upload now
│  └─ Status: VERIFIED → Store personal KYC reference
│
├─ Data Collected:
│  ├─ Personal identity (linked to business)
│  ├─ Authority to represent business
│  └─ Contact info
│
├─ System Feedback:
│  ├─ "Personal identity verified"
│  ├─ ✓ "You are authorized to represent this business"
│  └─ [Progress: 15%]
└─ Next: Business KYC

Step 2: Business KYC (KYB) Data Collection
├─ Screen: "Your Business Information"
├─ Inputs:
│  ├─ Business Name (legal name)
│  ├─ Business Registration Number / License Number
│  ├─ Date of Incorporation (DD/MM/YYYY)
│  ├─ Business Type:
│  │  ├─ Sole Proprietorship
│  │  ├─ Partnership
│  │  ├─ Limited Liability Company (LLC/Ltd)
│  │  └─ Corporation
│  ├─ Industry/Sector (dropdown):
│  │  ├─ Retail & E-Commerce
│  │  ├─ Manufacturing
│  │  ├─ Agriculture
│  │  ├─ Services
│  │  ├─ Real Estate
│  │  ├─ Transportation
│  │  └─ Other
│  ├─ Business Address (HQ)
│  └─ Years in Operation (calculated from incorporation date)
│
├─ Document Upload (Required):
│  ├─ Business Registration Certificate
│  │  ├─ Format: PDF/JPG/PNG
│  │  ├─ System: OCR extracts reg number, date, business name
│  │  └─ Status: UPLOADED → VERIFIED
│  │
│  ├─ Tax ID / PIN Certificate
│  │  ├─ Proof of Tax Registration
│  │  ├─ Format: PDF/JPG/PNG
│  │  └─ System: Extracts Tax ID, business name match check
│  │
│  └─ Proof of Address (Optional but Recommended):
│     ├─ Utility Bill / Lease Agreement / Property Deed
│     └─ Max 3 months old
│
├─ Data Collected:
│  ├─ Business profile (legal details)
│  ├─ Registration verification
│  ├─ Tax compliance status
│  └─ Business address
│
├─ System Feedback:
│  ├─ "Business details verified against national registry" (if integration exists)
│  ├─ "Tax ID validated"
│  ├─ [Progress: 35%]
│  └─ ⚠️ "Manual review may be required for high-risk jurisdictions"
└─ Next: Financial Assessment

Step 3: Financial Assessment (Business Health)
├─ Screen: "Business Financial Activity"
├─ Data Source Options (Choose at least ONE):
│  │
│  ├─ Option A: Business Till/Paybill (M-Pesa for Business)
│  │  ├─ Input: Business Till/Paybill Number
│  │  ├─ Connection: OAuth to M-Pesa Business API
│  │  ├─ Consent: "Access last 6-12 months transaction data?"
│  │  ├─ Data Retrieved:
│  │  │  ├─ Total Transaction Volume
│  │  │  ├─ Average Daily Revenue
│  │  │  ├─ Payment Consistency
│  │  │  └─ Customer Concentration Risk
│  │  └─ Verification: Cross-check with business profile
│  │
│  ├─ Option B: Business Bank Account
│  │  ├─ Input: Bank Name + Account Number
│  │  ├─ Connection: Bank OAuth or Account Statement Upload
│  │  ├─ Data Retrieved:
│  │  │  ├─ 6-12 months statements (PDF/CSV)
│  │  │  ├─ Monthly revenue patterns
│  │  │  ├─ Expense trends
│  │  │  ├─ Cash balance health
│  │  │  └─ Frequency of transactions
│  │  └─ AI Analysis: Cash flow stability, revenue growth
│  │
│  └─ Option C: Manual Upload
│     ├─ Upload business bank statements (PDF)
│     ├─ Accepted: Last 6-12 months
│     └─ Note: "May extend approval timeline"
│
├─ Data Collected:
│  ├─ Business revenue (last 6-12 months)
│  ├─ Cash flow patterns
│  ├─ Expense structure
│  ├─ Growth trend
│  └─ Financial stability indicators
│
├─ System Feedback:
│  ├─ "Analyzing business financials..."
│  ├─ "Processing bank data..." (if uploaded)
│  ├─ [Progress: 70%]
│  └─ "AI is calculating business credit score..."
└─ Next: Operational Details

Step 4: Operational Details
├─ Screen: "More About Your Business"
├─ Inputs:
│  ├─ Number of Employees:
│  │  ├─ ☐ Solo (just me)
│  │  ├─ ☐ 1-5
│  │  ├─ ☐ 6-20
│  │  ├─ ☐ 21-50
│  │  ├─ ☐ 51-100
│  │  └─ ☐ 100+
│  │
│  ├─ Average Monthly Revenue (Optional, self-reported):
│  │  ├─ Range selection (e.g., 50K-100K)
│  │  └─ Note: "Will be verified against bank/till data"
│  │
│  ├─ Loan Purpose (Dropdown):
│  │  ├─ Expand operations
│  │  ├─ Purchase equipment
│  │  ├─ Working capital
│  │  ├─ Inventory
│  │  ├─ Marketing & growth
│  │  └─ Other
│  │
│  ├─ Desired Loan Amount:
│  │  └─ Input: Expected amount needed
│  │
│  └─ Desired Repayment Period (months):
│     └─ Input: Preferred tenure
│
├─ Data Collected:
│  ├─ Business scale (employee count)
│  ├─ Revenue self-declaration
│  ├─ Strategic purpose of loan
│  ├─ Loan needs (amount + duration)
│  └─ Business growth indicators
│
├─ System Feedback:
│  ├─ "Details saved"
│  ├─ [Progress: 85%]
│  └─ "Finalizing your assessment..."
└─ Next: Assessment Complete

Step 5: Business Assessment Complete
├─ Screen: "Your Business Assessment is Ready"
├─ Displays:
│  ├─ Business Name
│  ├─ Business Credit Score (0-100)
│  ├─ Assessment Status:
│  │  ├─ APPROVED (Loan amount approved)
│  │  ├─ CONDITIONALLY APPROVED (With conditions e.g., additional docs)
│  │  ├─ UNDER REVIEW (Manual review by credit team)
│  │  └─ DECLINED (With reason: Insufficient revenue, high risk, etc.)
│  │
│  ├─ Assessment Summary:
│  │  ├─ "Your business shows consistent revenue growth over 6 months"
│  │  ├─ "Monthly average: KES X,XXX"
│  │  ├─ "Approved Loan Range: KES X - KES Y"
│  │  ├─ "Recommended Interest Rate: X% - Y% p.a."
│  │  └─ "Available Repayment Terms: 3-36 months"
│  │
│  ├─ Key Insights:
│  │  ├─ Revenue Consistency: Stable / Growing / Declining
│  │  ├─ Monthly Volatility: Low / Medium / High
│  │  ├─ Cash Inflow Frequency: Daily / Weekly / Monthly
│  │  └─ Risk Factors: [List any concerns]
│  │
│  └─ Next Actions:
│     ├─ "View available loan products"
│     ├─ "Apply for a loan"
│     ├─ "Go to dashboard"
│     └─ "Save assessment as PDF"
│
├─ Email Sent:
│  ├─ Assessment summary
│  ├─ Recommended loan products
│  └─ Next steps
└─ Redirect: Business Borrower Dashboard
```

---

## Phase 3: Post-Onboarding Flows

### Success Screen (All Tracks)

```
[SUCCESS SCREEN]
Title: "Welcome to LenderVision!"
Subtitle: "[User/Business Name], You're All Set"

Display:
├─ Large checkmark icon (animated)
├─ Status: "Assessment Complete ✓"
├─ Key Info:
│  ├─ Available loan amount
│  ├─ Interest rate range
│  └─ Approval status
│
├─ CTAs:
│  ├─ Primary: "Explore Loans" / "View Dashboard"
│  └─ Secondary: "Share Your Success" (social share)
│
└─ Email confirmation sent with assessment details

User is now:
├─ Individual Borrower → Access borrower dashboard, loan marketplace
├─ Business Borrower → Access business dashboard, loan products
└─ Lender → Access lender dashboard, manage applications
```

---

## Screen-by-Screen Breakdown

### Role Selection Screen

**User Action:** Select their role (Individual / Business / Lender)

**Data Collected:**
- Role selected
- Timestamp
- Source (Web/Mobile)

**System Response:**
- Route to appropriate onboarding track
- Save role to user profile
- Initialize role-specific progress tracking

**Copy Suggestions:**

```
Headline: "Who are you?"
Subheadline: "We'll tailor your journey to match your needs"

Individual Borrower Card:
├─ Icon: Personal icon / User silhouette
├─ Title: "Personal Borrower"
├─ Description: "Looking for a personal loan? Get a decision based on your financial activity."
├─ CTA: "Continue as Individual"
└─ Subtext: "2-3 minutes to complete"

Business Borrower Card:
├─ Icon: Business icon / Building
├─ Title: "Business Borrower"
├─ Description: "Grow your business with a loan tailored to your revenue."
├─ CTA: "Continue as Business"
└─ Subtext: "5-7 minutes to complete"

Lender Card:
├─ Icon: Finance icon / Dollar sign
├─ Title: "Lender"
├─ Description: "Fund loans and earn competitive returns."
├─ CTA: "Start as Lender"
└─ Subtext: "10-15 minutes to set up"
```

---

### Document Upload Screens

#### Individual Borrower - Identity Documents

**Screen Title:** "Verify Your Identity"

**Copy Suggestions:**

```
Headline: "Let's verify who you are"
Subheadline: "This protects you and helps us prevent fraud"

Section 1: Liveness Detection
├─ Instruction: "Take a live selfie"
├─ Description: "Show your face clearly in the frame. We'll ask you to blink, smile, or turn your head."
├─ What Happens: "Your face is analyzed in real-time. No video is stored."
└─ Privacy Note: "🔒 Your biometric data is encrypted and never stored after verification"

Section 2: National ID
├─ Headline: "Upload your ID"
├─ Subheadline: "Driver's license, passport, or national ID"
├─ Instructions:
│  ├─ Step 1: "Photograph the FRONT of your ID"
│  ├─ Step 2: "Photograph the BACK of your ID"
│  └─ Step 3: "Make sure all text is clear and readable"
├─ Accepted Types: "Passport, Driver's License, National ID, Resident Card"
└─ Not Accepted: "Expired IDs, photocopies, screenshots"

Tips for Good Photo:
├─ ✓ Straight on angle
├─ ✓ Good lighting (not blurry)
├─ ✓ All corners visible
├─ ✓ Document fully open (if it's a booklet)
└─ ✗ No glare or shadows
```

#### Business Borrower - Certificate Uploads

**Screen Title:** "Verify Your Business"

**Copy Suggestions:**

```
Headline: "Help us verify your business"
Subheadline: "We need official documents from the government"

Section 1: Business Registration Certificate
├─ Instruction: "Upload your Business Registration Certificate"
├─ Description: "This is the official document from the business registry (e.g., ACRA, CAK) proving your business is legally registered."
├─ Accepted Formats: "PDF, JPG, PNG"
├─ File Size: "Max 10MB"
├─ What We Extract:
│  ├─ Business registration number
│  ├─ Date of incorporation
│  ├─ Business name & address
│  └─ (Extracting with AI, will be verified manually)
└─ Privacy: "🔒 Documents are securely stored and only reviewed by our compliance team"

Section 2: Tax ID / PIN Certificate
├─ Instruction: "Upload your Tax Identification certificate"
├─ Description: "Proof that your business is registered for taxes (PIN certificate or Tax Registration)"
├─ Accepted Formats: "PDF, JPG, PNG"
├─ File Size: "Max 10MB"
├─ Why We Need It:
│  ├─ Verify business legitimacy
│  ├─ Confirm tax compliance status
│  └─ Cross-check with registration number
└─ Privacy: "🔒 Tax information is kept confidential"

Section 3: Proof of Address (Optional)
├─ Instruction: "Upload proof your business address (recommended)"
├─ Description: "Utility bill, business lease, or property deed"
├─ Accepted: "Documents dated within last 3 months"
├─ Why It Helps:
│  ├─ Confirms business location
│  └─ Strengthens your assessment
└─ Optional: "You can skip this, but it may slow down approval"

Upload Status:
├─ Section 1: ✓ Verified
├─ Section 2: ⏳ Pending Manual Review (24-48 hours)
└─ Section 3: ☐ Not Submitted

Timeline: "Our compliance team will review your documents within 24-48 hours. You'll receive an email when the review is complete."
```

#### Lender - Certificate Upload

**Screen Title:** "Upload Your Lending Certificate"

**Copy Suggestions:**

```
Headline: "Verify Your Lending Authority"
Subheadline: "We need proof you're authorized to lend"

Instruction:
├─ Instruction: "Upload your Certificate of Lending/Operations"
├─ Description: "Government-issued license or certificate authorizing you to provide lending services (e.g., microfinance license, central bank approval)"
├─ Examples:
│  ├─ Microfinance Institution License
│  ├─ Banking License (Central Bank)
│  ├─ Digital Lender Certificate
│  └─ Non-Bank Financial Institution License
│
├─ Accepted Formats: "PDF, JPG, PNG"
├─ File Size: "Max 15MB"
├─ Multiple Documents: "Yes, you can upload multiple certificates if needed"
│
└─ What We Extract:
   ├─ License/Certificate Number
   ├─ Issue Date & Expiry Date
   ├─ Issuing Authority
   ├─ Authorized Lending Amount Range
   └─ License Type

Compliance Note:
├─ ⚠️ Important: "Your institution will undergo KYC verification"
├─ Timeline: "Compliance review typically takes 2-5 business days"
├─ Status Updates: "You'll receive email updates on review progress"
└─ Support: "Questions? Contact compliance@lendervision.com"

What Happens Next:
├─ 1️⃣ We review your certificate
├─ 2️⃣ We verify with issuing authority (if possible)
├─ 3️⃣ We set up your lender account
├─ 4️⃣ You create your first loan product
└─ 5️⃣ You go live on our platform!

Your Status:
└─ 🔄 "Compliance Review in Progress (Estimated: 2-5 days)"
```

---

## Copywriting & UX Principles

### Key Messaging Guidelines

**Landing Page:**
- Headline: Focus on speed & AI intelligence
  - ✓ "Get Instant Loan Decisions powered by AI"
  - ✓ "Borrow Fast, Build Better"
  - ✗ "Apply Here"

**Role Selection:**
- Use benefit-driven language
  - ✓ "Get funded in minutes" (Individual)
  - ✓ "Scale your business with smart capital" (Business)
  - ✓ "Fund loans, earn returns" (Lender)

**Document Upload:**
- Transparency + Reassurance
  - ✓ "🔒 Your data is encrypted and secure"
  - ✓ "Only takes 2 minutes"
  - ✗ "Submit your documents"

**Progress Indicators:**
- Clear milestones, not just percentages
  - ✓ "Identity Verified ✓ → Personal Details → Financials"
  - ✗ "50% Complete"

**System Feedback:**
- Real-time, micro-interactions
  - ✓ "Verifying ID... ✓ Verified!"
  - ✓ Animated checkmarks, loading spinners
  - ✗ Silence = perceived lag

---

## Conversion Optimization

### Friction Reduction

| Stage | Friction Point | Solution |
|-------|---|---|
| Sign-up | Email complexity | Phone OTP first |
| Identity Verification | Rejected selfies | Real-time liveness feedback |
| Document Upload | Poor file quality | Auto-crop + focus hints |
| Financial Data | Manual entry | OAuth pre-fill |
| Loan Selection | Analysis paralysis | Smart recommendations |

### Incentive Structures

```
Individual Borrower:
├─ Complete identity → Unlock higher loan amounts
├─ Connect financial data → Get instant assessment
├─ Approve loan → Get funds in 24hrs
└─ Invite friends → Earn referral bonus

Business Borrower:
├─ Complete KYB → Priority approval queue
├─ Add second business → Manage from one dashboard
├─ Accept loan → Get funded within 48hrs
└─ Refer another business → Get fee waiver

Lender:
├─ Set up loan products → Get access to applicant pool
├─ Approve first loan → Earn first return
├─ Fund 5 loans → Unlock advanced analytics
└─ Maintain 95%+ repayment → Get better rates
```

---

## Error Handling & Recovery

### Document Rejection Scenarios

**IF: ID Upload Rejected** 
```
Screen: "We couldn't verify your ID"
Reason: "The ID image is blurry. Please try again."

Options:
├─ [Retake photo]
├─ [Upload existing file]
├─ [Contact support]
└─ Help tip: "Make sure the entire document is visible and text is clear"

Email: Send tips on how to take a better photo
```

**IF: Business Certificate Not Found in Registry**
```
Screen: "We couldn't verify your registration"

Possible Reasons:
├─ Registration number incorrect
├─ Business registered under different name
├─ Certificate expired
└─ We're still checking the government registry

Options:
├─ [Update registration info]
├─ [Contact support for manual review]
└─ Timeline: "Manual review: 2-5 business days"

Email: Ask user to provide additional clarification
```

**IF: Financial Data Connection Failed**
```
Screen: "Couldn't connect to your bank"

Reasons Might Include:
├─ Account number incorrect
├─ Bank not in our system yet
├─ Bank is temporarily unavailable
└─ Wrong account type

Options:
├─ [Try again]
├─ [Upload bank statements manually]
├─ [Call support]
└─ Help: "M-Pesa? Try entering your phone number instead"
```

---

## Success Metrics & KPIs

**Track These:**
```
Landing Page:
├─ CTR on "Get Started"
└─ Traffic source breakdown

Role Selection:
├─ Selection distribution (Individual vs Business vs Lender)
└─ Bounce rate

Onboarding Completion:
├─ Individual: Completion rate (target: 85%+)
├─ Business: Completion rate (target: 75%+)
└─ Lender: Completion rate (target: 70%+)

Identity Verification:
├─ First-pass success rate (target: 90%+)
├─ Average time to complete
└─ Selfie rejection rate (goal: <10%)

Financial Data Linking:
├─ Connection success rate
├─ M-Pesa vs Bank preference (%)
└─ Data quality score

Approval Rates:
├─ Individual: % auto-approved (target: 60%+)
├─ Business: % auto-approved (target: 40%+)
├─ Lender: % approved (target: 80%+, manual review)

Time to Value:
├─ Individual: Avg time to assessment (target: <5 min)
├─ Business: Avg time to assessment (target: <8 min)
├─ Lender: Avg time to go live (target: <2 days)
```

---

## Implementation Priority

### Phase 1 (MVP - Weeks 1-4)
- Landing page with role selection
- Phone OTP + Email sign-up
- Individual borrower onboarding (simplified)

### Phase 2 (Weeks 5-8)
- Business borrower onboarding
- Document verification (OCR)
- Financial data linking (M-Pesa)

### Phase 3 (Weeks 9-12)
- Lender onboarding
- Certificate verification
- Loan product configuration

### Phase 4+ (Optimization)
- Bank integrations
- Advanced AI assessment features
- Analytics dashboard

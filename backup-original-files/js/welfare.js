// Welfare Schemes Functionality
let welfareSchemes = [];
let userApplications = [];
let currentScheme = null;
let isAadhaarVerified = false;

// Mock welfare schemes data
const schemesData = {
  eligible: [
    {
      id: 1,
      name: "PM-KISAN Scheme",
      description:
        "Income support of ₹6,000 per year for eligible farmer families",
      eligibility:
        "Small and marginal farmers with less than 2 hectares of land",
      benefits: "₹6,000 per year in three equal installments",
      documents: ["Aadhaar Card", "Land Records", "Bank Account Details"],
      applicationProcess:
        "Apply online through the PM-KISAN portal or visit your nearest Common Service Center",
      amount: "₹6,000/year",
      ministry: "Ministry of Agriculture & Farmers Welfare",
      category: "Agriculture",
      status: "Eligible",
      icon: "fas fa-seedling",
    },
    {
      id: 2,
      name: "Pradhan Mantri Awas Yojana",
      description: "Housing subsidy for construction of houses",
      eligibility: "Households with annual income less than ₹3 lakhs",
      benefits: "Financial assistance of ₹1.5 lakhs for construction of houses",
      documents: [
        "Aadhaar Card",
        "Income Certificate",
        "Land Documents",
        "Bank Account Details",
      ],
      applicationProcess:
        "Apply through your local Gram Panchayat or Municipal Corporation",
      amount: "₹1.5 Lakhs",
      ministry: "Ministry of Housing & Urban Affairs",
      category: "Housing",
      status: "Eligible",
      icon: "fas fa-home",
    },
    {
      id: 3,
      name: "Mahatma Gandhi NREGA",
      description: "100 days of guaranteed wage employment in rural areas",
      eligibility:
        "Adult members of rural households willing to do unskilled manual work",
      benefits:
        "Minimum 100 days of guaranteed wage employment per household per year",
      documents: ["Aadhaar Card", "Job Card", "Bank Account Details"],
      applicationProcess: "Register at local Gram Panchayat office",
      amount: "₹200-300/day",
      ministry: "Ministry of Rural Development",
      category: "Employment",
      status: "Eligible",
      icon: "fas fa-hammer",
    },
  ],
  other: [
    {
      id: 101,
      name: "Pradhan Mantri Jeevan Jyoti Bima Yojana",
      description: "Life insurance scheme for the poor",
      eligibility: "Individuals aged 18-50 years with a bank account",
      benefits:
        "Life insurance cover of ₹2 lakhs for a premium of ₹330 per year",
      documents: ["Aadhaar Card", "Bank Account Details"],
      applicationProcess: "Apply through your bank branch",
      amount: "₹2 Lakhs cover",
      ministry: "Ministry of Finance",
      category: "Insurance",
      status: "Check Eligibility",
      icon: "fas fa-shield-alt",
    },
    {
      id: 102,
      name: "Pradhan Mantri Suraksha Bima Yojana",
      description: "Accident insurance scheme",
      eligibility: "Individuals aged 18-70 years with a bank account",
      benefits:
        "Accident insurance cover of ₹2 lakhs for a premium of ₹12 per year",
      documents: ["Aadhaar Card", "Bank Account Details"],
      applicationProcess: "Apply through your bank branch",
      amount: "₹2 Lakhs cover",
      ministry: "Ministry of Finance",
      category: "Insurance",
      status: "Check Eligibility",
      icon: "fas fa-heartbeat",
    },
    {
      id: 103,
      name: "Atal Pension Yojana",
      description: "Pension scheme for unorganized sector workers",
      eligibility: "Individuals aged 18-40 years",
      benefits:
        "Fixed pension of ₹1,000 to ₹5,000 per month after the age of 60",
      documents: ["Aadhaar Card", "Bank Account Details"],
      applicationProcess: "Apply through your bank branch",
      amount: "₹1,000-5,000/month",
      ministry: "Ministry of Finance",
      category: "Pension",
      status: "Check Eligibility",
      icon: "fas fa-piggy-bank",
    },
    {
      id: 104,
      name: "Pradhan Mantri Mudra Yojana",
      description: "Micro-finance scheme for small businesses",
      eligibility: "Non-corporate, non-farm small/micro enterprises",
      benefits: "Loans up to ₹10 lakhs for business development",
      documents: [
        "Aadhaar Card",
        "Business Plan",
        "Bank Account Details",
        "ID Proof",
      ],
      applicationProcess: "Apply through banks, NBFCs, or MFIs",
      amount: "Up to ₹10 Lakhs",
      ministry: "Ministry of Finance",
      category: "Business",
      status: "Check Eligibility",
      icon: "fas fa-store",
    },
  ],
};

// Initialize page
document.addEventListener("DOMContentLoaded", function () {
  loadWelfareSchemes();
  loadUserApplications();
  updateSchemeStats();
  displayEligibleSchemes();
  displayOtherSchemes();
  displayMyApplications();
});

function loadWelfareSchemes() {
  welfareSchemes = [...schemesData.eligible, ...schemesData.other];
}

function loadUserApplications() {
  const stored = localStorage.getItem("welfareApplications");
  userApplications = stored ? JSON.parse(stored) : [];
}

function saveUserApplications() {
  localStorage.setItem("welfareApplications", JSON.stringify(userApplications));
}

function updateSchemeStats() {
  const eligibleCount = schemesData.eligible.length;
  const appliedCount = userApplications.length;
  const pendingCount = userApplications.filter(
    (app) => app.status === "Pending"
  ).length;
  const approvedCount = userApplications.filter(
    (app) => app.status === "Approved"
  ).length;

  document.getElementById("eligibleSchemes").textContent = eligibleCount;
  document.getElementById("appliedSchemes").textContent = appliedCount;
  document.getElementById("pendingSchemes").textContent = pendingCount;
  document.getElementById("approvedSchemes").textContent = approvedCount;
}

function displayEligibleSchemes() {
  const container = document.getElementById("eligibleSchemesList");

  container.innerHTML = schemesData.eligible
    .map(
      (scheme) => `
        <div class="col-md-6 mb-4">
            <div class="card h-100 scheme-card">
                <div class="card-body">
                    <div class="d-flex align-items-center mb-3">
                        <div class="scheme-icon me-3">
                            <i class="${scheme.icon} fa-2x text-primary"></i>
                        </div>
                        <div>
                            <h5 class="card-title mb-1">${scheme.name}</h5>
                            <span class="badge bg-success">
                                <i class="fas fa-check-circle me-1"></i>${
                                  scheme.status
                                }
                            </span>
                        </div>
                    </div>
                    
                    <p class="card-text text-muted">${scheme.description}</p>
                    
                    <div class="scheme-details">
                        <div class="row mb-3">
                            <div class="col-sm-6">
                                <h6 class="text-primary mb-1">Benefits</h6>
                                <p class="small mb-0">${scheme.benefits}</p>
                            </div>
                            <div class="col-sm-6">
                                <h6 class="text-primary mb-1">Amount</h6>
                                <p class="small mb-0 fw-bold text-success">${
                                  scheme.amount
                                }</p>
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <h6 class="text-primary mb-1">Eligibility</h6>
                            <p class="small mb-0">${scheme.eligibility}</p>
                        </div>
                        
                        <div class="mb-3">
                            <h6 class="text-primary mb-1">Required Documents</h6>
                            <div class="d-flex flex-wrap gap-1">
                                ${scheme.documents
                                  .slice(0, 2)
                                  .map(
                                    (doc) =>
                                      `<span class="badge bg-light text-dark">${doc}</span>`
                                  )
                                  .join("")}
                                ${
                                  scheme.documents.length > 2
                                    ? `<span class="badge bg-secondary">+${
                                        scheme.documents.length - 2
                                      } more</span>`
                                    : ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-transparent">
                    <div class="d-grid">
                        ${
                          isAlreadyApplied(scheme.id)
                            ? `<button class="btn btn-success" disabled>
                                <i class="fas fa-check me-1"></i>Applied
                            </button>`
                            : `<button class="btn btn-primary" onclick="applyForScheme(${scheme.id})">
                                <i class="fas fa-paper-plane me-1"></i>Apply Now
                            </button>`
                        }
                    </div>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

function displayOtherSchemes() {
  const container = document.getElementById("otherSchemesList");

  container.innerHTML = schemesData.other
    .map(
      (scheme) => `
        <div class="col-md-6 mb-4">
            <div class="card h-100 scheme-card">
                <div class="card-body">
                    <div class="d-flex align-items-center mb-3">
                        <div class="scheme-icon me-3">
                            <i class="${scheme.icon} fa-2x text-secondary"></i>
                        </div>
                        <div>
                            <h5 class="card-title mb-1">${scheme.name}</h5>
                            <span class="badge bg-warning">
                                <i class="fas fa-question-circle me-1"></i>${scheme.status}
                            </span>
                        </div>
                    </div>
                    
                    <p class="card-text text-muted">${scheme.description}</p>
                    
                    <div class="scheme-details">
                        <div class="row mb-3">
                            <div class="col-sm-6">
                                <h6 class="text-primary mb-1">Benefits</h6>
                                <p class="small mb-0">${scheme.benefits}</p>
                            </div>
                            <div class="col-sm-6">
                                <h6 class="text-primary mb-1">Amount</h6>
                                <p class="small mb-0 fw-bold text-success">${scheme.amount}</p>
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <h6 class="text-primary mb-1">Eligibility</h6>
                            <p class="small mb-0">${scheme.eligibility}</p>
                        </div>
                        
                        <div class="mb-3">
                            <h6 class="text-primary mb-1">Category</h6>
                            <span class="badge bg-info">${scheme.category}</span>
                        </div>
                    </div>
                </div>
                <div class="card-footer bg-transparent">
                    <div class="d-grid">
                        <button class="btn btn-outline-primary" onclick="checkEligibility(${scheme.id})">
                            <i class="fas fa-search me-1"></i>Check Eligibility
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

function displayMyApplications() {
  const container = document.getElementById("myApplicationsList");

  if (userApplications.length === 0) {
    container.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-file-alt fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">No Applications Yet</h5>
                <p class="text-muted">You haven't applied to any welfare schemes yet.</p>
                <button class="btn btn-primary" onclick="document.getElementById('eligible-tab').click()">
                    <i class="fas fa-search me-1"></i>Browse Eligible Schemes
                </button>
            </div>
        `;
    return;
  }

  container.innerHTML = userApplications
    .map(
      (application) => `
        <div class="card mb-3 application-card">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-8">
                        <div class="d-flex align-items-center mb-2">
                            <h5 class="card-title mb-0 me-3">${
                              application.schemeName
                            }</h5>
                            <span class="badge bg-${getStatusColor(
                              application.status
                            )}">${application.status}</span>
                        </div>
                        <p class="text-muted mb-2">
                            <i class="fas fa-calendar me-1"></i>Applied: ${formatDate(
                              application.appliedDate
                            )}
                            ${
                              application.lastUpdated
                                ? `• <i class="fas fa-clock me-1"></i>Updated: ${formatDate(
                                    application.lastUpdated
                                  )}`
                                : ""
                            }
                        </p>
                        <p class="card-text">${application.description}</p>
                        ${
                          application.amount
                            ? `
                            <p class="mb-0">
                                <strong class="text-success">Amount: ${application.amount}</strong>
                            </p>
                        `
                            : ""
                        }
                    </div>
                    <div class="col-md-4 text-md-end">
                        <div class="mb-2">
                            <small class="text-muted">Application ID</small><br>
                            <strong>WEL-${application.id}</strong>
                        </div>
                        <div class="d-grid gap-2">
                            <button class="btn btn-outline-primary btn-sm" onclick="viewApplication(${
                              application.id
                            })">
                                <i class="fas fa-eye me-1"></i>View Details
                            </button>
                            ${
                              application.status === "Pending"
                                ? `
                                <button class="btn btn-outline-secondary btn-sm" onclick="editApplication(${application.id})">
                                    <i class="fas fa-edit me-1"></i>Edit
                                </button>
                            `
                                : ""
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

function applyForScheme(schemeId) {
  const scheme = welfareSchemes.find((s) => s.id === schemeId);
  if (!scheme) return;

  currentScheme = scheme;

  if (!isAadhaarVerified) {
    showAadhaarVerification();
    return;
  }

  showApplicationForm();
}

function checkEligibility(schemeId) {
  const scheme = welfareSchemes.find((s) => s.id === schemeId);
  if (!scheme) return;

  currentScheme = scheme;

  const modal = new bootstrap.Modal(
    document.getElementById("eligibilityCheckModal")
  );
  document.getElementById("eligibilityCheckContent").innerHTML = `
        <div class="text-center py-3">
            <div class="spinner-border text-primary mb-3" role="status">
                <span class="visually-hidden">Checking eligibility...</span>
            </div>
            <p class="text-muted">Checking your eligibility for ${scheme.name}...</p>
        </div>
    `;

  modal.show();

  // Simulate eligibility check
  setTimeout(() => {
    const isEligible = Math.random() > 0.3; // 70% chance of being eligible

    document.getElementById("eligibilityCheckContent").innerHTML = `
            <div class="text-center py-4">
                <i class="fas fa-${
                  isEligible
                    ? "check-circle text-success"
                    : "times-circle text-warning"
                } fa-4x mb-3"></i>
                <h4 class="mb-3">${
                  isEligible ? "You are Eligible!" : "Eligibility Check Result"
                }</h4>
                <p class="text-muted mb-4">
                    ${
                      isEligible
                        ? "Based on your profile, you are eligible for this scheme. You can now apply."
                        : "Based on your current profile, you may not be eligible for this scheme. Please check the eligibility criteria or contact support."
                    }
                </p>
                ${
                  isEligible
                    ? `
                    <div class="alert alert-success">
                        <strong>Next Steps:</strong> Click "Proceed to Apply" to start your application process.
                    </div>
                `
                    : `
                    <div class="alert alert-warning">
                        <strong>Note:</strong> Eligibility criteria may vary. You can still try applying or contact our support team for clarification.
                    </div>
                `
                }
            </div>
        `;

    document.getElementById("proceedToApplyBtn").style.display = isEligible
      ? "inline-block"
      : "none";
  }, 2000);
}

function proceedToApply() {
  bootstrap.Modal.getInstance(
    document.getElementById("eligibilityCheckModal")
  ).hide();

  if (!isAadhaarVerified) {
    showAadhaarVerification();
    return;
  }

  showApplicationForm();
}

function showAadhaarVerification() {
  new bootstrap.Modal(
    document.getElementById("aadhaarVerificationModal")
  ).show();
}

function sendAadhaarOtp() {
  const aadhaarNumber = document.getElementById("aadhaarNumber").value;

  if (!aadhaarNumber || aadhaarNumber.length !== 12) {
    showAlert("Please enter a valid 12-digit Aadhaar number", "warning");
    return;
  }

  // Show OTP section
  document.getElementById("otpSection").style.display = "block";
  document.getElementById("sendOtpBtn").style.display = "none";
  document.getElementById("verifyOtpBtn").style.display = "inline-block";

  showAlert("OTP sent to your registered mobile number", "info");
}

function verifyAadhaarOtp() {
  const otp = document.getElementById("aadhaarOtp").value;

  if (!otp || otp.length !== 6) {
    showAlert("Please enter a valid 6-digit OTP", "warning");
    return;
  }

  // Simulate OTP verification
  setTimeout(() => {
    isAadhaarVerified = true;
    bootstrap.Modal.getInstance(
      document.getElementById("aadhaarVerificationModal")
    ).hide();
    showAlert("Aadhaar verified successfully!", "success");

    // Reset form
    document.getElementById("aadhaarForm").reset();
    document.getElementById("otpSection").style.display = "none";
    document.getElementById("sendOtpBtn").style.display = "inline-block";
    document.getElementById("verifyOtpBtn").style.display = "none";

    // Show application form
    showApplicationForm();
  }, 1000);
}

function showApplicationForm() {
  if (!currentScheme) return;

  const modal = new bootstrap.Modal(
    document.getElementById("applySchemeModal")
  );
  document.getElementById(
    "applySchemeTitle"
  ).textContent = `Apply for ${currentScheme.name}`;

  document.getElementById("applySchemeContent").innerHTML = `
        <form id="schemeApplicationForm">
            <div class="row mb-4">
                <div class="col-12">
                    <div class="alert alert-info">
                        <h6 class="alert-heading">Scheme Details</h6>
                        <p class="mb-0">${currentScheme.description}</p>
                        <small class="text-muted">Benefits: ${
                          currentScheme.benefits
                        }</small>
                    </div>
                </div>
            </div>

            <h6 class="text-primary mb-3">Personal Information</h6>
            <div class="row mb-3">
                <div class="col-md-6">
                    <label class="form-label">Full Name *</label>
                    <input type="text" class="form-control" id="fullName" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Worker ID</label>
                    <input type="text" class="form-control" value="MIG-12345" disabled>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-md-6">
                    <label class="form-label">Aadhaar Number *</label>
                    <input type="text" class="form-control" id="aadhaarNumber" placeholder="XXXX-XXXX-XXXX" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Phone Number *</label>
                    <input type="tel" class="form-control" id="phoneNumber" required>
                </div>
            </div>
            <div class="mb-3">
                <label class="form-label">Address *</label>
                <textarea class="form-control" id="address" rows="2" required></textarea>
            </div>

            <h6 class="text-primary mb-3">Bank Details</h6>
            <div class="row mb-3">
                <div class="col-md-6">
                    <label class="form-label">Bank Account Number *</label>
                    <input type="text" class="form-control" id="bankAccount" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label">IFSC Code *</label>
                    <input type="text" class="form-control" id="ifscCode" required>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-md-6">
                    <label class="form-label">Annual Income (₹) *</label>
                    <input type="number" class="form-control" id="annualIncome" required>
                </div>
                <div class="col-md-6">
                    <label class="form-label">Occupation</label>
                    <select class="form-select" id="occupation">
                        <option value="">Select Occupation</option>
                        <option value="construction">Construction Worker</option>
                        <option value="domestic">Domestic Worker</option>
                        <option value="agriculture">Agriculture Worker</option>
                        <option value="manufacturing">Manufacturing Worker</option>
                        <option value="transport">Transport Worker</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>

            <h6 class="text-primary mb-3">Required Documents</h6>
            <div class="mb-3">
                <p class="text-muted small">Please upload the following documents:</p>
                ${currentScheme.documents
                  .map(
                    (doc) => `
                    <div class="document-upload mb-2">
                        <label class="form-label small">${doc}</label>
                        <input type="file" class="form-control form-control-sm" accept=".pdf,.jpg,.jpeg,.png">
                    </div>
                `
                  )
                  .join("")}
            </div>

            <div class="mb-3">
                <label class="form-label">Additional Information</label>
                <textarea class="form-control" id="additionalInfo" rows="3" 
                    placeholder="Any additional information that might be relevant to your application..."></textarea>
            </div>

            <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" id="declaration" required>
                <label class="form-check-label" for="declaration">
                    I declare that all the information provided is accurate and I have attached all required documents.
                </label>
            </div>
        </form>

        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" onclick="submitApplication()">
                <i class="fas fa-paper-plane me-1"></i>Submit Application
            </button>
        </div>
    `;

  modal.show();
}

function submitApplication() {
  const form = document.getElementById("schemeApplicationForm");
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const fullName = document.getElementById("fullName").value;
  const phoneNumber = document.getElementById("phoneNumber").value;
  const address = document.getElementById("address").value;
  const bankAccount = document.getElementById("bankAccount").value;
  const ifscCode = document.getElementById("ifscCode").value;
  const annualIncome = document.getElementById("annualIncome").value;
  const occupation = document.getElementById("occupation").value;
  const additionalInfo = document.getElementById("additionalInfo").value;

  const application = {
    id: Date.now(),
    schemeId: currentScheme.id,
    schemeName: currentScheme.name,
    description: currentScheme.description,
    amount: currentScheme.amount,
    appliedDate: new Date().toISOString().split("T")[0],
    status: "Pending",
    personalInfo: {
      fullName,
      phoneNumber,
      address,
      bankAccount,
      ifscCode,
      annualIncome: parseInt(annualIncome),
      occupation,
    },
    additionalInfo,
  };

  userApplications.unshift(application);
  saveUserApplications();

  // Close modal
  bootstrap.Modal.getInstance(
    document.getElementById("applySchemeModal")
  ).hide();

  // Update displays
  updateSchemeStats();
  displayEligibleSchemes();
  displayMyApplications();

  // Switch to applications tab
  document.getElementById("my-applications-tab").click();

  showAlert(
    `Application submitted successfully! Reference ID: WEL-${application.id}`,
    "success"
  );
}

function viewApplication(applicationId) {
  const application = userApplications.find((app) => app.id === applicationId);
  if (!application) return;

  const modal = new bootstrap.Modal(
    document.getElementById("applySchemeModal")
  );
  document.getElementById(
    "applySchemeTitle"
  ).textContent = `Application Details - WEL-${application.id}`;

  document.getElementById("applySchemeContent").innerHTML = `
        <div class="row">
            <div class="col-md-8">
                <div class="mb-4">
                    <h6 class="text-primary">Application Information</h6>
                    <table class="table table-borderless">
                        <tr><td class="fw-bold">Reference ID:</td><td>WEL-${
                          application.id
                        }</td></tr>
                        <tr><td class="fw-bold">Scheme:</td><td>${
                          application.schemeName
                        }</td></tr>
                        <tr><td class="fw-bold">Applied Date:</td><td>${formatDate(
                          application.appliedDate
                        )}</td></tr>
                        <tr><td class="fw-bold">Status:</td><td><span class="badge bg-${getStatusColor(
                          application.status
                        )}">${application.status}</span></td></tr>
                        <tr><td class="fw-bold">Expected Amount:</td><td class="text-success fw-bold">${
                          application.amount
                        }</td></tr>
                    </table>
                </div>

                <div class="mb-4">
                    <h6 class="text-primary">Personal Information</h6>
                    <table class="table table-borderless">
                        <tr><td class="fw-bold">Name:</td><td>${
                          application.personalInfo.fullName
                        }</td></tr>
                        <tr><td class="fw-bold">Phone:</td><td>${
                          application.personalInfo.phoneNumber
                        }</td></tr>
                        <tr><td class="fw-bold">Address:</td><td>${
                          application.personalInfo.address
                        }</td></tr>
                        <tr><td class="fw-bold">Annual Income:</td><td>₹${application.personalInfo.annualIncome.toLocaleString()}</td></tr>
                        ${
                          application.personalInfo.occupation
                            ? `<tr><td class="fw-bold">Occupation:</td><td>${application.personalInfo.occupation}</td></tr>`
                            : ""
                        }
                    </table>
                </div>

                ${
                  application.additionalInfo
                    ? `
                    <div class="mb-4">
                        <h6 class="text-primary">Additional Information</h6>
                        <p>${application.additionalInfo}</p>
                    </div>
                `
                    : ""
                }
            </div>

            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h6 class="card-title">Application Status</h6>
                        <div class="status-timeline">
                            <div class="status-item ${
                              application.status !== "Rejected"
                                ? "completed"
                                : ""
                            }">
                                <i class="fas fa-paper-plane"></i>
                                <span>Submitted</span>
                            </div>
                            <div class="status-item ${
                              application.status === "Under Review" ||
                              application.status === "Approved"
                                ? "completed"
                                : application.status === "Rejected"
                                ? "rejected"
                                : ""
                            }">
                                <i class="fas fa-search"></i>
                                <span>Under Review</span>
                            </div>
                            <div class="status-item ${
                              application.status === "Approved"
                                ? "completed"
                                : application.status === "Rejected"
                                ? "rejected"
                                : ""
                            }">
                                <i class="fas fa-${
                                  application.status === "Approved"
                                    ? "check"
                                    : application.status === "Rejected"
                                    ? "times"
                                    : "clock"
                                }"></i>
                                <span>${
                                  application.status === "Rejected"
                                    ? "Rejected"
                                    : "Decision"
                                }</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card mt-3">
                    <div class="card-body">
                        <h6 class="card-title">Next Steps</h6>
                        <p class="small text-muted">
                            ${getNextStepsMessage(application.status)}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
    `;

  modal.show();
}

// Utility functions
function isAlreadyApplied(schemeId) {
  return userApplications.some((app) => app.schemeId === schemeId);
}

function getStatusColor(status) {
  switch (status) {
    case "Pending":
      return "warning";
    case "Under Review":
      return "info";
    case "Approved":
      return "success";
    case "Rejected":
      return "danger";
    default:
      return "secondary";
  }
}

function getNextStepsMessage(status) {
  switch (status) {
    case "Pending":
      return "Your application is in queue for review. We will notify you once the review process begins.";
    case "Under Review":
      return "Our team is currently reviewing your application. You will be notified of the decision soon.";
    case "Approved":
      return "Congratulations! Your application has been approved. Benefits will be processed as per scheme guidelines.";
    case "Rejected":
      return "Unfortunately, your application was not approved. You can contact support for more information.";
    default:
      return "Please wait for updates on your application status.";
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function showAlert(message, type) {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
  alertDiv.style.zIndex = "9999";
  alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

  document.body.appendChild(alertDiv);

  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.remove();
    }
  }, 5000);
}

// CSS for status timeline and cards
const style = document.createElement("style");
style.textContent = `
    .scheme-card {
        transition: transform 0.2s, box-shadow 0.2s;
    }
    .scheme-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15) !important;
    }
    .scheme-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 60px;
        background: rgba(var(--bs-primary-rgb), 0.1);
        border-radius: 12px;
    }
    .application-card {
        transition: transform 0.2s, box-shadow 0.2s;
    }
    .application-card:hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
    }
    .status-timeline {
        position: relative;
    }
    .status-item {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        position: relative;
    }
    .status-item i {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #e9ecef;
        color: #6c757d;
        font-size: 12px;
        margin-right: 10px;
    }
    .status-item.completed i {
        background: #28a745;
        color: white;
    }
    .status-item.rejected i {
        background: #dc3545;
        color: white;
    }
    .document-upload {
        border: 1px solid #dee2e6;
        border-radius: 4px;
        padding: 8px;
        background: #f8f9fa;
    }
`;
document.head.appendChild(style);

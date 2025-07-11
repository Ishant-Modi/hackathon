// Modern Welfare JavaScript for MigrantConnect - Tailwind Compatible

// Modal utility functions for Tailwind CSS
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("hidden");
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
}

function hideModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("hidden");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

// Welfare scheme categories
const welfareCategories = [
  {
    id: "employment",
    name: "Employment",
    icon: "fas fa-briefcase",
    color: "blue",
    schemes: 12,
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: "fas fa-heart",
    color: "red",
    schemes: 8,
  },
  {
    id: "education",
    name: "Education",
    icon: "fas fa-graduation-cap",
    color: "green",
    schemes: 6,
  },
  {
    id: "housing",
    name: "Housing",
    icon: "fas fa-home",
    color: "purple",
    schemes: 9,
  },
  {
    id: "financial",
    name: "Financial Aid",
    icon: "fas fa-money-bill-wave",
    color: "yellow",
    schemes: 11,
  },
  {
    id: "social",
    name: "Social Security",
    icon: "fas fa-shield-alt",
    color: "indigo",
    schemes: 7,
  },
];

// Welfare schemes data
const welfareSchemes = [
  {
    id: "SCHEME001",
    name: "Migrant Worker Employment Guarantee",
    category: "employment",
    description:
      "Guaranteed employment for 100 days per year for migrant workers.",
    eligibility: [
      "Valid migrant worker ID",
      "Age 18-60 years",
      "Unemployment certificate",
    ],
    benefits: [
      "Minimum wage guarantee",
      "Work within 15 days of application",
      "Skill development",
    ],
    applicationProcess:
      "Apply online through MigrantConnect portal or visit nearest employment office.",
    documents: ["Aadhaar Card", "Migrant Worker ID", "Bank Account Details"],
    status: "active",
    deadline: "2025-12-31",
    beneficiaries: 15000,
  },
  {
    id: "SCHEME002",
    name: "Universal Health Insurance",
    category: "healthcare",
    description:
      "Comprehensive health insurance coverage for migrant workers and their families.",
    eligibility: [
      "Registered migrant worker",
      "Family income below ₹5 lakhs",
      "Valid health card",
    ],
    benefits: ["₹5 lakh coverage", "Cashless treatment", "Medicine coverage"],
    applicationProcess:
      "Register at health centers or apply online with required documents.",
    documents: ["Aadhaar Card", "Income Certificate", "Family Photos"],
    status: "active",
    deadline: "Ongoing",
    beneficiaries: 25000,
  },
  {
    id: "SCHEME003",
    name: "Children Education Support",
    category: "education",
    description:
      "Educational support and scholarships for children of migrant workers.",
    eligibility: [
      "Parent is registered migrant worker",
      "Child age 6-18 years",
      "School enrollment",
    ],
    benefits: [
      "School fee support",
      "Books and uniform allowance",
      "Scholarship for higher studies",
    ],
    applicationProcess:
      "Apply through school or education department with required documents.",
    documents: [
      "Birth Certificate",
      "School Enrollment",
      "Parent's Migrant ID",
    ],
    status: "active",
    deadline: "2025-08-31",
    beneficiaries: 8500,
  },
  {
    id: "SCHEME004",
    name: "Affordable Housing Scheme",
    category: "housing",
    description:
      "Subsidized housing and rental assistance for migrant workers.",
    eligibility: [
      "Registered migrant worker",
      "No owned property",
      "Income below ₹3 lakhs",
    ],
    benefits: [
      "Subsidized rent",
      "Priority housing allocation",
      "Home loan assistance",
    ],
    applicationProcess:
      "Apply at housing department or online portal with income proof.",
    documents: [
      "Income Certificate",
      "No Property Certificate",
      "Bank Statements",
    ],
    status: "active",
    deadline: "Ongoing",
    beneficiaries: 12000,
  },
  {
    id: "SCHEME005",
    name: "Emergency Financial Aid",
    category: "financial",
    description: "Quick financial assistance during emergencies and job loss.",
    eligibility: [
      "Registered migrant worker",
      "Proof of emergency",
      "Valid bank account",
    ],
    benefits: [
      "Up to ₹10,000 emergency aid",
      "Quick disbursement",
      "No collateral required",
    ],
    applicationProcess:
      "Submit emergency application with supporting documents at welfare office.",
    documents: ["Emergency Proof", "Bank Account Details", "Identity Proof"],
    status: "active",
    deadline: "Ongoing",
    beneficiaries: 5000,
  },
  {
    id: "SCHEME006",
    name: "Pension and Retirement",
    category: "social",
    description:
      "Social security pension for elderly and disabled migrant workers.",
    eligibility: [
      "Age 60+ or disabled",
      "Worked as migrant for 10+ years",
      "No other pension",
    ],
    benefits: [
      "Monthly pension ₹3,000",
      "Medical allowance",
      "Disability support",
    ],
    applicationProcess:
      "Apply at social security office with age and work proof.",
    documents: [
      "Age Proof",
      "Work History",
      "Disability Certificate (if applicable)",
    ],
    status: "active",
    deadline: "Ongoing",
    beneficiaries: 7500,
  },
];

// User applications for welfare schemes
let userWelfareApplications =
  JSON.parse(localStorage.getItem("userWelfareApplications")) || [];

// Initialize page
document.addEventListener("DOMContentLoaded", function () {
  loadWelfareCategories();
  loadWelfareSchemes();
  loadUserApplications();
  setupEventListeners();
});

function setupEventListeners() {
  // Search functionality
  const searchInput = document.getElementById("schemeSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", handleSchemeSearch);
  }

  // Filter functionality
  const categoryFilter = document.getElementById("categoryFilter");
  if (categoryFilter) {
    categoryFilter.addEventListener("change", handleCategoryFilter);
  }

  // Modal close buttons
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("modal-close")) {
      const modal = e.target.closest(".fixed");
      if (modal) {
        hideModal(modal.id);
      }
    }
  });

  // Application form
  const applicationForm = document.getElementById("applicationForm");
  if (applicationForm) {
    applicationForm.addEventListener("submit", handleApplicationSubmit);
  }
}

function loadWelfareCategories() {
  const container = document.getElementById("welfareCategoriesContainer");
  if (!container) return;

  container.innerHTML = welfareCategories
    .map(
      (category) => `
    <div class="card-feature cursor-pointer hover:shadow-lg transition-shadow" onclick="filterByCategory('${category.id}')">
      <div class="text-center">
        <i class="${category.icon} text-4xl text-${category.color}-600 mb-3"></i>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">${category.name}</h3>
        <p class="text-sm text-gray-600">${category.schemes} schemes available</p>
      </div>
    </div>
  `
    )
    .join("");
}

function loadWelfareSchemes(schemes = welfareSchemes) {
  const container = document.getElementById("welfareSchemesContainer");
  if (!container) return;

  if (schemes.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12">
        <i class="fas fa-search text-4xl text-gray-400 mb-4"></i>
        <h3 class="text-lg font-semibold text-gray-600 mb-2">No schemes found</h3>
        <p class="text-gray-500">Try adjusting your search criteria</p>
      </div>
    `;
    return;
  }

  container.innerHTML = schemes
    .map(
      (scheme) => `
    <div class="card-modern hover:shadow-lg transition-shadow">
      <div class="flex justify-between items-start mb-4">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-1">${
            scheme.name
          }</h3>
          <span class="badge-modern badge-${getCategoryColor(
            scheme.category
          )}-modern">${getCategoryName(scheme.category)}</span>
        </div>
        <div class="text-right">
          <span class="badge-modern badge-success-modern">${
            scheme.status
          }</span>
          <div class="text-xs text-gray-500 mt-1">${scheme.beneficiaries.toLocaleString()} beneficiaries</div>
        </div>
      </div>
      
      <div class="mb-4">
        <p class="text-sm text-gray-700 line-clamp-3">${scheme.description}</p>
      </div>
      
      <div class="mb-4">
        <h4 class="text-sm font-semibold text-gray-900 mb-2">Key Benefits:</h4>
        <ul class="space-y-1">
          ${scheme.benefits
            .slice(0, 2)
            .map(
              (benefit) => `
            <li class="text-xs text-gray-600 flex items-center">
              <i class="fas fa-check text-green-500 mr-2"></i>
              ${benefit}
            </li>
          `
            )
            .join("")}
          ${
            scheme.benefits.length > 2
              ? `<li class="text-xs text-gray-500">+${
                  scheme.benefits.length - 2
                } more benefits</li>`
              : ""
          }
        </ul>
      </div>
      
      <div class="flex items-center justify-between">
        <div class="text-sm text-gray-500">
          Deadline: ${scheme.deadline}
        </div>
        <div class="flex space-x-2">
          <button onclick="viewSchemeDetails('${
            scheme.id
          }')" class="btn-outline-modern">
            View Details
          </button>
          <button onclick="applyForScheme('${
            scheme.id
          }')" class="btn-primary-modern">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

function loadUserApplications() {
  const container = document.getElementById("userApplicationsContainer");
  if (!container) return;

  if (userWelfareApplications.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8">
        <i class="fas fa-clipboard-list text-4xl text-gray-400 mb-4"></i>
        <h3 class="text-lg font-semibold text-gray-600 mb-2">No applications yet</h3>
        <p class="text-gray-500">Start applying for welfare schemes to see your applications here</p>
      </div>
    `;
    return;
  }

  container.innerHTML = userWelfareApplications
    .map((app) => {
      const scheme = welfareSchemes.find((s) => s.id === app.schemeId);
      if (!scheme) return "";

      return `
      <div class="card-modern">
        <div class="flex justify-between items-start mb-3">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">${scheme.name}</h3>
            <span class="badge-modern badge-${getCategoryColor(
              scheme.category
            )}-modern">${getCategoryName(scheme.category)}</span>
          </div>
          <span class="badge-modern ${getApplicationStatusBadge(app.status)}">${
        app.status
      }</span>
        </div>
        
        <div class="text-sm text-gray-500 mb-3">
          Applied on: ${new Date(app.appliedDate).toLocaleDateString()}
          <br>Application ID: ${app.id}
        </div>
        
        <div class="flex space-x-2">
          <button onclick="viewSchemeDetails('${
            scheme.id
          }')" class="btn-outline-modern">
            View Scheme
          </button>
          <button onclick="trackApplication('${
            app.id
          }')" class="btn-primary-modern">
            Track Status
          </button>
        </div>
      </div>
    `;
    })
    .join("");
}

function getCategoryColor(categoryId) {
  const category = welfareCategories.find((c) => c.id === categoryId);
  return category ? category.color : "gray";
}

function getCategoryName(categoryId) {
  const category = welfareCategories.find((c) => c.id === categoryId);
  return category ? category.name : categoryId;
}

function getApplicationStatusBadge(status) {
  const badges = {
    submitted: "badge-info-modern",
    under_review: "badge-warning-modern",
    approved: "badge-success-modern",
    rejected: "badge-danger-modern",
    disbursed: "badge-primary-modern",
  };
  return badges[status] || "badge-info-modern";
}

function filterByCategory(categoryId) {
  const categoryFilter = document.getElementById("categoryFilter");
  if (categoryFilter) {
    categoryFilter.value = categoryId;
    handleCategoryFilter();
  }
}

function handleSchemeSearch() {
  const query = document
    .getElementById("schemeSearchInput")
    .value.toLowerCase();
  const filteredSchemes = welfareSchemes.filter(
    (scheme) =>
      scheme.name.toLowerCase().includes(query) ||
      scheme.description.toLowerCase().includes(query) ||
      scheme.benefits.some((benefit) => benefit.toLowerCase().includes(query))
  );
  loadWelfareSchemes(filteredSchemes);
}

function handleCategoryFilter() {
  const category = document.getElementById("categoryFilter").value;
  if (category === "all") {
    loadWelfareSchemes();
  } else {
    const filteredSchemes = welfareSchemes.filter(
      (scheme) => scheme.category === category
    );
    loadWelfareSchemes(filteredSchemes);
  }
}

function viewSchemeDetails(schemeId) {
  const scheme = welfareSchemes.find((s) => s.id === schemeId);
  if (!scheme) return;

  const modal = document.getElementById("schemeDetailsModal");
  if (modal) {
    // Populate modal with scheme details
    modal.querySelector("[data-scheme-name]").textContent = scheme.name;
    modal.querySelector("[data-scheme-category]").textContent = getCategoryName(
      scheme.category
    );
    modal.querySelector("[data-scheme-description]").textContent =
      scheme.description;
    modal.querySelector("[data-scheme-deadline]").textContent = scheme.deadline;
    modal.querySelector("[data-scheme-beneficiaries]").textContent =
      scheme.beneficiaries.toLocaleString();

    // Eligibility criteria
    const eligibilityContainer = modal.querySelector(
      "[data-scheme-eligibility]"
    );
    if (eligibilityContainer) {
      eligibilityContainer.innerHTML = scheme.eligibility
        .map(
          (criteria) =>
            `<li class="flex items-center text-sm text-gray-700 mb-2">
          <i class="fas fa-check text-green-500 mr-2"></i>
          ${criteria}
        </li>`
        )
        .join("");
    }

    // Benefits
    const benefitsContainer = modal.querySelector("[data-scheme-benefits]");
    if (benefitsContainer) {
      benefitsContainer.innerHTML = scheme.benefits
        .map(
          (benefit) =>
            `<li class="flex items-center text-sm text-gray-700 mb-2">
          <i class="fas fa-star text-yellow-500 mr-2"></i>
          ${benefit}
        </li>`
        )
        .join("");
    }

    // Required documents
    const documentsContainer = modal.querySelector("[data-scheme-documents]");
    if (documentsContainer) {
      documentsContainer.innerHTML = scheme.documents
        .map(
          (doc) =>
            `<li class="flex items-center text-sm text-gray-700 mb-2">
          <i class="fas fa-file-alt text-blue-500 mr-2"></i>
          ${doc}
        </li>`
        )
        .join("");
    }

    // Application process
    modal.querySelector("[data-scheme-process]").textContent =
      scheme.applicationProcess;

    // Apply button
    const applyBtn = modal.querySelector("[data-apply-btn]");
    if (applyBtn) {
      applyBtn.onclick = () => applyForScheme(schemeId);
    }

    showModal("schemeDetailsModal");
  }
}

function applyForScheme(schemeId) {
  const scheme = welfareSchemes.find((s) => s.id === schemeId);
  if (!scheme) return;

  // Check if already applied
  const existingApplication = userWelfareApplications.find(
    (app) => app.schemeId === schemeId
  );
  if (existingApplication) {
    alert("You have already applied for this scheme!");
    return;
  }

  // Show application form
  showModal("applicationModal");

  // Set scheme details in form
  const modal = document.getElementById("applicationModal");
  if (modal) {
    modal.querySelector("[data-form-scheme-name]").textContent = scheme.name;
    modal.setAttribute("data-scheme-id", schemeId);
  }
}

function handleApplicationSubmit(e) {
  e.preventDefault();

  const modal = document.getElementById("applicationModal");
  const schemeId = modal.getAttribute("data-scheme-id");

  if (!schemeId) return;

  const formData = new FormData(e.target);
  const application = {
    id: "APP" + Date.now(),
    schemeId: schemeId,
    status: "submitted",
    appliedDate: new Date().toISOString(),
    applicantName: formData.get("applicantName"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    documents: Array.from(formData.getAll("documents")),
  };

  userWelfareApplications.push(application);
  localStorage.setItem(
    "userWelfareApplications",
    JSON.stringify(userWelfareApplications)
  );

  // Show success message
  alert(
    "Application submitted successfully! You will receive updates on its status."
  );

  // Reset form and close modals
  e.target.reset();
  hideModal("applicationModal");
  hideModal("schemeDetailsModal");

  // Refresh displays
  loadUserApplications();
}

function trackApplication(applicationId) {
  const application = userWelfareApplications.find(
    (app) => app.id === applicationId
  );
  if (!application) return;

  const scheme = welfareSchemes.find((s) => s.id === application.schemeId);
  if (!scheme) return;

  alert(
    `Application Status for ${scheme.name}:\n\nStatus: ${
      application.status
    }\nApplication ID: ${application.id}\nApplied Date: ${new Date(
      application.appliedDate
    ).toLocaleDateString()}\n\nYou will receive SMS/Email updates on status changes.`
  );
}

function closeSchemeDetailsModal() {
  hideModal("schemeDetailsModal");
}

function closeApplicationModal() {
  hideModal("applicationModal");
}

// Global functions for compatibility
window.showModal = showModal;
window.hideModal = hideModal;
window.filterByCategory = filterByCategory;
window.viewSchemeDetails = viewSchemeDetails;
window.applyForScheme = applyForScheme;
window.trackApplication = trackApplication;
window.closeSchemeDetailsModal = closeSchemeDetailsModal;
window.closeApplicationModal = closeApplicationModal;

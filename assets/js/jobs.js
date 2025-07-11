// Modern Jobs JavaScript for MigrantConnect - Tailwind Compatible

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

// Job data and functionality
const jobCategories = [
  {
    id: "construction",
    name: "Construction",
    icon: "fas fa-hard-hat",
    color: "blue",
    jobs: 245,
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    icon: "fas fa-industry",
    color: "green",
    jobs: 156,
  },
  {
    id: "domestic",
    name: "Domestic Work",
    icon: "fas fa-home",
    color: "purple",
    jobs: 89,
  },
  {
    id: "delivery",
    name: "Delivery Services",
    icon: "fas fa-truck",
    color: "orange",
    jobs: 167,
  },
  {
    id: "retail",
    name: "Retail",
    icon: "fas fa-store",
    color: "pink",
    jobs: 134,
  },
  {
    id: "agriculture",
    name: "Agriculture",
    icon: "fas fa-seedling",
    color: "green",
    jobs: 78,
  },
];

const jobListings = [
  {
    id: "JOB001",
    title: "Construction Worker",
    company: "ABC Construction Ltd.",
    location: "Delhi, NCR",
    type: "Full Time",
    salary: "₹450-550/day",
    category: "construction",
    description:
      "Looking for experienced construction workers for building construction project.",
    requirements: [
      "Physical fitness",
      "Construction experience",
      "Safety awareness",
    ],
    benefits: ["Food provided", "Accommodation available", "Medical insurance"],
    posted: "2 days ago",
    applications: 15,
    verified: true,
  },
  {
    id: "JOB002",
    title: "Factory Worker",
    company: "Sunrise Manufacturing",
    location: "Gurgaon, Haryana",
    type: "Full Time",
    salary: "₹18,000-22,000/month",
    category: "manufacturing",
    description:
      "Production line worker needed for textile manufacturing unit.",
    requirements: ["Basic education", "Attention to detail", "Team work"],
    benefits: ["PF & ESI", "Transport facility", "Overtime payment"],
    posted: "1 day ago",
    applications: 23,
    verified: true,
  },
  {
    id: "JOB003",
    title: "Delivery Executive",
    company: "QuickDelivery Services",
    location: "Mumbai, Maharashtra",
    type: "Part Time",
    salary: "₹15,000-20,000/month",
    category: "delivery",
    description:
      "Delivery partners needed for food and package delivery services.",
    requirements: [
      "Valid driving license",
      "Own vehicle preferred",
      "Local area knowledge",
    ],
    benefits: ["Fuel allowance", "Flexible timing", "Performance bonus"],
    posted: "3 days ago",
    applications: 31,
    verified: false,
  },
  {
    id: "JOB004",
    title: "Housekeeping Staff",
    company: "Elite Home Services",
    location: "Bangalore, Karnataka",
    type: "Full Time",
    salary: "₹12,000-15,000/month",
    category: "domestic",
    description: "Housekeeping and cleaning staff for residential complexes.",
    requirements: [
      "Experience in housekeeping",
      "Trustworthy",
      "Good communication",
    ],
    benefits: ["Weekly off", "Uniform provided", "Annual bonus"],
    posted: "1 week ago",
    applications: 8,
    verified: true,
  },
  {
    id: "JOB005",
    title: "Sales Associate",
    company: "MegaMart Retail",
    location: "Pune, Maharashtra",
    type: "Full Time",
    salary: "₹14,000-18,000/month",
    category: "retail",
    description: "Customer service and sales support in retail store.",
    requirements: [
      "Good communication",
      "Customer service skills",
      "Basic math",
    ],
    benefits: ["Sales incentive", "Staff discount", "Career growth"],
    posted: "4 days ago",
    applications: 19,
    verified: true,
  },
  {
    id: "JOB006",
    title: "Farm Worker",
    company: "Green Valley Farms",
    location: "Punjab",
    type: "Seasonal",
    salary: "₹400-500/day",
    category: "agriculture",
    description:
      "Agricultural workers needed for crop harvesting and farming activities.",
    requirements: [
      "Physical strength",
      "Farm work experience",
      "Seasonal availability",
    ],
    benefits: ["Accommodation", "Meals provided", "Transport"],
    posted: "5 days ago",
    applications: 12,
    verified: true,
  },
];

// User applications data
let userApplications =
  JSON.parse(localStorage.getItem("userApplications")) || [];

// Initialize page
document.addEventListener("DOMContentLoaded", function () {
  loadJobCategories();
  loadJobListings();
  loadUserApplications();
  setupEventListeners();
});

function setupEventListeners() {
  // Search functionality
  const searchInput = document.getElementById("jobSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", handleJobSearch);
  }

  // Filter functionality
  const categoryFilter = document.getElementById("categoryFilter");
  if (categoryFilter) {
    categoryFilter.addEventListener("change", handleCategoryFilter);
  }

  const locationFilter = document.getElementById("locationFilter");
  if (locationFilter) {
    locationFilter.addEventListener("change", handleLocationFilter);
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
}

function loadJobCategories() {
  const container = document.getElementById("jobCategoriesContainer");
  if (!container) return;

  container.innerHTML = jobCategories
    .map(
      (category) => `
    <div class="card-feature cursor-pointer hover:shadow-lg transition-shadow" onclick="filterByCategory('${category.id}')">
      <div class="text-center">
        <i class="${category.icon} text-4xl text-${category.color}-600 mb-3"></i>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">${category.name}</h3>
        <p class="text-sm text-gray-600">${category.jobs} jobs available</p>
      </div>
    </div>
  `
    )
    .join("");
}

function loadJobListings(jobs = jobListings) {
  const container = document.getElementById("jobListingsContainer");
  if (!container) return;

  if (jobs.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12">
        <i class="fas fa-search text-4xl text-gray-400 mb-4"></i>
        <h3 class="text-lg font-semibold text-gray-600 mb-2">No jobs found</h3>
        <p class="text-gray-500">Try adjusting your search criteria</p>
      </div>
    `;
    return;
  }

  container.innerHTML = jobs
    .map(
      (job) => `
    <div class="card-modern hover:shadow-lg transition-shadow">
      <div class="flex justify-between items-start mb-4">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-1">${job.title}</h3>
          <p class="text-gray-600 mb-2">${job.company}</p>
          <div class="flex items-center text-sm text-gray-500">
            <i class="fas fa-map-marker-alt mr-1"></i>
            <span>${job.location}</span>
            <span class="mx-2">•</span>
            <span>${job.type}</span>
          </div>
        </div>
        <div class="text-right">
          ${
            job.verified
              ? '<span class="badge-modern badge-success-modern">Verified</span>'
              : ""
          }
        </div>
      </div>
      
      <div class="mb-4">
        <div class="text-lg font-semibold text-green-600 mb-2">${
          job.salary
        }</div>
        <p class="text-sm text-gray-700 line-clamp-2">${job.description}</p>
      </div>
      
      <div class="flex items-center justify-between">
        <div class="text-sm text-gray-500">
          <span>${job.posted}</span>
          <span class="mx-2">•</span>
          <span>${job.applications} applications</span>
        </div>
        <div class="flex space-x-2">
          <button onclick="viewJobDetails('${
            job.id
          }')" class="btn-outline-modern">
            View Details
          </button>
          <button onclick="applyForJob('${job.id}')" class="btn-primary-modern">
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

  if (userApplications.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8">
        <i class="fas fa-briefcase text-4xl text-gray-400 mb-4"></i>
        <h3 class="text-lg font-semibold text-gray-600 mb-2">No applications yet</h3>
        <p class="text-gray-500">Start applying for jobs to see your applications here</p>
      </div>
    `;
    return;
  }

  container.innerHTML = userApplications
    .map((app) => {
      const job = jobListings.find((j) => j.id === app.jobId);
      if (!job) return "";

      return `
      <div class="card-modern">
        <div class="flex justify-between items-start mb-3">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">${job.title}</h3>
            <p class="text-gray-600">${job.company}</p>
          </div>
          <span class="badge-modern ${getApplicationStatusBadge(app.status)}">${
        app.status
      }</span>
        </div>
        
        <div class="text-sm text-gray-500 mb-3">
          Applied on: ${new Date(app.appliedDate).toLocaleDateString()}
        </div>
        
        <div class="flex space-x-2">
          <button onclick="viewJobDetails('${
            job.id
          }')" class="btn-outline-modern">
            View Job
          </button>
          <button onclick="withdrawApplication('${
            app.id
          }')" class="btn-danger-modern">
            Withdraw
          </button>
        </div>
      </div>
    `;
    })
    .join("");
}

function getApplicationStatusBadge(status) {
  const badges = {
    applied: "badge-info-modern",
    reviewing: "badge-warning-modern",
    shortlisted: "badge-primary-modern",
    interviewed: "badge-secondary-modern",
    selected: "badge-success-modern",
    rejected: "badge-danger-modern",
  };
  return badges[status] || "badge-info-modern";
}

function handleJobSearch() {
  const query = document.getElementById("jobSearchInput").value.toLowerCase();
  const filteredJobs = jobListings.filter(
    (job) =>
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query) ||
      job.description.toLowerCase().includes(query)
  );
  loadJobListings(filteredJobs);
}

function handleCategoryFilter() {
  const category = document.getElementById("categoryFilter").value;
  if (category === "all") {
    loadJobListings();
  } else {
    const filteredJobs = jobListings.filter((job) => job.category === category);
    loadJobListings(filteredJobs);
  }
}

function handleLocationFilter() {
  const location = document.getElementById("locationFilter").value;
  if (location === "all") {
    loadJobListings();
  } else {
    const filteredJobs = jobListings.filter((job) =>
      job.location.toLowerCase().includes(location.toLowerCase())
    );
    loadJobListings(filteredJobs);
  }
}

function filterByCategory(categoryId) {
  const categoryFilter = document.getElementById("categoryFilter");
  if (categoryFilter) {
    categoryFilter.value = categoryId;
    handleCategoryFilter();
  }
}

function viewJobDetails(jobId) {
  const job = jobListings.find((j) => j.id === jobId);
  if (!job) return;

  // Populate modal with job details
  const modal = document.getElementById("jobDetailsModal");
  if (modal) {
    modal.querySelector("[data-job-title]").textContent = job.title;
    modal.querySelector("[data-job-company]").textContent = job.company;
    modal.querySelector("[data-job-location]").textContent = job.location;
    modal.querySelector("[data-job-salary]").textContent = job.salary;
    modal.querySelector("[data-job-type]").textContent = job.type;
    modal.querySelector("[data-job-description]").textContent = job.description;

    // Requirements
    const reqContainer = modal.querySelector("[data-job-requirements]");
    if (reqContainer) {
      reqContainer.innerHTML = job.requirements
        .map(
          (req) =>
            `<li class="flex items-center text-sm text-gray-700">
          <i class="fas fa-check text-green-500 mr-2"></i>
          ${req}
        </li>`
        )
        .join("");
    }

    // Benefits
    const benefitsContainer = modal.querySelector("[data-job-benefits]");
    if (benefitsContainer) {
      benefitsContainer.innerHTML = job.benefits
        .map(
          (benefit) =>
            `<li class="flex items-center text-sm text-gray-700">
          <i class="fas fa-star text-yellow-500 mr-2"></i>
          ${benefit}
        </li>`
        )
        .join("");
    }

    // Apply button
    const applyBtn = modal.querySelector("[data-apply-btn]");
    if (applyBtn) {
      applyBtn.onclick = () => applyForJob(jobId);
    }

    showModal("jobDetailsModal");
  }
}

function applyForJob(jobId) {
  const job = jobListings.find((j) => j.id === jobId);
  if (!job) return;

  // Check if already applied
  const existingApplication = userApplications.find(
    (app) => app.jobId === jobId
  );
  if (existingApplication) {
    alert("You have already applied for this job!");
    return;
  }

  // Create new application
  const application = {
    id: "APP" + Date.now(),
    jobId: jobId,
    status: "applied",
    appliedDate: new Date().toISOString(),
    coverLetter: "",
  };

  userApplications.push(application);
  localStorage.setItem("userApplications", JSON.stringify(userApplications));

  // Update applications count
  job.applications++;

  // Show success message
  alert("Application submitted successfully!");

  // Refresh displays
  loadJobListings();
  loadUserApplications();

  // Close modals
  hideModal("jobDetailsModal");
}

function withdrawApplication(applicationId) {
  if (confirm("Are you sure you want to withdraw this application?")) {
    userApplications = userApplications.filter(
      (app) => app.id !== applicationId
    );
    localStorage.setItem("userApplications", JSON.stringify(userApplications));
    loadUserApplications();
    alert("Application withdrawn successfully.");
  }
}

// Skill matcher functionality
function openSkillMatcher() {
  showModal("skillMatcherModal");
}

function closeSkillMatcher() {
  hideModal("skillMatcherModal");
}

// Global functions for compatibility
window.showModal = showModal;
window.hideModal = hideModal;
window.viewJobDetails = viewJobDetails;
window.applyForJob = applyForJob;
window.withdrawApplication = withdrawApplication;
window.filterByCategory = filterByCategory;
window.openSkillMatcher = openSkillMatcher;
window.closeSkillMatcher = closeSkillMatcher;

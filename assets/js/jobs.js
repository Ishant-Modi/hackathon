// Job Portal Functionality
let currentJobs = [];
let filteredJobs = [];
let currentPage = 1;
let jobsPerPage = 5;
let selectedJobId = null;
let userApplications = [];

// Mock job data
const jobsData = [
  {
    id: 1,
    title: "Construction Worker",
    company: "ABC Builders",
    location: "Delhi",
    category: "Construction",
    type: "Full-time",
    salary: 25000,
    salaryRange: "₹22,000 - ₹28,000",
    description:
      "Looking for experienced construction workers for residential project. Must have knowledge of basic construction techniques.",
    requirements: [
      "Physical fitness",
      "Basic construction knowledge",
      "Safety awareness",
      "Team player",
    ],
    skills: ["Construction", "Manual Labor", "Safety", "Teamwork"],
    benefits: [
      "Health insurance",
      "PF",
      "Overtime pay",
      "Safety equipment provided",
    ],
    postedDate: "2024-01-15",
    urgency: "urgent",
    workingHours: "8 AM - 6 PM",
    contactPerson: "Rajesh Kumar",
    contactPhone: "+91-9876543210",
    experience: "fresher",
    verified: true,
  },
  {
    id: 2,
    title: "Factory Worker",
    company: "Metro Manufacturing",
    location: "Bangalore",
    category: "Manufacturing",
    type: "Full-time",
    salary: 18000,
    salaryRange: "₹16,000 - ₹20,000",
    description:
      "Assembly line workers needed for electronics manufacturing. Training will be provided.",
    requirements: [
      "Basic education",
      "Attention to detail",
      "Ability to stand for long hours",
    ],
    skills: ["Assembly", "Quality Control", "Attention to Detail"],
    benefits: ["Medical insurance", "Transport allowance", "Canteen facility"],
    postedDate: "2024-01-14",
    urgency: "normal",
    workingHours: "9 AM - 6 PM",
    contactPerson: "Priya Sharma",
    contactPhone: "+91-9876543211",
    experience: "fresher",
    verified: true,
  },
  {
    id: 3,
    title: "Delivery Partner",
    company: "Quick Delivery Services",
    location: "Mumbai",
    category: "Transport",
    type: "Part-time",
    salary: 15000,
    salaryRange: "₹12,000 - ₹18,000",
    description:
      "Food and package delivery partners needed. Own vehicle preferred but not mandatory.",
    requirements: [
      "Valid driving license",
      "Smartphone",
      "Local area knowledge",
    ],
    skills: ["Driving", "Navigation", "Customer Service"],
    benefits: ["Fuel allowance", "Incentives", "Flexible hours"],
    postedDate: "2024-01-13",
    urgency: "urgent",
    workingHours: "Flexible",
    contactPerson: "Amit Das",
    contactPhone: "+91-9876543212",
    experience: "fresher",
    verified: true,
  },
  {
    id: 4,
    title: "Domestic Helper",
    company: "HomeCare Services",
    location: "Chennai",
    category: "Domestic Work",
    type: "Full-time",
    salary: 12000,
    salaryRange: "₹10,000 - ₹14,000",
    description:
      "House cleaning and maintenance work. Respectful family environment.",
    requirements: [
      "Honest and reliable",
      "Previous experience preferred",
      "Local references",
    ],
    skills: ["Cleaning", "Cooking", "Child Care", "Organization"],
    benefits: ["Accommodation", "Meals provided", "Weekly off"],
    postedDate: "2024-01-12",
    urgency: "normal",
    workingHours: "7 AM - 7 PM",
    contactPerson: "Sunita Devi",
    contactPhone: "+91-9876543213",
    experience: "1-3",
    verified: true,
  },
  {
    id: 5,
    title: "Farm Worker",
    company: "Green Fields Agriculture",
    location: "Pune",
    category: "Agriculture",
    type: "Contract",
    salary: 20000,
    salaryRange: "₹18,000 - ₹22,000",
    description:
      "Seasonal farm work including planting, harvesting, and general farm maintenance.",
    requirements: [
      "Physical fitness",
      "Farming experience",
      "Willingness to work outdoors",
    ],
    skills: ["Farming", "Manual Labor", "Equipment Operation"],
    benefits: ["Accommodation", "Meals", "Transportation"],
    postedDate: "2024-01-11",
    urgency: "urgent",
    workingHours: "6 AM - 4 PM",
    contactPerson: "Ramesh Patel",
    contactPhone: "+91-9876543214",
    experience: "1-3",
    verified: true,
  },
  {
    id: 6,
    title: "Security Guard",
    company: "Safe Security Services",
    location: "Kolkata",
    category: "Security",
    type: "Full-time",
    salary: 16000,
    salaryRange: "₹14,000 - ₹18,000",
    description:
      "Night shift security guard for commercial building. Must be alert and responsible.",
    requirements: ["Clean background", "Physical fitness", "Basic English"],
    skills: ["Security", "Vigilance", "Communication"],
    benefits: ["Health insurance", "Uniform provided", "Night allowance"],
    postedDate: "2024-01-10",
    urgency: "normal",
    workingHours: "10 PM - 6 AM",
    contactPerson: "Kiran Singh",
    contactPhone: "+91-9876543215",
    experience: "fresher",
    verified: true,
  },
  {
    id: 7,
    title: "Kitchen Helper",
    company: "Spice Restaurant",
    location: "Hyderabad",
    category: "Food Service",
    type: "Full-time",
    salary: 14000,
    salaryRange: "₹12,000 - ₹16,000",
    description:
      "Kitchen assistant for busy restaurant. Food preparation and cleaning duties.",
    requirements: ["Food handling knowledge", "Hygiene awareness", "Teamwork"],
    skills: ["Cooking", "Food Prep", "Cleaning", "Teamwork"],
    benefits: ["Meals provided", "Tips", "Skill development"],
    postedDate: "2024-01-09",
    urgency: "urgent",
    workingHours: "10 AM - 10 PM",
    contactPerson: "Meera Reddy",
    contactPhone: "+91-9876543216",
    experience: "fresher",
    verified: true,
  },
  {
    id: 8,
    title: "Warehouse Assistant",
    company: "Logistics Pro",
    location: "Ahmedabad",
    category: "Manufacturing",
    type: "Full-time",
    salary: 19000,
    salaryRange: "₹17,000 - ₹21,000",
    description:
      "Loading, unloading, and organizing warehouse inventory. Forklift training provided.",
    requirements: [
      "Physical strength",
      "Basic computer knowledge",
      "Attention to detail",
    ],
    skills: ["Manual Labor", "Inventory", "Computer Basics", "Organization"],
    benefits: ["Training provided", "Medical insurance", "Performance bonus"],
    postedDate: "2024-01-08",
    urgency: "normal",
    workingHours: "8 AM - 5 PM",
    contactPerson: "Vishal Shah",
    contactPhone: "+91-9876543217",
    experience: "fresher",
    verified: true,
  },
];

// Skills data for AI matching
const availableSkills = [
  "Construction",
  "Manual Labor",
  "Safety",
  "Teamwork",
  "Assembly",
  "Quality Control",
  "Attention to Detail",
  "Driving",
  "Navigation",
  "Customer Service",
  "Cleaning",
  "Cooking",
  "Child Care",
  "Organization",
  "Farming",
  "Equipment Operation",
  "Security",
  "Vigilance",
  "Communication",
  "Food Prep",
  "Inventory",
  "Computer Basics",
];

// Initialize page
document.addEventListener("DOMContentLoaded", function () {
  initializeJobs();
  loadUserApplications();
  updateJobStats();
});

function initializeJobs() {
  currentJobs = [...jobsData];
  filteredJobs = [...currentJobs];
  displayJobs();
  updateJobCount();
  loadSkills();
  loadRecommendations();
}

function displayJobs() {
  const jobsList = document.getElementById("jobsList");
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const jobsToShow = filteredJobs.slice(startIndex, endIndex);

  if (jobsToShow.length === 0) {
    jobsList.innerHTML = `
            <div class="card">
                <div class="card-body text-center py-5">
                    <i class="fas fa-search fa-3x text-muted mb-3"></i>
                    <h5 class="text-muted">No jobs found</h5>
                    <p class="text-muted">Try adjusting your search criteria</p>
                </div>
            </div>
        `;
    return;
  }

  jobsList.innerHTML = jobsToShow
    .map(
      (job) => `
        <div class="card shadow-sm mb-3 job-card" data-job-id="${job.id}">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-8">
                        <div class="d-flex align-items-start justify-content-between">
                            <div>
                                <h5 class="card-title mb-1">
                                    ${job.title}
                                    ${
                                      job.verified
                                        ? '<i class="fas fa-check-circle text-success ms-2" title="Verified Employer"></i>'
                                        : ""
                                    }
                                    ${
                                      job.urgency === "urgent"
                                        ? '<span class="badge bg-danger ms-2">Urgent</span>'
                                        : ""
                                    }
                                </h5>
                                <p class="text-muted mb-2">
                                    <i class="fas fa-building me-1"></i>${
                                      job.company
                                    } • 
                                    <i class="fas fa-map-marker-alt me-1"></i>${
                                      job.location
                                    }
                                </p>
                            </div>
                        </div>
                        <p class="card-text text-truncate" style="max-width: 400px;">${
                          job.description
                        }</p>
                        <div class="d-flex flex-wrap gap-1 mb-2">
                            ${job.skills
                              .slice(0, 3)
                              .map(
                                (skill) =>
                                  `<span class="badge bg-light text-dark">${skill}</span>`
                              )
                              .join("")}
                            ${
                              job.skills.length > 3
                                ? `<span class="badge bg-secondary">+${
                                    job.skills.length - 3
                                  } more</span>`
                                : ""
                            }
                        </div>
                        <small class="text-muted">
                            <i class="fas fa-clock me-1"></i>Posted ${getRelativeTime(
                              job.postedDate
                            )}
                        </small>
                    </div>
                    <div class="col-md-4 text-md-end">
                        <div class="mb-2">
                            <h6 class="text-success mb-0">${
                              job.salaryRange
                            }</h6>
                            <small class="text-muted">${job.type}</small>
                        </div>
                        <div class="d-grid gap-2">
                            <button class="btn btn-primary btn-sm" onclick="viewJobDetails(${
                              job.id
                            })">
                                <i class="fas fa-eye me-1"></i>View Details
                            </button>
                            <button class="btn btn-outline-success btn-sm" onclick="quickApply(${
                              job.id
                            })">
                                <i class="fas fa-paper-plane me-1"></i>Quick Apply
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
    )
    .join("");

  updatePagination();
}

function updateJobCount() {
  document.getElementById(
    "jobCount"
  ).textContent = `${filteredJobs.length} jobs found`;
}

function updatePagination() {
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const pagination = document.getElementById("jobPagination");

  if (totalPages <= 1) {
    pagination.style.display = "none";
    return;
  }

  pagination.style.display = "block";
  // Update pagination logic here if needed
}

function searchJobs() {
  const searchTerm = document.getElementById("jobSearch").value.toLowerCase();
  applyFilters();
}

function filterJobs() {
  applyFilters();
}

function applyFilters() {
  const searchTerm = document.getElementById("jobSearch").value.toLowerCase();
  const location = document.getElementById("locationFilter").value;
  const category = document.getElementById("categoryFilter").value;
  const salaryRange = document.getElementById("salaryFilter").value;
  const type = document.getElementById("typeFilter").value;

  filteredJobs = currentJobs.filter((job) => {
    const matchesSearch =
      !searchTerm ||
      job.title.toLowerCase().includes(searchTerm) ||
      job.company.toLowerCase().includes(searchTerm) ||
      job.description.toLowerCase().includes(searchTerm) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchTerm));

    const matchesLocation = !location || job.location === location;
    const matchesCategory = !category || job.category === category;
    const matchesType = !type || job.type === type;

    let matchesSalary = true;
    if (salaryRange) {
      const [min, max] = salaryRange
        .split("-")
        .map((s) => parseInt(s.replace("+", "")));
      if (max) {
        matchesSalary = job.salary >= min && job.salary <= max;
      } else {
        matchesSalary = job.salary >= min;
      }
    }

    return (
      matchesSearch &&
      matchesLocation &&
      matchesCategory &&
      matchesType &&
      matchesSalary
    );
  });

  currentPage = 1;
  displayJobs();
  updateJobCount();
}

function clearFilters() {
  document.getElementById("jobSearch").value = "";
  document.getElementById("locationFilter").value = "";
  document.getElementById("categoryFilter").value = "";
  document.getElementById("salaryFilter").value = "";
  document.getElementById("typeFilter").value = "";

  filteredJobs = [...currentJobs];
  currentPage = 1;
  displayJobs();
  updateJobCount();
}

function viewJobDetails(jobId) {
  const job = currentJobs.find((j) => j.id === jobId);
  if (!job) return;

  selectedJobId = jobId;
  document.getElementById("jobTitle").textContent = job.title;

  const content = `
        <div class="row">
            <div class="col-md-8">
                <div class="mb-4">
                    <h6 class="text-primary">Company Information</h6>
                    <p><strong>${job.company}</strong></p>
                    <p><i class="fas fa-map-marker-alt me-2"></i>${
                      job.location
                    }</p>
                    <p><i class="fas fa-clock me-2"></i>${job.workingHours}</p>
                    <p><i class="fas fa-phone me-2"></i>${job.contactPhone}</p>
                </div>
                
                <div class="mb-4">
                    <h6 class="text-primary">Job Description</h6>
                    <p>${job.description}</p>
                </div>
                
                <div class="mb-4">
                    <h6 class="text-primary">Requirements</h6>
                    <ul>
                        ${job.requirements
                          .map((req) => `<li>${req}</li>`)
                          .join("")}
                    </ul>
                </div>
                
                <div class="mb-4">
                    <h6 class="text-primary">Benefits</h6>
                    <ul>
                        ${job.benefits
                          .map((benefit) => `<li>${benefit}</li>`)
                          .join("")}
                    </ul>
                </div>
            </div>
            
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h6 class="card-title">Job Summary</h6>
                        <table class="table table-sm">
                            <tr><td><strong>Type:</strong></td><td>${
                              job.type
                            }</td></tr>
                            <tr><td><strong>Salary:</strong></td><td>${
                              job.salaryRange
                            }</td></tr>
                            <tr><td><strong>Experience:</strong></td><td>${getExperienceText(
                              job.experience
                            )}</td></tr>
                            <tr><td><strong>Posted:</strong></td><td>${getRelativeTime(
                              job.postedDate
                            )}</td></tr>
                        </table>
                        
                        <h6 class="mt-3">Required Skills</h6>
                        <div class="d-flex flex-wrap gap-1">
                            ${job.skills
                              .map(
                                (skill) =>
                                  `<span class="badge bg-primary">${skill}</span>`
                              )
                              .join("")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

  document.getElementById("jobDetailsContent").innerHTML = content;

  // Update apply button
  const isApplied = userApplications.some((app) => app.jobId === jobId);
  const applyButton = document.getElementById("applyButton");
  if (isApplied) {
    applyButton.innerHTML = '<i class="fas fa-check me-1"></i>Applied';
    applyButton.className = "btn btn-success";
    applyButton.disabled = true;
  } else {
    applyButton.innerHTML = '<i class="fas fa-paper-plane me-1"></i>Apply Now';
    applyButton.className = "btn btn-primary";
    applyButton.disabled = false;
  }

  new bootstrap.Modal(document.getElementById("jobDetailsModal")).show();
}

function quickApply(jobId) {
  const isApplied = userApplications.some((app) => app.jobId === jobId);
  if (isApplied) {
    showAlert("You have already applied to this job", "warning");
    return;
  }

  selectedJobId = jobId;
  const job = currentJobs.find((j) => j.id === jobId);

  // Quick application with minimal details
  const application = {
    id: Date.now(),
    jobId: jobId,
    jobTitle: job.title,
    company: job.company,
    appliedDate: new Date().toISOString().split("T")[0],
    status: "Applied",
    coverLetter: "Quick application submitted",
    experience: "",
    availability: "immediate",
    expectedSalary: job.salary,
  };

  userApplications.push(application);
  localStorage.setItem("userApplications", JSON.stringify(userApplications));

  showAlert("Application submitted successfully!", "success");
  updateJobStats();
  loadMyApplications();
}

function applyForJob() {
  if (!selectedJobId) return;

  const isApplied = userApplications.some((app) => app.jobId === selectedJobId);
  if (isApplied) {
    showAlert("You have already applied to this job", "warning");
    return;
  }

  new bootstrap.Modal(document.getElementById("applicationModal")).show();
}

function submitApplication() {
  const job = currentJobs.find((j) => j.id === selectedJobId);
  const coverLetter = document.getElementById("coverLetter").value;
  const experience = document.getElementById("experience").value;
  const availability = document.getElementById("availability").value;
  const expectedSalary =
    document.getElementById("expectedSalary").value || job.salary;

  const application = {
    id: Date.now(),
    jobId: selectedJobId,
    jobTitle: job.title,
    company: job.company,
    appliedDate: new Date().toISOString().split("T")[0],
    status: "Applied",
    coverLetter,
    experience,
    availability,
    expectedSalary: parseInt(expectedSalary),
  };

  userApplications.push(application);
  localStorage.setItem("userApplications", JSON.stringify(userApplications));

  // Close modals
  bootstrap.Modal.getInstance(
    document.getElementById("applicationModal")
  ).hide();
  bootstrap.Modal.getInstance(
    document.getElementById("jobDetailsModal")
  ).hide();

  showAlert("Application submitted successfully!", "success");
  updateJobStats();
  loadMyApplications();

  // Clear form
  document.getElementById("applicationForm").reset();
}

function loadUserApplications() {
  const stored = localStorage.getItem("userApplications");
  userApplications = stored ? JSON.parse(stored) : [];
  loadMyApplications();
}

function loadMyApplications() {
  const container = document.getElementById("myApplications");
  const recentApplications = userApplications.slice(-3);

  if (recentApplications.length === 0) {
    container.innerHTML = '<p class="text-muted small">No applications yet</p>';
    return;
  }

  container.innerHTML = recentApplications
    .map(
      (app) => `
        <div class="d-flex justify-content-between align-items-center mb-2 p-2 border rounded">
            <div>
                <div class="fw-bold small">${app.jobTitle}</div>
                <div class="text-muted small">${app.company}</div>
            </div>
            <span class="badge bg-primary">${app.status}</span>
        </div>
    `
    )
    .join("");
}

function showAllApplications() {
  // This would typically navigate to a dedicated applications page
  showAlert("Feature coming soon - View all applications", "info");
}

function loadSkills() {
  const container = document.getElementById("skillsContainer");
  container.innerHTML = availableSkills
    .map(
      (skill) => `
        <div class="col-md-4 col-sm-6">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="${skill}" id="skill_${skill}">
                <label class="form-check-label small" for="skill_${skill}">
                    ${skill}
                </label>
            </div>
        </div>
    `
    )
    .join("");
}

function showSkillMatcher() {
  new bootstrap.Modal(document.getElementById("skillMatcherModal")).show();
}

function findMatchingJobs() {
  const selectedSkills = Array.from(
    document.querySelectorAll("#skillsContainer input:checked")
  ).map((cb) => cb.value);
  const experienceLevel = document.querySelector(
    'input[name="experience"]:checked'
  ).value;

  if (selectedSkills.length === 0) {
    showAlert("Please select at least one skill", "warning");
    return;
  }

  // Filter jobs based on skills and experience
  filteredJobs = currentJobs.filter((job) => {
    const skillMatch = job.skills.some((skill) =>
      selectedSkills.includes(skill)
    );
    const experienceMatch =
      job.experience === experienceLevel || job.experience === "fresher";
    return skillMatch && experienceMatch;
  });

  // Sort by skill relevance
  filteredJobs.sort((a, b) => {
    const aMatches = a.skills.filter((skill) =>
      selectedSkills.includes(skill)
    ).length;
    const bMatches = b.skills.filter((skill) =>
      selectedSkills.includes(skill)
    ).length;
    return bMatches - aMatches;
  });

  currentPage = 1;
  displayJobs();
  updateJobCount();

  bootstrap.Modal.getInstance(
    document.getElementById("skillMatcherModal")
  ).hide();
  showAlert(
    `Found ${filteredJobs.length} matching jobs based on your skills!`,
    "success"
  );
}

function loadRecommendations() {
  const container = document.getElementById("recommendedJobs");
  // Simple recommendation based on user's profile/recent applications
  const recommendations = currentJobs.slice(0, 3);

  container.innerHTML = recommendations
    .map(
      (job) => `
        <div class="d-flex justify-content-between align-items-center mb-2 p-2 border rounded">
            <div>
                <div class="fw-bold small">${job.title}</div>
                <div class="text-muted small">${job.company} • ${job.location}</div>
                <div class="text-success small">${job.salaryRange}</div>
            </div>
            <button class="btn btn-outline-primary btn-sm" onclick="viewJobDetails(${job.id})">
                View
            </button>
        </div>
    `
    )
    .join("");
}

function updateJobStats() {
  document.getElementById("totalJobs").textContent = currentJobs.length;
  document.getElementById("newJobsToday").textContent = currentJobs.filter(
    (job) =>
      new Date(job.postedDate) >= new Date(Date.now() - 24 * 60 * 60 * 1000)
  ).length;
  document.getElementById("myApplicationsCount").textContent =
    userApplications.length;
  document.getElementById("interviewsScheduled").textContent =
    userApplications.filter(
      (app) => app.status === "Interview Scheduled"
    ).length;
}

function changePage(page) {
  if (page === "prev") {
    currentPage = Math.max(1, currentPage - 1);
  } else if (page === "next") {
    const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
    currentPage = Math.min(totalPages, currentPage + 1);
  } else {
    currentPage = page;
  }
  displayJobs();
}

// Utility functions
function getRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "today";
  if (diffDays === 2) return "yesterday";
  if (diffDays <= 7) return `${diffDays - 1} days ago`;
  if (diffDays <= 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}

function getExperienceText(level) {
  switch (level) {
    case "fresher":
      return "Fresher";
    case "1-3":
      return "1-3 Years";
    case "3+":
      return "3+ Years";
    default:
      return "Any";
  }
}

function showAlert(message, type) {
  // Create alert element
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
  alertDiv.style.zIndex = "9999";
  alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

  document.body.appendChild(alertDiv);

  // Auto remove after 3 seconds
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.remove();
    }
  }, 3000);
}

// CSS for smooth animations
const style = document.createElement("style");
style.textContent = `
    .job-card {
        transition: transform 0.2s, box-shadow 0.2s;
    }
    .job-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15) !important;
    }
`;
document.head.appendChild(style);

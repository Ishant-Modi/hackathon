// Enhanced Job Portal Functionality
let currentJobs = [];
let filteredJobs = [];
let currentPage = 1;
let jobsPerPage = 6;
let selectedJobId = null;
let userApplications = JSON.parse(
  localStorage.getItem("userApplications") || "[]"
);
let currentJobForApplication = null;

// Enhanced mock job data with more realistic information
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
      "Looking for experienced construction workers for residential project. Must have knowledge of basic construction techniques, concrete mixing, and safety protocols.",
    requirements: [
      "Physical fitness and stamina",
      "Basic construction knowledge",
      "Safety awareness and protocol adherence",
      "Team player with good communication",
      "Ability to work in various weather conditions",
    ],
    skills: [
      "Construction",
      "Manual Labor",
      "Safety",
      "Teamwork",
      "Concrete Work",
    ],
    benefits: [
      "Health insurance coverage",
      "Provident Fund (PF)",
      "Overtime pay at 1.5x rate",
      "Safety equipment provided",
      "Annual bonus",
      "Accommodation assistance",
    ],
    postedDate: "2024-01-15",
    urgency: "urgent",
    workingHours: "8 AM - 6 PM (Monday to Saturday)",
    contactPerson: "Rajesh Kumar",
    contactPhone: "+91-9876543210",
    experience: "0-2",
    verified: true,
    accommodationProvided: true,
    applicants: 45,
  },
  {
    id: 2,
    title: "Electronics Assembly Worker",
    company: "Metro Manufacturing",
    location: "Bangalore",
    category: "Manufacturing",
    type: "Full-time",
    salary: 18000,
    salaryRange: "₹16,000 - ₹20,000",
    description:
      "Assembly line workers needed for electronics manufacturing. Training will be provided for quality control and assembly processes.",
    requirements: [
      "10th standard education minimum",
      "Attention to detail and precision",
      "Ability to stand for long hours",
      "Good hand-eye coordination",
      "Basic English reading skills",
    ],
    skills: [
      "Assembly",
      "Quality Control",
      "Attention to Detail",
      "Technical Skills",
    ],
    benefits: [
      "Medical insurance for family",
      "Transport allowance",
      "Subsidized canteen facility",
      "Skills training programs",
      "Performance bonuses",
    ],
    postedDate: "2024-01-14",
    urgency: "normal",
    workingHours: "9 AM - 6 PM (6 days a week)",
    contactPerson: "Priya Sharma",
    contactPhone: "+91-9876543211",
    experience: "0-1",
    verified: true,
    accommodationProvided: false,
    applicants: 32,
  },
  {
    id: 3,
    title: "Food Delivery Partner",
    company: "Quick Delivery Services",
    location: "Mumbai",
    category: "Transport",
    type: "Part-time",
    salary: 15000,
    salaryRange: "₹12,000 - ₹18,000",
    description:
      "Food and package delivery partners needed. Flexible working hours with good earning potential through incentives.",
    requirements: [
      "Valid driving license (2-wheeler)",
      "Smartphone with internet",
      "Local area knowledge",
      "Good communication skills",
      "Own vehicle preferred",
    ],
    skills: ["Driving", "Navigation", "Customer Service", "Time Management"],
    benefits: [
      "Fuel allowance",
      "Performance incentives",
      "Flexible working hours",
      "Weekly payouts",
      "Insurance coverage",
    ],
    postedDate: "2024-01-13",
    urgency: "urgent",
    workingHours: "Flexible (Peak hours: 12-3 PM, 7-11 PM)",
    contactPerson: "Amit Das",
    contactPhone: "+91-9876543212",
    experience: "0-1",
    verified: true,
    accommodationProvided: false,
    applicants: 78,
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
      "Domestic helpers needed for household cleaning, cooking, and general maintenance. Experience in modern household appliances preferred.",
    requirements: [
      "Basic cooking skills",
      "Housekeeping experience",
      "Trustworthy and reliable",
      "Good health and hygiene",
      "Ability to handle household appliances",
    ],
    skills: ["Cooking", "Cleaning", "Household Management", "Child Care"],
    benefits: [
      "Accommodation provided",
      "Meals included",
      "Monthly off days",
      "Festival bonuses",
      "Healthcare support",
    ],
    postedDate: "2024-01-12",
    urgency: "normal",
    workingHours: "7 AM - 7 PM (with breaks)",
    contactPerson: "Sunita Devi",
    contactPhone: "+91-9876543213",
    experience: "1-3",
    verified: true,
    accommodationProvided: true,
    applicants: 23,
  },
  {
    id: 5,
    title: "Security Guard",
    company: "SecureMax Solutions",
    location: "Pune",
    category: "Security",
    type: "Full-time",
    salary: 16000,
    salaryRange: "₹14,000 - ₹18,000",
    description:
      "Security guards needed for corporate offices and residential complexes. Night shifts available with higher pay.",
    requirements: [
      "Physical fitness",
      "Alert and observant",
      "Basic English communication",
      "No criminal background",
      "Willing to work night shifts",
    ],
    skills: ["Security", "Vigilance", "Communication", "Emergency Response"],
    benefits: [
      "Uniform provided",
      "Night shift allowance",
      "Medical insurance",
      "Training programs",
      "Career advancement opportunities",
    ],
    postedDate: "2024-01-11",
    urgency: "urgent",
    workingHours: "12-hour shifts (Day/Night rotation)",
    contactPerson: "Vikram Singh",
    contactPhone: "+91-9876543214",
    experience: "0-2",
    verified: true,
    accommodationProvided: false,
    applicants: 56,
  },
  {
    id: 6,
    title: "Warehouse Helper",
    company: "LogiTech Warehousing",
    location: "Kolkata",
    category: "Manufacturing",
    type: "Full-time",
    salary: 14000,
    salaryRange: "₹12,000 - ₹16,000",
    description:
      "Warehouse helpers needed for loading, unloading, and inventory management. Physical work with modern equipment training provided.",
    requirements: [
      "Physical strength",
      "Basic math skills",
      "Ability to lift heavy items",
      "Team coordination",
      "Punctuality and reliability",
    ],
    skills: [
      "Manual Labor",
      "Inventory Management",
      "Teamwork",
      "Equipment Operation",
    ],
    benefits: [
      "Equipment training",
      "Health checkups",
      "Overtime opportunities",
      "Safe working environment",
      "Transport facility",
    ],
    postedDate: "2024-01-10",
    urgency: "normal",
    workingHours: "9 AM - 6 PM (Monday to Saturday)",
    contactPerson: "Arjun Ghosh",
    contactPhone: "+91-9876543215",
    experience: "0-1",
    verified: true,
    accommodationProvided: false,
    applicants: 41,
  },
  {
    id: 7,
    title: "Farm Worker",
    company: "Green Fields Agriculture",
    location: "Ahmedabad",
    category: "Agriculture",
    type: "Seasonal",
    salary: 13000,
    salaryRange: "₹11,000 - ₹15,000",
    description:
      "Seasonal farm workers needed for crop planting, maintenance, and harvesting. Experience with modern farming techniques preferred.",
    requirements: [
      "Agricultural experience",
      "Physical endurance",
      "Weather adaptability",
      "Knowledge of crops",
      "Equipment handling skills",
    ],
    skills: [
      "Agriculture",
      "Manual Labor",
      "Equipment Operation",
      "Crop Knowledge",
    ],
    benefits: [
      "Seasonal bonuses",
      "Accommodation on farm",
      "Fresh produce allowance",
      "Equipment training",
      "Rural development programs",
    ],
    postedDate: "2024-01-09",
    urgency: "normal",
    workingHours: "6 AM - 4 PM (Weather dependent)",
    contactPerson: "Ramesh Patel",
    contactPhone: "+91-9876543216",
    experience: "1-3",
    verified: true,
    accommodationProvided: true,
    applicants: 29,
  },
  {
    id: 8,
    title: "Restaurant Kitchen Helper",
    company: "Spice Route Restaurant",
    location: "Hyderabad",
    category: "Food Service",
    type: "Full-time",
    salary: 11000,
    salaryRange: "₹9,000 - ₹13,000",
    description:
      "Kitchen helpers needed for food preparation, cleaning, and assisting chefs. Fast-paced environment with opportunities to learn cooking.",
    requirements: [
      "Food handling hygiene",
      "Ability to work under pressure",
      "Quick learning ability",
      "Team collaboration",
      "Willingness to work odd hours",
    ],
    skills: ["Food Preparation", "Kitchen Operations", "Hygiene", "Teamwork"],
    benefits: [
      "Free meals during shifts",
      "Cooking skills training",
      "Tips sharing",
      "Festival bonuses",
      "Career progression to cook",
    ],
    postedDate: "2024-01-08",
    urgency: "urgent",
    workingHours: "Split shifts (11 AM - 3 PM, 6 PM - 11 PM)",
    contactPerson: "Chef Raman",
    contactPhone: "+91-9876543217",
    experience: "0-1",
    verified: true,
    accommodationProvided: false,
    applicants: 67,
  },
  {
    id: 4,
    title: "House Helper",
    company: "Private Family",
    location: "Delhi",
    category: "Domestic",
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

  // Update job count
  document.getElementById("jobCount").textContent = filteredJobs.length;

  if (jobsToShow.length === 0) {
    jobsList.innerHTML = `
      <div class="col-12">
        <div class="card border-0 shadow-sm">
          <div class="card-body text-center py-5">
            <i class="fas fa-search fa-4x text-muted mb-3"></i>
            <h4 class="text-muted mb-2">No jobs found</h4>
            <p class="text-muted mb-3">Try adjusting your search criteria or filters</p>
            <button class="btn btn-outline-primary" onclick="clearFilters()">
              <i class="fas fa-times me-2"></i>Clear All Filters
            </button>
          </div>
        </div>
      </div>
    `;
    return;
  }

  jobsList.innerHTML = jobsToShow
    .map((job) => {
      const hasApplied = userApplications.some((app) => app.jobId === job.id);
      const postedDaysAgo = Math.ceil(
        (new Date() - new Date(job.postedDate)) / (1000 * 60 * 60 * 24)
      );

      return `
        <div class="col-lg-6 col-xl-4 mb-4">
          <div class="card h-100 shadow-sm border-0 job-card" data-job-id="${
            job.id
          }" style="transition: all 0.3s ease;">
            <div class="card-body d-flex flex-column">
              <!-- Job Header -->
              <div class="d-flex align-items-start justify-content-between mb-3">
                <div class="flex-grow-1">
                  <h5 class="card-title mb-1 fw-bold">
                    ${job.title}
                    ${
                      job.verified
                        ? '<i class="fas fa-check-circle text-success ms-2" title="Verified Employer"></i>'
                        : ""
                    }
                  </h5>
                  <p class="text-muted mb-2 fw-semibold">
                    <i class="fas fa-building me-1"></i>${job.company}
                  </p>
                </div>
                ${
                  job.urgency === "urgent"
                    ? '<span class="badge bg-danger">Urgent</span>'
                    : ""
                }
              </div>

              <!-- Job Details -->
              <div class="mb-3">
                <div class="row g-2">
                  <div class="col-6">
                    <small class="text-muted d-block">
                      <i class="fas fa-map-marker-alt me-1"></i>${job.location}
                    </small>
                  </div>
                  <div class="col-6">
                    <small class="text-muted d-block">
                      <i class="fas fa-briefcase me-1"></i>${job.type}
                    </small>
                  </div>
                  <div class="col-6">
                    <small class="text-success fw-semibold">
                      <i class="fas fa-rupee-sign me-1"></i>${job.salaryRange}
                    </small>
                  </div>
                  <div class="col-6">
                    <small class="text-muted">
                      <i class="fas fa-users me-1"></i>${job.applicants} applied
                    </small>
                  </div>
                </div>
              </div>

              <!-- Job Description Preview -->
              <p class="text-muted small mb-3 flex-grow-1" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                ${job.description}
              </p>

              <!-- Job Tags -->
              <div class="mb-3">
                <div class="d-flex flex-wrap gap-1">
                  <span class="badge bg-light text-dark">${job.category}</span>
                  <span class="badge bg-light text-dark">${
                    job.experience
                  } years exp</span>
                  ${
                    job.accommodationProvided
                      ? '<span class="badge bg-info text-white">Accommodation</span>'
                      : ""
                  }
                </div>
              </div>

              <!-- Footer with Actions -->
              <div class="d-flex justify-content-between align-items-center mt-auto">
                <small class="text-muted">
                  <i class="fas fa-clock me-1"></i>${postedDaysAgo} days ago
                </small>
                <div class="d-flex gap-2">
                  <button class="btn btn-outline-primary btn-sm" onclick="showJobDetails(${
                    job.id
                  })">
                    <i class="fas fa-eye me-1"></i>View
                  </button>
                  ${
                    hasApplied
                      ? '<button class="btn btn-success btn-sm" disabled><i class="fas fa-check me-1"></i>Applied</button>'
                      : `<button class="btn btn-primary btn-sm apply-btn" onclick="currentJobForApplication = jobsData.find(j => j.id === ${job.id}); showApplicationModal()">
                         <i class="fas fa-paper-plane me-1"></i>Apply
                       </button>`
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  updatePagination();
}

function updateJobCount() {
  document.getElementById("jobCount").textContent = filteredJobs.length;
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
  // Reset search input
  document.getElementById("jobSearch").value = "";

  // Reset all filter selects
  document.getElementById("locationFilter").value = "";
  document.getElementById("categoryFilter").value = "";
  document.getElementById("typeFilter").value = "";
  document.getElementById("salaryFilter").value = "";
  document.getElementById("experienceFilter").value = "";

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

// Enhanced application and job detail functions
function showJobDetails(jobId) {
  const job = jobsData.find((j) => j.id === jobId);
  if (!job) return;

  currentJobForApplication = job;

  // Populate job details modal
  document.getElementById("detailsJobTitle").textContent = job.title;
  document.getElementById("detailsCompany").textContent = job.company;
  document.getElementById("detailsDescription").textContent = job.description;
  document.getElementById("detailsLocation").textContent = job.location;
  document.getElementById("detailsSalary").textContent = job.salaryRange;
  document.getElementById(
    "detailsExperience"
  ).textContent = `${job.experience} years`;
  document.getElementById("detailsJobType").textContent = job.type;
  document.getElementById("detailsPosted").textContent = formatDate(
    job.postedDate
  );

  // Populate requirements
  const requirementsList = document.getElementById("detailsRequirements");
  requirementsList.innerHTML = "";
  job.requirements.forEach((req) => {
    const li = document.createElement("li");
    li.textContent = req;
    requirementsList.appendChild(li);
  });

  // Populate benefits
  const benefitsList = document.getElementById("detailsBenefits");
  benefitsList.innerHTML = "";
  job.benefits.forEach((benefit) => {
    const li = document.createElement("li");
    li.textContent = benefit;
    benefitsList.appendChild(li);
  });

  new bootstrap.Modal(document.getElementById("jobDetailsModal")).show();
}

function showApplicationModal() {
  if (!currentJobForApplication) return;

  // Close job details modal if open
  const jobDetailsModal = bootstrap.Modal.getInstance(
    document.getElementById("jobDetailsModal")
  );
  if (jobDetailsModal) {
    jobDetailsModal.hide();
  }

  // Set job info in application modal
  document.getElementById("modalJobTitle").textContent =
    currentJobForApplication.title;
  document.getElementById("modalCompany").textContent =
    currentJobForApplication.company;
  document.getElementById("jobIdForApplication").value =
    currentJobForApplication.id;

  // Pre-fill user data if available
  const userData = JSON.parse(localStorage.getItem("currentUser") || "{}");
  if (userData.type === "worker") {
    // Pre-fill some fields based on stored user data
    const userProfiles = {
      ravi_kumar: { name: "Ravi Kumar", phone: "+91-9876543210" },
      priya_sharma: { name: "Priya Sharma", phone: "+91-9876543211" },
      amit_das: { name: "Amit Das", phone: "+91-9876543212" },
      sunita_devi: { name: "Sunita Devi", phone: "+91-9876543213" },
    };

    const profile = userProfiles[userData.id];
    if (profile) {
      document.getElementById("applicantName").value = profile.name;
      document.getElementById("applicantPhone").value = profile.phone;
    }
  }

  // Show the modal
  const modal = new bootstrap.Modal(
    document.getElementById("applicationModal")
  );
  modal.show();
}

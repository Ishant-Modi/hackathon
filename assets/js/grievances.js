// Modern Grievances JavaScript for MigrantConnect - Tailwind Compatible

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

// Grievance categories
const grievanceCategories = [
  {
    id: "workplace",
    name: "Workplace Issues",
    icon: "fas fa-building",
    color: "red",
    count: 24,
  },
  {
    id: "payment",
    name: "Payment Issues",
    icon: "fas fa-money-bill-wave",
    color: "orange",
    count: 18,
  },
  {
    id: "accommodation",
    name: "Accommodation",
    icon: "fas fa-home",
    color: "blue",
    count: 12,
  },
  {
    id: "documentation",
    name: "Documentation",
    icon: "fas fa-file-alt",
    color: "green",
    count: 15,
  },
  {
    id: "health",
    name: "Health & Safety",
    icon: "fas fa-shield-alt",
    color: "purple",
    count: 9,
  },
  {
    id: "other",
    name: "Other Issues",
    icon: "fas fa-question-circle",
    color: "gray",
    count: 7,
  },
];

// User grievances data
let userGrievances = JSON.parse(localStorage.getItem("userGrievances")) || [];

// Sample grievances for display
const sampleGrievances = [
  {
    id: "GRV001",
    title: "Delayed Salary Payment",
    category: "payment",
    status: "in_progress",
    priority: "high",
    submittedDate: "2025-01-05",
    description:
      "My salary for December has not been paid yet. It's been over 15 days since the due date.",
    responses: [
      {
        date: "2025-01-06",
        message:
          "Your grievance has been received and assigned to the labor department.",
        by: "Admin",
      },
      {
        date: "2025-01-08",
        message:
          "We are contacting your employer regarding the delayed payment.",
        by: "Labor Officer",
      },
    ],
  },
  {
    id: "GRV002",
    title: "Unsafe Working Conditions",
    category: "health",
    status: "resolved",
    priority: "high",
    submittedDate: "2025-01-01",
    description:
      "The construction site lacks proper safety equipment and protective gear.",
    responses: [
      {
        date: "2025-01-02",
        message: "Safety inspection has been scheduled for your workplace.",
        by: "Safety Inspector",
      },
      {
        date: "2025-01-05",
        message:
          "Safety equipment has been provided and workplace conditions improved.",
        by: "Labor Officer",
      },
    ],
  },
];

// Initialize page
document.addEventListener("DOMContentLoaded", function () {
  loadGrievanceCategories();
  loadUserGrievances();
  setupEventListeners();
});

function setupEventListeners() {
  // Form submission
  const grievanceForm = document.getElementById("grievanceForm");
  if (grievanceForm) {
    grievanceForm.addEventListener("submit", handleGrievanceSubmit);
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

  // Search functionality
  const searchInput = document.getElementById("grievanceSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", handleGrievanceSearch);
  }

  // Filter functionality
  const statusFilter = document.getElementById("statusFilter");
  if (statusFilter) {
    statusFilter.addEventListener("change", handleStatusFilter);
  }
}

function loadGrievanceCategories() {
  const container = document.getElementById("grievanceCategoriesContainer");
  if (!container) return;

  container.innerHTML = grievanceCategories
    .map(
      (category) => `
    <div class="card-feature cursor-pointer hover:shadow-lg transition-shadow" onclick="selectCategory('${category.id}')">
      <div class="text-center">
        <i class="${category.icon} text-4xl text-${category.color}-600 mb-3"></i>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">${category.name}</h3>
        <p class="text-sm text-gray-600">${category.count} active cases</p>
      </div>
    </div>
  `
    )
    .join("");
}

function loadUserGrievances() {
  const container = document.getElementById("userGrievancesContainer");
  if (!container) return;

  const allGrievances = [...userGrievances, ...sampleGrievances];

  if (allGrievances.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12">
        <i class="fas fa-comments text-4xl text-gray-400 mb-4"></i>
        <h3 class="text-lg font-semibold text-gray-600 mb-2">No grievances filed</h3>
        <p class="text-gray-500">File a grievance to get help with any issues you're facing</p>
        <button onclick="openFileGrievanceModal()" class="btn-primary-modern mt-4">
          File Your First Grievance
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = allGrievances
    .map(
      (grievance) => `
    <div class="card-modern hover:shadow-lg transition-shadow">
      <div class="flex justify-between items-start mb-3">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-1">${
            grievance.title
          }</h3>
          <p class="text-sm text-gray-600">Filed on: ${new Date(
            grievance.submittedDate
          ).toLocaleDateString()}</p>
        </div>
        <div class="text-right">
          <span class="badge-modern ${getStatusBadge(
            grievance.status
          )}">${getStatusText(grievance.status)}</span>
          <div class="text-xs text-gray-500 mt-1">${
            grievance.priority
          } priority</div>
        </div>
      </div>
      
      <div class="mb-4">
        <p class="text-sm text-gray-700 line-clamp-2">${
          grievance.description
        }</p>
      </div>
      
      <div class="flex items-center justify-between">
        <div class="text-sm text-gray-500">
          ID: ${grievance.id}
          ${
            grievance.responses
              ? ` • ${grievance.responses.length} responses`
              : ""
          }
        </div>
        <div class="flex space-x-2">
          <button onclick="viewGrievanceDetails('${
            grievance.id
          }')" class="btn-outline-modern">
            View Details
          </button>
          ${
            grievance.status !== "resolved"
              ? `
            <button onclick="addResponse('${grievance.id}')" class="btn-primary-modern">
              Add Response
            </button>
          `
              : ""
          }
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

function getStatusBadge(status) {
  const badges = {
    submitted: "badge-info-modern",
    in_progress: "badge-warning-modern",
    resolved: "badge-success-modern",
    closed: "badge-secondary-modern",
  };
  return badges[status] || "badge-info-modern";
}

function getStatusText(status) {
  const texts = {
    submitted: "Submitted",
    in_progress: "In Progress",
    resolved: "Resolved",
    closed: "Closed",
  };
  return texts[status] || status;
}

function selectCategory(categoryId) {
  const form = document.getElementById("grievanceForm");
  if (form) {
    const categorySelect = form.querySelector("#grievanceCategory");
    if (categorySelect) {
      categorySelect.value = categoryId;
    }
  }
  openFileGrievanceModal();
}

function openFileGrievanceModal() {
  showModal("fileGrievanceModal");
}

function closeFileGrievanceModal() {
  hideModal("fileGrievanceModal");
}

function handleGrievanceSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const grievance = {
    id: "GRV" + Date.now(),
    title: formData.get("title"),
    category: formData.get("category"),
    description: formData.get("description"),
    priority: formData.get("priority") || "medium",
    status: "submitted",
    submittedDate: new Date().toISOString().split("T")[0],
    responses: [],
  };

  userGrievances.push(grievance);
  localStorage.setItem("userGrievances", JSON.stringify(userGrievances));

  // Show success message
  alert(
    "Grievance submitted successfully! You will receive updates on its progress."
  );

  // Reset form and close modal
  e.target.reset();
  closeFileGrievanceModal();

  // Refresh display
  loadUserGrievances();
}

function viewGrievanceDetails(grievanceId) {
  const allGrievances = [...userGrievances, ...sampleGrievances];
  const grievance = allGrievances.find((g) => g.id === grievanceId);
  if (!grievance) return;

  const modal = document.getElementById("grievanceDetailsModal");
  if (modal) {
    // Populate modal with grievance details
    modal.querySelector("[data-grievance-title]").textContent = grievance.title;
    modal.querySelector("[data-grievance-id]").textContent = grievance.id;
    modal.querySelector("[data-grievance-status]").textContent = getStatusText(
      grievance.status
    );
    modal.querySelector(
      "[data-grievance-status]"
    ).className = `badge-modern ${getStatusBadge(grievance.status)}`;
    modal.querySelector("[data-grievance-date]").textContent = new Date(
      grievance.submittedDate
    ).toLocaleDateString();
    modal.querySelector("[data-grievance-priority]").textContent =
      grievance.priority;
    modal.querySelector("[data-grievance-description]").textContent =
      grievance.description;

    // Populate responses
    const responsesContainer = modal.querySelector(
      "[data-grievance-responses]"
    );
    if (responsesContainer && grievance.responses) {
      if (grievance.responses.length === 0) {
        responsesContainer.innerHTML = `
          <div class="text-center py-6 text-gray-500">
            <i class="fas fa-clock text-2xl mb-2"></i>
            <p>No responses yet. We'll update you soon!</p>
          </div>
        `;
      } else {
        responsesContainer.innerHTML = grievance.responses
          .map(
            (response) => `
          <div class="border-l-4 border-blue-500 pl-4 py-3 bg-blue-50 rounded-r-lg">
            <div class="flex justify-between items-start mb-2">
              <strong class="text-blue-900">${response.by}</strong>
              <span class="text-sm text-blue-600">${new Date(
                response.date
              ).toLocaleDateString()}</span>
            </div>
            <p class="text-gray-700">${response.message}</p>
          </div>
        `
          )
          .join("");
      }
    }

    showModal("grievanceDetailsModal");
  }
}

function addResponse(grievanceId) {
  showModal("addResponseModal");

  // Store the grievance ID for the response
  const modal = document.getElementById("addResponseModal");
  if (modal) {
    modal.setAttribute("data-grievance-id", grievanceId);
  }
}

function closeGrievanceDetailsModal() {
  hideModal("grievanceDetailsModal");
}

function closeAddResponseModal() {
  hideModal("addResponseModal");
}

function handleGrievanceSearch() {
  const query = document
    .getElementById("grievanceSearchInput")
    .value.toLowerCase();
  const allGrievances = [...userGrievances, ...sampleGrievances];
  const filteredGrievances = allGrievances.filter(
    (grievance) =>
      grievance.title.toLowerCase().includes(query) ||
      grievance.description.toLowerCase().includes(query) ||
      grievance.id.toLowerCase().includes(query)
  );

  // Update display with filtered results
  displayFilteredGrievances(filteredGrievances);
}

function handleStatusFilter() {
  const status = document.getElementById("statusFilter").value;
  const allGrievances = [...userGrievances, ...sampleGrievances];

  if (status === "all") {
    displayFilteredGrievances(allGrievances);
  } else {
    const filteredGrievances = allGrievances.filter(
      (grievance) => grievance.status === status
    );
    displayFilteredGrievances(filteredGrievances);
  }
}

function displayFilteredGrievances(grievances) {
  const container = document.getElementById("userGrievancesContainer");
  if (!container) return;

  if (grievances.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12">
        <i class="fas fa-search text-4xl text-gray-400 mb-4"></i>
        <h3 class="text-lg font-semibold text-gray-600 mb-2">No grievances found</h3>
        <p class="text-gray-500">Try adjusting your search criteria</p>
      </div>
    `;
    return;
  }

  container.innerHTML = grievances
    .map(
      (grievance) => `
    <div class="card-modern hover:shadow-lg transition-shadow">
      <div class="flex justify-between items-start mb-3">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-1">${
            grievance.title
          }</h3>
          <p class="text-sm text-gray-600">Filed on: ${new Date(
            grievance.submittedDate
          ).toLocaleDateString()}</p>
        </div>
        <div class="text-right">
          <span class="badge-modern ${getStatusBadge(
            grievance.status
          )}">${getStatusText(grievance.status)}</span>
          <div class="text-xs text-gray-500 mt-1">${
            grievance.priority
          } priority</div>
        </div>
      </div>
      
      <div class="mb-4">
        <p class="text-sm text-gray-700 line-clamp-2">${
          grievance.description
        }</p>
      </div>
      
      <div class="flex items-center justify-between">
        <div class="text-sm text-gray-500">
          ID: ${grievance.id}
          ${
            grievance.responses
              ? ` • ${grievance.responses.length} responses`
              : ""
          }
        </div>
        <div class="flex space-x-2">
          <button onclick="viewGrievanceDetails('${
            grievance.id
          }')" class="btn-outline-modern">
            View Details
          </button>
          ${
            grievance.status !== "resolved"
              ? `
            <button onclick="addResponse('${grievance.id}')" class="btn-primary-modern">
              Add Response
            </button>
          `
              : ""
          }
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

// Global functions for compatibility
window.showModal = showModal;
window.hideModal = hideModal;
window.selectCategory = selectCategory;
window.openFileGrievanceModal = openFileGrievanceModal;
window.closeFileGrievanceModal = closeFileGrievanceModal;
window.viewGrievanceDetails = viewGrievanceDetails;
window.addResponse = addResponse;
window.closeGrievanceDetailsModal = closeGrievanceDetailsModal;
window.closeAddResponseModal = closeAddResponseModal;

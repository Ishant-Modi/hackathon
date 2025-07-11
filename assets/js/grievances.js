// Grievances Portal Functionality
let userGrievances = [];
let selectedGrievanceId = null;

// Mock data for initial grievances
const mockGrievances = [
  {
    id: 1,
    title: "Delayed Payment Issue",
    type: "Wage Dispute",
    employer: "XYZ Construction",
    jobTitle: "Construction Helper",
    workPeriod: "March 1-15, 2024",
    amountDue: 8400,
    description:
      "Payment delayed by more than 30 days for March work. I have contacted the site supervisor multiple times but have not received any clear answer about when I will be paid. I need this payment urgently as I have family expenses to cover.",
    status: "In Progress",
    filedDate: "2024-03-20",
    lastUpdated: "2024-03-25",
    priority: "high",
    responses: [
      {
        from: "Worker",
        message:
          "I have not received my payment yet. Please look into this matter urgently.",
        timestamp: "2024-03-20 10:30",
        isUser: true,
      },
      {
        from: "Admin",
        message:
          "We have received your grievance and are looking into it. We will contact the employer.",
        timestamp: "2024-03-21 14:15",
        isUser: false,
      },
      {
        from: "Admin",
        message:
          "We have contacted the employer and they have acknowledged the delay. They have promised to process the payment within 2 days.",
        timestamp: "2024-03-23 11:45",
        isUser: false,
      },
    ],
  },
  {
    id: 2,
    title: "Safety Equipment Not Provided",
    type: "Safety Concern",
    employer: "ABC Builders",
    jobTitle: "Site Worker",
    workPeriod: "February 15 - March 10, 2024",
    amountDue: null,
    description:
      "I have been working at the construction site for 2 weeks now, and despite multiple requests, I have not been provided with proper safety equipment like helmet, gloves, and safety boots. This is putting my safety at risk, especially when working at heights.",
    status: "New",
    filedDate: "2024-03-22",
    lastUpdated: "2024-03-22",
    priority: "high",
    responses: [],
  },
];

// Resolved grievances mock data
const resolvedGrievancesMock = [
  {
    id: 101,
    title: "Unsafe Working Conditions",
    type: "Safety Concern",
    employer: "Metro Projects",
    jobTitle: "Electrician",
    workPeriod: "January 1-31, 2024",
    amountDue: null,
    description:
      "Lack of safety equipment at the construction site. Workers were required to work at heights without proper harnesses or safety nets.",
    status: "Resolved",
    filedDate: "2024-01-10",
    resolvedDate: "2024-01-25",
    resolution:
      "Employer provided all necessary safety equipment and implemented proper safety protocols.",
    priority: "high",
    responses: [
      {
        from: "Worker",
        message:
          "I'm concerned about the lack of safety equipment at the site.",
        timestamp: "2024-01-10 09:15",
        isUser: true,
      },
      {
        from: "Admin",
        message: "We've notified the employer about this safety concern.",
        timestamp: "2024-01-11 11:30",
        isUser: false,
      },
      {
        from: "Employer",
        message: "We will provide all necessary safety equipment by next week.",
        timestamp: "2024-01-15 14:45",
        isUser: false,
      },
      {
        from: "Worker",
        message:
          "I've received the safety equipment. Thank you for addressing this issue.",
        timestamp: "2024-01-22 10:20",
        isUser: true,
      },
    ],
  },
  {
    id: 102,
    title: "Incorrect Wage Calculation",
    type: "Wage Dispute",
    employer: "Tech Manufacturing",
    jobTitle: "Assembly Worker",
    workPeriod: "December 2023",
    amountDue: 3600,
    description:
      "Overtime hours not included in December payment. I worked an additional 12 hours over the standard working hours, but these were not accounted for in my payment.",
    status: "Resolved",
    filedDate: "2024-01-05",
    resolvedDate: "2024-01-15",
    resolution:
      "Employer recalculated wages and paid the difference of ₹3,600.",
    priority: "medium",
    responses: [
      {
        from: "Worker",
        message: "My overtime hours were not included in my December payment.",
        timestamp: "2024-01-05 08:45",
        isUser: true,
      },
      {
        from: "Admin",
        message:
          "We're reviewing your timesheet and will contact the employer.",
        timestamp: "2024-01-06 13:20",
        isUser: false,
      },
      {
        from: "Employer",
        message:
          "We've verified the overtime hours and will process the additional payment.",
        timestamp: "2024-01-10 15:30",
        isUser: false,
      },
    ],
  },
];

// Initialize page
document.addEventListener("DOMContentLoaded", function () {
  loadUserGrievances();
  updateGrievanceStats();
  displayActiveGrievances();
  displayResolvedGrievances();
});

function loadUserGrievances() {
  const stored = localStorage.getItem("userGrievances");
  if (stored) {
    userGrievances = JSON.parse(stored);
  } else {
    // Initialize with mock data for demo
    userGrievances = [...mockGrievances];
    localStorage.setItem("userGrievances", JSON.stringify(userGrievances));
  }
}

function saveUserGrievances() {
  localStorage.setItem("userGrievances", JSON.stringify(userGrievances));
}

function updateGrievanceStats() {
  const activeGrievances = userGrievances.filter(
    (g) => g.status !== "Resolved"
  );
  const inProgressGrievances = userGrievances.filter(
    (g) => g.status === "In Progress"
  );
  const resolvedCount =
    userGrievances.filter((g) => g.status === "Resolved").length +
    resolvedGrievancesMock.length;

  document.getElementById("totalGrievances").textContent =
    userGrievances.length + resolvedGrievancesMock.length;
  document.getElementById("activeGrievances").textContent =
    activeGrievances.length;
  document.getElementById("inProgressGrievances").textContent =
    inProgressGrievances.length;
  document.getElementById("resolvedGrievances").textContent = resolvedCount;
}

function displayActiveGrievances() {
  const container = document.getElementById("activeGrievancesList");
  const activeGrievances = userGrievances.filter(
    (g) => g.status !== "Resolved"
  );

  if (activeGrievances.length === 0) {
    container.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-clipboard-list fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">No active grievances</h5>
                <p class="text-muted">You don't have any active grievances at the moment.</p>
                <button class="btn btn-primary" onclick="showFileGrievanceModal()">
                    <i class="fas fa-plus me-1"></i>File Your First Grievance
                </button>
            </div>
        `;
    return;
  }

  container.innerHTML = activeGrievances
    .map(
      (grievance) => `
        <div class="card mb-3 grievance-card" data-grievance-id="${
          grievance.id
        }">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-8">
                        <div class="d-flex align-items-start justify-content-between mb-2">
                            <h5 class="card-title mb-1">
                                ${grievance.title}
                                ${
                                  grievance.priority === "high"
                                    ? '<span class="badge bg-danger ms-2">High Priority</span>'
                                    : ""
                                }
                            </h5>
                            <span class="badge bg-${getStatusColor(
                              grievance.status
                            )}">${grievance.status}</span>
                        </div>
                        <p class="text-muted mb-2">
                            <i class="fas fa-building me-1"></i>${
                              grievance.employer
                            } • 
                            <i class="fas fa-tag me-1"></i>${grievance.type}
                            ${
                              grievance.jobTitle
                                ? ` • <i class="fas fa-briefcase me-1"></i>${grievance.jobTitle}`
                                : ""
                            }
                        </p>
                        <p class="card-text text-truncate" style="max-width: 500px;">${
                          grievance.description
                        }</p>
                        <div class="d-flex align-items-center text-muted">
                            <small class="me-3">
                                <i class="fas fa-calendar me-1"></i>Filed: ${formatDate(
                                  grievance.filedDate
                                )}
                            </small>
                            <small class="me-3">
                                <i class="fas fa-clock me-1"></i>Updated: ${formatDate(
                                  grievance.lastUpdated
                                )}
                            </small>
                            ${
                              grievance.amountDue
                                ? `<small><i class="fas fa-rupee-sign me-1"></i>₹${grievance.amountDue.toLocaleString()}</small>`
                                : ""
                            }
                        </div>
                    </div>
                    <div class="col-md-4 text-md-end">
                        <div class="d-grid gap-2">
                            <button class="btn btn-primary btn-sm" onclick="viewGrievanceDetails(${
                              grievance.id
                            })">
                                <i class="fas fa-eye me-1"></i>View Details
                            </button>
                            <button class="btn btn-outline-secondary btn-sm" onclick="showAddResponseForm(${
                              grievance.id
                            })">
                                <i class="fas fa-comment me-1"></i>Add Response
                            </button>
                        </div>
                        ${
                          grievance.responses.length > 0
                            ? `
                            <div class="mt-2">
                                <small class="text-muted">
                                    <i class="fas fa-comments me-1"></i>${
                                      grievance.responses.length
                                    } response${
                                grievance.responses.length > 1 ? "s" : ""
                              }
                                </small>
                            </div>
                        `
                            : ""
                        }
                    </div>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

function displayResolvedGrievances() {
  const container = document.getElementById("resolvedGrievancesList");
  const resolvedGrievances = [
    ...userGrievances.filter((g) => g.status === "Resolved"),
    ...resolvedGrievancesMock,
  ];

  if (resolvedGrievances.length === 0) {
    container.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-check-circle fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">No resolved grievances</h5>
                <p class="text-muted">Your resolved grievances will appear here.</p>
            </div>
        `;
    return;
  }

  container.innerHTML = resolvedGrievances
    .map(
      (grievance) => `
        <div class="card mb-3 grievance-card" data-grievance-id="${
          grievance.id
        }">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-8">
                        <div class="d-flex align-items-start justify-content-between mb-2">
                            <h5 class="card-title mb-1">
                                ${grievance.title}
                                <i class="fas fa-check-circle text-success ms-2"></i>
                            </h5>
                            <span class="badge bg-success">Resolved</span>
                        </div>
                        <p class="text-muted mb-2">
                            <i class="fas fa-building me-1"></i>${
                              grievance.employer
                            } • 
                            <i class="fas fa-tag me-1"></i>${grievance.type}
                            ${
                              grievance.jobTitle
                                ? ` • <i class="fas fa-briefcase me-1"></i>${grievance.jobTitle}`
                                : ""
                            }
                        </p>
                        <p class="card-text text-truncate" style="max-width: 500px;">${
                          grievance.description
                        }</p>
                        ${
                          grievance.resolution
                            ? `
                            <div class="alert alert-success py-2 mt-2">
                                <strong>Resolution:</strong> ${grievance.resolution}
                            </div>
                        `
                            : ""
                        }
                        <div class="d-flex align-items-center text-muted">
                            <small class="me-3">
                                <i class="fas fa-calendar me-1"></i>Filed: ${formatDate(
                                  grievance.filedDate
                                )}
                            </small>
                            <small class="me-3">
                                <i class="fas fa-check me-1"></i>Resolved: ${formatDate(
                                  grievance.resolvedDate
                                )}
                            </small>
                            ${
                              grievance.amountDue
                                ? `<small><i class="fas fa-rupee-sign me-1"></i>₹${grievance.amountDue.toLocaleString()}</small>`
                                : ""
                            }
                        </div>
                    </div>
                    <div class="col-md-4 text-md-end">
                        <button class="btn btn-outline-primary btn-sm" onclick="viewGrievanceDetails(${
                          grievance.id
                        }, true)">
                            <i class="fas fa-eye me-1"></i>View Details
                        </button>
                        ${
                          grievance.responses.length > 0
                            ? `
                            <div class="mt-2">
                                <small class="text-muted">
                                    <i class="fas fa-comments me-1"></i>${
                                      grievance.responses.length
                                    } response${
                                grievance.responses.length > 1 ? "s" : ""
                              }
                                </small>
                            </div>
                        `
                            : ""
                        }
                    </div>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

function showFileGrievanceModal() {
  // Reset form
  document.getElementById("grievanceForm").reset();
  new bootstrap.Modal(document.getElementById("fileGrievanceModal")).show();
}

function submitGrievance() {
  const form = document.getElementById("grievanceForm");
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const title = document.getElementById("grievanceTitle").value;
  const type = document.getElementById("grievanceType").value;
  const employer = document.getElementById("employer").value;
  const jobTitle = document.getElementById("jobTitle").value;
  const workPeriod = document.getElementById("workPeriod").value;
  const amountDue = document.getElementById("amountDue").value;
  const description = document.getElementById("grievanceDescription").value;

  const newGrievance = {
    id: Date.now(),
    title,
    type,
    employer,
    jobTitle,
    workPeriod,
    amountDue: amountDue ? parseInt(amountDue) : null,
    description,
    status: "New",
    filedDate: new Date().toISOString().split("T")[0],
    lastUpdated: new Date().toISOString().split("T")[0],
    priority: type === "Safety Concern" ? "high" : "medium",
    responses: [],
  };

  userGrievances.unshift(newGrievance);
  saveUserGrievances();

  // Close modal
  bootstrap.Modal.getInstance(
    document.getElementById("fileGrievanceModal")
  ).hide();

  // Refresh displays
  updateGrievanceStats();
  displayActiveGrievances();

  showAlert(
    "Grievance submitted successfully! Reference ID: GRV-" + newGrievance.id,
    "success"
  );
}

function viewGrievanceDetails(grievanceId, isResolved = false) {
  let grievance;
  if (isResolved && grievanceId > 100) {
    grievance = resolvedGrievancesMock.find((g) => g.id === grievanceId);
  } else {
    grievance = userGrievances.find((g) => g.id === grievanceId);
  }

  if (!grievance) return;

  selectedGrievanceId = grievanceId;
  document.getElementById("grievanceDetailsTitle").textContent =
    grievance.title;

  const content = `
        <div class="row">
            <div class="col-md-8">
                <div class="mb-4">
                    <h6 class="text-primary">Grievance Information</h6>
                    <table class="table table-borderless">
                        <tr><td class="fw-bold">Reference ID:</td><td>GRV-${
                          grievance.id
                        }</td></tr>
                        <tr><td class="fw-bold">Type:</td><td>${
                          grievance.type
                        }</td></tr>
                        <tr><td class="fw-bold">Employer:</td><td>${
                          grievance.employer
                        }</td></tr>
                        ${
                          grievance.jobTitle
                            ? `<tr><td class="fw-bold">Job Title:</td><td>${grievance.jobTitle}</td></tr>`
                            : ""
                        }
                        ${
                          grievance.workPeriod
                            ? `<tr><td class="fw-bold">Work Period:</td><td>${grievance.workPeriod}</td></tr>`
                            : ""
                        }
                        ${
                          grievance.amountDue
                            ? `<tr><td class="fw-bold">Amount Due:</td><td>₹${grievance.amountDue.toLocaleString()}</td></tr>`
                            : ""
                        }
                        <tr><td class="fw-bold">Filed Date:</td><td>${formatDate(
                          grievance.filedDate
                        )}</td></tr>
                        ${
                          grievance.resolvedDate
                            ? `<tr><td class="fw-bold">Resolved Date:</td><td>${formatDate(
                                grievance.resolvedDate
                              )}</td></tr>`
                            : ""
                        }
                    </table>
                </div>
                
                <div class="mb-4">
                    <h6 class="text-primary">Description</h6>
                    <p>${grievance.description}</p>
                </div>
                
                ${
                  grievance.resolution
                    ? `
                    <div class="mb-4">
                        <h6 class="text-primary">Resolution</h6>
                        <div class="alert alert-success">
                            ${grievance.resolution}
                        </div>
                    </div>
                `
                    : ""
                }
                
                ${
                  grievance.responses.length > 0
                    ? `
                    <div class="mb-4">
                        <h6 class="text-primary">Communication History</h6>
                        <div class="communication-timeline">
                            ${grievance.responses
                              .map(
                                (response) => `
                                <div class="communication-item ${
                                  response.isUser
                                    ? "user-message"
                                    : "admin-message"
                                } mb-3">
                                    <div class="d-flex justify-content-between align-items-center mb-1">
                                        <strong class="text-${
                                          response.isUser
                                            ? "primary"
                                            : "secondary"
                                        }">${response.from}</strong>
                                        <small class="text-muted">${formatDateTime(
                                          response.timestamp
                                        )}</small>
                                    </div>
                                    <div class="message-content p-3 rounded bg-${
                                      response.isUser ? "light" : "primary"
                                    } ${
                                  response.isUser ? "text-dark" : "text-white"
                                }">
                                        ${response.message}
                                    </div>
                                </div>
                            `
                              )
                              .join("")}
                        </div>
                    </div>
                `
                    : ""
                }
            </div>
            
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h6 class="card-title">Status</h6>
                        <span class="badge bg-${getStatusColor(
                          grievance.status
                        )} fs-6">${grievance.status}</span>
                        
                        <h6 class="mt-3">Priority</h6>
                        <span class="badge bg-${
                          grievance.priority === "high" ? "danger" : "warning"
                        }">${
    grievance.priority === "high" ? "High" : "Medium"
  } Priority</span>
                        
                        <h6 class="mt-3">Timeline</h6>
                        <div class="timeline-item">
                            <small class="text-muted">Filed: ${formatDate(
                              grievance.filedDate
                            )}</small>
                        </div>
                        <div class="timeline-item">
                            <small class="text-muted">Last Updated: ${formatDate(
                              grievance.lastUpdated
                            )}</small>
                        </div>
                        ${
                          grievance.resolvedDate
                            ? `
                            <div class="timeline-item">
                                <small class="text-success">Resolved: ${formatDate(
                                  grievance.resolvedDate
                                )}</small>
                            </div>
                        `
                            : ""
                        }
                    </div>
                </div>
                
                ${
                  grievance.status !== "Resolved"
                    ? `
                    <div class="card mt-3">
                        <div class="card-body">
                            <h6 class="card-title">Next Steps</h6>
                            <p class="small text-muted">
                                ${getNextStepsMessage(grievance.status)}
                            </p>
                        </div>
                    </div>
                `
                    : ""
                }
            </div>
        </div>
    `;

  document.getElementById("grievanceDetailsContent").innerHTML = content;

  // Show/hide add response button based on status
  const addResponseBtn = document.getElementById("addResponseBtn");
  addResponseBtn.style.display =
    grievance.status === "Resolved" ? "none" : "block";

  new bootstrap.Modal(document.getElementById("grievanceDetailsModal")).show();
}

function showAddResponseForm(grievanceId = null) {
  if (grievanceId) {
    selectedGrievanceId = grievanceId;
  }

  document.getElementById("responseMessage").value = "";
  new bootstrap.Modal(document.getElementById("addResponseModal")).show();
}

function submitResponse() {
  const message = document.getElementById("responseMessage").value.trim();
  if (!message) {
    showAlert("Please enter a message", "warning");
    return;
  }

  const grievance = userGrievances.find((g) => g.id === selectedGrievanceId);
  if (!grievance) return;

  const newResponse = {
    from: "Worker",
    message: message,
    timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
    isUser: true,
  };

  grievance.responses.push(newResponse);
  grievance.lastUpdated = new Date().toISOString().split("T")[0];

  saveUserGrievances();

  // Close modal
  bootstrap.Modal.getInstance(
    document.getElementById("addResponseModal")
  ).hide();

  // Refresh displays
  displayActiveGrievances();

  showAlert("Response added successfully", "success");

  // If details modal is open, refresh it
  if (document.querySelector("#grievanceDetailsModal.show")) {
    viewGrievanceDetails(selectedGrievanceId);
  }
}

// Utility functions
function getStatusColor(status) {
  switch (status) {
    case "New":
      return "primary";
    case "In Progress":
      return "warning";
    case "Resolved":
      return "success";
    default:
      return "secondary";
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

function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getNextStepsMessage(status) {
  switch (status) {
    case "New":
      return "Your grievance has been received and is under review. Our team will contact the employer and get back to you within 2-3 business days.";
    case "In Progress":
      return "We are actively working on resolving your grievance. We will keep you updated on any developments.";
    default:
      return "Please wait for updates from our team.";
  }
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

// CSS for communication timeline
const style = document.createElement("style");
style.textContent = `
    .grievance-card {
        transition: transform 0.2s, box-shadow 0.2s;
    }
    .grievance-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15) !important;
    }
    .communication-timeline {
        max-height: 400px;
        overflow-y: auto;
    }
    .user-message {
        margin-left: 20px;
    }
    .admin-message {
        margin-right: 20px;
    }
    .message-content {
        border-left: 3px solid var(--bs-primary);
        word-wrap: break-word;
    }
    .user-message .message-content {
        border-left-color: var(--bs-secondary);
    }
`;
document.head.appendChild(style);

// Language Support for MigrantConnect

// Language data
const languages = {
  en: null, // Will be loaded from JSON
  hi: null,
  bn: null,
  te: null,
  ta: null,
  mr: null,
  gu: null,
  kn: null,
  ml: null,
  pa: null,
  or: null,
};

// Current language
let currentLanguage = "en";

// Load language from JSON file
async function loadLanguage(langCode) {
  try {
    console.log("Loading language:", langCode);

    if (!languages[langCode]) {
      console.log("Fetching language file:", `assets/lang/${langCode}.json`);
      const response = await fetch(`assets/lang/${langCode}.json`);
      if (response.ok) {
        languages[langCode] = await response.json();
        console.log("Language loaded successfully:", languages[langCode]);
      } else {
        console.warn(`Language file for ${langCode} not found, using fallback`);
        languages[langCode] = getFallbackTranslations(langCode);
      }
    }

    currentLanguage = langCode;
    localStorage.setItem("selectedLanguage", langCode);
    console.log("Applying translations...");
    applyTranslations();
    updateLanguageDisplay();

    // Trigger a final translation pass after a short delay to catch any dynamic content
    setTimeout(() => {
      console.log("Final translation pass...");
      applyTranslations();
    }, 500);
  } catch (error) {
    console.error("Error loading language:", error);
    languages[langCode] = getFallbackTranslations(langCode);
    applyTranslations();
    updateLanguageDisplay();
  }
}

// Apply translations to the page
function applyTranslations() {
  const elements = document.querySelectorAll("[data-translate]");
  console.log("Found", elements.length, "elements to translate");

  elements.forEach((element, index) => {
    const key = element.getAttribute("data-translate");
    let translation = getTranslation(key);

    console.log(`Translating element ${index + 1}: ${key} -> ${translation}`);

    // Handle dynamic content
    if (key === "welcome_message" && window.currentUserName) {
      translation = `Welcome, ${window.currentUserName}! 🙏`;
    } else if (key === "location_status" && window.currentUserLocation) {
      translation = window.currentUserLocation;
    }

    if (translation && translation !== key) {
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        element.placeholder = translation;
      } else {
        element.textContent = translation;
      }
    } else {
      console.warn(
        `No translation found for key: ${key}, using fallback or keeping original`
      );
    }
  });

  console.log(`Translation complete for language: ${currentLanguage}`);
}

// Get translation for a key
function getTranslation(key) {
  if (languages[currentLanguage] && languages[currentLanguage][key]) {
    return languages[currentLanguage][key];
  }

  // Fallback to English
  if (currentLanguage !== "en" && languages.en && languages.en[key]) {
    return languages.en[key];
  }

  // Return a default fallback for common missing keys
  const commonDefaults = {
    welcome_message: "Welcome to MigrantConnect! 🙏",
    location_status: "📍 Your location information",
    dashboard_title: "Dashboard",
    select_language: "Select Language",
    migrant_connect: "MigrantConnect",
    my_profile: "My Profile",
    notifications: "Notifications",
    settings: "Settings",
    home: "Home",
    services: "Services",
    profile: "Profile",
    help: "Help",
    about: "About",
    contact: "Contact",
    support: "Support",
    privacy: "Privacy",
    terms: "Terms",
    account: "Account",
    dashboard: "Dashboard",
    menu: "Menu",
    search_placeholder: "Search...",
    no_results: "No results found",
    load_more: "Load More",
    show_all: "Show All",
    hide: "Hide",
    show: "Show",
    yes: "Yes",
    no: "No",
    ok: "OK",
    welcome: "Welcome",
    hello: "Hello",
    goodbye: "Goodbye",
    thank_you: "Thank You",
    please_wait: "Please wait...",
    try_again: "Try Again",
    refresh: "Refresh",
    update: "Update",
    continue: "Continue",
    back: "Back",
    next: "Next",
    previous: "Previous",
    finish: "Finish",
    done: "Done",
    complete: "Complete",
    incomplete: "Incomplete",
    new: "New",
    old: "Old",
    recent: "Recent",
    popular: "Popular",
    recommended: "Recommended",
    featured: "Featured",
    trending: "Trending",
    latest: "Latest",
    oldest: "Oldest",
    name: "Name",
    email: "Email",
    phone: "Phone",
    address: "Address",
    city: "City",
    state: "State",
    country: "Country",
    pincode: "PIN Code",
    age: "Age",
    gender: "Gender",
    male: "Male",
    female: "Female",
    other: "Other",
    select: "Select",
    choose: "Choose",
    option: "Option",
    all: "All",
    none: "None",
    some: "Some",
    many: "Many",
    few: "Few",
    several: "Several",
    today: "Today",
    yesterday: "Yesterday",
    tomorrow: "Tomorrow",
    this_week: "This Week",
    last_week: "Last Week",
    next_week: "Next Week",
    this_month: "This Month",
    last_month: "Last Month",
    next_month: "Next Month",
    this_year: "This Year",
    last_year: "Last Year",
    next_year: "Next Year",
  };

  if (commonDefaults[key]) {
    return commonDefaults[key];
  }

  // Return formatted key if no translation found
  return key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

// Change language
function changeLanguage(langCode) {
  loadLanguage(langCode);
}

// Re-apply translations (useful after dynamic content updates)
function reapplyTranslations() {
  applyTranslations();
}

// Force translation refresh
function refreshTranslations() {
  applyTranslations();
  updateLanguageDisplay();
}

// Initialize page translations (call this from any page)
function initPageTranslations() {
  const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
  console.log("Initializing page translations with language:", savedLanguage);

  // Load language and apply translations multiple times to handle dynamic content
  loadLanguage(savedLanguage);

  // Set up periodic refresh to handle any dynamic content that appears later
  let refreshCount = 0;
  const refreshInterval = setInterval(() => {
    refreshCount++;
    refreshTranslations();

    // Stop after 5 refreshes (10 seconds)
    if (refreshCount >= 5) {
      clearInterval(refreshInterval);
    }
  }, 2000);
}

// Get fallback translations (hardcoded for offline support)
function getFallbackTranslations(langCode) {
  const translations = {
    en: {
      // Common
      language: "Language",
      back_to_dashboard: "Back to Dashboard",
      logout: "Logout",
      need_help: "Need Help?",
      helpline: "Helpline",
      website: "Website",
      email: "Email",
      quick_actions: "Quick Actions",
      available_services: "Available Services",
      date: "Date",
      status: "Status",
      amount: "Amount",
      active: "Active",
      pending: "Pending",
      inactive: "Inactive",
      view_details: "View Details",
      apply: "Apply",
      download: "Download",
      share: "Share",
      print: "Print",
      search: "Search",
      filter: "Filter",
      reset: "Reset",
      submit: "Submit",
      cancel: "Cancel",
      close: "Close",
      save: "Save",
      edit: "Edit",
      delete: "Delete",
      loading: "Loading...",
      error: "Error",
      success: "Success",

      // Login page
      login_subtitle: "Your Gateway to Portable Services",
      migrant_id_label: "Aadhaar/Migrant ID",
      select_user: "Select User",
      language_label: "Language",
      login_button: "Login",
      footer_text: "Bridging Services Across States",
      offline_warning: "⚠️ You're offline – showing cached data",

      // Dashboard
      your_benefits: "Your Portable Benefits",
      food_benefits: "Food Benefits",
      food_description: "Access subsidized food grains across states",
      health_benefits: "Healthcare",
      health_description: "Access medical services anywhere in India",
      education_benefits: "Education",
      education_description: "School admissions and scholarships",
      finance_benefits: "Finance",
      finance_description: "Banking and loan services",

      // Job Portal
      job_portal: "Job Portal",
      find_employment: "Find Employment Opportunities",
      job_search: "Job Search",
      location: "Location",
      job_type: "Job Type",
      salary_range: "Salary Range",
      experience_level: "Experience Level",
      skills: "Skills",
      company: "Company",
      salary: "Salary",
      apply_now: "Apply Now",
      view_job: "View Job",
      job_details: "Job Details",
      requirements: "Requirements",
      benefits: "Benefits",
      contact_employer: "Contact Employer",

      // Grievances
      grievances: "Grievances",
      file_grievance: "File Grievance",
      grievance_type: "Grievance Type",
      description: "Description",
      evidence: "Evidence",
      upload_files: "Upload Files",
      track_grievances: "Track Grievances",
      grievance_status: "Grievance Status",
      open: "Open",
      in_progress: "In Progress",
      resolved: "Resolved",
      closed: "Closed",

      // Welfare Schemes
      welfare_schemes: "Welfare Schemes",
      government_schemes: "Government Schemes",
      scheme_name: "Scheme Name",
      eligibility: "Eligibility",
      eligible: "Eligible",
      not_eligible: "Not Eligible",
      apply_scheme: "Apply for Scheme",
      scheme_details: "Scheme Details",
      application_status: "Application Status",

      // QR Code
      qr_identity: "QR Identity",
      digital_identity: "Digital Identity",
      qr_code: "QR Code",
      download_qr: "Download QR",
      share_qr: "Share QR",
      print_qr: "Print QR",
      scan_qr: "Scan QR",
      qr_instructions:
        "Show this QR code at any government service center for instant verification",

      // Footer
      footer_about: "About MigrantConnect",
      footer_about_desc:
        "Empowering India's internal migrant workers with seamless access to essential services across states. Making benefits truly portable and accessible for all.",
      footer_gov_initiative: "Government of India Initiative",
      footer_quick_links: "Quick Links",
      footer_services: "Services",
      footer_contact: "Contact Info",
      footer_helpline: "National Helpline",
      footer_email: "Email Support",
      footer_website: "Official Website",
      footer_privacy: "Privacy Policy",
      footer_terms: "Terms of Service",
      footer_accessibility: "Accessibility",
      footer_feedback: "Feedback",
      footer_copyright: "© 2025 MigrantConnect. All rights reserved.",
    },

    hi: {
      // Common
      language: "भाषा",
      back_to_dashboard: "डैशबोर्ड पर वापस जाएं",
      logout: "लॉग आउट",
      need_help: "सहायता चाहिए?",
      helpline: "हेल्पलाइन",
      website: "वेबसाइट",
      email: "ईमेल",
      quick_actions: "त्वरित कार्य",
      available_services: "उपलब्ध सेवाएं",
      date: "दिनांक",
      status: "स्थिति",
      amount: "राशि",
      active: "सक्रिय",
      pending: "लंबित",
      inactive: "निष्क्रिय",
      view_details: "विवरण देखें",
      apply: "आवेदन करें",
      download: "डाउनलोड",
      share: "साझा करें",
      print: "प्रिंट",
      search: "खोजें",
      filter: "फिल्टर",
      reset: "रीसेट",
      submit: "जमा करें",
      cancel: "रद्द करें",
      close: "बंद करें",
      save: "सेव करें",
      edit: "संपादित करें",
      delete: "हटाएं",
      loading: "लोड हो रहा है...",
      error: "त्रुटि",
      success: "सफलता",

      // Login page
      login_subtitle: "पोर्टेबल सेवाओं का प्रवेश द्वार",
      migrant_id_label: "आधार/प्रवासी आईडी",
      select_user: "उपयोगकर्ता चुनें",
      language_label: "भाषा",
      login_button: "लॉगिन",
      footer_text: "राज्यों में सेवाओं को जोड़ना",
      offline_warning: "⚠️ आप ऑफलाइन हैं – कैश किया गया डेटा दिखा रहे हैं",

      // Dashboard
      your_benefits: "आपके पोर्टेबल लाभ",
      food_benefits: "खाद्य लाभ",
      food_description: "राज्यों में सब्सिडी वाले खाद्यान्न का उपयोग करें",
      health_benefits: "स्वास्थ्य सेवा",
      health_description: "भारत में कहीं भी चिकित्सा सेवाओं का उपयोग करें",
      education_benefits: "शिक्षा",
      education_description: "स्कूल प्रवेश और छात्रवृत्ति",
      finance_benefits: "वित्त",
      finance_description: "बैंकिंग और ऋण सेवाएं",
    },

    bn: {
      // Common
      language: "ভাষা",
      back_to_dashboard: "ড্যাশবোর্ডে ফিরে যান",
      logout: "লগ আউট",
      need_help: "সাহায্য প্রয়োজন?",
      helpline: "হেল্পলাইন",
      website: "ওয়েবসাইট",
      email: "ইমেইল",
      quick_actions: "দ্রুত কার্যক্রম",
      available_services: "উপলব্ধ সেবা",
      date: "তারিখ",
      status: "অবস্থা",
      amount: "পরিমাণ",
      active: "সক্রিয়",
      pending: "মুলতুবি",
      inactive: "নিষ্ক্রিয়",
      view_details: "বিস্তারিত দেখুন",
      apply: "আবেদন করুন",
      download: "ডাউনলোড",
      share: "শেয়ার",
      print: "প্রিন্ট",
      search: "অনুসন্ধান",
      filter: "ফিল্টার",
      reset: "রিসেট",
      submit: "জমা দিন",
      cancel: "বাতিল",
      close: "বন্ধ",
      save: "সেভ",
      edit: "সম্পাদনা",
      delete: "মুছুন",
      loading: "লোড হচ্ছে...",
      error: "ত্রুটি",
      success: "সফল",

      // Login page
      login_subtitle: "পোর্টেবল সেবার প্রবেশদ্বার",
      migrant_id_label: "আধার/প্রবাসী আইডি",
      select_user: "ব্যবহারকারী নির্বাচন করুন",
      language_label: "ভাষা",
      login_button: "লগইন",
      footer_text: "রাজ্যজুড়ে সেবা সংযোগ",
      offline_warning: "⚠️ আপনি অফলাইনে আছেন – ক্যাশ করা ডেটা দেখানো হচ্ছে",
    },
  };

  return translations[langCode] || translations.en;
}

// Update language display
function updateLanguageDisplay() {
  const currentLangElement = document.getElementById("currentLanguage");
  if (currentLangElement) {
    const langNames = {
      en: "English",
      hi: "हिन्दी",
      ta: "தமிழ்",
      bn: "বাংলা",
      te: "తెలుగు",
      mr: "मराठी",
      gu: "ગુજરાતી",
      kn: "ಕನ್ನಡ",
      ml: "മലയാളം",
      pa: "ਪੰਜਾਬੀ",
      or: "ଓଡିଆ",
    };
    currentLangElement.textContent = langNames[currentLanguage] || "English";
  }
}

// Toggle language dropdown
function toggleLanguageDropdown() {
  const dropdown = document.getElementById("languageDropdown");
  if (dropdown) {
    dropdown.classList.toggle("hidden");
  }
}

// Initialize language system
function initializeLanguage() {
  const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
  console.log("Initializing language system with:", savedLanguage);
  loadLanguage(savedLanguage);
}

// Initialize language system when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, initializing language...");
  setTimeout(() => {
    initPageTranslations();
  }, 100);
});

// Also initialize immediately if document is already loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    setTimeout(initPageTranslations, 100);
  });
} else {
  console.log("Document already loaded, initializing language immediately...");
  setTimeout(initPageTranslations, 100);
}

// Ensure translations are applied when the page becomes visible
document.addEventListener("visibilitychange", function () {
  if (!document.hidden) {
    setTimeout(refreshTranslations, 100);
  }
});

// Auto-refresh translations periodically to handle dynamic content
setInterval(function () {
  if (document.hasFocus()) {
    refreshTranslations();
  }
}, 3000);

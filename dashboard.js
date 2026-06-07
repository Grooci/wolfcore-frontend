let token = localStorage.getItem("wolfcore_token");

if (!token) {
    window.location.href = "login.html";
}

function getUser() {
    return localStorage.getItem("wolfcore_user");
}

function updateWelcome() {
    let user = getUser();

    document.getElementById("welcomeText").innerText =
        user ? "Welcome, " + user + " 🐺" : "Welcome to WolfCore 🐺";
}

function init() {
    loadTheme();
    updateWelcome();
    loadDashboardData();
    loadMyProgress();
    showSection("dashboardSection");
}

window.onload = init;

function logout() {
    localStorage.removeItem("wolfcore_token");
    localStorage.removeItem("wolfcore_user");
    localStorage.removeItem("wolfcore_email");

    window.location.href = "login.html";
}

function showSection(sectionId) {
    let sections = document.querySelectorAll(".section");

    sections.forEach(section => {
        section.classList.add("hidden");
    });

    document.getElementById(sectionId).classList.remove("hidden");

    if (sectionId === "settingsSection") {
        loadSettings();
    }
}

function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("collapsed");
}

async function loadDashboardData() {
    try {
        let res = await fetch("https://wolfcore-backend.onrender.com/dashboard-data", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        let data = await res.json();
        console.log("Dashboard Data:", data);

    } catch (err) {
        console.error("Dashboard error:", err);
    }
}
async function loadMyProgress() {
    try {
        let res = await fetch("https://wolfcore-backend.onrender.com/dashboard-data", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        let data = await res.json();

        let progress = data?.user?.progress ?? 0;

        document.getElementById("progressBox").innerHTML =
            "Your Progress: " + progress + "%";

    } catch (err) {
        console.error("Progress error:", err);
    }
}

function loadSettings() {
    document.getElementById("editUsername").value =
        localStorage.getItem("wolfcore_user") || "";

    document.getElementById("editEmail").value =
        localStorage.getItem("wolfcore_email") || "";
}

async function saveProfile() {
    let username = document.getElementById("editUsername").value.trim();
    let email = document.getElementById("editEmail").value.trim();

    let res = await fetch("https://wolfcore-backend.onrender.com/update-profile", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ username, email })
    });

    let data = await res.json();

    if (!res.ok) {
        alert(data.message || "Update failed");
        return;
    }

    localStorage.setItem("wolfcore_user", username);
    localStorage.setItem("wolfcore_email", email);

    updateWelcome();

    alert("Profile updated 🐺");
}

async function changePassword() {
    let p1 = document.getElementById("newPassword").value;
    let p2 = document.getElementById("confirmPassword").value;

    if (p1 !== p2) {
        alert("Passwords do not match");
        return;
    }

    let res = await fetch("https://wolfcore-backend.onrender.com/change-password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ password: p1 })
    });

    let data = await res.json();

    if (!res.ok) {
        alert(data.message || "Password update failed");
        return;
    }

    alert("Password updated 🔐");
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    localStorage.setItem(
        "wolfcore_theme",
        document.body.classList.contains("dark-mode") ? "dark" : "light"
    );
}

function loadTheme() {
    let theme = localStorage.getItem("wolfcore_theme");

    if (theme === "dark") {
        document.body.classList.add("dark-mode");
    }
}
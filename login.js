function showLogin() {
    document.getElementById("loginForm").classList.remove("hidden");
    document.getElementById("signupForm").classList.add("hidden");

    document.getElementById("loginTab").classList.add("active");
    document.getElementById("signupTab").classList.remove("active");
}

function showSignup() {
    document.getElementById("signupForm").classList.remove("hidden");
    document.getElementById("loginForm").classList.add("hidden");

    document.getElementById("signupTab").classList.add("active");
    document.getElementById("loginTab").classList.remove("active");
}

function togglePassword(id) {
    let input = document.getElementById(id);
    input.type = input.type === "password" ? "text" : "password";
}

async function login() {
    let username = document.getElementById("loginUsername").value.trim();
    let password = document.getElementById("loginPass").value;

    if (!username || !password) {
        alert("Please fill in all fields");
        return;
    }

    try {
        let response = await fetch("https://wolfcore-backend.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        let data = await response.json();

        if (!response.ok) {
            alert(data.message || "Login failed");
            return;
        }

        localStorage.setItem("wolfcore_token", data.token);
        localStorage.setItem("wolfcore_user", username);

        window.location.href = "dashboard.html";

    } catch (err) {
        console.error(err);
        alert("Server error. Try again later.");
    }
}
async function signup() {
    let username = document.getElementById("signupUsername").value.trim();
    let email = document.getElementById("signupEmail").value.trim();
    let password = document.getElementById("signupPass").value;

    if (!username || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    try {
        let response = await fetch("https://wolfcore-backend.onrender.com/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        });

        let data = await response.json();

        if (!response.ok) {
            alert(data.message || "Signup failed");
            return;
        }

        alert("User created successfully 🐺");
        showLogin();

    } catch (err) {
        console.error(err);
        alert("Server error. Try again later.");
    }
}
function showForgot() {
    document.getElementById("loginForm").classList.add("hidden");
    document.getElementById("signupForm").classList.add("hidden");
    document.getElementById("forgotForm").classList.remove("hidden");
}
async function sendResetCode() {
    let contact = document.getElementById("resetContact").value.trim();

    if (!contact) {
        alert("Enter email, phone, or username");
        return;
    }

    let res = await fetch("https://wolfcore-backend.onrender.com/request-reset", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ contact })
    });

    let data = await res.json();
    alert(data.message);
}
async function resetPassword() {
    let contact = document.getElementById("resetContact").value.trim();
    let code = document.getElementById("resetCode").value.trim();
    let newPassword = document.getElementById("newPassword").value;

    if (!contact || !code || !newPassword) {
        alert("Fill all fields");
        return;
    }

    let res = await fetch("https://wolfcore-backend.onrender.com/reset-password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contact,
            code,
            newPassword
        })
    });

    let data = await res.json();
    alert(data.message);

    if (res.ok) {
        showLogin();
    }
}
showLogin();
// 🔐 protect admin page
let token = localStorage.getItem("wolfcore_token");
if (!token) {
    window.location.href = "login.html";
}
// 📊 fetch users from backend
async function loadUsers() {
    let res = await fetch("https://wolfcore-backend.onrender.com/admin/users", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    });
    let data = await res.json();
    let container = document.getElementById("users");
    container.innerHTML = "<h2>Students</h2>";
    data.forEach(user => {
        container.innerHTML += `
            <div class="card">
                <h3>${user.username}</h3>
                <p>Role: ${user.role}</p>
            </div>
        `;
    });
}
container.innerHTML += `
    <div class="card">
        <h3>${user.username}</h3>
        <p>Role: ${user.role}</p>
        <p>Progress: ${user.progress || 0}%</p>
        <input type="number" min="0" max="100" id="p-${user.username}" placeholder="Update progress">

        <button onclick="updateProgress('${user.username}')">
            Update
        </button>
    </div>
`;
async function updateProgress(username) {
    let token = localStorage.getItem("wolfcore_token");
    let value = document.getElementById(`p-${username}`).value;
    let res = await fetch("https://wolfcore-backend.onrender.com/admin/update-progress", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({
            username: username,
            progress: Number(value)
        })
    });
    let data = await res.json();
    alert(data.message);
    loadUsers(); // refresh UI
}
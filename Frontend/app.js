const form = document.getElementById("loginForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  msg.textContent = "";

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      msg.style.color = "green";
      msg.textContent = "✅ Acceso concedido, redirigiendo...";
      setTimeout(() => {
        window.location.href = "admin-panel.html"; // próxima vista
      }, 1000);
    } else {
      msg.textContent = data.msg || "Error en el inicio de sesión";
    }
  } catch (err) {
    msg.textContent = "Error de conexión con el servidor";
  }
});

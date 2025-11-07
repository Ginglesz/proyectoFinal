const token = localStorage.getItem("token");
const tableBody = document.getElementById("docsTable");
const msg = document.getElementById("msg");
const logoutBtn = document.getElementById("logoutBtn");

// Si no hay token, redirige al login
if (!token) {
  window.location.href = "index.html";
}

// Cerrar sesión
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "index.html";
});

// Obtener documentos del backend
async function fetchDocuments() {
  try {
    const res = await fetch("http://localhost:5000/api/admin/documents", {
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    if (res.status === 401 || res.status === 403) {
      msg.textContent = "No autorizado. Redirigiendo...";
      setTimeout(() => {
        localStorage.removeItem("token");
        window.location.href = "index.html";
      }, 1500);
      return;
    }

    const data = await res.json();

    tableBody.innerHTML = "";
    data.forEach(doc => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${doc._id}</td>
        <td>${doc.template?.name || "Sin nombre"}</td>
        <td>${doc.filledBy?.email || "Desconocido"}</td>
        <td>${doc.status}</td>
        <td>${new Date(doc.createdAt).toLocaleString()}</td>
      `;
      tableBody.appendChild(tr);
    });
  } catch (err) {
    msg.textContent = "Error al cargar los documentos.";
  }
}

fetchDocuments();

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const successMessage = document.getElementById("successMessage");

  if (!name || !email) {
    alert("Please fill out both fields.");
  } else if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
  } else {
    fetch("http://localhost:3000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    })
      .then((response) => response.json())
      .then((data) => {
        successMessage.textContent = data.message;
        successMessage.classList.remove("hidden");
        successMessage.style.display = "block";
        document.getElementById("myForm").reset();
      })
      .catch((error) => console.error("Error:", error));
  }
});

document.getElementById("fetchUsers").addEventListener("click", function () {
  fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then((data) => {
      const userList = document.getElementById("userList");
      userList.innerHTML = "";
      data.forEach((user) => {
        const userDiv = document.createElement("div");
        userDiv.textContent = `Name: ${user.name}, Email: ${user.email}`;
        userList.appendChild(userDiv);
      });
      userList.classList.remove("hidden");
      userList.style.display = "block";
    })
    .catch((error) => console.error("Error:", error));
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

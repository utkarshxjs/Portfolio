// Scroll Reveal
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach(section => {
    const windowHeight = window.innerHeight;
    const sectionTop = section.getBoundingClientRect().top;
    const revealPoint = 100;

    if (sectionTop < windowHeight - revealPoint) {
      section.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

// Contact Form Validation
const form = document.getElementById("contactForm");
const message = document.getElementById("formMessage");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const userMessage = document.getElementById("message").value.trim();

  if (!name || !email || !userMessage) {
    message.style.color = "red";
    message.textContent = "All fields are required.";
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: userMessage
      })
    });

    const data = await res.json();

    if (data.success) {
      message.style.color = "lightgreen";
      message.textContent = "Message sent successfully!";
      form.reset();
    }
  } catch (error) {
    message.style.color = "red";
    message.textContent = "Server error. Try again.";
  }
});
const navButtons = document.querySelectorAll(".navbar-link");
const pages = document.querySelectorAll("article");

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetId = button.id.replace("-btn", "");

    navButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    pages.forEach((article) => {
      article.classList.remove("active");
      if (article.id === targetId) {
        article.classList.add("active");
      }
    });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const progressBars = entry.target.querySelectorAll(".skill-progress-fill");
        progressBars.forEach((bar) => {
          const width = bar.style.width;
          bar.style.width = "0";
          requestAnimationFrame(() => {
            bar.style.width = width;
          });
        });
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.25 }
);

document.querySelectorAll(".skills-item").forEach((item) => {
  observer.observe(item);
});

(function () {
  emailjs.init({
    publicKey: "CBCe_oPFrVVpQG0Rf",
  });
})();

const form = document.getElementById("contact-form");
const feedback = document.getElementById("form-feedback");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  feedback.style.display = "none";

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    feedback.textContent = "Please fill in all required fields (Name, Email, Message).";
    feedback.className = "form-feedback error";
    feedback.style.display = "block";
    return;
  }

  emailjs.sendForm("service_wugagop", "template_yjmqfb7", form)
    .then(() => {
      feedback.textContent = "Thank you! Your message has been sent successfully. I'll get back to you soon.";
      feedback.className = "form-feedback success";
      feedback.style.display = "block";
      form.reset();
    })
    .catch((error) => {
      feedback.textContent = "Oops! Something went wrong. Please try again or email me directly at jyothiswar285@gmail.com.";
      feedback.className = "form-feedback error";
      feedback.style.display = "block";
      console.error("EmailJS Error:", error);
    });
});

const toggleBtn = document.getElementById('toggle-details');
const contactsSection = document.getElementById('contacts-section');

if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    if (contactsSection.style.maxHeight && contactsSection.style.maxHeight !== '0px') {
      contactsSection.style.maxHeight = '0px';
      toggleBtn.innerHTML = '<span>Show Details</span> <i class=\'bx bx-chevron-down\'></i>';
    } else {
      contactsSection.style.maxHeight = contactsSection.scrollHeight + 'px';
      toggleBtn.innerHTML = '<span>Hide Details</span> <i class=\'bx bx-chevron-up\'></i>';
    }
  });
}
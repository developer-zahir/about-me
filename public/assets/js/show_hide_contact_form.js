


const show_contact_form = document.querySelector("#show-contact-form");
const contact_form_section = document.querySelector(".contact-form-section");

// Set the default text content
show_contact_form.lastChild.textContent = "Show Contact Form"; // Default text

show_contact_form.addEventListener("click", (e) => {
  // Check if the 'active' class is already present on contact_form_section
  if (!contact_form_section.classList.contains("active")) {
    // If it's not present, add the 'active' class
    contact_form_section.classList.add("active");
    show_contact_form.lastChild.textContent = "Hide Contact Form"; // Text when active

  } else {
    // If it's already present, remove the 'active' class
    contact_form_section.classList.remove("active");
    show_contact_form.lastChild.textContent = "Show Contact Form"; // Text when not active

  }
});
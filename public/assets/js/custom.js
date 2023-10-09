

// Function to show or hide the icon based on the input field value
function updateIconVisibility(inputField, iconElement) {
  if (inputField.value.trim() !== "") {
    iconElement.classList.add("active");
  } else {
    iconElement.classList.remove("active");
  }
}

// Select input fields and social icons
const facebook_field = document.querySelector('input[name="facebook"]');
const twitter_field = document.querySelector('input[name="twitter"]');
const instagram_field = document.querySelector('input[name="instagram"]');
const linkedin_field = document.querySelector('input[name="linkedin"]');
const youtube_field = document.querySelector('input[name="youtube"]');
const github_field = document.querySelector('input[name="github"]');

const facebook_icon = document.querySelector('li[class="facebook"]');
const twitter_icon = document.querySelector('li[class="twitter"]');
const instagram_icon = document.querySelector('li[class="instagram"]');
const linkedin_icon = document.querySelector('li[class="linkedin"]');
const youtube_icon = document.querySelector('li[class="youtube"]');
const github_icon = document.querySelector('li[class="github"]');

// Add input event listeners to the input fields
facebook_field.addEventListener("input", () => {
  updateIconVisibility(facebook_field, facebook_icon);
});

twitter_field.addEventListener("input", () => {
  updateIconVisibility(twitter_field, twitter_icon);
});

instagram_field.addEventListener("input", () => {
  updateIconVisibility(instagram_field, instagram_icon);
});

linkedin_field.addEventListener("input", () => {
  updateIconVisibility(linkedin_field, linkedin_icon);
});

youtube_field.addEventListener("input", () => {
  updateIconVisibility(youtube_field, youtube_icon);
});

github_field.addEventListener("input", () => {
  updateIconVisibility(github_field, github_icon);
});

// Show the icon if the input field has an existing value
if (facebook_field.value.trim() !== "") {
  facebook_icon.classList.add("active");
}

if (twitter_field.value.trim() !== "") {
  twitter_icon.classList.add("active");
}

if (instagram_field.value.trim() !== "") {
  instagram_icon.classList.add("active");
}

if (linkedin_field.value.trim() !== "") {
  linkedin_icon.classList.add("active");
}

if (youtube_field.value.trim() !== "") {
  youtube_icon.classList.add("active");
}

if (github_field.value.trim() !== "") {
  github_icon.classList.add("active");
}

// Select the input field and the image preview element
const profile_image_field = document.querySelector(".profile_image_field");
const profile_image_preview = document.querySelector(".profile_image_preview");

// Add an event listener to the input field to capture the selected image
profile_image_field.addEventListener("change", function () {
  // Check if a file was selected
  if (profile_image_field.files && profile_image_field.files[0]) {
    const imageUrl = URL.createObjectURL(profile_image_field.files[0]);

    // Set the source of the image preview to the selected image
    profile_image_preview.src = imageUrl;
  }
});

// Select the input field and the div where you want to set the background
const banner_image_field = document.querySelector(".banner_image_field");
const banner_image_preview = document.querySelector(".banner_image_preview");

// Add an event listener to the input field to capture the selected image
banner_image_field.addEventListener("change", function () {
  // Check if a file was selected
  if (banner_image_field.files && banner_image_field.files[0]) {
    const imageUrl = URL.createObjectURL(banner_image_field.files[0]);

    // Set the background of the banner_image_preview div to the selected image
    banner_image_preview.style.backgroundImage = `url('${imageUrl}')`;
  }
});

// name and bio
const name_preview = document.querySelector(".name_preview");
const bio_preview = document.querySelector(".bio_preview");
const name_field = document.querySelector("input[name='name']");
const bio_field = document.querySelector("input[name='bio']");

name_field.addEventListener("input", () => {
  if (name_field.value) {
    name_preview.innerHTML = name_field.value;
  } else {
    name_preview.innerHTML = "Md Zahirul Islam";
  }
});

bio_field.addEventListener("input", () => {
  if (bio_field.value) {
    bio_preview.innerHTML = bio_field.value;
  } else {
    bio_preview.innerHTML = "Web Designer, Developer, WordPress, Shopify, Wix & Squarespace Expert";
  }
});














import fs from "fs";
import nodemailer from "nodemailer";
import { getRandomUniqueId, createSlug } from "../helpers/helpers.js";

// create user
export const user_register = async (req, res) => {
  const userData = JSON.parse(fs.readFileSync("./db/user-data.json").toString());
  const { name, email, bio, about, facebook, twitter, instagram, linkedin, youtube, github } = req.body;

  const existingUser = userData.find((user) => user.email === email);
  if (existingUser) {
    // Send an error response if the user already exists
    return res.status(400).json({ message: "User already exists" });
  }

  // Check if profile_image and banner_image fields exist in req.files
  const profileImage = req.files["profile_image"] ? req.files["profile_image"][0] : null;
  const bannerImage = req.files["banner_image"] ? req.files["banner_image"][0] : null;

  // Construct profile and banner image URLs
  const profileImageURL = profileImage ? `/profile_images/${profileImage.filename}` : "";
  const bannerImageURL = bannerImage ? `/banner_images/${bannerImage.filename}` : "";

  const user = {
    id: getRandomUniqueId(),
    slug: createSlug(
      name,
      userData.map((user) => user.slug)
    ),
    name,
    email,
    bio,
    about,
    profile_photo: profileImageURL,
    banner_photo: bannerImageURL,
    social: {
      facebook,
      twitter,
      instagram,
      linkedin,
      youtube,
      github,
    },
  };

  // create email transport and send email
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_ADDRESS,
      pass: process.env.MAIL_PASS,
    },
  });

  await transport.sendMail({
    from: `Developer zahir <contactdeveloperzahir@gmail.com>`,
    to: email,
    subject: "Your account has been successfully created",
    html: `
    <h1>Hi👋, ${name} </h1>
    <p>Your account has been successfully created.</p>
    <i>Lets's have fun</i>
    
    `,
  });

  userData.push(user);
  fs.writeFileSync("./db/user-data.json", JSON.stringify(userData));

  res.redirect("/dashboard");
};

// delete user
// export const delete_user = (req, res) => {
//   const userData = JSON.parse(fs.readFileSync("./db/user-data.json").toString());
//   const { id } = req.params;
//   const updateUser = userData.filter((user) => user.id !== id);

//   fs.writeFileSync("./db/user-data.json", JSON.stringify(updateUser));

//   res.redirect("/dashboard");
// };

export const delete_user = (req, res) => {
  const userData = JSON.parse(fs.readFileSync("./db/user-data.json").toString());
  const { id } = req.params;

  // Check if the id is the one you want to prevent deletion for
  if (id === "994344681_1696877879106") {
    // Handle the case where you don't want to delete this user
    res.status(403).send("Deletion of this user is not allowed.");
    return;
  }

  // Filter out the user to be deleted
  const updatedUsers = userData.filter((user) => user.id !== id);

  // Save the updated user data back to user-data.json
  fs.writeFileSync("./db/user-data.json", JSON.stringify(updatedUsers));

  res.redirect("/dashboard");
};


// edit  / update user
export const edit_user = (req, res) => {
  const userData = JSON.parse(fs.readFileSync("./db/user-data.json").toString());
  const { name, email, bio, about, facebook, twitter, instagram, linkedin, youtube, github } = req.body;
  const { id } = req.params;

  // Check if the id is the one you want to prevent editing for
  if (id === "994344681_1696877879106") {
    // Handle the case where you don't want to edit this user
    res.status(403).json({ message: "Editing of this user is not allowed." });
    return;
  }

  // Find the user by ID
  const userIndex = userData.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  // Check if the email is being changed and if it already exists
  if (email !== userData[userIndex].email) {
    const existingUser = userData.find((user) => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
  }

  // Check if profile_image and banner_image fields exist in req.files
  const profileImage = req.files && req.files["profile_image"] ? req.files["profile_image"][0] : null;
  const bannerImage = req.files && req.files["banner_image"] ? req.files["banner_image"][0] : null;

  // Construct profile and banner image URLs
  const profileImageURL = profileImage ? `/profile_images/${profileImage.filename}` : userData[userIndex].profile_photo;
  const bannerImageURL = bannerImage ? `/banner_images/${bannerImage.filename}` : userData[userIndex].banner_photo;

  // Update the user data
  userData[userIndex] = {
    ...userData[userIndex],
    id,
    name,
    email,
    bio,
    about,
    profile_photo: profileImageURL,
    banner_photo: bannerImageURL,
    social: {
      facebook,
      twitter,
      instagram,
      linkedin,
      youtube,
      github,
    },
  };

  // Save the updated user data to the file
  fs.writeFileSync("./db/user-data.json", JSON.stringify(userData));

  res.redirect("/dashboard");
};

// show register page
export const show_register_page = (req, res) => {
  res.render("register");
};

// show dashbord page
export const show_dashboard_page = (req, res) => {
  const userData = JSON.parse(fs.readFileSync("./db/user-data.json").toString());
  res.render("dashboard", {
    userData,
  });
};

//  Show all user page
export const show_all_user_page = (req, res) => {
  const userData = JSON.parse(fs.readFileSync("./db/user-data.json").toString());

  res.render("users", {
    userData,
  });
};

// show single user page
export const show_single_user_page = (req, res) => {
  const userData = JSON.parse(fs.readFileSync("./db/user-data.json").toString());
  const slug = req.params.slug;
  const user = userData.find((user) => user.slug === slug);
  res.render("user", {
    user,
  });
};

// show edit page
export const show_edit_page = (req, res) => {
  const userData = JSON.parse(fs.readFileSync("./db/user-data.json").toString());
  const { id } = req.params;
  const user = userData.find((user) => user.id === id);
  res.render("edit", { user });
};

// send email and collect email from singl page
export const collect_email = async (req, res) => {
  const userData = JSON.parse(fs.readFileSync("./db/user-data.json").toString());
  const { user_email, user_id, sender_name, sender_email, subject, message } = req.body;
  const userIndex = userData.findIndex((user) => user.id === user_id);

  // create email transport and send email
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_ADDRESS,
      pass: process.env.MAIL_PASS,
    },
  });

  await transport.sendMail({
    from: ` ${sender_name} <${sender_email}>`,
    to: user_email,
    subject,
    text: message,
  });

  // collect email
  if (userIndex !== -1) {
    // Initialize an "all_emails" array if it doesn't exist for the user
    if (!userData[userIndex].all_emails) {
      userData[userIndex].all_emails = [];
    }

    // Create a new email object
    const newEmail = {
      id: userData[userIndex].all_emails.length, // Set the 'id' to the current array length
      sender_name,
      sender_email,
      subject,
      message,
    };

    // Add the new email to the user's "all_emails" array
    userData[userIndex].all_emails.push(newEmail);

    // Save the updated user data back to user-data.json
    fs.writeFileSync("./db/user-data.json", JSON.stringify(userData));

    // Find the user's slug from userData
    const user = userData.find((user) => user.email === user_email);
    const slug = user ? user.slug : "";

    // Redirect to the user's single page
    res.redirect("/single/" + slug);
  } else {
    // Handle the case where the user with the given user_id is not found
    res.status(404).send("User not found");
  }
};

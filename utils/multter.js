import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "profile_image") {
      cb(null, "public/profile_images");
    } else if (file.fieldname === "banner_image") {
      cb(null, "public/banner_images");
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + Math.floor(Math.random(5) * 100) + "_" + file.originalname);
  },
});

export const userMultter = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif" || file.mimetype == "image/jpg" || file.mimetype == "image/webp") {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
}).fields([
  { name: "profile_image", maxCount: 1 },
  { name: "banner_image", maxCount: 1 },
]);

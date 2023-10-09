import express from "express";
import { collect_email, delete_user, edit_user, show_all_user_page, show_dashboard_page, show_edit_page, show_register_page, show_single_user_page, user_register } from "../controllers/userController.js";
import { userMultter } from "../utils/multter.js";



// express router init
const router = express.Router();


// ejs router setup
router.get("/register", show_register_page)
router.get("/dashboard", show_dashboard_page)
router.get(["/", "/users"], show_all_user_page)
router.get("/single/:slug", show_single_user_page)
router.get("/edit/:id", show_edit_page)




//  api router setup
router.post("/register", userMultter, user_register)
router.get("/user-delete/:id", delete_user)
router.post("/edit/:id", userMultter, edit_user)
router.post("/single/:slug", userMultter, collect_email)

// export default
export default router;

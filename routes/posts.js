const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost);

router.post("/createPost", ensureAuth, postsController.createPost);

router.put("/likePost/:id", postsController.likePost);

router.put("/updateUser/:id", ensureAuth, postsController.updateUser);

router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;

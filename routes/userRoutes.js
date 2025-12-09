const { signUp } = require("../controllers/authController");
const {
  createUser,
  getAllUsers,
  getUserById,
  UpdateUserById,
  deleteUserById,
} = require("../controllers/userController");

const express = require("express");

const router = express.Router();

router.route("/signup").post(signUp);
router.route("/").post(createUser).get(getAllUsers);
router
  .route("/:id")
  .get(getUserById)
  .patch(UpdateUserById)
  .delete(deleteUserById);

module.exports = router;

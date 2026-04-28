const router = require("express").Router();
const {
  //  getUsers,
  //  createUser,
  // getUser,
  getCurrentUser,
  updateUser,
} = require("../controllers/users");

const auth = require("../middlewares/auth");

// router.get("/", getUsers);
// router.get("/:userId", getUser);
// router.post("/", createUser);

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, updateUser);

module.exports = router;

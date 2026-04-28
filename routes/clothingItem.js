const router = require("express").Router();
const {
  createClothingItem,
  getClothingItems,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");
const auth = require("../middlewares/auth");

router.post("/", auth, createClothingItem);
router.get("/", getClothingItems);
router.delete("/:id", auth, deleteClothingItem);
router.put("/:id/likes", auth, likeItem);
router.delete("/:id/likes", auth, dislikeItem);

module.exports = router;

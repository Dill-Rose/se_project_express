const router = require("express").Router();
const {
  createClothingItem,
  getClothingItems,
  deleteClothingItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItem");

router.post("/", createClothingItem);
router.get("/", getClothingItems);
router.delete("/:id", deleteClothingItem);
router.put("/:id/likes", likeItem);
router.delete("/:id/likes", dislikeItem);

module.exports = router;

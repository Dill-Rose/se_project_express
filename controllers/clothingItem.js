const ClothingItem = require("../models/clothingItems");

const createClothingItem = (req, res) => {
  //  console.log("This is the request object:");
  //  console.log(req);
  // console.log("This is the request body:");
  // console.log(req.body);
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({
    name,
    weather,
    imageUrl,
    owner: "507f1f77bcf86cd799439011", // replace with req.user._id when authentication is implemented
  })
    .then((item) => {
      console.log("This is the created item:");
      console.log(item);
      res.status(201).send(item);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Invalid data provided" });
      } else {
        res
          .status(500)
          .send({ message: "An error occurred while creating the item" });
      }
    });
};

const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => {
      res.send(items);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .send({ message: "An error occurred while fetching items" });
    });
};

const deleteClothingItem = (req, res) => {
  const { id } = req.params;
  ClothingItem.findById(id)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== "507f1f77bcf86cd799439011") {
        return res.status(403).send({ message: "Forbidden" });
      }
      return ClothingItem.findByIdAndDelete(id).then(() =>
        res.send({ message: "Item deleted" })
      );
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Item not found" });
      } if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid item ID" });
      }
      return res
        .status(500)
        .send({ message: "An error occurred while deleting the item" });
    });
};

const likeItem = (req, res) => {
  const { id } = req.params;
  ClothingItem.findByIdAndUpdate(
    id,
    { $addToSet: { likes: "507f1f77bcf86cd799439011" } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Item not found" });
      } if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid item ID" });
      }
      return res
        .status(500)
        .send({ message: "An error occurred while liking the item" });
    });
};

const dislikeItem = (req, res) => {
  const { id } = req.params;
  ClothingItem.findByIdAndUpdate(
    id,
    { $pull: { likes: "507f1f77bcf86cd799439011" } },
    { new: true }
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Item not found" });
      } if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid item ID" });
      }
      return res
        .status(500)
        .send({ message: "An error occurred while disliking the item" });
    });
};

module.exports = {
  createClothingItem,
  getClothingItems,
  deleteClothingItem,
  likeItem,
  dislikeItem,
};

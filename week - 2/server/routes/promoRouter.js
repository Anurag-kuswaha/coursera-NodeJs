const express = require("express");
const bodyParser = require("body-parser");
const promoRouter = express.Router();
promoRouter.use(bodyParser.json());
const Promotion = require("../models/promotions");
promoRouter.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  next();
});
promoRouter.get("/", async (req, res, next) => {
  var allPromotions = await Promotion.find();
  console.log(allPromotions);
  res.statusCode = 200;

  if (allPromotions.length > 0) {
    res.json(allPromotions);
  } else {
    res.end(`nothing in the Database`);
  }
  next();
});
function validateBody(body, reqParams) {
  for (param of reqParams) {
    if (body[param] === undefined) {
      var res = `${param} is required`;
      return res;
    }
  }
  return true;
}
promoRouter.post("/", async (req, res, next) => {
  var isValidPromotion = validateBody(req.body, ["name"]);
  if (isValidPromotion === true) {
    var promotionVal = {
      name: req.body.name ? req.body.name : " ",
      image: req.body.image,
      label: req.body.label,
      price: req.body.price,
      description: req.body.description,
      featured: req.body.featured,
    };

    var newPromotion = await new Promotion(promotionVal);
    newPromotion
      .save()
      .then((Promotion) => {
        console.log(Promotion);
      })
      .catch((e) => {
        console.log(e);
      });
    res.statusCode = 200;
    res.end(`Successfully added Promotion in the Database`);
  } else {
    res.statusCode = 400;
    return res.end(isValidPromotion);
  }
});

promoRouter.put("/", (req, res, next) => {
  res.statusCode = 403;
  res.end(`PUT request doesn't support in promo router`);
});

promoRouter.delete("/", async (req, res, next) => {
  var allPromotions = await Promotion.deleteMany();
  if (allPromotions.deletedCount > 0) {
    res.sendStatus = 200;
    res.end(
      `${allPromotions.deletedCount} Promotions deleted from the database`
    );
  } else {
    res.statusCode = 404;
    res.end(`nothing to delete from the Database`);
  }
  next();
});

promoRouter.get("/:promoId", async (req, res, next) => {
  var name = req.params.promoId;
  var response = await Promotion.find({ name: name });
  if (response.length > 0) {
    res.end(`here is the detail : ${JSON.stringify(response)}`);
  } else {
    res.statusCode = 404;
    res.end(`no leader exists with ${name}`);
  }
  next();
});

promoRouter.post("/:promoId", (req, res, next) => {
  res.statusCode = 403;
  var promoName = req.body.name;
  var promoId = req.params.promoId;
  res.end(
    `for the ${promoName} in promoId:${promoId}, POST request doesn't support`
  );
});

promoRouter.put("/:promoId", async (req, res, next) => {
  var name = req.params.promoId;
  var isValidPromotion = validateBody(req.body, ["name"]);
  if (isValidPromotion === true) {
    var promotionVal = {
      name: req.body.name ? req.body.name : " ",
      image: req.body.image,
      label: req.body.label,
      price: req.body.price,
      description: req.body.description,
      featured: req.body.featured,
    };
    var newPromotion = await new Promotion(promotionVal);
    if (newPromotion.modifiedCount != 0) {
      res.statusCode = 200;
      res.end(`Successfully updated Promotion in the Database`);
    } else {
      res.statusCode = 404;
      res.end(`no Promotion found with the name ${name}`);
    }
  } else {
    res.statusCode = 400;
    return res.end(isValidPromotion);
  }
});

promoRouter.delete("/:promoId", async (req, res, next) => {
  var name = req.params.promoId;
  var result = await Promotion.deleteMany({ name });
  if (result.deletedCount > 0) {
    res.statusCode = 200;
    res.end(
      `Successfully deleted ${result.deletedCount} Promotion in the Database`
    );
  } else {
    res.statusCode = 404;
    res.end(`no Promotion found with the name ${name}`);
  }
});

module.exports = promoRouter;

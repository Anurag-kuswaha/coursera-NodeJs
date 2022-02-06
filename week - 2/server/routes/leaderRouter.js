const express = require("express");
const bodyParser = require("body-parser");
const leaderRouter = express.Router();
const Leader = require("../models/leaders");
leaderRouter.use(bodyParser.json());

leaderRouter.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  next();
});
leaderRouter.get("/", async (req, res, next) => {
  var allLeaders = await Leader.find();
  console.log(allLeaders);
  res.statusCode = 200;

  if (allLeaders.length > 0) {
    res.json(allLeaders);
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
leaderRouter.post("/", async (req, res, next) => {
  var isValidLeader = validateBody(req.body, ["name"]);
  if (isValidLeader === true) {
    var leaderVal = {
      name: req.body.name ? req.body.name : " ",
      designation: req.body.designation,
      abbr: req.body.abbr,
      description: req.body.description,
      featured: req.body.featured,
    };

    var newleader = new Leader(leaderVal);
    newleader
      .save()
      .then((leader) => {
        console.log(leader);
      })
      .catch((e) => {
        console.log(e);
      });
    res.statusCode = 200;
    res.end(`Successfully added Leader in the Database`);
  } else {
    res.statusCode = 400;
    return res.end(isValidLeader);
  }
});

leaderRouter.put("/", (req, res, next) => {
  res.statusCode = 400;
  res.end(`PUT request doesn't support in leader router`);
});

leaderRouter.delete("/", async (req, res, next) => {
  var allLeaders = await Leader.deleteMany();
  if (allLeaders.deletedCount > 0) {
    res.sendStatus = 200;
    res.end(`${allLeaders.deletedCount} Leaders deleted from the database`);
  } else {
    res.statusCode = 404;
    res.end(`nothing to delete from the Database`);
  }
  next();
});
leaderRouter.get("/:leaderId", async (req, res, next) => {
  var name = req.params.leaderId;
  var response = await Leader.find({ name: name });
  if (response.length > 0) {
    res.end(`here is the detail : ${JSON.stringify(response)}`);
  } else {
    res.statusCode = 404;
    res.end(`no leader exists with ${name}`);
  }
});

leaderRouter.post("/:leaderId", (req, res, next) => {
  res.statusCode = 400;
  res.end(`POST request doesn't support `);
});

leaderRouter.put("/:leaderId", (req, res, next) => {
  var name = req.params.leaderId;
  var isValidLeader = validateBody(req.body, ["name"]);
  console.log(isValidLeader);
  if (isValidLeader === true) {
    var leaderVal = {
      name: req.body.name ? req.body.name : " ",
      designation: req.body.designation,
      abbr: req.body.abbr,
      description: req.body.description,
      featured: req.body.featured,
    };
    //console.log(leaderSchema);
    var result = Leader.updateMany({ name }, leaderVal);
    //console.log(result);
    result
      .then((leader) => {
        if (leader.modifiedCount != 0) {
          res.statusCode = 200;
          res.end(`Successfully updated Leader in the Database`);
        } else {
          res.statusCode = 404;
          res.end(`no leader found with the name ${name}`);
        }
        console.log(leader);
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    res.statusCode = 400;
    return res.end(isValidLeader);
  }
});

leaderRouter.delete("/:leaderId", async (req, res, next) => {
  var name = req.params.leaderId;
  var result = await Leader.deleteMany({ name });
  console.log(result);
  if (result.deletedCount > 0) {
    res.statusCode = 200;
    res.end(
      `Successfully deleted ${result.deletedCount} Leader in the Database`
    );
  } else {
    res.statusCode = 404;
    res.end(`no leader found with the name ${name}`);
  }
});

module.exports = leaderRouter;

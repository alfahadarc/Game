const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//for PHOTO upload
const multer = require("multer");

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/");
  },
  filename: function (req, file, cb) {
    cb(null, "img." + file.originalname.split(".")[1]);
  },
});

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Database models
const GameData = require("./models/gamedata");
const Photo = require("./models/photo");
const Report = require("./models/report");

// App and Routes
const app = express();
const router = express.Router();

//Middleware
app.use(cors());
app.use(bodyParser.json());

app.use("/upload", express.static("upload"));

// Database connection
mongoose
  .connect("mongodb://localhost:27017/gamedata", {
    //.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection successful!!"));

//All game data get
router.route("/gamedatas").get((req, res) => {
  GameData.find()
    .sort("-score")
    .exec((err, data) => {
      //console.log(data[0]);
      res.json(data);
    });
});

//Only highest score get
router.route("/highest").get((req, res) => {
  GameData.find()
    .sort("-score")
    .exec((err, data) => {
      res.json(data[0]);
    });
});

//Save new gamedata
router.route("/gamedata/add").post((req, res) => {
  let gamedata = new GameData(req.body);
  gamedata
    .save()
    .then((gamedata) => {
      res.status(200).json({ gamedata: "Added successfully" });
    })
    .catch((err) => {
      res.status(400).send("Failed to create new record");
    });
});

//Save photo
router.route("/addphoto").post(upload.single("Image"), (req, res) => {
  const photo = new Photo({
    playerPhoto: req.file.path,
  });

  Photo.deleteMany({}, () => {
    photo
      .save()
      .then((photo) => {
        res.status(200).json({ msg: "Added photo successfully" });
      })
      .catch((err) => {
        //console.log(err);
        res.status(400).send("Failed to save photo");
      });
  });
});

//getphoto url
router.route("/getphoto").get((req, res) => {
  Photo.find((err, data) => {
    if (err) console.log("error");
    else res.json(data[0].playerPhoto);
  });
});

//Save report
router.route("/report").post((req, res) => {
  let report = new Report(req.body);
  report
    .save()
    .then((report) => {
      res.status(200).json({ report: "Report added successfully" });
    })
    .catch((err) => {
      res.status(400).send("Failed to create new report");
    });
});

//default route
app.get("/", function (req, res) {
  res.send("GET request to the homepage");
});

const port = process.env.PORT || 4000;
app.use("/", router);
app.listen(port, () => console.log("server connection"));

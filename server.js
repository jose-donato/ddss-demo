const express = require("express");
const bodyParser = require("body-parser");

const Sequelize = require("sequelize");
const path = require("path");

const bcrypt = require("bcrypt");

const axios = require("axios");
const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const sequelize = new Sequelize({
  logging: false,
  dialect: "sqlite",
  storage: path.join(__dirname, "./db.sqlite")
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

const modelDefinition = {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
};

/*const modelOptions = {
  freezeTableName: true,
  instanceMethods: {
      generateHash(password) {
          return bcrypt.hash(password, bcrypt.genSaltSync(8));
      },
      validPassword(password) {
          return bcrypt.compare(password, this.password);
      }
  }
};*/

const UserModel = sequelize.define("User", modelDefinition);

UserModel.beforeCreate((user, options) => {
  return bcrypt
    .hash(user.password, 10)
    .then(hash => {
      user.password = hash;
    })
    .catch(err => {
      throw new Error();
    });
});

UserModel.prototype.generateHash = async function(password) {
  return await bcrypt.hash(password, bcrypt.genSaltSync(8));
};

UserModel.prototype.validPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

sequelize.sync({ force: true }).then(() => {
  console.log(`Database & tables created!`);
  /*UserModel.bulkCreate([
      { username: 'user1', password: 'pass1' },
      { username: 'user2', password: 'pass1' },
      { username: 'user3', password: 'pass1' },
    ]).then(function() {
      return UserModel.findAll();
    }).then(function(users) {
      //console.log("Default users added");
      //console.log(users);
    });*/
});

const AuthController = {};

// Register a user.
AuthController.signUp = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.json({
      message: "Please provide a username, email and a password."
    });
  } else {
    const seq = await sequelize.sync();
    const newUser = {
      username: req.body.username,
      password: req.body.password
    };
    try {
      const user = await UserModel.create(newUser);
      res.status(201).json({
        message: "Account created!"
      });
    } catch (error) {
      res.status(403).json({
        message: "Error occurred"
      });
    }
  }
};

/*https://github.com/mikkoyli/sequelize-login-rest/blob/master/controllers/authController.js*/
AuthController.getUserByJwt = (req, res) => {
  if (req.headers && req.headers.authorization) {
    /*const token = req.headers['authorization'].replace(/^JWT\s/, '');
    let decoded;
    decoded = jwt.verify(token, config.keys.secret);

    console.log(decoded.username);
    // Fetch the user by id 
    User.findOne({_username: decoded.username}).then(function(user){
        // Do something with the user
        res.status(200).json({
          user
        });
    });*/
  }
};

// Authenticate a user.
AuthController.authenticateUser = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(404).json({
      message: "username and password are needed!"
    });
  } else {
    const username = req.body.username;
    const password = req.body.password;
    const potentialUser = {
      where: {
        username
      }
    };
    const user = await UserModel.findOne(potentialUser);
    if (!user) {
      res.status(404).json({
        message: "Authentication failed!"
      });
    } else {
      const isMatch = await user.validPassword(password);
      if (isMatch) {
        res.json({ success: true });
      } else {
        res.status(404).json({
          message: "Login failed!"
        });
      }
    }
  }
};

app.get("/users", async (req, res) => {
  //same as function(req, res) {}
  const users = await UserModel.findAll();
  res.json(users);
});
app.post("/login", AuthController.authenticateUser);
app.post("/signup", AuthController.signUp);

/* RATE LIMITING API */

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 100, // allow 100 requests per 15 minutes, then...
  delayMs: 500 // begin adding 500ms of delay per request above 100:
  // request # 101 is delayed by  500ms
  // request # 102 is delayed by 1000ms
  // request # 103 is delayed by 1500ms
  // etc.
});

const BASE_URL = "";

app.get("/api", limiter, speedLimiter, async (req, res, next) => {
  // in memory cache
  /*if (cacheTime && cacheTime > Date.now() - 30 * 1000) {
    return res.json(cachedData);
  }*/
  try {
    const API_SUBMISSION_URL = "https://urlscan.io/api/v1/scan/";
    const res = await axios({
      method: "post",
      url: API_SUBMISSION_URL,
      data: {
        url: "https://jose-donato.me",
        visibility: "public"
      },
      headers: {
        "Content-Type": "application/json",
        "API-Key": process.env.API_KEY
      }
    });
    
    const res2 = await axios({
      method: "get",
      url: res.api,
      headers: {
        "Content-Type": "application/json",
      }
    });
    
    
    return res.json(res2);
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      message: "Error occurred"
    });
  }
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

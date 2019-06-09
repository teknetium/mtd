/*
 |--------------------------------------
 | Dependencies
 |--------------------------------------
 */

const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
const Training = require("./models/Training");
const User = require("./models/User");

/*
 |--------------------------------------
 | Authentication Middleware
 |--------------------------------------
 */

module.exports = function(app, config) {
  // Authentication middleware
  const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`,
    }),
    audience: config.AUTH0_API_AUDIENCE,
    issuer: `https://${config.AUTH0_DOMAIN}/`,
    algorithm: "RS256",
  });

  // Check for an authenticated admin user
  const adminCheck = (req, res, next) => {
    const roles = req.user[config.NAMESPACE] || [];
    /*
    if (roles.indexOf('admin') > -1) {
      next();
    } else {
      res.status(401).send({message: 'Not authorized for admin access'});
    }
    */
    next();
  };

/*
 |--------------------------------------
 | API Routes
 |--------------------------------------
 */

  const trainingListProjection = "title type owner desc";
  const userListProjection = "uid userType firstName lastName email org";

  // GET API root
  app.get("/api/", (req, res) => {
    res.send("API works");
  });

  // GET list of public trainings starting in the future
  app.get("/api/trainings", (req, res) => {
    Training.find({ },
      trainingListProjection, (err, trainings) => {
        let trainingsArr = [];
        if (err) {
          return res.status(500).send({message: err.message});
        }
        if (trainings) {
          trainings.forEach(training => {
            trainingsArr.push(training);
          });
        }
        res.send(trainingsArr);
      },
    );
  });

  app.get("/api/users/:org", (req, res) => {
    User.find({org: req.params.org},
      userListProjection, (err, users) => {
        let usersArr = [];
        if (err) {
        return res.status(500).send({message: err.message});
      }
        if (users) {
        users.forEach(user => {
          usersArr.push(user);
        });
      }
        res.send(usersArr);
    });
  });

/*
  // Get the list of all trainings
  app.get('/api/trainings/admin', jwtCheck, adminCheck, (req, res) => {
    Training.find({}, _trainingListProjection, (err, trainings) => {
        let trainingsArr = [];
        if (err) {
          return res.status(500).send({message: err.message});
        }
        if (trainings) {
          trainings.forEach(training => {
            trainingsArr.push(training);
          });
        }
        res.send(trainingsArr);
      }
    );
  });
  */

  // GET training by training ID
  app.get("/api/training/:id", jwtCheck, (req, res) => {
    Training.findById(req.params.id, (err, training) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!training) {
        return res.status(400).send({message: "Training not found."});
      }
      res.send(training);
    });
  });

  app.get("/api/user/:id", jwtCheck, (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!user) {
        return res.status(400).send({message: "User not found."});
      }
      res.send(user);
    });
  });

  // POST a new event
  app.post("/api/training/new", (req, res) => {
    training.findOne({
      title: req.body.title,
      type: req.body.type,
      owner: req.body.owner}, (err, existingTraining) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (existingTraining) {
        return res.status(409).send({message: "You have already created an training with this title, type, owner."});
      }
      const training = new Training({
        title: req.body.title,
        type: req.body.type,
        owner: req.body.owner,
      });
      training.save((err2) => {
        if (err) {
          return res.status(500).send({message: err2.message});
        }
        res.send(training);
      });
    });
  });

  // PUT (edit) an existing training
  app.put("/api/training/:id", jwtCheck, (req, res) => {
    Training.findById(req.params.id, (err, training) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!training) {
        return res.status(400).send({message: "Training not found."});
      }
      training.title = req.body.title;
      training.type = req.body.type;
      training.owner = req.body.owner;

      training.save(err2 => {
        if (err) {
          return res.status(500).send({message: err2.message});
        }
        res.send(training);
      });
    });
  });

  // DELETE an training and all associated RSVPs
  app.delete("/api/training/:id", jwtCheck, (req, res) => {
    Training.findById(req.params.id, (err, training) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!training) {
        return res.status(400).send({message: "Training not found."});
      }
    });
  });

  // POST a new User
  app.post("/api/user/new", jwtCheck, (req, res) => {
    User.findOne({uid: req.body.uid}, (err, existingUser) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (existingUser) {
        return res.send(existingUser);
      }

      const user = new User({
        uid: req.body.uid,
        userType: req.body.userType,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        org: req.body.org,
        userStatus: req.body.userStatus,
        trainingStatus: req.body.trainingStatus,
        roles: req.body.roles,
        directReports: req.body.directReports,
        myTrainings: req.body.myTrainings,
      });
//      user.save((err2) => {
      User.create(user, function(err2, userObj) {
        if (err2) {
          return res.status(500).send({message: err2.message});
        }
        res.send(userObj);
      });
    });
  });

};

const app = require('./app');
const config = require('./app/config');
const mongodb = require("mongoose");

//connet to database
mongodb.connect(config.db.uri)
    .then(() => {
        console.log("Conneted to the database!");
        initial();
    })
    .catch((error) => {
        console.log("Cannot connet to the database!", error);
        process.exit();
    });

//start sv
const PORT = config.app.port;
app.listen(PORT, () => {
    console.log(`Server is running on port${PORT}.`);
});


const Role = require('./app/models').role

function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'user' to roles collection");
        });
        new Role({
          name: "moderator"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'moderator' to roles collection");
        });
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }



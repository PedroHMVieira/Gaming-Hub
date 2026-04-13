import app from "./app";
import sequelize from "./config/database";

import "./models/UserModel";
import "./models/AssessmentModel";
import "./models/associations";
import "./models/DevModel";
import "./models/GameModel";
import "./models/GenreModel";

const port = 3000;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Error connecting to database", error);
  });

app.listen(port, () => {
  console.log("Server is running on port", port);
});
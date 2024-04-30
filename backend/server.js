const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log({ message: `Server started on port ${port}` });
});

const routes = require('./app/routes/index')
app.use("/api/v1", routes);

app.get('/', (req, res) => {
    return res.status(200).json({status : true, message : 'Welcome to dizivan assignment backend'})
})

app.use("*", (req, res) => {
    res.status(404).send("Page not found");
});

// const closeClient = async () => {
//     client
//       .close()
//       .then(() => console.log("Client closed"))
//       .catch((err) => console.error("Error during client closing:", err))
//       .finally(() => process.exit(0));
// };
  
// process.on("SIGINT", () => {
//     closeClient();
// });

// process.on("SIGTERM", () => {
//     closeClient();
// });
const express = require("express");
const { allowedNodeEnvironmentFlags } = require("process");
const app = express();
const apiFunction = require("./routes/login");
app.use(express.json());

app.post("/login", apiFunction.login);
app.get("/user", apiFunction.user);
app.listen(3000, (a) => {
  console.log("running");
});

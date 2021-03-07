const jwt = require("jsonwebtoken");

function login(req, res) {
  let accessToken = jwt.sign(
    {
      userName: req.body.userName,
    },
    "secret",
    { expiresIn: "60s" }
  );
  let refreshToken = jwt.sign(
    {
      userName: req.body.userName,
    },
    "secret",
    { expiresIn: "1d" }
  );
  res.json({
    token: {
      refreshToken: refreshToken,
      accessToke: accessToken,
    },
  });
}
async function user(req, res) {
  let accessToken = req.headers.authorization;
  //let refreshToken = req.headers.authorization;
  /*
  if (refreshToken) {
    accessToken = jwt.sign(
      {
        userName: req.body.userName,
      },
      "secret",
      { expiresIn: "60s" }
    );
    console.log(accessToken);
  }
*/
  let decoded = jwt.verify(accessToken, "secret");
  if (!accessToken) {
    if (refreshToken) {
      accessToken = jwt.sign(
        {
          userName: req.body.userName,
        },
        "secret",
        { expiresIn: "60s" }
      );
      console.log("new accesstoken", accessToken);
    }
  } else {
    res.json({ isLogin: "true" });
  }
}
module.exports = {
  login: login,
  user: user,
};
console.log("hi");

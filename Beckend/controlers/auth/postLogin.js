const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postRegister = async (req, res) => {
  try {
    const { mail, password } = req.body;
    const user = await User.findOne({ mail: mail.toLowerCase() });
    console.log(user);
    if (!user) {
      res.status(400).send("user not found");
    }
    const pass = await bcrypt.compare(password, user.password);
    !pass && res.status(404).send("Wrong password");
    const token = jwt.sign(
      {
        userId: user._id,
        mail,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "24h",
      }
    );
    res.status(201).json({
      mail: user.mail,
      username,
      token,
    });
  } catch (err) {
    console.log(err);
    res.send(500);
  }
};
module.exports = postRegister;

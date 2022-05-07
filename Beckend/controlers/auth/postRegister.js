const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const user = require("../../models/user");
const jwt = require("jsonwebtoken");

const postRegister = async (req, res) => {
  try {
    const { username, mail, password } = req.body;
    const userExist = await User.exists({ mail: mail.toLowerCase() });
    if (userExist) {
      return res.status(409).send("E-mail already in use");
    }
    const encryptPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      mail: mail.toLowerCase(),
      password: encryptPassword,
    });
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
    return res.status(500).send("Erroe occured. please try again");
  }
};
module.exports = postRegister;

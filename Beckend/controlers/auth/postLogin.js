const User = require("../../models/user");
const bcrypt = require("bcryptjs");

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

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.send(500);
  }
};
module.exports = postRegister;

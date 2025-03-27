const jwt = require("jsonwebtoken");

class TokenService {
  static generateToken(user) {
    return jwt.sign(
      { id: user._id.toString(), role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
  }
}

module.exports = TokenService;

const TokenService = require("./TokenService");

class AuthService {
  static async login(user) {
    const token = TokenService.generateToken(user);
    return token;
  }
}

module.exports = AuthService;
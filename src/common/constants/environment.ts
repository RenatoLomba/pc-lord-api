export abstract class Environment {
  static port = process.env.PORT;

  static jwtSecret = process.env.JWT_SECRET;

  static jwtExpiresIn = process.env.JWT_EXPIRES_IN;

  static frontEndAppUrl = process.env.FRONT_END_APP_URL;
}

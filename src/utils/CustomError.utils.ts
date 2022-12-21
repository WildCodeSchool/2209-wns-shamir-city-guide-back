import { oups, shocked } from "./emoji.utils";

export class CustomError extends Error {
  status = 400;
  message = `${oups}${shocked} Ouups!!Something went wrong\n`;

  constructor(status: number, message: string | undefined) {
    super(message);

    this.status = status;
    this.message += message;

    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}


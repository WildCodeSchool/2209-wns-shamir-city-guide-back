import { StatusCode } from "../constants.utils";
import { IError } from "./interfaces.utils.error";
import { 
  emojiOups, 
  emojiShocked, 
  emojiUnhappy, 
  emojiEnraged, 
  emojiFurious, 
  emojiSurprised,
  emojiWarning,
  emojiForbidden
} from "../emoji.utils";

export class CustomError extends Error {
  statusCodeClass: string;
  statusCode: number;
  statusCodeMessage: string;
  message: string;
  emoji: string;

  constructor(error: IError, message: string) {
    super(message);    
    this.statusCodeClass = error.statusCodeClass;
    this.statusCode = error.statusCode;
    this.statusCodeMessage = error.statusCodeMessage;
    
    if (this.statusCode === StatusCode.BAD_REQUEST) {
      this.emoji = emojiOups + emojiShocked
      this.message = ` Ouups!!Something went wrong\n` + this.message;
    } else if (this.statusCode === StatusCode.UNAUTHORIZED || this.statusCode === StatusCode.FORBIDDEN) {
      this.emoji = emojiFurious + emojiForbidden + emojiEnraged;
      this.message = message;
    } else if (this.statusCode === StatusCode.NOT_FOUND) {
      this.emoji = emojiUnhappy + emojiSurprised;
      this.message = message;
    } else if (this.statusCode === StatusCode.UNPROCESSABLE_ENTITY) {
      this.emoji = emojiUnhappy + emojiSurprised;
      this.message = message;
    } else if (this.statusCode >= StatusCode.INTERNAL_SERVER_ERROR) {
      this.emoji = emojiShocked + emojiSurprised + emojiWarning;
      this.message = `${emojiShocked} Ouups!!Something went wrong\n` + this.message;
    }
    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}


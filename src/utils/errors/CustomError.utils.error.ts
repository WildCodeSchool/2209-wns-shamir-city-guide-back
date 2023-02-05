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
import { ApolloError } from 'apollo-server-errors';


export class CustomError extends ApolloError {
  statusCodeClass: string;
  statusCode: number;
  statusCodeMessage: string;
  message: string;
  emoji: string;

  constructor(error: IError, message: string) {
    super(message);  
    this.extensions.code = error.statusCodeMessage.toUpperCase();  
    this.extensions.statusCodeClass = error.statusCodeClass;
    this.extensions.statusCode = error.statusCode;
    this.extensions.statusCodeMessage = error.statusCodeMessage;
    
    if (this.extensions.statusCode === StatusCode.BAD_REQUEST) {
      this.extensions.emoji = emojiOups + emojiShocked
      this.message = `Oups!! Quelque chose s'est mal passé\n` + this.message;
    } else if (this.extensions.statusCode === StatusCode.UNAUTHORIZED || this.extensions.statusCode === StatusCode.FORBIDDEN) {
      this.extensions.emoji = emojiFurious + emojiForbidden + emojiEnraged;
      this.message = message;
    } else if (this.extensions.statusCode === StatusCode.NOT_FOUND) {
      this.extensions.emoji = emojiUnhappy + emojiSurprised;
      this.message = message;
    } else if (this.extensions.statusCode === StatusCode.UNPROCESSABLE_ENTITY) {
      this.extensions.emoji = emojiUnhappy + emojiSurprised;
      this.message = message;
    } else if (this.extensions.statusCode >= StatusCode.INTERNAL_SERVER_ERROR) {
      this.extensions.emoji = emojiShocked + emojiSurprised + emojiWarning;
      this.message = `${emojiShocked} Oups!! Quelque chose s'est mal passé\n` + this.message;
    }
    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}


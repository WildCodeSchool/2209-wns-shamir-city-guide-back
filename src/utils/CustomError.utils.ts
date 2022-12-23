import { 
  emojiOups, 
  emojiShocked, 
  emojiUnhappy, 
  emojiEnraged, 
  emojiFurious, 
  emojiSurprised,
  emojiWarning,
  emojiForbidden
} from "./emoji.utils";

export class CustomError extends Error {
  status = 400;
  message = ` Ouups!!Something went wrong\n`;

  constructor(status: number, message: string | undefined) {
    super(message);

    this.status = status;
    
    let emoji ='';
    if (this.status === 401 || this.status === 403) emoji = emojiFurious + emojiForbidden + emojiEnraged;
    else if (this.status > 403 && this.status < 500) emoji = emojiUnhappy + emojiSurprised;
    else if (this.status >= 500) emoji = emojiShocked + emojiSurprised + emojiWarning;
    else emoji = emojiOups + emojiShocked;
    
    this.message = emoji + this.message + message;
    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}


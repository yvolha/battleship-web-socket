import { usersDb } from "../database/database.js";

enum VALIDATION_ERRORS {
    LENGTH_TOO_SHORT = "Length is too short.",
    DUPLICATE_NAME = "There already is a user with such a name, please pick a different name.",
    WRONG_PASSWORD = "Incorrect password, please try again.",
  };
  
  export default function getIsUserInvalid (name: string) {
    if (name.length < 5) {
      return VALIDATION_ERRORS.LENGTH_TOO_SHORT;
    }
  
    if (Object.values(usersDb).find((el) => el.name === name)) {
      return VALIDATION_ERRORS.DUPLICATE_NAME;
    }
  
    return null;
  };
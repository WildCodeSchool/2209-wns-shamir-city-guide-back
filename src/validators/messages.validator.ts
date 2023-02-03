// Common
export enum CommonErrorValidator {
  ID_EQUAL_0 = "L'identifiant doit être supérieur à 0",
  NAME_TOO_SHORT = "La longueur du nom est trop courte. La longueur minimale est de 1 caractère, mais la valeur actuelle est de 0",
  NAME_TOO_LONG = "La longueur du nom est trop longue, elle doit être au maximale de 255 caractères",
  EMAIL_TOO_LONG = "La longueur de l'email est trop longue, elle doit être au maximale de 255 caractères",
  EMAIL_WRONG_FORMAT = "L'email n'est pas dans le bon format",
}

//Role
export enum RoleErrorValidator {
  ID_NOT_REQUIRED = "L'identifiant du rôle de l'utilisateur n'est pas requis",
  ID_REQUIRED = "L'identifiant du rôle de l'utilisateur est requis",
  ID_EQUAL_0 = "L'identifiant du rôle doit être supérieur à 0",
  NAME_TOO_SHORT = "La longueur du nom du rôle est trop courte. La longueur minimale est de 1 caractère, mais la valeur actuelle est de 0",
  NAME_TOO_LONG = "La longueur du nom du rôle est trop longue, elle doit être au maximale de 255 caractères",
}

//User
export enum UserErrorValidator {
  ID_NOT_REQUIRED = "L'identifiant de l'utilisateur n'est pas requis",
  ID_REQUIRED = "L'identifiant de l'utilisateur est requis",
  ID_EQUAL_0 = "L'identifiant de l'utilisateur doit être supérieur à 0",
  USERNAME_TOO_SHORT = "La longueur du nom de l'utilisateur est trop courte. La longueur minimale est de 1 caractère, mais la valeur actuelle est de 0",
  USERNAME_TOO_LONG = "La longueur du nom de l'utilisateur est trop longue, elle doit être au maximale de 255 caractères",
  EMAIL_WRONG_FORMAT = "Le format de l'email de l'utilisateur est incorrect",
  EMAIL_TOO_LONG = "La longueur de l'email de l'utilisateur est trop longue, elle doit être au maximale de 255 caractères",
  PASSWORD_REQUIRED = "Le mot de passe est requis",
  PASSWORD_WRONG_FORMAT = "La format du mot de passe est incorrect, il faut au moins une majuscule, une minuscule, un chiffre et un caractère spécial. De plus sa longueur doit être de 8 caractères minimum",
}

//Circuit
export enum CircuitErrorValidator {
  ID_NOT_REQUIRED = "L'identifiant du circuit n'est pas requis",
  ID_REQUIRED = "L'identifiant du circuit est requis",
  ID_EQUAL_0 = "L'identifiant du circuit doit être supérieur à 0",
  NAME_TOO_SHORT = "La longueur du nom du circuit est trop courte. La longueur minimale est de 1 caractère, mais la valeur actuelle est de 0",
  NAME_TOO_LONG = "La longueur du nom du circuit est trop longue, elle doit être au maximale de 255 caractères",
  PICTURE_WRONG_FORMAT = "Le format de l'url de l'image ne convient pas",
  DESCRIPTION_TOO_SHORT = "La longueur de la description du circuit est trop courte. La longueur minimale est de 1 caractère, mais la valeur actuelle est de 0",
  DESCRIPTION_TOO_LONG = "La longueur de la description du circuit est trop longue. La valeur maximale est de 500 caractères",
  PRICE_INFERIOR_TO_0 = "Le prix du circuit ne peut pas être inférieur à 0 euros"
}

//Poi
export enum PoiErrorValidator {
  ID_NOT_REQUIRED = "L'identifiant du point d'intêret n'est pas requis",
  ID_REQUIRED = "L'identifiant du point d'intêret est requis",
  ID_EQUAL_0 = "L'identifiant du point d'intêret doit être supérieur à 0",
  NAME_TOO_SHORT = "La longueur du nom du point d'intêret est trop courte. La longueur minimale est de 1 caractère, mais la valeur actuelle est de 0",
  NAME_TOO_LONG = "La longueur du nom du point d'intêret est trop longue, elle doit être au maximale de 255 caractères",
  ADDRESS_TOO_SHORT = "La longueur de l'adresse du point d'intêret est trop courte, La longueur minimale est de 1 caractère, mais la valeur actuelle est de 0",
  ADDRESS_TOO_LONG = "La longueur de l'adresse du point d'intêret est trop longue, elle doit être au maximale de 255 caractères",
  LATITUDE_FORMAT = "La latitude du point d'intêret n'est pas au bon format",
  LONGITUDE_FORMAT = "La longitude du point d'intêret n'est pas au bon format",
  PICTURE_WRONG_FORMAT = "Le format de l'url de l'image ne convient pas",
  CITY_REQUIRED = "Le point d'intérêt doit être associé à une ville"
}

//City
export enum CityErrorValidator {
  ID_NOT_REQUIRED = "L'identifiant de la ville n'est pas requis",
  ID_REQUIRED = "L'identifiant de la ville est requis",
  ID_EQUAL_0 = "L'identifiant de la ville doit être supérieur à 0",
  NAME_TOO_SHORT = "La longueur du nom de la ville est trop courte. La longueur minimale est de 1 caractère, mais la valeur actuelle est de 0",
  NAME_TOO_LONG = "La longueur du nom de la ville est trop longue, elle doit être au maximale de 255 caractères",
  LATITUDE_FORMAT = "La latitude de la ville n'est pas au bon format",
  LONGITUDE_FORMAT = "La longitude de la ville n'est pas au bon format",
  PICTURE_WRONG_FORMAT = "Le format de l'url de l'image ne convient pas",
  USER_REQUIRED = "Un utilisateur doit être associé à cette ville",
}

//Type
export enum TypeErrorValidator {
  ID_NOT_REQUIRED = "L'identifiant du type n'est pas requis",
  ID_REQUIRED = "L'identifiant du type est requis",
  ID_EQUAL_0 = "L'identifiant du type doit être supérieur à 0",
  NAME_TOO_SHORT = "La longueur du nom du type est trop courte. La longueur minimale est de 1 caractère, mais la valeur actuelle est de 0",
  NAME_TOO_LONG = "La longueur du nom du type est trop longue, elle doit être au maximale de 255 caractères",
  LOGO_WRONG_FORMAT = "Le format de l'url du logo ne convient pas",
  COLOR_WRONG_FORMAT = "La format hexadécimal pour la couleur du type est incorrect",
}

//Tag
export enum TagErrorValidator {
  ID_NOT_REQUIRED = "L'identifiant du tag n'est pas requis",
  ID_REQUIRED = "L'identifiant du tag est requis",
  ID_EQUAL_0 = "L'identifiant du tag doit être supérieur à 0",
  NAME_TOO_SHORT = "La longueur du nom du tag est trop courte. La longueur minimale est de 1 caractère, mais la valeur actuelle est de 0",
  NAME_TOO_LONG = "La longueur du nom du tag est trop longue, elle doit être au maximale de 255 caractères",
  ICON_WRONG_FORMAT = "Le format de l'url de l'icône ne convient pas",
}

//Category
export enum CategoryErrorValidator {
  ID_EQUAL_0 = "L'identifiant de la catégorie doit être supérieur à 0",
  NAME_TOO_SHORT = "La longueur du nom de la catégorie est trop courte. La longueur minimale est de 1 caractère, mais la valeur actuelle est de 0",
  NAME_TOO_LONG = "La longueur du nom de la catégorie est trop longue, elle doit être au maximale de 255 caractères",
  ICON_WRONG_FORMAT = "Le format de l'url de l'icône ne convient pas",
  ID_NOT_REQUIRED = "L'identifiant de la catégorie n'est pas requis",
  ID_REQUIRED = "L'identifiant de la catégorie est requis",
  COLOR_WRONG_FORMAT = "Le format hexadécimal pour la couleur de la catégorie est incorrect",
}

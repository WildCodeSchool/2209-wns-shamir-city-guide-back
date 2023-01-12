// Common
export enum CommonErrorValidator {
    ID_EQUAL_0 = "L'identifiant doit être supérieur à 0",
    NAME_TOO_SHORT = "La longueur du nom est trop courte. La longueur minimale est de 1 caractère, mais la valeur actuelle est de 0",
    NAME_TOO_LONG = "La longueur du nom est trop longue, elle doit être au maximale de 255 caractères"
}

//Poi
export enum PoiErrorValidator {
    ID_NOT_REQUIRED = "L'identifiant du poit d'intêret n'est pas requis",
    ID_REQUIRED = "L'identifiant du poit d'intêret est requis",
    ID_EQUAL_0 = "L'identifiant du point d'intêret doit être supérieur à 0",
    NAME_TOO_SHORT = "La longueur du nom du point d'intêret est trop courte. La longueur minimale est de 1 caractère, mais la valeur actuelle est de 0",
    NAME_TOO_LONG = "La longueur du nom du point d'intêret est trop longue, elle doit être au maximale de 255 caractères",
    ADDRESS_TOO_SHORT = "La longueur de l'adresse du point d'intêret est trop courte, La longueur minimale est de 1 caractère, mais la valeur actuelle est de 0",
    ADDRESS_TOO_LONG = "La longueur de l'adresse du point d'intêret est trop longue, elle doit être au maximale de 255 caractères",
    LATITUDE_FORMAT = "La latitude du point d'intêret n'est pas au bon format",
    LONGITUDE_FORMAT = "La longitude du point d'intêret n'est pas au bon format",
    PICTURE_TOO_LONG = "La longueur de l'image du point d'intêret est trop longue, elle doit être au maximale de 255 caractères"
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
    PICTURE_TOO_LONG = "La longueur de l'image de la ville est trop longue, elle doit être au maximale de 255 caractères"
}

//Type
export enum TypeErrorValidator {
    ID_NOT_REQUIRED = "L'identifiant du type n'est pas requis",
    ID_REQUIRED = "L'identifiant du type est requis",
    ID_EQUAL_0 = "L'identifiant du type doit être supérieur à 0",
    NAME_TOO_SHORT = "La longueur du nom du type est trop courte. La longueur minimale est de 1 caractère, mais la valeur actuelle est de 0",
    NAME_TOO_LONG = "La longueur du nom du type est trop longue, elle doit être au maximale de 255 caractères",
    LOGO_TOO_LONG = "La longueur du logo du type est trop longue, elle doit être au maximale de 255 caractères",
    COLOR_TOO_SHORT = "La longueur de la couleur du type est trop courte",
    COLOR_TOO_LONG = "La longueur de la couleur du type est trop longue, elle doit être au maximale de 255 caractères"
}

//Tag
export enum TagErrorValidator {
    ID_NOT_REQUIRED = "L'identifiant du tag n'est pas requis",
    ID_REQUIRED = "L'identifiant du tag est requis",
    ID_EQUAL_0 = "L'identifiant du tag doit être supérieur à 0",
    NAME_TOO_SHORT = "La longueur du nom du tag est trop courte. La longueur minimale est de 1 caractère, mais la valeur actuelle est de 0",
    NAME_TOO_LONG = "La longueur du nom du tag est trop longue, elle doit être au maximale de 255 caractères",
    ICON_TOO_LONG = "La longueur de l'icône du tag est trop longue, elle doit être au maximale de 255 caractères"
}
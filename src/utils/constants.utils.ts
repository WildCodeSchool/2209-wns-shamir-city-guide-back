/* Constants for environments */
export const enum Environments {
    TEST="test",
    DEVELOPMENT="development",
    PRODUCTION="production"
}

/* Constants for errors and responses */
export const enum StatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    UNPROCESSABLE_ENTITY = 422,
    INTERNAL_SERVER_ERROR = 500,
}

export const enum StatusCodeClass {
    INFORMATIONAL_RESPONSE = "INFORMATIONAL_RESPONSE",
    SUCCESSFUL = "SUCCESSFUL",
    REDIRECTION = "REDIRECTION",
    CLIENT_ERROR = "CLIENT_ERROR",
    SERVER_ERROR = "SERVER_ERROR"
}

export const enum StatusCodeMessage {
    OK = "OK",
    CREATED = "Created",
    BAD_REQUEST = "Bad Request",
    UNAUTHORIZED = "Unauthorized",
    FORBIDDEN = "Forbidden",
    NOT_FOUND = "Not Found",
    UNPROCESSABLE_ENTITY = "Unprocessable Entity",
    INTERNAL_SERVER_ERROR = "Internal Server Error",
}

export const enum UserRoles {
    SUPER_ADMIN = "SUPER_ADMIN",
    CITY_ADMIN = "CITY_ADMIN",
    CONTRIBUTOR = "CONTRIBUTOR",
    USER = "USER"
}

export const enum DefaultIconsNames {
    TAG = "LocalOfferOutlined",
    TYPE = "ClassOutlined",
    CATEGORY = "CategoryOutlined"
}


/* FOR TESTS */ 
export const strTooLong = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec adipiscing elit. Aenean commodo ligula eget dolor";

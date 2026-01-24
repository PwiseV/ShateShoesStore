import { getErrorMessage } from "../constants/errorMessages.js";

/**
 * Handle service errors and send appropriate response
 * @param {Error} error - Error object
 * @param {Response} res - Express response object
 * @param {Object} statusMap - Custom status code mapping
 */
export const handleServiceError = (error, res, statusMap = {}) => {
  const errorCode = error.message;
  const message = getErrorMessage(errorCode);
  
  // Default status codes
  const defaultStatusMap = {
    // 400 Bad Request
    INVALID_INPUT: 400,
    MISSING_REQUIRED_FIELDS: 400,
    INVALID_RATING: 400,
    INVALID_DATE_RANGE: 400,
    EXPIRED_DATE_INVALID: 400,
    STARTED_DATE_INVALID: 400,
    REVIEW_ALREADY_EXISTS: 400,
    PROMOTION_ALREADY_USED_BY_USER: 400,
    MIN_ORDER_VALUE_NOT_MET: 400,
    CANNOT_SET_ACTIVE_BEFORE_START_DATE: 400,
    CANNOT_SET_ACTIVE_AFTER_EXPIRED_DATE: 400,
    CANNOT_SET_UPCOMING_AFTER_START_DATE: 400,
    CANNOT_SET_EXPIRED_BEFORE_END_DATE: 400,
    INVALID_STATUS_VALUE: 400,
    MISSING_UPDATE_FIELDS: 400,
    USER_ID_REQUIRED: 400,
    PROMOTION_CODE_REQUIRED: 400,
    
    // 401 Unauthorized
    UNAUTHORIZED: 401,
    INVALID_TOKEN: 401,
    TOKEN_EXPIRED: 401,
    INVALID_CREDENTIALS: 401,
    
    // 404 Not Found
    USER_NOT_FOUND: 404,
    PRODUCT_NOT_FOUND: 404,
    VARIANT_NOT_FOUND: 404,
    ORDER_ITEM_NOT_FOUND: 404,
    PROMOTION_NOT_FOUND: 404,
    POST_NOT_FOUND: 404,
    CATEGORY_NOT_FOUND: 404,
    ORDER_NOT_FOUND: 404,
    CART_ITEM_NOT_FOUND: 404,
    ADDRESS_NOT_FOUND: 404,
    FAVOURITE_NOT_FOUND: 404,
    
    // 409 Conflict
    PRODUCT_CODE_EXISTS: 409,
    SLUG_EXISTS: 409,
    SLUG_ALREADY_EXISTS: 409,
    VARIANT_ALREADY_EXISTS: 409,
    PROMOTION_CODE_EXISTS: 409,
    PROMOTION_CODE_ALREADY_EXISTS: 409,
    EMAIL_ALREADY_EXISTS: 409,
    USERNAME_ALREADY_EXISTS: 409,
    USER_ALREADY_EXISTS: 409,
    FAVOURITE_ALREADY_EXISTS: 409,
    
    // 410 Gone
    PROMOTION_EXPIRED: 410,
    PROMOTION_NOT_STARTED: 410,
    PROMOTION_NOT_VALID: 410,
    PROMOTION_LIMIT_REACHED: 410,
    
    // 422 Unprocessable Entity
    IMAGE_REQUIRED_FOR_NEW_COLOR: 422,
    THUMBNAIL_REQUIRED: 422,
    INSUFFICIENT_STOCK: 422,
  };
  
  // Merge with custom status map
  const statusCode = statusMap[errorCode] || defaultStatusMap[errorCode] || 500;
  
  console.error(`Error [${errorCode}]:`, error);
  
  return res.status(statusCode).json({ 
    success: false,
    message 
  });
};

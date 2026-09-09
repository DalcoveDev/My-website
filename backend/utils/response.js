export function success(res, data, statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    data
  });
}

export function created(res, data) {
  return success(res, data, 201);
}

export function noContent(res) {
  return res.status(204).end();
}

export function paginated(res, data, total, limit, offset) {
  return res.status(200).json({
    success: true,
    data,
    pagination: {
      total,
      limit,
      offset,
      hasMore: offset + limit < total
    }
  });
}

export function error(res, message, statusCode = 500, code = 'INTERNAL_ERROR') {
  return res.status(statusCode).json({
    success: false,
    error: message,
    code
  });
}

export function validationError(res, details) {
  return error(res, 'Validation failed', 400, 'VALIDATION_ERROR');
}

export function unauthorized(res, message = 'Unauthorized') {
  return error(res, message, 401, 'UNAUTHORIZED');
}

export function forbidden(res, message = 'Forbidden') {
  return error(res, message, 403, 'FORBIDDEN');
}

export function notFound(res, resource = 'Resource') {
  return error(res, `${resource} not found`, 404, 'NOT_FOUND');
}

export function conflict(res, message = 'Resource already exists') {
  return error(res, message, 409, 'CONFLICT');
}

export function rateLimited(res, message = 'Too many requests') {
  return error(res, message, 429, 'RATE_LIMITED');
}

export default {
  success,
  created,
  noContent,
  paginated,
  error,
  validationError,
  unauthorized,
  forbidden,
  notFound,
  conflict,
  rateLimited
};
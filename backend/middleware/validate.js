export const validators = {
  isString: (value) => typeof value === 'string',
  isNumber: (value) => typeof value === 'number' && !isNaN(value),
  isBoolean: (value) => typeof value === 'boolean',
  isArray: (value) => Array.isArray(value),
  isObject: (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
  isEmail: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  isUrl: (value) => /^https?:\/\//.test(value),
  minLength: (min) => (value) => typeof value === 'string' && value.length >= min,
  maxLength: (max) => (value) => typeof value === 'string' && value.length <= max,
  oneOf: (allowed) => (value) => allowed.includes(value)
};

export function validate(data, rules) {
  const errors = [];
  
  for (const [field, fieldRules] of Object.entries(rules)) {
    const value = data[field];
    
    for (const rule of fieldRules) {
      if (rule.required && (value === undefined || value === null)) {
        errors.push(`${field} is required`);
        continue;
      }
      
      if (value !== undefined && value !== null && rule.validator && !rule.validator(value)) {
        errors.push(rule.message || `${field} is invalid`);
      }
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

export function validateBody(rules) {
  return (req, res, next) => {
    const result = validate(req.body, rules);
    
    if (!result.valid) {
      return res.status(400).json({ error: 'Validation failed', details: result.errors });
    }
    
    if (next) next();
  };
}

export function validateQuery(rules) {
  return (req, res, next) => {
    const result = validate(req.query, rules);
    
    if (!result.valid) {
      return res.status(400).json({ error: 'Invalid query parameters', details: result.errors });
    }
    
    if (next) next();
  };
}

export const commonRules = {
  password: [{ required: true, validator: validators.minLength(8), message: 'Password must be at least 8 characters' }],
  email: [{ required: true, validator: validators.isEmail, message: 'Invalid email format' }],
  section: [{ required: true, validator: validators.isString, message: 'Section must be a string' }]
};

export default { validators, validate, validateBody, validateQuery, commonRules };
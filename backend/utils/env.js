const REQUIRED_ENV_VARS = [
  'DATABASE_URL',
  'ADMIN_PASSWORD'
];

const OPTIONAL_ENV_VARS = [
  'NODE_ENV',
  'VERCEL_ENV',
  'VERCEL_URL'
];

const DEFAULTS = {
  NODE_ENV: 'development'
};

export function validateEnv() {
  const missing = [];
  const invalid = [];
  
  for (const envVar of REQUIRED_ENV_VARS) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    } else if (process.env[envVar].trim() === '') {
      invalid.push(envVar);
    }
  }
  
  for (const [key, defaultValue] of Object.entries(DEFAULTS)) {
    if (!process.env[key]) {
      process.env[key] = defaultValue;
    }
  }
  
  const warnings = [];
  for (const envVar of OPTIONAL_ENV_VARS) {
    if (!process.env[envVar]) {
      warnings.push(envVar);
    }
  }
  
  return {
    valid: missing.length === 0 && invalid.length === 0,
    missing,
    invalid,
    warnings,
    environment: process.env.NODE_ENV
  };
}

export function getEnvVar(name, defaultValue = undefined) {
  const value = process.env[name];
  
  if (value === undefined || value === null) {
    if (defaultValue === undefined) {
      throw new Error(`Environment variable ${name} is not set`);
    }
    return defaultValue;
  }
  
  return value;
}

export function getEnvNumber(name, defaultValue = undefined) {
  const value = process.env[name];
  
  if (value === undefined || value === null) {
    if (defaultValue === undefined) {
      throw new Error(`Environment variable ${name} is not set`);
    }
    return defaultValue;
  }
  
  const num = parseInt(value, 10);
  
  if (isNaN(num)) {
    throw new Error(`Environment variable ${name} is not a valid number: ${value}`);
  }
  
  return num;
}

export function getEnvBoolean(name, defaultValue = false) {
  const value = process.env[name];
  
  if (value === undefined || value === null) {
    return defaultValue;
  }
  
  return value.toLowerCase() === 'true' || value === '1';
}

export default {
  validateEnv,
  getEnvVar,
  getEnvNumber,
  getEnvBoolean
};
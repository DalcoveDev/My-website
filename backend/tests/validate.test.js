import { describe, it } from 'node:test';
import assert from 'node:assert';
import { validators, validate } from '../middleware/validate.js';

describe('Validation Middleware', () => {
  describe('validators', () => {
    it('isString should validate strings', () => {
      assert.strictEqual(validators.isString('hello'), true);
      assert.strictEqual(validators.isString(123), false);
      assert.strictEqual(validators.isString(null), false);
    });

    it('isNumber should validate numbers', () => {
      assert.strictEqual(validators.isNumber(123), true);
      assert.strictEqual(validators.isNumber('123'), false);
      assert.strictEqual(validators.isNumber(NaN), false);
    });

    it('isEmail should validate emails', () => {
      assert.strictEqual(validators.isEmail('test@example.com'), true);
      assert.strictEqual(validators.isEmail('invalid-email'), false);
      assert.strictEqual(validators.isEmail('test@'), false);
    });

    it('minLength should validate minimum length', () => {
      const minLength5 = validators.minLength(5);
      assert.strictEqual(minLength5('hello'), true);
      assert.strictEqual(minLength5('hi'), false);
    });

    it('oneOf should validate against allowed values', () => {
      const oneOfABC = validators.oneOf(['a', 'b', 'c']);
      assert.strictEqual(oneOfABC('a'), true);
      assert.strictEqual(oneOfABC('d'), false);
    });
  });

  describe('validate', () => {
    it('should return valid for correct data', () => {
      const data = { name: 'John', email: 'john@example.com' };
      const rules = {
        name: [{ required: true, validator: validators.isString }],
        email: [{ required: true, validator: validators.isEmail }]
      };
      const result = validate(data, rules);
      assert.strictEqual(result.valid, true);
      assert.strictEqual(result.errors.length, 0);
    });

    it('should return errors for missing required fields', () => {
      const data = {};
      const rules = {
        name: [{ required: true }]
      };
      const result = validate(data, rules);
      assert.strictEqual(result.valid, false);
      assert.strictEqual(result.errors.length, 1);
    });

    it('should return errors for invalid data', () => {
      const data = { email: 'invalid' };
      const rules = {
        email: [{ validator: validators.isEmail, message: 'Invalid email' }]
      };
      const result = validate(data, rules);
      assert.strictEqual(result.valid, false);
      assert.strictEqual(result.errors[0], 'Invalid email');
    });
  });
});
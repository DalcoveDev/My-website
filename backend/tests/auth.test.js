import { describe, it } from 'node:test';
import assert from 'node:assert';
import { verifyAuth } from '../middleware/auth.js';

describe('Auth Middleware', () => {
  describe('verifyAuth', () => {
    it('should return invalid when no authorization header', () => {
      const req = { headers: {} };
      const result = verifyAuth(req);
      assert.strictEqual(result.valid, false);
    });

    it('should return invalid when authorization header is not Bearer', () => {
      const req = { headers: { authorization: 'Basic abc123' } };
      const result = verifyAuth(req);
      assert.strictEqual(result.valid, false);
    });

    it('should return invalid when token is empty', () => {
      const req = { headers: { authorization: 'Bearer ' } };
      const result = verifyAuth(req);
      assert.strictEqual(result.valid, false);
    });

    it('should return valid for valid admin token', () => {
      const token = Buffer.from(`admin:${Date.now()}`).toString('base64');
      const req = { headers: { authorization: `Bearer ${token}` } };
      const result = verifyAuth(req);
      assert.strictEqual(result.valid, true);
      assert.strictEqual(result.admin, true);
    });

    it('should return invalid for expired token', () => {
      const oldTimestamp = Date.now() - (25 * 60 * 60 * 1000);
      const token = Buffer.from(`admin:${oldTimestamp}`).toString('base64');
      const req = { headers: { authorization: `Bearer ${token}` } };
      const result = verifyAuth(req);
      assert.strictEqual(result.valid, false);
    });

    it('should return invalid for malformed token', () => {
      const req = { headers: { authorization: 'Bearer invalid-token' } };
      const result = verifyAuth(req);
      assert.strictEqual(result.valid, false);
    });
  });
});
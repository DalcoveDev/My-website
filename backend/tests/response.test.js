import { describe, it } from 'node:test';
import assert from 'node:assert';
import { success, created, error, paginated } from '../utils/response.js';

describe('Response Utilities', () => {
  const createMockRes = () => {
    const res = {
      statusCode: null,
      body: null,
      ended: false,
      status: (code) => {
        res.statusCode = code;
        return res;
      },
      json: (data) => {
        res.body = data;
        return res;
      },
      end: () => {
        res.ended = true;
        return res;
      },
      setHeader: () => res
    };
    return res;
  };

  describe('success', () => {
    it('should return 200 with data', () => {
      const res = createMockRes();
      success(res, { id: 1 });
      assert.strictEqual(res.statusCode, 200);
      assert.deepStrictEqual(res.body, { success: true, data: { id: 1 } });
    });

    it('should return custom status code', () => {
      const res = createMockRes();
      success(res, { id: 1 }, 201);
      assert.strictEqual(res.statusCode, 201);
    });
  });

  describe('created', () => {
    it('should return 201 with data', () => {
      const res = createMockRes();
      created(res, { id: 1 });
      assert.strictEqual(res.statusCode, 201);
    });
  });

  describe('error', () => {
    it('should return 500 with error message', () => {
      const res = createMockRes();
      error(res, 'Something went wrong');
      assert.strictEqual(res.statusCode, 500);
      assert.strictEqual(res.body.error, 'Something went wrong');
    });

    it('should return custom status code and code', () => {
      const res = createMockRes();
      error(res, 'Not found', 404, 'NOT_FOUND');
      assert.strictEqual(res.statusCode, 404);
      assert.strictEqual(res.body.code, 'NOT_FOUND');
    });
  });

  describe('paginated', () => {
    it('should return paginated response', () => {
      const res = createMockRes();
      paginated(res, [1, 2, 3], 10, 3, 0);
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.body.pagination.total, 10);
      assert.strictEqual(res.body.pagination.hasMore, true);
    });

    it('should indicate no more items', () => {
      const res = createMockRes();
      paginated(res, [1, 2, 3], 3, 3, 0);
      assert.strictEqual(res.body.pagination.hasMore, false);
    });
  });
});
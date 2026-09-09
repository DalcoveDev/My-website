# DALCOVE Portfolio Backend

Serverless backend API for the Dalcove Portfolio, deployed on Vercel with Neon Postgres.

## Architecture

- **Runtime**: Vercel Serverless Functions (Node.js)
- **Database**: Neon Postgres (serverless)
- **File Storage**: Vercel Edge Config / Local filesystem

## API Endpoints

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth` | POST | No | Login with password |
| `/api/content` | GET | No | Fetch all content |
| `/api/content` | POST | Yes | Save content (admin) |
| `/api/upload` | GET | No | List uploaded images |
| `/api/upload` | POST | Yes | Upload image file |
| `/api/health` | GET | No | Health check |
| `/api/search` | GET | No | Search content |
| `/api/analytics` | GET | No | View statistics |

## Environment Variables

```env
DATABASE_URL=postgresql://...     # Neon Postgres connection string
ADMIN_PASSWORD=your-password      # Admin panel password
```

## Development

```bash
# Install dependencies
npm install

# Run local dev server
npm run dev

# Run tests
npm test
```

## Database

### Schema

- **settings**: Key-value pairs for site configuration
- **items**: Section-based content items with JSONB data
- **images**: Uploaded image metadata

### Migrations

```bash
npm run migrate
```

### Seed Data

```bash
npm run seed
```

## File Structure

```
backend/
├── api/              # Vercel serverless functions
│   ├── auth.js       # Authentication endpoint
│   ├── content.js    # Content CRUD endpoint
│   ├── upload.js     # File upload endpoint
│   ├── health.js     # Health check
│   ├── search.js     # Search endpoint
│   └── db.js         # Database connection
├── middleware/        # Shared middleware
│   ├── cors.js       # CORS headers
│   ├── auth.js       # Auth verification
│   ├── rateLimit.js  # Rate limiting
│   └── logger.js     # Request logging
├── migrations/       # Database migrations
├── utils/            # Utility functions
├── tests/            # API tests
├── seed.sql          # Seed data
└── package.json      # Dependencies
```

## License

MIT
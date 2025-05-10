# War & Peace Platform

A full-stack web application built with React, Express, and TypeScript.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## Local Development Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd WarPeacePlatform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
NODE_ENV=development
DATABASE_URL=your_database_url
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Building for Production

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Free Deployment Options

### Option 1: Render.com (Recommended)

1. Create a free account on [Render](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure the following:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment Variables: Add your DATABASE_URL and other necessary variables
   - Choose the free instance type

### Option 2: Railway.app

1. Create an account on [Railway](https://railway.app)
2. Create a new project and connect your GitHub repository
3. Configure the deployment settings:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Add environment variables
   - Railway provides a free tier with limited usage

### Option 3: Fly.io

1. Install the Fly CLI
2. Create a `fly.toml` file:
```toml
app = "your-app-name"
primary_region = "dfw"

[build]
  builder = "heroku/buildpacks:20"

[env]
  PORT = "5000"

[http_service]
  internal_port = 5000
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 0
```

3. Deploy using:
```bash
fly launch
fly deploy
```

## Database Options

For free database hosting, you can use:
1. [Neon](https://neon.tech) - Serverless Postgres (Recommended)
2. [Supabase](https://supabase.com) - Postgres with additional features
3. [PlanetScale](https://planetscale.com) - MySQL-compatible serverless database

## Project Structure

- `/client` - Frontend React application
- `/server` - Backend Express application
- `/shared` - Shared types and utilities
- `/dist` - Production build output

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Type checking
- `npm run db:push` - Push database schema changes

## Notes

- The application runs on port 5000 by default
- For production deployment, ensure all environment variables are properly set
- The free deployment options mentioned above have usage limits and may require upgrading for higher traffic
- Consider setting up proper monitoring and logging for production deployments 




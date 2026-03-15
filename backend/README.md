# CrisisMind AI Backend

A Node.js backend server for the CrisisMind AI crisis intelligence platform.

## Features

- Express.js REST API
- MongoDB database integration
- Google Gemini AI analysis
- Crisis signal processing
- Alert management system
- CORS enabled
- Environment variable configuration

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env` file and update with your values
   - Add your MongoDB URI
   - Add your Google Gemini API key

4. Start the development server:
   ```bash
   npm run dev
   ```

The server will run on http://localhost:5000

## API Endpoints

### Health Check
- GET `/api/health` - Check server status

### Signals
- GET `/api/signals` - Get mock crisis signals

### Analysis
- POST `/api/analyze` - Analyze crisis signals using Gemini AI
  - Body: `{ "signals": ["signal1", "signal2"] }`

### Alerts
- GET `/api/alerts` - Get all alerts
- GET `/api/alerts/:id` - Get alert by ID
- POST `/api/alerts` - Create new alert

## Project Structure

```
backend/
├── server.js              # Main server file
├── config/
│   └── db.js             # Database connection
├── routes/               # API routes
│   ├── crisisRoutes.js
│   ├── analysisRoutes.js
│   └── alertRoutes.js
├── controllers/          # Route handlers
│   ├── crisisController.js
│   ├── geminiController.js
│   └── alertController.js
├── services/             # Business logic
│   ├── geminiService.js
│   └── signalService.js
├── models/               # Database models
│   └── Alert.js
├── utils/                # Utilities
│   └── logger.js
└── .env                  # Environment variables
```

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- Google Generative AI (Gemini)
- CORS
- dotenv
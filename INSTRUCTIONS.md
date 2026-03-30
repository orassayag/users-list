# Instructions

## Setup Instructions

### Prerequisites

- Node.js (v10 or higher)
- npm (v5 or higher)
- A code editor (VSCode recommended)

### Server Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   # or
   node index.js
   ```

4. Verify the server is running on port 3000:
   ```
   Server should display: "Listening to express server port 3000..."
   ```

### Client Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. The application will automatically open in your browser at `http://localhost:3001`

## Configuration

### Server Configuration

Server configuration files are located in `server/config/`:
- `config.development.json` - Development environment settings
- `config.production.json` - Production environment settings
- `config.test.json` - Test environment settings

**Default Configuration:**
```json
{
  "PORT_EXPRESS_SERVER": 3000,
  "PORT_WEBSOCKET_SERVER": 3000
}
```

### Client Configuration

Client settings are in `client/src/settings/`:
- `settings.development.json` - Development API endpoints
- `settings.production.json` - Production API endpoints

**Default Settings:**
```json
{
  "api_base_url": "http://localhost:3000"
}
```

## Running the Application

### Development Mode

1. **Start Server** (Terminal 1):
   ```bash
   cd server
   npm start
   ```

2. **Start Client** (Terminal 2):
   ```bash
   cd client
   npm start
   ```

3. **Access Application**:
   - Open browser to `http://localhost:3001`
   - Server API available at `http://localhost:3000`

### Production Build

Build the client for production:
```bash
cd client
npm run build
```

This creates an optimized production build in the `client/build/` directory.

## API Endpoints

### GET /api/users/getUsers

Fetches paginated users list.

**Query Parameters:**
- `pageNumber` (number, required) - Page number to fetch
- `top` (number, required) - Number of items per page

**Example:**
```bash
curl "http://localhost:3000/api/users/getUsers?pageNumber=1&top=50"
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "position": "Developer",
    "monthlySalary": "$5000"
  }
]
```

### POST /api/users/addUsers

Adds new users and broadcasts via WebSocket.

**Request Body:**
```json
[
  {
    "name": "Jane Smith",
    "position": "Designer",
    "monthlySalary": "$4500"
  }
]
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/users/addUsers \
  -H "Content-Type: application/json" \
  -d '[{"name":"Jane Smith","position":"Designer","monthlySalary":"$4500"}]'
```

## WebSocket Events

### Server Events

**Event:** `newUsers`
**Description:** Emitted when new users are added via API
**Payload:** Array of user objects

### Client Listeners

The client automatically listens for `newUsers` events and updates the UI in real-time.

## Data Files

User data is stored in JSON files in `server/data/`:
- `users.json` - Main users database
- `userNames.json` - Additional user names for generation

## Features

### Infinite Scroll

The application implements infinite scroll with:
- Automatic loading on scroll to bottom
- Smooth scroll behavior
- Loading indicators (large and small)
- "End of list" message when no more data

### Real-time Updates

New users added via API are instantly pushed to all connected clients via WebSocket.

### Caching

Server implements caching using `node-cache` to improve performance.

### Error Handling

- Server: Comprehensive error logging with Winston
- Client: Error states displayed in UI

## Development

### Building

**Client:**
```bash
cd client
npm run build
```

### Testing

**Client:**
```bash
cd client
npm test
```

### Linting

Both client and server use ESLint:

**Server:**
```bash
cd server
npx eslint .
```

**Client:**
```bash
cd client
npx eslint src/
```

## Troubleshooting

### Port Already in Use

If port 3000 or 3001 is already in use:

**Option 1:** Kill the process using the port
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9
lsof -ti:3001 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Option 2:** Change the port in configuration files

### CORS Issues

If you encounter CORS errors:
1. Ensure server is running on port 3000
2. Verify client settings point to correct server URL
3. Check that CORS is enabled in server (already configured)

### WebSocket Connection Failed

1. Verify server is running
2. Check firewall settings
3. Ensure Socket.IO client version matches server version

## Author

* **Or Assayag** - *Initial work* - [orassayag](https://github.com/orassayag)
* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://linkedin.com/in/orassayag

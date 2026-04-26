# Weather Dashboard

A real-time weather dashboard built with Next.js, React, and the OpenWeatherMap API.

## Features

✨ **Real-Time Weather Data**
- Current temperature, humidity, wind speed, and more
- Detailed weather metrics (visibility, pressure, cloud cover)
- 5-day weather forecast

🔍 **Smart Search**
- Search any city worldwide
- Automatic geolocation detection
- Error handling for invalid cities

🎨 **Beautiful UI**
- Responsive design with Tailwind CSS
- Gradient backgrounds and glassmorphism effects
- Weather-appropriate icons with Lucide React

## Setup

### Prerequisites
- Node.js 16+ and npm
- Free OpenWeatherMap API key

### Installation

1. **Get API Key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key

2. **Navigate to Project**
   ```bash
   cd weather-dashboard
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Configure Environment**
   Create `.env.local`:
   ```env
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```

6. **Open in Browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
weather-dashboard/
├── app/
│   ├── api/
│   │   ├── weather/route.js      # Current weather endpoint
│   │   └── forecast/route.js     # 5-day forecast endpoint
│   ├── globals.css               # Global styles
│   ├── layout.js                 # Root layout
│   └── page.js                   # Main dashboard
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── .env.example
├── .gitignore
└── README.md
```

## Components

### Main Dashboard (`page.js`)
- Displays current weather with temperature, "feels like", min/max
- Shows detailed metrics (humidity, wind, visibility, pressure)
- Provides 5-day forecast cards
- Includes search and geolocation features

### API Routes
- `GET /api/weather` - Fetches current weather by city or coordinates
- `GET /api/forecast` - Fetches 5-day forecast by coordinates

## Usage

1. **Default City** - Dashboard loads with Manila weather by default
2. **Search** - Type a city name and click the search button
3. **Geolocation** - Click the location icon to use your current position
4. **View Details** - Current weather card shows all metrics
5. **Check Forecast** - 5-day forecast displays at the bottom

## Built With

- [Next.js](https://nextjs.org/) - React framework
- [React](https://react.dev/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide React](https://lucide.dev/) - Icons
- [OpenWeatherMap API](https://openweathermap.org/api) - Weather data

## License

MIT

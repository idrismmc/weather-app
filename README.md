# Weather App

## Getting Started

To get started you need OpenWeather API key, Google's Places API, Maps Javascript API, Geocode API. - OpenWeather API key: https://openweathermap.org/api - To set up Google Maps for search autocompletion. You need to create a Google Cloud Platform account and enable Places API, Maps Javascript API and Geocode API. Create an API key once you have enabled the APIs.

To run the project locally, add a .env.local file in the root of the project and add the following:

```bash
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

Then run the following command:

```bash
npm install
npm run dev
```

Alternatively, you can use the dockerfile to build a container and run it.

```bash
docker build -t weather-app .
docker run -p 3000:3000 weather-app
```

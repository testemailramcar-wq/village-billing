export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const apiKey = searchParams.get('apiKey');

  if (!apiKey) {
    return Response.json(
      { message: 'API key is required' },
      { status: 400 }
    );
  }

  try {
    let url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;
    
    if (city) {
      url += `&q=${city}`;
    } else if (lat && lon) {
      url += `&lat=${lat}&lon=${lon}`;
    } else {
      return Response.json(
        { message: 'City or coordinates are required' },
        { status: 400 }
      );
    }

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { message: data.message || 'Weather data not found' },
        { status: response.status }
      );
    }

    return Response.json(data);
  } catch (error) {
    return Response.json(
      { message: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const apiKey = searchParams.get('apiKey');

  if (!apiKey || !lat || !lon) {
    return Response.json(
      { message: 'API key and coordinates are required' },
      { status: 400 }
    );
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { message: data.message || 'Forecast data not found' },
        { status: response.status }
      );
    }

    return Response.json(data);
  } catch (error) {
    return Response.json(
      { message: 'Failed to fetch forecast data' },
      { status: 500 }
    );
  }
}

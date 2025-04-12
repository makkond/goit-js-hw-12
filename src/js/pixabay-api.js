const API_KEY = '49650448-036e738118328f32db28a86cb';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 15,
  };

  try {
    const response = await window.axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Failed to fetch images');
  }
}

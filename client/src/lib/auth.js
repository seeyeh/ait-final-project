import axios from '@/api/axios';
import { apiRoutes } from '@/lib/routes';

// Sends a GET request to our Auth API to get a new access token (b/c our previous one has expired). Looks in our Cookies for our refreshToken that's in a HttpOnly cookie.
export const refreshToken = async () => {
  const response = await axios.get(apiRoutes.authRefresh, {
    headers: {
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      Expires: '0'
    },
    withCredentials: true // important b/c this setting allows us to send cookie with request, allowing us to send our refreshToken httpOnly cookie
  });
  return response.data.accessToken;
};

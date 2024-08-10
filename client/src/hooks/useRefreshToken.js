import axios from '../api/axios';
import useAuth from './useAuth';

// Sends a GET request to our Auth API to get a new access token (b/c our previous one has expired). Looks in our Cookies for our refreshToken that's in a HttpOnly cookie.
const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get('/auth/refresh', {
      withCredentials: true // important b/c this setting allows us to send cookie with request, allowing us to send our refreshToken httpOnly cookie
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;

// Purpose: attach the interceptors to an axios instance

import { useEffect } from 'react';
import { axiosPrivate } from '../api/axios';
import useAuth from './useAuth';
import useRefreshToken from './useRefreshToken';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          // If an Authorization header doesn't exist, that means this is a first attempt at making a request to the Auth API
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        // An error like if our access token has expired
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          // Forbidden due to expired access token and if sent property (which indicates we've already looked over this 403 once) doesn't exist/we've yet to look over this 403. Prevents infinite looping.
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest); // making the request again
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // removes the interceptors when cleanup function runs
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]); // The dependency array; we will use auth and refresh inside of this useEffect

  return axiosPrivate;
};

export default useAxiosPrivate;

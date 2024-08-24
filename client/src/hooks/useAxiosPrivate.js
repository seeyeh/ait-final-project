// axiosPrivate is used because it's an instance of axios that we've written a bunch of interceptors for in hooks/useAxiosPrivate.js that do the work of attaching necessary headers to first-time requests to the API (e.g. Authorization: "Bearer _____") where the accessToken needs to be attached or else they won't be authorized, and generating new accessTokens if they've expired, all without the user noticing anything

import { axiosPrivate } from '@/api/axios';
import useAuth from '@/hooks/useAuth';
import useRefreshToken from '@/hooks/useRefreshToken';
import { useEffect } from 'react';

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

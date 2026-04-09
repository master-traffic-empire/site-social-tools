'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

const FB_APP_ID = '2045343033000183';
const FB_SDK_VERSION = 'v21.0';

interface IGAccount {
  id: string;
  name: string;
  username: string;
  profilePictureUrl: string;
  pageId: string;
  pageAccessToken: string;
}

interface FacebookContextValue {
  isSDKLoaded: boolean;
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  accessToken: string | null;
  igAccount: IGAccount | null;
  login: () => void;
  logout: () => void;
  error: string | null;
}

const FacebookContext = createContext<FacebookContextValue>({
  isSDKLoaded: false,
  isLoggedIn: false,
  isLoggingIn: false,
  accessToken: null,
  igAccount: null,
  login: () => {},
  logout: () => {},
  error: null,
});

export function useFacebook() {
  return useContext(FacebookContext);
}

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: {
      init: (params: { appId: string; cookie: boolean; xfbml: boolean; version: string }) => void;
      login: (
        callback: (response: { authResponse?: { accessToken: string; userID: string } }) => void,
        options: { scope: string },
      ) => void;
      logout: (callback?: () => void) => void;
      getLoginStatus: (
        callback: (response: { status: string; authResponse?: { accessToken: string; userID: string } }) => void,
      ) => void;
      api: (
        path: string,
        params: Record<string, string>,
        callback: (response: { data?: unknown[]; error?: { message: string } } & Record<string, unknown>) => void,
      ) => void;
    };
  }
}

async function fetchIGAccount(accessToken: string): Promise<IGAccount | null> {
  return new Promise((resolve) => {
    window.FB.api(
      '/me/accounts',
      { fields: 'instagram_business_account{id,name,username,profile_picture_url},access_token', access_token: accessToken },
      (response) => {
        if (response.error || !response.data) {
          resolve(null);
          return;
        }
        const pages = response.data as Array<{
          id: string;
          access_token: string;
          instagram_business_account?: {
            id: string;
            name: string;
            username: string;
            profile_picture_url: string;
          };
        }>;
        for (const page of pages) {
          if (page.instagram_business_account) {
            resolve({
              id: page.instagram_business_account.id,
              name: page.instagram_business_account.name,
              username: page.instagram_business_account.username,
              profilePictureUrl: page.instagram_business_account.profile_picture_url,
              pageId: page.id,
              pageAccessToken: page.access_token,
            });
            return;
          }
        }
        resolve(null);
      },
    );
  });
}

export function FacebookProvider({ children }: { children: ReactNode }) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [igAccount, setIgAccount] = useState<IGAccount | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.FB) {
      setIsSDKLoaded(true);
      return;
    }

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: FB_APP_ID,
        cookie: true,
        xfbml: true,
        version: FB_SDK_VERSION,
      });
      setIsSDKLoaded(true);

      // Check if already logged in
      window.FB.getLoginStatus((response) => {
        if (response.status === 'connected' && response.authResponse) {
          const token = response.authResponse.accessToken;
          setAccessToken(token);
          fetchIGAccount(token).then((account) => {
            if (account) {
              setIgAccount(account);
              setIsLoggedIn(true);
            }
          });
        }
      });
    };

    const script = document.createElement('script');
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);
  }, []);

  const login = useCallback(() => {
    if (!window.FB) return;
    setIsLoggingIn(true);
    setError(null);

    window.FB.login(
      (response) => {
        if (response.authResponse) {
          const token = response.authResponse.accessToken;
          setAccessToken(token);
          fetchIGAccount(token).then((account) => {
            if (account) {
              setIgAccount(account);
              setIsLoggedIn(true);
              setIsLoggingIn(false);
            } else {
              setError('No Instagram Business Account found. Make sure your Instagram is connected to a Facebook Page as a Business or Creator account.');
              setIsLoggingIn(false);
            }
          });
        } else {
          setError('Login was cancelled or failed.');
          setIsLoggingIn(false);
        }
      },
      { scope: 'instagram_basic,pages_read_engagement,pages_show_list' },
    );
  }, []);

  const logout = useCallback(() => {
    if (window.FB) {
      window.FB.logout();
    }
    setIsLoggedIn(false);
    setAccessToken(null);
    setIgAccount(null);
    setError(null);
  }, []);

  return (
    <FacebookContext.Provider value={{ isSDKLoaded, isLoggedIn, isLoggingIn, accessToken, igAccount, login, logout, error }}>
      {children}
    </FacebookContext.Provider>
  );
}

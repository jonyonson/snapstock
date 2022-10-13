const AUTHENTICATED_ROUTES = ['/dashboard', '/profile', '/settings'];

const AUTH_STATUS = {
  LOADING: 'loading',
  AUTHENTICATED: 'authenticated',
  UNAUTHENTICATED: 'unauthenticated',
};

const IEX_CLOUD_BASE_URL = 'https://cloud.iexapis.com/stable';

const THEMES = ['light', 'dark'] as const;

const IEX_CLOUD = {
  BASE_URL: IEX_CLOUD_BASE_URL,
  TOKEN: process.env.IEX_CLOUD_API_KEY,
};

export { AUTHENTICATED_ROUTES, THEMES, AUTH_STATUS, IEX_CLOUD };

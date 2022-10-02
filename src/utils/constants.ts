const IEX_CLOUD_BASE_URL = 'https://cloud.iexapis.com/stable';

const AUTHENTICATED_ROUTES = ['/dashboard', '/profile', '/settings'];

const THEMES = [
  'light',
  'dark',
  // 'cupcake',
  // 'bumblebee',
  // 'emerald',
  // 'corporate',
  // 'synthwave',
  // 'retro',
  // 'cyberpunk',
  // 'valentine',
  // 'halloween',
  // 'garden',
  // 'forest',
  // 'aqua',
  // 'lofi',
  // 'pastel',
  // 'fantasy',
  // 'wireframe',
  // 'black',
  // 'luxury',
  // 'dracula',
  // 'cmyk',
  // 'autumn',
  // 'business',
  // 'acid',
  // 'lemonade',
  // 'night',
  // 'coffee',
  // 'winter',
] as const;

const IEX_CLOUD = {
  BASE_URL: IEX_CLOUD_BASE_URL,
  TOKEN: process.env.IEX_CLOUD_API_KEY,
};

export { AUTHENTICATED_ROUTES, THEMES, IEX_CLOUD };

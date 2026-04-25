import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Supported languages
  locales: ['en', 'fr', 'ar'],
  defaultLocale: 'ar'
});

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)']
};

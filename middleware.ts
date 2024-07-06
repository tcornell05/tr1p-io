import { NextResponse, NextRequest } from 'next/server';
import {hostMap} from '@/config/multi-site'

export function middleware(request: NextRequest) {
  /*const host = request.headers.get('host') ?? '';
  const response = NextResponse.next();
  console.log(request.url)
  console.log(new URL('/gameraven', request.url))
  switch (hostMap[host]) {
    case 'tr1p.io': {
      console.log('rewriting to /trip')
      return NextResponse.rewrite(new URL('/tr1p', request.url));
    }
    case 'gameraven.gg': {
      console.log('rewriting to /GameRaven')
      return NextResponse.rewrite(new URL('/gameraven', request.url));
    }

  }

  // For all other domains, do nothing special
  return response;*/
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
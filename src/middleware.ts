//next middleware are kept on the same level as app and it workd different with out express middleware

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
//we are setting middleware to use protected route if user is not logged in then this middleware will run on edge and redirect the user to some different route. 

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    //taking path
    const path = request.nextUrl.pathname;

    //public path that user can access
    const isPublicPath = path === '/login' || path === '/signup' || path === '/verify-email';

    //agr user logged in hai tb hum usse login and signup page show nhi karyanege isko krne ke liye hme token chaiye woh hme cookies ke through access ho jayega.
    const token = request.cookies.get('token')?.name || "";

    //if user has token and he is on isPublicPath then we will redirect him to home route
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/', request.url));
    }
    
    //for path protection
    //if user publioc path pr nhi hia aur token bhi nhi hia toh usse login pr redirectkrva denge
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.url));
    }
}
 
// See "Matching Paths" below to learn more
//yaha pr saare page put krne hai jinpr yeh logic work krega mtlb konse konse page ko protect krna hai.
export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/profile',
    '/verify-email',
    '/profile/:id*' //restricting dynamic route
  ],
}
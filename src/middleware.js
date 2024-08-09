export function middleware(request) {
    const currentUser = request.cookies.get('token')?.value;

    const path = request.nextUrl.pathname;
  

    const pathName = path === '/login' || path === '/register' || path ==='/login/passwordreset' || path === '/login/passwordreset/done'; 

    // If the user is logged in and trying to access the login page, redirect to home
    if (currentUser && pathName) {
        return Response.redirect(new URL('/', request.url));
        
    }

    // If the user is not logged in and trying to access any page other than login, redirect to login
    if (!currentUser && !pathName) {
        return Response.redirect(new URL('/login', request.url));
    }
    
    
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
};

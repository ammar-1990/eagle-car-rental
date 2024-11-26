// export { auth as middleware } from "@/auth"
import {auth} from '@/auth'
import { NextRequest } from 'next/server'


// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { auth } from './auth'
// export async function middleware(request: NextRequest) {
//     const session = await auth()
//     if(!session) {
//         console.log('no session')
//         return NextResponse.redirect(new URL('/login', request.url))
//     }
//     console.log(request.nextUrl.pathname)
  
//   }
 
export default auth((req)=>{
    const isLoggedIn = !!req.auth
    // if(!isLoggedIn) return r
    console.log(isLoggedIn)
})

export const config =  {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|login).*)',],
}
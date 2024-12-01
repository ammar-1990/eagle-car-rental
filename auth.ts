import NextAuth from "next-auth"
import credentials from "next-auth/providers/credentials"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
 
        let user = null
        const username = credentials.username
        const password = credentials.password
        
        if(!username || !password) return null
 
        // return user object with their profile data
        if(username !=='eagle car rental' ||  password !=='afsarafsar') return null
      
        return {name:'Eagle Car Rental'}
      },
    })
  ],
  pages: {
    signIn: "/login",
    signOut:'/login'
  },
})
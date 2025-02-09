  import NextAuth from "next-auth"
  import GitHub from "next-auth/providers/github"
  import { client } from "./sanity/lib/client"
  import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"
  import { writeClient } from "./sanity/lib/write-client"
  





  export const { auth, handlers, signIn, signOut } =  NextAuth({
    providers: [GitHub],
    // callbacks: {
      
      // signIn: async ({ user,  profile}:any) => {
        // // console.log(profile)
        // const existingUser = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile?.id });
        // // console.log(existingUser)
      
        // if (!existingUser) {
        //   await writeClient.create({
        //     _type: 'author',
        //     id: profile?.id,
        //     name: user.name,
        //     email: user.email,
        //     image: user.image,
        //     username: profile?.login,
        //     bio: profile?.bio,
        //   });
      //   }

        // user.id = profile?.id;
        // user.name = user.name || profile?.name;
        // user.email = user.email || profile?.email;
        // user.image = user.image || profile?.avatar_url; 
        // // console.log(user)
        
    //     return true; 
    //   },
    //   jwt: async (token: any) => {
        // // console.log(token)
        // if (token) {
        //   console.log(token.user.id)
        //   const user = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id:token?.user?.id });
        //   // console.log(user  )
      
        //   if (user) {
        //     token.id = user?._id;
        //   }
        // }
        // console.log(token,"token")
    //     return token;
    //   },
      
      // session: async ({ session, token }: any) => {
      //   console.log("lll")
      //   console.log(token)
      //   if (token?.user?.id) {
      //     console.log(token)

      //     session = token?.user;
      //     session.access_token = token?.account?.access_token
      //     session._id = token.id
          
      //   }
      //   console.log(session)
      //   return session;
      // }
    //   async session({ session, user, token }:any) {
    //     console.log(token)
    //     return session
    //   },
      
    // }
    callbacks:{
      async signIn({ user, account, profile, email, credentials }:any) {
          console.log(profile)
          const existingUser = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile?.id });
          console.log(existingUser,"existingUser")
          console.log(user,"user")
        
          if (!existingUser) {
            await writeClient.create({
              _type: 'author',
              id: profile?.id,
              name: user.name,
              email: user.email,
              image: user.image,
              username: profile?.login,
              bio: profile?.bio,
            });
          }
            user.id = profile?.id;
            user.name = user.name || profile?.name;
            user.email = user.email || profile?.email;
            user.image = user.image || profile?.avatar_url; 
            user._id = existingUser?._id
            // console.log(user)
        return true
      },
      async jwt({ token, user, account, profile, isNewUser }:any) {
        // console.log(token)
        if (token) {
          // console.log(Number(token.sub),"jwt")
          const user = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id:Number(token.sub) });
          // console.log(user  )
      
          if (user) {
            token.id = user?._id;
          }
        }
        // console.log(token,"token")
        return token
      },
      async session({ session, user, token }:any) {
        // console.log(session,"session")
        // console.log(token)
        if (token?.id) {
              // console.log(token,"session")
    
              // session = token?.user;
              // session.access_token = token?.account?.access_token
              session._id = token.id
              
        }
        console.log(session,"session")
        return session
      },
    }
  })
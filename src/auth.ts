  import NextAuth from "next-auth"
  import GitHub from "next-auth/providers/github"
  import { client } from "./sanity/lib/client"
  import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"
  import { writeClient } from "./sanity/lib/write-client"
  





  export const { auth, handlers, signIn, signOut } =  NextAuth({
    providers: [GitHub],
    
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
        if (token) {
          const user = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id:Number(token.sub) });
      
          if (user) {
            token.id = user?._id;
          }
        }
        return token
      },
      async session({ session, user, token }:any) {
        
        if (token?.id) {
              
              session._id = token.id
              
        }
        console.log(session,"session")
        return session
      },
    }
  })
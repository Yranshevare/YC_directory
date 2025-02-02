  import NextAuth from "next-auth"
  import GitHub from "next-auth/providers/github"
  import { client } from "./sanity/lib/client"
  import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"
  import { writeClient } from "./sanity/lib/write-client"
  





  export const { auth, handlers, signIn, signOut } =  NextAuth({
    providers: [GitHub],
    callbacks: {
      
      signIn: async ({ user,  profile}:any) => {
        const existingUser = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile?.id });
      
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
        
        return true; 
      },
      jwt: async (token: any, profile: any) => {
        if (profile?.id) {
          const user = await client.withConfig({ useCdn: false }).fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile.id });
      
          if (user) {
            token.id = user?._id;
          }
        }
        return token;
      },
      
      session: async ({ session, token }: any) => {
        if (token?.token?.user?.id) {
          session = token?.token?.user;
          session._id = token?.token?.account?.access_token
          
        }
        return session;
      }
      
      
    }
  })
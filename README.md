# How to set up next auth:
## 1. install next auth
```bash
npm install next-auth@beta
```

## 2. configuration
create `auth.ts` file in the scr folder of your project with following code:
```javascript
import NextAuth from "next-auth"
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [],
})
```
create the file with following location:
```
app/api/auth/[...nextauth]/route.ts
```
past the following code:
```javaScript
import { handlers } from "@/auth" // Referring to the auth.ts we just created
export const { GET, POST } = handlers
```

create .env.local file at the root of the project
```bash
npx auth secret
```
will create the `.env.local` file containing your AUTH_SECRET \
[to see more info on next auth installation](https://authjs.dev/getting-started/installation)

## 3. configure provider

#### for github provider:
1. [create github oAuth app](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)
2. get client id and client secret from github oAuth app and add it into the .env.local file
```.env.local
AUTH_SECRET='your_auth_secret'  
AUTH_GITHUB_ID='github_client_id'
AUTH_GITHUB_SECRET='github_client_secret'
```
3. update the auth.ts:
```javascript
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"   //import github
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],    //add into the provider
})
```

[more info on github provider configuration](https://authjs.dev/getting-started/providers/github)

# How to use next auth

```javascript
import { auth,signIn,signOut } from '@/auth'
```
- `signin` to sign in / login the user based with respective auth
- `signout` to logout the user
- `auth` give the info on current sign in user if have any

some example
1. `signIn()`
```javascript
<form //use form for rendering the client component at server typically button with onClick
action={async()=>{
  'use server'
  await signIn()  //to login the user
}}>
  <button type='submit'>
     <span>login</span>
  </button>
</form>
```
2. `signOut()`
```javascript
<form   //use form for rendering the client component at server typically button with onClick
action={async() => {
  'use server';
  await signOut()   //logout the user
}}>
  <button type="submit">
    <span>logout</span>
  </button>
</form>
```
3. `auth()`
```javascript
  const session = await auth() 
  consol.log(session)
   /**  
    in case of github session contain following info :
      {
        user: {
          name: 'github_username',
          email: 'github_email',
          image: 'github_profileImage_url',
        },
        expires: '2025-02-15T17:25:50.431Z'
      }
  */ 
 ```



[for more info](https://authjs.dev/getting-started/)


# Sanity

[Sanity](https://www.sanity.io/) is use for a real-time datastore for structured content, and supporting APIs for assets, user management, and more.

## how to integrate sanity 

1. create the database in sanity
2. copy the CLI command and run on to the terminal
3. it will ask you for authorization just log in with the same account you did at the time of database creation 
4. then it will ask you some question just answer most of them yes
5. install sanity
```bash
npm install next-sanity@canary
```
6. visit `Localhost:3000/studio` and signin with same account   to use sanity studio 

## sanity file structure
will add following files
```
studio/
    └──[[...tool]]/
          └──page.tsx
sanity/
    ├──lib/
    |    ├──client.ts
    |    └──image.ts
    ├── schemaType/
    |    └── inidex.ts
    ├── env.ts
    └── structure.ts
sanity.cli.ts
sanity.config.ts
```

- sanity.cli.ts:\
this is the config file to perform sanity oration via sanity cli
- sanity.config.ts:\
config file for sanity studio and connecting it with specific project id, dataset, schema and to add some plugin
- client.ts:\
it is read client file for fetching data through query
- image.ts:\
image url builder for images uploaded on sanity studio
- index.ts:\
for creating sanity schema
- structure.ts:\
define how to arrange your schema








[github](https://github.com/adrianhajdin/yc_directory)
[figma](https://www.figma.com/design/TMGW6rLGene3cqHb4Kilz5/Pitch-Startup-App?node-id=62001-4701&t=fnfkCMRamSnARpuP-0)

[sanity](https://www.sanity.io/manage/personal/project/pm5mfr1f)

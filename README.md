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



[github](https://github.com/adrianhajdin/yc_directory)

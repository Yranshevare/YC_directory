# Welcome to My Startup Blog!

This is my first Next.js project, where I share insights, stories, and updates about the startup world. Whether you're an aspiring entrepreneur, a startup enthusiast, or just curious about the latest trends, this blog will feature a variety of posts on the most innovative startups, their journeys, and the challenges they face.

Built with Next.js, the blog is designed to be fast, SEO-friendly, and responsive, ensuring a smooth experience for users on any device. I’ll be regularly posting articles and updates, so stay tuned as I dive deeper into the exciting world of startups!

Thank you for visiting, and I hope you enjoy reading!

[click here to visit this project](https://yc-directory-official.vercel.app/)



---
## <a name="table">new things i learn</a>
1. [next auth](#next-auth)
2. [Sanity](#sanity)
3. [rendering the markdown](#markdown-in-nextjs)
4. [parallel fetching](#parallel-fetching)


# Next auth
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

---
# Sanity

[Sanity](https://www.sanity.io/) is use for a real-time datastore for structured content, and supporting APIs for assets, user management, and more.

## how to integrate sanity 

1. create the database in sanity
2. copy the CLI command and run on to the terminal
3. it will ask you for authorization just log in with the same account you did at the time of database creation 
4. then it will ask you some question just answer most of them yes, there are just two question you need to ans differently which are where you wanna place `/studio` folder ( go with default path ) or which template you wanna use ( there is only 2 templates in sanity in this project we are going with clean template )  
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
this is the config file to perform sanity operation via sanity cli
- sanity.config.ts:\
config file for sanity studio and connecting that studio with database by matching specific project id, dataset, schema and to add some plugin
- client.ts:\
it is read client file for fetching data through query
- image.ts:\
image url builder for images uploaded on sanity studio
- index.ts:\
for creating sanity schema
- structure.ts:\
define how to arrange your schema

## how to create sanity schemas
1. create schema file into the schemaType folder with following syntax
```typescript
import { defineField, defineType } from "sanity";

export const schema_name = defineType( 
    {
        name: 'name',
        title: 'Title',
        type: 'type_of_schema',
        fields: [
            defineField({
                name: 'felidName',
                type:'felidType', // eg., string,number,url,etc
                validation:(Rule) => {} //can also add validations(optional)
            }),
            //can add as many felid as you want
            
        ],
        preview: {    //this is optional
            select: {
                title: 'name',
            }
        }
    }
)
```
2. import that schema into index.ts file
```typescript
import { type SchemaTypeDefinition } from 'sanity'
import { schema_name } from './schema_name' //importing the defined schema

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [schema_name], //pass that schema here
}
```
3. arrange them into the structure.ts
```typescript
import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('name').title('Title'),  //from your schema
    ])
```
##### now you can see your schema into sanity studio

## To run the query 
#### you can test your sanity queries in vision section of your sanity studio

1. create the queries.ts file into to the lib folder where you can write the sanity query ( [GROQ Query](https://www.sanity.io/docs/how-queries-work) )
2. this is how to write the query
```typescript
import { defineQuery } from "next-sanity";

export const QUERY = defineQuery(`
    *[_type == 'startup' && defined(slug.current)] | order(_createdAt desc){
      _id,
      title,
      slug,
      _createdAt,
      category,
      image,
      author->{
        name,
        bio,
        _id
      },
      views,
      decryption
    }
`);
```


3. fetching data  from sanity studio
```typescript
import { QUERY } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';

const data = await client.fetch(QUERY)
console.log(JSON.stringify(data))
```

4. in `sanity/lib/client:`
```typescript
import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR(incremental static generation) or tag-based revalidation
})
```
`useCdn: true` indicate that sanity will cash the data and only revalidate the data only after the 60 have otherwise it will provide the cash data



## how to pass argument 
```ts
const params = {search: query || null}

const {data:post} = await sanityFetch({query:STARTUP_QUERY,params})  //can pass along with thw fetch request
```
```ts
import { defineQuery } from "next-sanity";
//pass the argument along the array 
export const STARTUP_QUERY = defineQuery(`
    *[_type == 'startup' && defined(slug.current) && !defined($search) || category match $search || author->name match $search || title match $search] | order(_createdAt desc){
      _id,
      title,
      slug,
      _createdAt,
      category,
      image,
      author->{
        name,
        bio,
        _id
      },
      views,
      decryption
    }
`);
```
### sanity live feature
to fetch newly added data with out need of refresh
1. `sanity/lib/live:`
```ts
import { defineLive } from "next-sanity";
import { client } from './client'

export const { sanityFetch, SanityLive } = defineLive({ 
  client: client.withConfig({ 
    apiVersion: 'vX'
  }) 
});
```
2. fetching the data
```ts
import { sanityFetch, SanityLive } from '@/sanity/lib/live';

const {data:post} = await sanityFetch({query:STARTUP_QUERY})
console.log(post)
```

3. use sanityLive component at the bottom your component
```tsx
return(
  <>
    {/*your code*/}
    <sanityLive/>
  </>
)
```

## how to write in sanity
1. generate the api token with editors permission selected and it to .env.local
```.env
SANITY_WRITE_TOKEN=api_token
```
2. export this token via `sanity/env.ts`
```ts
export const token = process.env.SANITY_WRITE_TOKEN  //add this into existing code
```

3. create the `write-client.ts` file into `sanity/lib` folder
and copy past the code form `sanity/lib/client.ts` to this folder and update some code
```ts
import { createClient } from 'next-sanity'
import 'server-only'    //make it server only 

import { apiVersion, dataset, projectId ,token} from '../env' //import token

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages
  token //export token with write-client
})

// check if token is not there throw an error
if(!writeClient.config().token){
    throw new Error('write token does not found')
}
```

4. now import the write client to run the write query on database
```ts
import { writeClient } from '@/sanity/lib/write-client'

// update views patch: find the matching data set: update the data commit: save the changes
const patchPromise = writeClient.patch(id).set({ views: views?.views + 1 }).commit();
```


---
# Markdown in nextjs
this package will convert your `md file into the HTML format`
1. install the package
```bash
npm install markdown-it
```
will cause some type related error to solve it run this command

```bash
npm i --save-dev @types/markdown-it
```
2. use this code in your code
```ts
import markdownit from 'markdown-it'
const md = markdownit()
const result = md.render('# markdown content!');
```
if you `console.log(result)` the you'll get the `HTML` format `# markdown content!` which is written in `md` format

### [for more info](https://www.npmjs.com/package/markdown-it)

---

# how to add markdown editor
1. install `@uiw/react-markdown-editor` npm package
```bash
npm i @uiw/react-markdown-editor
```
2. import markdownEditor component into desired component
```ts
import MarkdownEditor from '@uiw/react-markdown-editor';
```
3. initialize the markdown state
```ts
const [markdown, setMarkdown] = useState(`# This is a H1  \n## This is a H2  \n###### This is a H6`);
``` 
4. render the markdownEditor component with initialized states
```ts
<MarkdownEditor
      value={markdown}
      height="200px"
      onChange={(value, viewUpdate) => setMarkdown(value)}
    />
```
this will render a markdown editor which is similar to input felid with markdown feature

### [for more info](https://www.npmjs.com/package/@uiw/react-markdown-editor)
---

# parallel fetching
ability to fetch multiple resources or data simultaneously, instead of sequentially, which can improve the performance and efficiency of data loading for a page.
### Benefits of Parallel Fetching:
1. **Faster loading:** Fetching data in parallel can significantly reduce the page load time, as all requests are made simultaneously rather than waiting for one to complete before the next starts.
2. **Improved performance:** Especially useful when the page depends on multiple API endpoints, and you want to optimize how data is gathered.

```ts
  //parallel fetching
    const [post, editorPost] = await Promise.all([
      client.fetch(STARTUP_BY_ID_QUERY,{id}),
      
      client.fetch(PLAYLIST_BY_SLUG_QUERY,{slug:'editor-picks'})
    ])
```
- `Promise.all()` is a method that accepts an array of promises and returns a single promise.

---

### Shoutout to [JavaScript Mastery!](https://www.youtube.com/@javascriptmastery) 🎉

I just finished my project, and I couldn’t have done it without your incredible tutorial! Your step-by-step guidance made the learning process so much easier and helped me gain the skills I needed. Thanks for sharing your knowledge, making complex topics so accessible and all the hard work you put into it!

Keep up the amazing work! 👏\
[github](https://github.com/adrianhajdin/yc_directory)\
[tutorial](https://youtu.be/Zq5fmkH0T78?si=srnbRNux9ae32jbs)

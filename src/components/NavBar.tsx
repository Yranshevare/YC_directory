import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { auth,signIn,signOut } from '@/auth'

export default async function NavBar() {

  const session = await auth()    //can get info on current user via session
  // console.log("from navbar",session?.name)
  /**  
    session contain following info :
      {
        user: {
          name: 'github_username',
          email: 'github_email',
          image: 'github_profileImage_url',
        },
        expires: '2025-02-15T17:25:50.431Z'
      }
  */ 
  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
      <nav className='flex justify-between items-center'>
        <Link href="/">
          <Image src = '/logo.png' alt ='' width={144} height={30}/>
        </Link>
        <div className='flex items-center gap-5 text-black'>
          {
            session && session?.user ? (
              <>
                <Link href="/startup/create">
                  <span>create</span>
                </Link>
                <form   //use form for rendering the client component at server typically button with onClick
                action={async() => {
                  'use server';
                  await signOut()   //logout the user
                }}>
                  <button type="submit">
                    <span>logout</span>
                  </button>
                </form>

                <Link href={`./user/${session.id}`}>
                  <span>{session.name}</span>
                </Link>
              </>
            ) : (

              <form //use form for rendering the client component at server typically button with onClick
              action={async()=>{
                'use server'
                await signIn()  //to login the user
              }}>
                <button type='submit'>
                   <span>login</span>
                </button>
              </form>
            )
           
          }
        </div>
      </nav>
    </header>
  )
}

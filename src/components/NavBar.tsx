import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { auth,signIn,signOut } from '@/auth'
import { BadgePlus, LogOut } from 'lucide-react'

export default async function NavBar() {

  const session = await auth()    //can get info on current user via session
  // console.log("from navbar",session)
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
      <nav className='flex justify-between items-center h-14'>
        <Link href="/">
          <Image src = '/logo.png' alt ='' width={144} height={30}/>
        </Link>
        <div className='flex items-center gap-5 text-black'>
          {
            session && session?.user ? (
              <>
                <Link href="/startup/create">
                  <span className='max-sm:hidden'>create</span>
                  <BadgePlus className='sm:hidden size-6 text-primary'/>
                </Link>
                <form   //use form for rendering the client component at server typically button with onClick
                action={async() => {
                  'use server';
                  await signOut()   //logout the user
                }}>
                  <button type="submit">
                    <span className='max-sm:hidden'>logout</span>
                    <LogOut className='sm:hidden size-6 text-red-500'/>
                  </button>
                </form>

                <Link href={`./user/${session._id}`}>
                  {/* <Avatar className='size-10  '>
                    <AvatarImage src={session.image} alt={session.name  || ""}/>
                    <AvatarFallback>AV</AvatarFallback>
                  </Avatar> */}
                  <Image src={session?.user?.image} alt={session.name  || ""} width={40} height={40} className='rounded-full'/>
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

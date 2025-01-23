import React from 'react'
import SearchForm from './component/SearchForm'

export default function Page({ searchParams }: { searchParams: { query?: string } }) {
  const query = searchParams.query || '';

  return (
    <>
    <section className='pink_container'>
      < h1 className='heading'>pitch your startup, connect with entrepreneurs</h1>
      <p className='sub-heading !max-w-3xl'>Submit Ideas Vote on Pitches and Get Noticed on Virtual Competition</p>
      <SearchForm query = {query}/>
    </section>
      
    </>

  )
}

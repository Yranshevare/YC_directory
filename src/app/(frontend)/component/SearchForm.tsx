import React from 'react'
import SearchFormResetButton from './SearchFormResetButton'

export default function SearchForm() {
    const query = 'test'

    
  return (
    <form action='/' className='search-form'>
        <input 
        name='query'
        defaultValue={query} 
        className='search-input'
        placeholder='Search startups'/>

        <div className='flex gap-2'>
        {
            query && <SearchFormResetButton/>
        }
        <button 
        type='submit'
        className='search-btn text-white'>s</button>
        </div>
    </form>
  )
}

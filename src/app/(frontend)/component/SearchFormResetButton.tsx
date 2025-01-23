'use client'
import React from 'react'
import Link from 'next/link'

export default function SearchFormResetButton() {
    const reset = () => {
        const form = document.querySelector('.search-form') as HTMLFormElement
        if(form) form.reset()
    }
  return (
        <button 
        type='submit' 
        onClick={reset} >
            <Link href="/" className='search-btn text-white'>x</Link>
        </button>
  )
}

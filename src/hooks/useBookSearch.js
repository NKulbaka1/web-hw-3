import { useState } from 'react'

export function useBookSearch() {
  const [searchQuery, setSearchQuery] = useState('')

  const searchBooks = async (query) => {
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
      )
      const data = await response.json()
      return data.docs || []
    } catch (err) {
      console.error('Error searching books:', err)
      throw err
    }
  }

  return { searchQuery, setSearchQuery, searchBooks }
}
import { useState } from 'react'
import { useBooks } from '../context/BookContext'
import { useBookSearch } from '../hooks/useBookSearch'

export default function SearchBar() {
  const { setBooks, setLoading, setError } = useBooks()
  const { searchQuery, setSearchQuery, searchBooks } = useBookSearch()

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setLoading(true)
    setError(null)

    try {
      const results = await searchBooks(searchQuery)
      setBooks(results)
    } catch (err) {
      setError('Error loading books. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search for books..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  )
}
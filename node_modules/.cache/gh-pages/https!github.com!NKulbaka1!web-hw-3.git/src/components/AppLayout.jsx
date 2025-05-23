import { useState } from 'react'
import { useBooks } from '../context/BookContext'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'
import BookDetails from './BookDetails'

export default function AppLayout() {
  const { selectedBook } = useBooks()
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="container">
      <h1>Book Finder</h1>
      <SearchBar />
      {showDetails && selectedBook ? (
        <BookDetails onBack={() => setShowDetails(false)} />
      ) : (
        <SearchResults onBookSelect={() => setShowDetails(true)} />
      )}
    </div>
  )
}
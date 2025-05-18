import { useBooks } from '../context/BookContext'
import BookCard from './BookCard'

export default function SearchResults({ onBookSelect }) {
  const { books, loading, error, setSelectedBook } = useBooks()

  if (loading) return <p>Loading books...</p>
  if (error) return <p>{error}</p>
  if (!books.length) return <p>No books found. Try another search.</p>

  return (
    <div className="results">
      {books.slice(0, 12).map((book) => (
        <BookCard 
          key={book.key} 
          book={book} 
          onClick={() => {
            setSelectedBook(book)
            onBookSelect()
          }} 
        />
      ))}
    </div>
  )
}
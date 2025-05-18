import { useState, useEffect } from 'react'
import { useBooks } from '../context/BookContext'

export default function BookDetails({ onBack }) {
  const { selectedBook } = useBooks()
  const [bookDetails, setBookDetails] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBookDetails = async () => {
      if (!selectedBook?.key) return

      setLoading(true)
      setError(null)

      try {
        const response = await fetch(
          `https://openlibrary.org${selectedBook.key}.json`
        )
        const data = await response.json()
        setBookDetails(data)
      } catch (err) {
        setError('Error loading book details')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchBookDetails()
  }, [selectedBook])

  if (!selectedBook) return null

  return (
    <div className="book-details">
      <button className="back-btn" onClick={onBack}>
        Back to results
      </button>
      <h2>{selectedBook.title}</h2>
      {selectedBook.author_name && (
        <p>
          <strong>Author(s):</strong> {selectedBook.author_name.join(', ')}
        </p>
      )}
      {selectedBook.first_publish_year && (
        <p>
          <strong>First published:</strong> {selectedBook.first_publish_year}
        </p>
      )}
      {selectedBook.publisher && (
        <p>
          <strong>Publisher(s):</strong>{' '}
          {Array.isArray(selectedBook.publisher)
            ? selectedBook.publisher.join(', ')
            : selectedBook.publisher}
        </p>
      )}

      {selectedBook.cover_i && (
        <img
          src={`https://covers.openlibrary.org/b/id/${selectedBook.cover_i}-L.jpg`}
          alt={`${selectedBook.title} cover`}
          style={{
            maxWidth: '200px',
            float: 'left',
            marginRight: '20px',
            marginBottom: '20px',
          }}
        />
      )}

      {loading && <p>Loading details...</p>}
      {error && <p>{error}</p>}

      {bookDetails?.description && (
        <p>
          <strong>Description:</strong>{' '}
          {typeof bookDetails.description === 'string'
            ? bookDetails.description
            : bookDetails.description.value || 'No description available'}
        </p>
      )}

      {bookDetails?.subjects && (
        <p>
          <strong>Subjects:</strong> {bookDetails.subjects.join(', ')}
        </p>
      )}
    </div>
  )
}
import { createContext, useState, useContext } from 'react'

const BookContext = createContext()

export function BookProvider({ children }) {
  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const value = {
    books,
    setBooks,
    selectedBook,
    setSelectedBook,
    loading,
    setLoading,
    error,
    setError
  }

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>
}

export function useBooks() {
  return useContext(BookContext)
}
export default function BookCard({ book, onClick }) {
  return (
    <div className="book-card" onClick={onClick}>
      <h3>{book.title}</h3>
      {book.author_name && <p>by {book.author_name.join(', ')}</p>}
      {book.first_publish_year && (
        <p>First published: {book.first_publish_year}</p>
      )}
      {book.cover_i ? (
        <img
          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
          alt={`${book.title} cover`}
        />
      ) : (
        <div className="no-cover">No cover available</div>
      )}
    </div>
  )
}
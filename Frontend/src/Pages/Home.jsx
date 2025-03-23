import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    // Fetch all books from the public endpoint
    axios
      .get('http://localhost:8000/Lib/AllBooks/')
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
        setError('Failed to load books. Please try again later.');
        setLoading(false);
      });
  }, []);

  // Function to handle missing images with a local fallback
  const handleImageError = (e) => {
    // Use a simple colored div with text as fallback instead of external placeholder
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600' preserveAspectRatio='none'%3E%3Crect width='400' height='600' fill='%23eaeaea'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='24' fill='%23999999'%3ENo Cover Available%3C/text%3E%3C/svg%3E";
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Library Collection</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Discover our extensive collection of books covering various genres and topics.</p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p>{error}</p>
          </div>
        ) : books.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            <p className="text-xl text-gray-600">No books available in the library yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {books.map((book) => (
              <div key={book.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative pb-[140%]">
                  {/* Fix image URL handling */}
                  <img
                    src={book.Image ? `http://localhost:8000${book.Image}` : null}
                    alt={book.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{book.title}</h2>
                  <p className="text-gray-600 mb-3 italic">by {book.author}</p>
                  
                  {book.Description && (
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">{book.Description}</p>
                  )}
                  
                  <button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
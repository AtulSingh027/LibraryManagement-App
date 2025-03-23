import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Trash2, Check, X, Loader2, Search, BookOpen, Image as ImageIcon, LogOut, User, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LibraryDashboard() {
  const [books, setBooks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ title: "", author: "", Description: "", Image: null });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem("Token");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = getToken();
      if (!token) return navigate("/Login");
      try {
        const res = await axios.get("http://127.0.0.1:8000/Lib/Profile/", {
          headers: { Authorization: `Token ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        navigate("/Login");
      }
    };

    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const token = getToken();
        if (!token) return navigate("/Login");
        const res = await axios.get("http://127.0.0.1:8000/Lib/Books/", {
          headers: { Authorization: `Token ${token}` },
        });
        setBooks(res.data);
      } catch (err) {
        setError("Failed to load books. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
    fetchBooks();
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      const token = getToken();
      setBooks(books.map((book) => (book.id === id ? { ...book, deleting: true } : book)));
      setTimeout(async () => {
        await axios.delete(`http://127.0.0.1:8000/Lib/Books/${id}`, {
          headers: { Authorization: `Token ${token}` },
        });
        setBooks(books.filter((book) => book.id !== id));
      }, 300);
    } catch (err) {
      setError("Couldn't delete the book. Please try again.");
    }
  };

  const startEditing = (book) => {
    setEditingId(book.id);
    setEditFormData({ title: book.title, author: book.author, Description: book.Description || "", Image: null });
  };

  const cancelEditing = () => setEditingId(null);

  const handleEditFormChange = (e) => {
    const { name, value, type } = e.target;
    setEditFormData({ ...editFormData, [name]: type === "file" ? e.target.files[0] || null : value });
  };

  const handleUpdate = async (id) => {
    if (!editFormData.title.trim() || !editFormData.author.trim()) {
      setError("Title and Author are required");
      return;
    }
    try {
      setIsLoading(true);
      const token = getToken();
      const formData = new FormData();
      formData.append("title", editFormData.title);
      formData.append("author", editFormData.author);
      formData.append("Description", editFormData.Description || "");
      if (editFormData.Image) formData.append("Image", editFormData.Image);

      const res = await axios.put(`http://127.0.0.1:8000/Lib/Books/${id}`, formData, {
        headers: { Authorization: `Token ${token}`, "Content-Type": "multipart/form-data" },
      });

      setBooks(books.map((book) => (book.id === id ? { ...res.data, updated: true } : book)));
      setTimeout(() => {
        setBooks(books.map((book) => (book.id === id ? { ...book, updated: false } : book)));
      }, 500);
      setEditingId(null);
    } catch (err) {
      setError("Failed to update the book");
    } finally {
      setIsLoading(false);
    }
  };

  const filteredBooks = books.filter((book) =>
    [book.title, book.author, book.Description || ""].some((field) => field.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleLogout = () => {
    localStorage.removeItem("Token");
    navigate("/Login");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Library Management Dashboard
          </h1>
          {user && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User size={20} className="text-gray-400" />
                <span className="text-gray-300">{user.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded flex items-center gap-1"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg flex justify-between">
            <p className="text-red-400 text-sm">{error}</p>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-red-300">
              <X size={16} />
            </button>
          </div>
        )}

        <div className="mb-6 relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search books by title, author, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {isLoading && books.length === 0 ? (
          <div className="flex justify-center p-8">
            <Loader2 size={30} className="animate-spin text-blue-500" />
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-12 bg-gray-800 text-gray-500 rounded-lg">
            <BookOpen size={40} className="mx-auto mb-4 opacity-50" />
            <p>No books found. Add some books to get started!</p>
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="text-center py-12 bg-gray-800 text-gray-500 rounded-lg">
            <Search size={40} className="mx-auto mb-4 opacity-50" />
            <p>No books match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className={`bg-gray-800 rounded-lg border border-gray-700 overflow-hidden transition-all duration-300
                  ${book.deleting ? "animate-fade-out opacity-0 scale-95" : ""}
                  ${book.updated ? "bg-blue-900/30" : "hover:bg-gray-700"}`}
              >
                {editingId === book.id ? (
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-4">Edit Book</h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        name="title"
                        value={editFormData.title}
                        onChange={handleEditFormChange}
                        placeholder="Book Title"
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                      />
                      <input
                        type="text"
                        name="author"
                        value={editFormData.author}
                        onChange={handleEditFormChange}
                        placeholder="Author"
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                      />
                      <textarea
                        name="Description"
                        value={editFormData.Description}
                        onChange={handleEditFormChange}
                        placeholder="Book description..."
                        rows="3"
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
                      />
                      <input
                        type="file"
                        name="Image"
                        onChange={handleEditFormChange}
                        accept="image/*"
                        className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:bg-blue-600 file:text-white hover:file:bg-blue-500"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleUpdate(book.id)}
                          disabled={isLoading}
                          className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded flex items-center gap-1 disabled:opacity-50"
                        >
                          {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                          Save
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded flex items-center gap-1"
                        >
                          <X size={16} />
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="h-48 bg-gray-700 flex items-center justify-center overflow-hidden">
                      {book.Image ? (
                        <img
                        src={book.Image ? `http://localhost:8000${book.Image}` : null}
                          alt={book.title}
                          className="w-full h-full object-cover"
                          onError={(e) => (e.target.src = "/fallback-image.jpg")} // Optional fallback
                        />
                      ) : (
                        <ImageIcon size={40} className="text-gray-500" />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-1">{book.title}</h3>
                      <p className="text-gray-400 mb-3">by {book.author}</p>
                      {book.Description && (
                        <p className="text-gray-300 text-sm mb-4 line-clamp-3">{book.Description}</p>
                      )}
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => startEditing(book)}
                          className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                        >
                          <Edit size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(book.id)}
                          className="text-red-400 hover:text-red-300 flex items-center gap-1"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => navigate("/NewBook")}
          className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
          aria-label="Add New Book"
        >
          <PlusCircle size={24} />
        </button>
      </div>
    </div>
  );
}
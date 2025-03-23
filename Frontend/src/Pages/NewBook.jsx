import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function NewBook() {
    let navigate = useNavigate()
    let Token = localStorage.getItem('Token')
    
    // State for form fields
    let [title, setTitle] = useState('')
    let [author, setAuthor] = useState('')
    let [Description, setDescription] = useState('')
    let [Image, setImage] = useState(null)
    let [loading, setLoading] = useState(false)
    let [error, setError] = useState('')
    
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        
        // Create form data for file upload
        const formData = new FormData()
        formData.append('title', title)
        formData.append('author', author)
        formData.append('Description', Description)
        if (Image) {
            formData.append('Image', Image)
        }
        
        try {
            const response = await fetch('http://localhost:8000/Lib/Books/', {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${Token}`
                },
                body: formData
            })
            
            if (response.ok) {
                // Redirect to books list on success
                navigate('/LibraryDashboard')
            } else {
                const data = await response.json()
                setError(data.error || 'Failed to add book. Please try again.')
            }
        } catch (err) {
            setError('Network error. Please check your connection.')
        } finally {
            setLoading(false)
        }
    }
    
    // Handle file input change
    const handleImageChange = (e) => {
        setImage(e.target.files[0])
    }
    
    // Check if user is authenticated
    React.useEffect(() => {
        if (!Token) {
            navigate('/Login')
        }
    }, [Token, navigate])

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Add New Book</h1>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="max-w-lg">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
                        Author
                    </label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={Description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows="4"
                    />
                </div>
                
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Book Cover Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        onChange={handleImageChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        accept="image/*"
                    />
                </div>
                
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        disabled={loading}
                    >
                        {loading ? 'Adding...' : 'Add Book'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/books')}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}
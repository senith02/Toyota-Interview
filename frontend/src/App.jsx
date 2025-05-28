import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'
import './App.css'

// Import components
import Layout from './components/Layout'

// Import pages
import PartsListPage from './pages/PartsListPage'
import AddPartPage from './pages/AddPartPage'
import EditPartPage from './pages/EditPartPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  const [parts, setParts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Form states
  const [newPart, setNewPart] = useState({
    Name: '',
    PartType: '',
    Brand: '',
    Quantity: 0,
    Price: 0,
    status: 'In Stock'
  })

  useEffect(() => {
    fetchParts()
  }, [])

  const fetchParts = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:8080/parts')
      setParts(response.data)
      setError(null)
    } catch (err) {
      console.error('Error fetching parts:', err)
      setError('Failed to load parts. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  // Handle form input changes for new part
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewPart({
      ...newPart,
      [name]: name === 'Quantity' || name === 'Price' ? parseFloat(value) : value
    })
  }

  // Add a new part
  const addPart = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8080/parts', newPart)
      setNewPart({
        Name: '',
        PartType: '',
        Brand: '',
        Quantity: 0,
        Price: 0,
        status: 'In Stock'
      })
      fetchParts()
      return true
    } catch (err) {
      console.error('Error adding part:', err)
      setError('Failed to add part. Please try again.')
      return false
    }
  }

  // Update a part
  const updatePart = async (part, id) => {
    try {
      await axios.put(`http://localhost:8080/parts/${id}`, part)
      fetchParts()
      return true
    } catch (err) {
      console.error('Error updating part:', err)
      setError('Failed to update part. Please try again.')
      return false
    }
  }

  // Delete a part
  const deletePart = async (id) => {
    if (window.confirm('Are you sure you want to delete this part?')) {
      try {
        await axios.delete(`http://localhost:8080/parts/${id}`)
        fetchParts()
      } catch (err) {
        console.error('Error deleting part:', err)
        setError('Failed to delete part. Please try again.')
      }
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <PartsListPage 
              parts={parts} 
              onDelete={deletePart} 
              loading={loading}
              error={error}
            />
          } />
          <Route path="parts/add" element={
            <AddPartPage
              part={newPart}
              onChange={handleInputChange}
              onSubmit={addPart}
              error={error}
            />
          } />
          <Route path="parts/edit/:id" element={
            <EditPartPage
              onUpdate={updatePart}
              error={error}
            />
          } />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

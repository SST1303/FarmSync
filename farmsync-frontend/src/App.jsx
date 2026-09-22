import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Crops from './pages/Crops'
import AddCrop from './components/AddCrop'
import EditCrop from './components/EditCrop'
import Expenses from './pages/Expenses'
import AddExpense from './pages/AddExpense'
import EditExpense from './pages/EditExpense'
import ProtectedRoute from './components/ProtectedRoute'

import { LanguageProvider } from './context/LanguageContext'

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>

        <Navbar />

        <Routes>

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="/crops" element={
            <ProtectedRoute>
              <Crops />
            </ProtectedRoute>
          } />

          <Route path="/add-crop" element={
            <ProtectedRoute>
              <AddCrop />
            </ProtectedRoute>
          } />

          <Route path="/edit-crop/:id" element={
            <ProtectedRoute>
              <EditCrop />
            </ProtectedRoute>
          } />

          <Route path="/expenses" element={
            <ProtectedRoute>
              <Expenses />
            </ProtectedRoute>
          } />

          <Route path="/add-expense" element={
            <ProtectedRoute>
              <AddExpense />
            </ProtectedRoute>
          } />

          <Route path="/edit-expense/:id" element={
            <ProtectedRoute>
              <EditExpense />
            </ProtectedRoute>
          } />

        </Routes>

      </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
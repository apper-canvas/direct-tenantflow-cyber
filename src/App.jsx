import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Sidebar from './components/Sidebar'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }
const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
<div className={`min-h-screen content-gradient transition-all duration-500 ${darkMode ? 'dark' : ''}`}>
      <div className="flex min-h-screen">
        <Sidebar 
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        <div className="flex-1 lg:ml-0 min-h-screen">
          <Router>
            <Routes>
              <Route path="/" element={<Home activeTab={activeTab} setSidebarOpen={setSidebarOpen} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? 'dark' : 'light'}
        className="z-50"
        toastClassName="shadow-lg border border-surface-200 dark:border-surface-700"
      />
    </div>
</div>
  )
}

export default App
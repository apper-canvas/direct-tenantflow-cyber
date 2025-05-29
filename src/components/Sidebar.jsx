import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from './ApperIcon'

const Sidebar = ({ darkMode, toggleDarkMode, activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'Home' },
    { id: 'properties', label: 'Properties', icon: 'Building' },
    { id: 'tenants', label: 'Tenants', icon: 'Users' },
    { id: 'maintenance', label: 'Maintenance', icon: 'Wrench' },
    { id: 'leases', label: 'Leases', icon: 'FileText' },
  ]

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        className="fixed top-0 left-0 z-50 w-64 h-full glass-strong lg:relative lg:translate-x-0 lg:z-auto transition-all duration-300"
      >
        <div className="flex items-center justify-between p-4 border-b border-surface-200 dark:border-surface-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <ApperIcon name="Building2" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-surface-900 dark:text-white">TenantFlow</h1>
              <p className="text-sm text-surface-500">Property Management</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
          >
            <ApperIcon name="X" className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id)
                setSidebarOpen(false)
              }}
              className={`w-full sidebar-item ${
                activeTab === item.id ? 'sidebar-item-active' : ''
              }`}
            >
              <ApperIcon name={item.icon} className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-3 left-3 right-3">
          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center justify-center space-x-2 p-2 bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 rounded-lg transition-colors"
          >
            <ApperIcon name={darkMode ? 'Sun' : 'Moon'} className="w-5 h-5" />
            <span className="text-sm font-medium">
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>
        </div>
      </motion.aside>
    </>
  )
}

export default Sidebar
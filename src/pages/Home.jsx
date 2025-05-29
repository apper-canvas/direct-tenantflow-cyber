import React, { useState } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = ({ darkMode, toggleDarkMode }) => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'Home' },
    { id: 'properties', label: 'Properties', icon: 'Building' },
    { id: 'tenants', label: 'Tenants', icon: 'Users' },
    { id: 'maintenance', label: 'Maintenance', icon: 'Wrench' },
    { id: 'leases', label: 'Leases', icon: 'FileText' },
  ]

  const stats = [
    { label: 'Total Properties', value: '24', change: '+2', icon: 'Building', color: 'text-blue-600' },
    { label: 'Active Tenants', value: '87', change: '+5', icon: 'Users', color: 'text-green-600' },
    { label: 'Pending Maintenance', value: '12', change: '-3', icon: 'AlertCircle', color: 'text-orange-600' },
    { label: 'Monthly Revenue', value: '$45,670', change: '+8%', icon: 'DollarSign', color: 'text-purple-600' },
  ]

  return (
    <div className="flex min-h-screen content-gradient">


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

      {/* Main Content */}
      <div className="flex-1 lg:ml-0 min-h-screen">

        {/* Header */}
<header className="glass-strong shadow-soft border-b border-white/20 dark:border-surface-700/30 sticky top-0 z-30 backdrop-blur-xl">
          <div className="flex items-center justify-between px-3 sm:px-4 lg:px-6 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
            >
              <ApperIcon name="Menu" className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold text-surface-900 dark:text-white capitalize">
              {activeTab}
            </h2>
          </div>
        </header>


        {/* Dashboard Stats */}
        {activeTab === 'dashboard' && (
          <div className="p-3 sm:p-4 lg:p-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">

              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card hover-lift p-4 hover:shadow-card-hover transition-all duration-300 group"
                >

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-surface-600 dark:text-surface-400">
                        {stat.label}
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold text-surface-900 dark:text-white mt-1">
                        {stat.value}
                      </p>
                      <p className={`text-sm font-medium mt-1 ${
                        stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change} from last month
                      </p>
                    </div>
                    <div className={`p-3 rounded-xl bg-gradient-to-br from-surface-100 to-surface-200 dark:from-surface-700 dark:to-surface-800 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>

                      <ApperIcon name={stat.icon} className="w-6 h-6" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Main Feature Component */}
        <div className="p-3 sm:p-4 lg:p-6">

          <MainFeature activeTab={activeTab} />
        </div>
      </div>
    </div>

  )
}

export default Home
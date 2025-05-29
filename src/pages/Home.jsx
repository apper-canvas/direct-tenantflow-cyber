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
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-surface-100 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900">
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
        className="fixed top-0 left-0 z-50 w-72 h-full bg-white dark:bg-surface-800 shadow-2xl lg:shadow-neu-light dark:lg:shadow-neu-dark lg:translate-x-0 lg:static lg:z-auto transition-all duration-300"
      >
        <div className="flex items-center justify-between p-6 border-b border-surface-200 dark:border-surface-700">
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

        <nav className="p-4 space-y-2">
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

        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={toggleDarkMode}
            className="w-full flex items-center justify-center space-x-2 p-3 bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 rounded-lg transition-colors"
          >
            <ApperIcon name={darkMode ? 'Sun' : 'Moon'} className="w-5 h-5" />
            <span className="text-sm font-medium">
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="lg:ml-72 min-h-screen">
        {/* Header */}
        <header className="bg-white dark:bg-surface-800 shadow-sm border-b border-surface-200 dark:border-surface-700 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
              >
                <ApperIcon name="Menu" className="w-6 h-6" />
              </button>
              <div>
                <h2 className="text-2xl font-bold text-surface-900 dark:text-white capitalize">
                  {activeTab}
                </h2>
                <p className="text-sm text-surface-500">
                  {activeTab === 'dashboard' && 'Overview of your property portfolio'}
                  {activeTab === 'properties' && 'Manage your property listings'}
                  {activeTab === 'tenants' && 'Track tenant information and leases'}
                  {activeTab === 'maintenance' && 'Handle maintenance requests and work orders'}
                  {activeTab === 'leases' && 'Manage lease agreements and renewals'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors relative">
                <ApperIcon name="Bell" className="w-6 h-6 text-surface-600 dark:text-surface-300" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <ApperIcon name="User" className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Stats */}
        {activeTab === 'dashboard' && (
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card p-6 hover:shadow-lg transition-shadow"
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
                    <div className={`p-3 rounded-xl bg-surface-100 dark:bg-surface-700 ${stat.color}`}>
                      <ApperIcon name={stat.icon} className="w-6 h-6" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Main Feature Component */}
        <div className="p-4 sm:p-6 lg:p-8">
          <MainFeature activeTab={activeTab} />
        </div>
      </div>
    </div>
  )
}

export default Home
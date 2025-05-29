import React, { useState } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = ({ activeTab, setSidebarOpen }) => {


  const stats = [
    { label: 'Total Properties', value: '24', change: '+2', icon: 'Building', color: 'text-blue-600' },
    { label: 'Active Tenants', value: '87', change: '+5', icon: 'Users', color: 'text-green-600' },
    { label: 'Pending Maintenance', value: '12', change: '-3', icon: 'AlertCircle', color: 'text-orange-600' },
    { label: 'Monthly Revenue', value: '$45,670', change: '+8%', icon: 'DollarSign', color: 'text-purple-600' },
  ]

return (
    <>
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
    </>
    </div>

  )
}

export default Home
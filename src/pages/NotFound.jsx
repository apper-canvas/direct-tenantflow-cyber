import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-900 dark:to-surface-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-8">
          <ApperIcon name="Home" className="w-12 h-12 text-white" />
        </div>
        
        <h1 className="text-6xl font-bold text-surface-900 dark:text-white mb-4">404</h1>
        
        <h2 className="text-2xl font-semibold text-surface-700 dark:text-surface-300 mb-4">
          Property Not Found
        </h2>
        
        <p className="text-surface-600 dark:text-surface-400 mb-8 leading-relaxed">
          The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center space-x-2 btn btn-primary px-8 py-3 text-lg"
        >
          <ApperIcon name="ArrowLeft" className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound
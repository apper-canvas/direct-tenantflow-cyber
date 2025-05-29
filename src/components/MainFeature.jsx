import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import { format, addDays, isPast } from 'date-fns'

const MainFeature = ({ activeTab }) => {
  const [properties, setProperties] = useState([
    {
      id: '1',
      address: '123 Oak Street, Unit 2A',
      type: 'Apartment',
      units: 1,
      squareFootage: 850,
      rentAmount: 1200,
      status: 'Occupied',
      photos: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300'],
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      address: '456 Pine Avenue, House',
      type: 'House',
      units: 3,
      squareFootage: 1500,
      rentAmount: 2200,
      status: 'Vacant',
      photos: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300'],
      createdAt: new Date('2024-02-01')
    }
  ])

  const [tenants, setTenants] = useState([
    {
      id: '1',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@email.com',
      phone: '(555) 123-4567',
      propertyId: '1',
      leaseStart: new Date('2024-01-01'),
      leaseEnd: new Date('2024-12-31'),
      rentAmount: 1200,
      depositAmount: 1200,
      status: 'Active'
    },
    {
      id: '2',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.j@email.com',
      phone: '(555) 987-6543',
      propertyId: '2',
      leaseStart: new Date('2024-03-01'),
      leaseEnd: new Date('2025-02-28'),
      rentAmount: 2200,
      depositAmount: 2200,
      status: 'Pending'
    }
  ])

  const [maintenanceRequests, setMaintenanceRequests] = useState([
    {
      id: '1',
      propertyId: '1',
      tenantId: '1',
      title: 'Leaky Kitchen Faucet',
      description: 'Kitchen faucet has been dripping consistently for the past week',
      priority: 'Medium',
      status: 'In Progress',
      category: 'Plumbing',
      assignedTo: 'Mike Johnson',
      createdAt: new Date('2024-01-20'),
      completedAt: null,
      cost: 0
    },
    {
      id: '2',
      propertyId: '1',
      tenantId: '1',
      title: 'HVAC Not Working',
      description: 'Heating system stopped working, apartment is getting cold',
      priority: 'High',
      status: 'Open',
      category: 'HVAC',
      assignedTo: '',
      createdAt: new Date('2024-01-22'),
      completedAt: null,
      cost: 0
    }
  ])

  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [editingItem, setEditingItem] = useState(null)
  const [formData, setFormData] = useState({})

  const openModal = (type, item = null) => {
    setModalType(type)
    setEditingItem(item)
    setFormData(item || getEmptyForm(type))
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setModalType('')
    setEditingItem(null)
    setFormData({})
  }

  const getEmptyForm = (type) => {
    switch (type) {
      case 'property':
        return {
          address: '',
          type: 'Apartment',
          units: 1,
          squareFootage: '',
          rentAmount: '',
          status: 'Vacant',
          photos: []
        }
      case 'tenant':
        return {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          propertyId: '',
          leaseStart: '',
          leaseEnd: '',
          rentAmount: '',
          depositAmount: '',
          status: 'Pending'
        }
      case 'maintenance':
        return {
          propertyId: '',
          tenantId: '',
          title: '',
          description: '',
          priority: 'Medium',
          status: 'Open',
          category: 'General',
          assignedTo: '',
          cost: ''
        }
      default:
        return {}
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (modalType === 'property') {
      if (editingItem) {
        setProperties(properties.map(p => p.id === editingItem.id ? { ...formData, id: editingItem.id } : p))
        toast.success('Property updated successfully!')
      } else {
        const newProperty = {
          ...formData,
          id: Date.now().toString(),
          createdAt: new Date()
        }
        setProperties([...properties, newProperty])
        toast.success('Property added successfully!')
      }
    } else if (modalType === 'tenant') {
      if (editingItem) {
        setTenants(tenants.map(t => t.id === editingItem.id ? { 
          ...formData, 
          id: editingItem.id,
          leaseStart: new Date(formData.leaseStart),
          leaseEnd: new Date(formData.leaseEnd)
        } : t))
        toast.success('Tenant updated successfully!')
      } else {
        const newTenant = {
          ...formData,
          id: Date.now().toString(),
          leaseStart: new Date(formData.leaseStart),
          leaseEnd: new Date(formData.leaseEnd)
        }
        setTenants([...tenants, newTenant])
        toast.success('Tenant added successfully!')
      }
    } else if (modalType === 'maintenance') {
      if (editingItem) {
        setMaintenanceRequests(maintenanceRequests.map(m => m.id === editingItem.id ? { 
          ...formData, 
          id: editingItem.id,
          completedAt: formData.status === 'Completed' ? new Date() : null
        } : m))
        toast.success('Maintenance request updated successfully!')
      } else {
        const newRequest = {
          ...formData,
          id: Date.now().toString(),
          createdAt: new Date(),
          completedAt: null
        }
        setMaintenanceRequests([...maintenanceRequests, newRequest])
        toast.success('Maintenance request created successfully!')
      }
    }
    
    closeModal()
  }

  const handleDelete = (type, id) => {
    if (type === 'property') {
      setProperties(properties.filter(p => p.id !== id))
      toast.success('Property deleted successfully!')
    } else if (type === 'tenant') {
      setTenants(tenants.filter(t => t.id !== id))
      toast.success('Tenant removed successfully!')
    } else if (type === 'maintenance') {
      setMaintenanceRequests(maintenanceRequests.filter(m => m.id !== id))
      toast.success('Maintenance request deleted successfully!')
    }
  }

  const getPropertyAddress = (propertyId) => {
    const property = properties.find(p => p.id === propertyId)
    return property ? property.address : 'Unknown Property'
  }

  const getTenantName = (tenantId) => {
    const tenant = tenants.find(t => t.id === tenantId)
    return tenant ? `${tenant.firstName} ${tenant.lastName}` : 'Unassigned'
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300'
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300'
      case 'Low': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300'
      default: return 'text-surface-600 bg-surface-100 dark:bg-surface-700 dark:text-surface-300'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
      case 'Occupied':
      case 'Completed': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300'
      case 'Pending':
      case 'In Progress': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300'
      case 'Vacant':
      case 'Open': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300'
      case 'Inactive': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300'
      default: return 'text-surface-600 bg-surface-100 dark:bg-surface-700 dark:text-surface-300'
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'properties':
        return (
          <div className="space-y-4">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h3 className="text-xl font-semibold text-surface-900 dark:text-white">Property Portfolio</h3>
              <button
                onClick={() => openModal('property')}
                className="btn btn-primary flex items-center space-x-2 w-full sm:w-auto justify-center"
              >
                <ApperIcon name="Plus" className="w-4 h-4" />
                <span>Add Property</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">

              {properties.map((property) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="aspect-video bg-surface-200 dark:bg-surface-700 relative overflow-hidden">
                    {property.photos.length > 0 ? (
                      <img
                        src={property.photos[0]}
                        alt={property.address}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ApperIcon name="Building" className="w-12 h-12 text-surface-400" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                        {property.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4">

                    <h4 className="font-semibold text-surface-900 dark:text-white mb-2 line-clamp-2">
                      {property.address}
                    </h4>
                    <div className="space-y-1 text-sm text-surface-600 dark:text-surface-400 mb-3">

                      <div className="flex items-center space-x-2">
                        <ApperIcon name="Home" className="w-4 h-4" />
                        <span>{property.type} • {property.units} unit{property.units > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ApperIcon name="Square" className="w-4 h-4" />
                        <span>{property.squareFootage} sq ft</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ApperIcon name="DollarSign" className="w-4 h-4" />
                        <span className="font-semibold text-surface-900 dark:text-white">
                          ${property.rentAmount}/month
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModal('property', property)}
                        className="flex-1 btn btn-secondary text-sm py-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete('property', property.id)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
                      >
                        <ApperIcon name="Trash2" className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )

      case 'tenants':
        return (
          <div className="space-y-4">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h3 className="text-xl font-semibold text-surface-900 dark:text-white">Tenant Management</h3>
              <button
                onClick={() => openModal('tenant')}
                className="btn btn-primary flex items-center space-x-2 w-full sm:w-auto justify-center"
              >
                <ApperIcon name="UserPlus" className="w-4 h-4" />
                <span>Add Tenant</span>
              </button>
            </div>
            
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-surface-50 dark:bg-surface-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Tenant
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider hidden sm:table-cell">
                        Property
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider hidden md:table-cell">
                        Lease Period
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Rent
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-surface-500 dark:text-surface-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
                    {tenants.map((tenant) => (
                      <tr key={tenant.id} className="hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-surface-900 dark:text-white">
                              {tenant.firstName} {tenant.lastName}
                            </div>
                            <div className="text-sm text-surface-500 dark:text-surface-400">
                              {tenant.email}
                            </div>
                            <div className="text-sm text-surface-500 dark:text-surface-400 sm:hidden">
                              {getPropertyAddress(tenant.propertyId)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden sm:table-cell">
                          <div className="text-sm text-surface-900 dark:text-white">
                            {getPropertyAddress(tenant.propertyId)}
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <div className="text-sm text-surface-900 dark:text-white">
                            {format(tenant.leaseStart, 'MMM dd, yyyy')} - {format(tenant.leaseEnd, 'MMM dd, yyyy')}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-surface-900 dark:text-white">
                            ${tenant.rentAmount}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(tenant.status)}`}>
                            {tenant.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => openModal('tenant', tenant)}
                              className="text-primary hover:text-primary-dark"
                            >
                              <ApperIcon name="Edit" className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete('tenant', tenant.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <ApperIcon name="Trash2" className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      case 'maintenance':
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h3 className="text-xl font-semibold text-surface-900 dark:text-white">Maintenance Requests</h3>
              <button
                onClick={() => openModal('maintenance')}
                className="btn btn-primary flex items-center space-x-2 w-full sm:w-auto justify-center"
              >
                <ApperIcon name="Plus" className="w-4 h-4" />
                <span>Create Request</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

              {maintenanceRequests.map((request) => (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card p-4 hover:shadow-lg transition-all"

                >
                  <div className="flex items-start justify-between mb-3">

                    <div className="flex-1">
                      <h4 className="font-semibold text-surface-900 dark:text-white mb-1">
                        {request.title}
                      </h4>
                      <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">
                        {getPropertyAddress(request.propertyId)}
                      </p>
                      <p className="text-sm text-surface-600 dark:text-surface-400">
                        Requested by: {getTenantName(request.tenantId)}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(request.priority)}`}>
                        {request.priority}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-surface-700 dark:text-surface-300 mb-3">

                    {request.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm text-surface-600 dark:text-surface-400 mb-3">

                    <div>
                      <span className="font-medium">Category:</span> {request.category}
                    </div>
                    <div>
                      <span className="font-medium">Created:</span> {format(request.createdAt, 'MMM dd, yyyy')}
                    </div>
                    {request.assignedTo && (
                      <div>
                        <span className="font-medium">Assigned to:</span> {request.assignedTo}
                      </div>
                    )}
                    {request.cost > 0 && (
                      <div>
                        <span className="font-medium">Cost:</span> ${request.cost}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openModal('maintenance', request)}
                      className="flex-1 btn btn-secondary text-sm py-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete('maintenance', request.id)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
                    >
                      <ApperIcon name="Trash2" className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )

      default:
        return (
          <div className="space-y-6">

            {/* Recent Activity */}
            <div className="card p-4">

              <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-3">Recent Activity</h3>

              <div className="space-y-3">

                <div className="flex items-center space-x-3 p-2 bg-surface-50 dark:bg-surface-700 rounded-lg">

                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <ApperIcon name="UserPlus" className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-surface-900 dark:text-white">
                      New tenant Sarah Johnson added to 456 Pine Avenue
                    </p>
                    <p className="text-xs text-surface-500">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-2 bg-surface-50 dark:bg-surface-700 rounded-lg">

                  <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                    <ApperIcon name="Wrench" className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-surface-900 dark:text-white">
                      Maintenance request created for HVAC repair
                    </p>
                    <p className="text-xs text-surface-500">1 day ago</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-2 bg-surface-50 dark:bg-surface-700 rounded-lg">

                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <ApperIcon name="DollarSign" className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-surface-900 dark:text-white">
                      Rent payment received from John Smith
                    </p>
                    <p className="text-xs text-surface-500">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

              <button
                onClick={() => openModal('property')}
                className="card p-4 hover:shadow-lg transition-all text-left group"

              >
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">

                  <ApperIcon name="Building" className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-surface-900 dark:text-white mb-1">Add Property</h3>

                <p className="text-sm text-surface-600 dark:text-surface-400">
                  Add a new property to your portfolio
                </p>
              </button>
              
              <button
                onClick={() => openModal('tenant')}
                className="card p-4 hover:shadow-lg transition-all text-left group"

              >
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">

                  <ApperIcon name="UserPlus" className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-surface-900 dark:text-white mb-1">Add Tenant</h3>

                <p className="text-sm text-surface-600 dark:text-surface-400">
                  Register a new tenant
                </p>
              </button>
              
              <button
                onClick={() => openModal('maintenance')}
                className="card p-4 hover:shadow-lg transition-all text-left group"

              >
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">

                  <ApperIcon name="Wrench" className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-semibold text-surface-900 dark:text-white mb-1">Create Request</h3>

                <p className="text-sm text-surface-600 dark:text-surface-400">
                  Submit maintenance request
                </p>
              </button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="space-y-4">

      {renderContent()}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 z-50">

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-surface-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"

            >
              <div className="p-4 border-b border-surface-200 dark:border-surface-700">

                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-surface-900 dark:text-white">
                    {editingItem ? 'Edit' : 'Add'} {modalType.charAt(0).toUpperCase() + modalType.slice(1)}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
                  >
                    <ApperIcon name="X" className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-4 space-y-3">

                {modalType === 'property' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Property Address
                      </label>
                      <input
                        type="text"
                        required
                        className="input"
                        value={formData.address || ''}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="123 Main Street, Unit 1A"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                          Property Type
                        </label>
                        <select
                          className="input"
                          value={formData.type || 'Apartment'}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        >
                          <option value="Apartment">Apartment</option>
                          <option value="House">House</option>
                          <option value="Condo">Condo</option>
                          <option value="Townhouse">Townhouse</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                          Number of Units
                        </label>
                        <input
                          type="number"
                          min="1"
                          required
                          className="input"
                          value={formData.units || ''}
                          onChange={(e) => setFormData({ ...formData, units: parseInt(e.target.value) })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                          Square Footage
                        </label>
                        <input
                          type="number"
                          required
                          className="input"
                          value={formData.squareFootage || ''}
                          onChange={(e) => setFormData({ ...formData, squareFootage: parseInt(e.target.value) })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                          Monthly Rent ($)
                        </label>
                        <input
                          type="number"
                          required
                          className="input"
                          value={formData.rentAmount || ''}
                          onChange={(e) => setFormData({ ...formData, rentAmount: parseInt(e.target.value) })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Status
                      </label>
                      <select
                        className="input"
                        value={formData.status || 'Vacant'}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      >
                        <option value="Vacant">Vacant</option>
                        <option value="Occupied">Occupied</option>
                        <option value="Maintenance">Under Maintenance</option>
                      </select>
                    </div>
                  </>
                )}

                {modalType === 'tenant' && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          required
                          className="input"
                          value={formData.firstName || ''}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          required
                          className="input"
                          value={formData.lastName || ''}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          className="input"
                          value={formData.email || ''}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          required
                          className="input"
                          value={formData.phone || ''}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Property
                      </label>
                      <select
                        required
                        className="input"
                        value={formData.propertyId || ''}
                        onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })}
                      >
                        <option value="">Select a property</option>
                        {properties.map((property) => (
                          <option key={property.id} value={property.id}>
                            {property.address}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                          Lease Start Date
                        </label>
                        <input
                          type="date"
                          required
                          className="input"
                          value={formData.leaseStart ? (typeof formData.leaseStart === 'string' ? formData.leaseStart : format(formData.leaseStart, 'yyyy-MM-dd')) : ''}
                          onChange={(e) => setFormData({ ...formData, leaseStart: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                          Lease End Date
                        </label>
                        <input
                          type="date"
                          required
                          className="input"
                          value={formData.leaseEnd ? (typeof formData.leaseEnd === 'string' ? formData.leaseEnd : format(formData.leaseEnd, 'yyyy-MM-dd')) : ''}
                          onChange={(e) => setFormData({ ...formData, leaseEnd: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                          Monthly Rent ($)
                        </label>
                        <input
                          type="number"
                          required
                          className="input"
                          value={formData.rentAmount || ''}
                          onChange={(e) => setFormData({ ...formData, rentAmount: parseInt(e.target.value) })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                          Security Deposit ($)
                        </label>
                        <input
                          type="number"
                          required
                          className="input"
                          value={formData.depositAmount || ''}
                          onChange={(e) => setFormData({ ...formData, depositAmount: parseInt(e.target.value) })}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Status
                      </label>
                      <select
                        className="input"
                        value={formData.status || 'Pending'}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </>
                )}

                {modalType === 'maintenance' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Property
                      </label>
                      <select
                        required
                        className="input"
                        value={formData.propertyId || ''}
                        onChange={(e) => setFormData({ ...formData, propertyId: e.target.value })}
                      >
                        <option value="">Select a property</option>
                        {properties.map((property) => (
                          <option key={property.id} value={property.id}>
                            {property.address}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Tenant
                      </label>
                      <select
                        className="input"
                        value={formData.tenantId || ''}
                        onChange={(e) => setFormData({ ...formData, tenantId: e.target.value })}
                      >
                        <option value="">Select a tenant (optional)</option>
                        {tenants
                          .filter(tenant => tenant.propertyId === formData.propertyId)
                          .map((tenant) => (
                            <option key={tenant.id} value={tenant.id}>
                              {tenant.firstName} {tenant.lastName}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Request Title
                      </label>
                      <input
                        type="text"
                        required
                        className="input"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Brief description of the issue"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                        Description
                      </label>
                      <textarea
                        required
                        rows="3"
                        className="input"
                        value={formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Detailed description of the maintenance issue"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                          Priority
                        </label>
                        <select
                          className="input"
                          value={formData.priority || 'Medium'}
                          onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                          Category
                        </label>
                        <select
                          className="input"
                          value={formData.category || 'General'}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                          <option value="General">General</option>
                          <option value="Plumbing">Plumbing</option>
                          <option value="Electrical">Electrical</option>
                          <option value="HVAC">HVAC</option>
                          <option value="Appliances">Appliances</option>
                          <option value="Structural">Structural</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                          Status
                        </label>
                        <select
                          className="input"
                          value={formData.status || 'Open'}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                          <option value="Open">Open</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                          Assigned To
                        </label>
                        <input
                          type="text"
                          className="input"
                          value={formData.assignedTo || ''}
                          onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                          placeholder="Maintenance person or contractor"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                          Cost ($)
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          className="input"
                          value={formData.cost || ''}
                          onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) || 0 })}
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn btn-primary"
                  >
                    {editingItem ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature
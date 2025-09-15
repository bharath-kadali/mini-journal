"use client"

import { useState, useEffect } from "react"

const EntryEditor = ({ entry, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    date: "",
    content: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Initialize form data when component mounts or entry changes
  useEffect(() => {
    if (entry) {
      // Editing existing entry
      setFormData({
        date: entry.date ? entry.date.split("T")[0] : "", // Convert to YYYY-MM-DD format
        content: entry.content || "",
      })
    } else {
      // Creating new entry - default to today's date
      const today = new Date().toISOString().split("T")[0]
      setFormData({
        date: today,
        content: "",
      })
    }
  }, [entry])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (error) setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!formData.date.trim()) {
      setError("Please select a date")
      return
    }

    if (!formData.content.trim()) {
      setError("Please enter some content")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      await onSave(formData)
    } catch (err) {
      setError("Failed to save entry. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    onCancel()
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">{entry ? "Edit Entry" : "New Journal Entry"}</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date Input */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            required
            value={formData.date}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Content Textarea */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={8}
            placeholder="Write about your day, thoughts, experiences..."
            value={formData.content}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-vertical"
          />
          <div className="mt-2 text-sm text-gray-500">{formData.content.length} characters</div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Saving..." : entry ? "Update Entry" : "Save Entry"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EntryEditor

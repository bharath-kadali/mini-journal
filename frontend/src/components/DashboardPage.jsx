"use client"

import { useState, useEffect } from "react"
import JournalEntryCard from "./JournalEntryCard"
import EntryEditor from "./EntryEditor"

const DashboardPage = ({ onLogout }) => {
  const [entries, setEntries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [showEditor, setShowEditor] = useState(false)
  const [editingEntry, setEditingEntry] = useState(null)

  // Fetch entries on component mount
  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    try {
      const token = localStorage.getItem("jwt_token")
      const response = await fetch("http://localhost:3000/entries", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        // Sort entries by date (newest first)
        const sortedEntries = data.sort((a, b) => new Date(b.date) - new Date(a.date))
        setEntries(sortedEntries)
      } else if (response.status === 401) {
        // Token expired or invalid
        onLogout()
      } else {
        setError("Failed to fetch entries")
      }
    } catch (err) {
      setError("Network error. Please check if the server is running.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddNew = () => {
    setEditingEntry(null)
    setShowEditor(true)
  }

  const handleEdit = (entry) => {
    setEditingEntry(entry)
    setShowEditor(true)
  }

  const handleDelete = async (entryId) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) {
      return
    }

    try {
      const token = localStorage.getItem("jwt_token")
      const response = await fetch(`http://localhost:3000/entries/${entryId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        // Remove the deleted entry from state
        setEntries(entries.filter((entry) => entry.id !== entryId))
      } else if (response.status === 401) {
        onLogout()
      } else {
        setError("Failed to delete entry")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    }
  }

  const handleSaveEntry = async (entryData) => {
    try {
      const token = localStorage.getItem("jwt_token")
      const isEditing = editingEntry !== null
      const url = isEditing ? `http://localhost:3000/entries/${editingEntry.id}` : "http://localhost:3000/entries"

      const response = await fetch(url, {
        method: isEditing ? "PATCH" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entryData),
      })

      if (response.ok) {
        const savedEntry = await response.json()

        if (isEditing) {
          // Update existing entry
          setEntries(entries.map((entry) => (entry.id === editingEntry.id ? savedEntry : entry)))
        } else {
          // Add new entry and re-sort
          const newEntries = [savedEntry, ...entries].sort((a, b) => new Date(b.date) - new Date(a.date))
          setEntries(newEntries)
        }

        setShowEditor(false)
        setEditingEntry(null)
      } else if (response.status === 401) {
        onLogout()
      } else {
        setError("Failed to save entry")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    }
  }

  const handleCancelEdit = () => {
    setShowEditor(false)
    setEditingEntry(null)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg text-gray-600">Loading your journal...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">MiniJournal</h1>
            <button onClick={onLogout} className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        {/* Add New Entry Button */}
        <div className="mb-8">
          <button
            onClick={handleAddNew}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Add New Entry
          </button>
        </div>

        {/* Entry Editor */}
        {showEditor && (
          <div className="mb-8">
            <EntryEditor entry={editingEntry} onSave={handleSaveEntry} onCancel={handleCancelEdit} />
          </div>
        )}

        {/* Entries List */}
        <div className="space-y-6">
          {entries.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">No journal entries yet.</div>
              <div className="text-gray-400 text-sm mt-2">Click "Add New Entry" to get started!</div>
            </div>
          ) : (
            entries.map((entry) => (
              <JournalEntryCard key={entry.id} entry={entry} onEdit={handleEdit} onDelete={handleDelete} />
            ))
          )}
        </div>
      </main>
    </div>
  )
}

export default DashboardPage

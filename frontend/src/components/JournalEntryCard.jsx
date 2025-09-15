"use client"

const JournalEntryCard = ({ entry, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getPreview = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + "..."
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{formatDate(entry.date)}</h3>
          <p className="text-gray-700 leading-relaxed">{getPreview(entry.content)}</p>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
        <button
          onClick={() => onEdit(entry)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(entry.id)}
          className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default JournalEntryCard

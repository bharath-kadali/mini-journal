// Utility functions for date formatting and manipulation

export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export const formatDateForInput = (dateString) => {
  // Convert date to YYYY-MM-DD format for HTML date input
  const date = new Date(dateString)
  return date.toISOString().split("T")[0]
}

export const getTodayDate = () => {
  return new Date().toISOString().split("T")[0]
}

export const sortEntriesByDate = (entries, ascending = false) => {
  return [...entries].sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return ascending ? dateA - dateB : dateB - dateA
  })
}

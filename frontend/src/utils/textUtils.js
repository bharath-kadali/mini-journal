// Utility functions for text manipulation

export const getPreview = (content, maxLength = 150) => {
  if (!content) return ""
  if (content.length <= maxLength) return content
  return content.substring(0, maxLength).trim() + "..."
}

export const getWordCount = (text) => {
  if (!text) return 0
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length
}

export const getCharacterCount = (text) => {
  return text ? text.length : 0
}

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

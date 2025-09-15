# MiniJournal

A simple, elegant personal journal application built with React and Vite.

## Features

- **User Authentication**: Secure login and registration system
- **Journal Entries**: Create, read, update, and delete personal journal entries
- **Date Management**: Organize entries by date with intuitive date picker
- **Responsive Design**: Clean, mobile-friendly interface built with Tailwind CSS
- **Real-time Updates**: Instant feedback and seamless user experience

## Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **State Management**: React hooks (useState, useEffect)
- **API Communication**: Native fetch API
- **Authentication**: JWT tokens stored in localStorage

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Backend API server running on `http://localhost:3000`

### Installation

1. Clone or download the project files
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Open your browser and navigate to `http://localhost:5173`

### Backend API Requirements

The application expects a backend API running on `http://localhost:3000` with the following endpoints:

- `POST /auth/login` - User authentication
- `POST /auth/register` - User registration  
- `GET /entries` - Fetch all user entries
- `POST /entries` - Create new entry
- `PATCH /entries/:id` - Update existing entry
- `DELETE /entries/:id` - Delete entry

## Project Structure

\`\`\`
src/
├── components/
│   ├── LoginPage.jsx          # Authentication forms
│   ├── DashboardPage.jsx      # Main application view
│   ├── JournalEntryCard.jsx   # Individual entry display
│   └── EntryEditor.jsx        # Entry creation/editing form
├── services/
│   └── api.js                 # API service layer
├── utils/
│   ├── dateUtils.js           # Date formatting utilities
│   └── textUtils.js           # Text manipulation utilities
├── hooks/
│   └── useLocalStorage.js     # localStorage management hook
├── App.jsx                    # Main application component
├── main.jsx                   # Application entry point
└── index.css                  # Global styles
\`\`\`

## Usage

1. **Registration/Login**: Create a new account or sign in with existing credentials
2. **Add Entry**: Click "Add New Entry" to create a journal entry
3. **Edit Entry**: Click "Edit" on any entry card to modify it
4. **Delete Entry**: Click "Delete" on any entry card (with confirmation)
5. **Logout**: Use the logout button in the header to sign out

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

- Uses modern React patterns with functional components and hooks
- Follows consistent naming conventions
- Includes comprehensive error handling
- Responsive design with mobile-first approach

## License

This project is open source and available under the MIT License.

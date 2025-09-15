# MiniJournal
MiniJournal is a simple journaling app built with **Node.js + Express + MongoDB (Mongoose)**.  
It allows users to **create, edit, and delete notes**, with **JWT-based authentication** to securely manage accounts.

---

## Features
- User registration and login with **JWT authentication**
- **Passwords hashed** using bcrypt before storage
- CRUD operations for notes:
  - Create a new note
  - Edit an existing note
  - Delete a note
  - Get all notes for a logged-in user
- Protected routes – only authenticated users can manage their notes

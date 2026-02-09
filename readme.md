📚 Library Database CLI

A TypeScript-based command-line application for managing a book collection. This application allows users to store book data in a text file, read entries, and display them sorted by publishing year.

✨ Features
- Menu driven by the readline-sync library.
- CLI spiced using chalk for color-coded feedback.
- Data is maintained and displayed in ascending order based on the publishing year.
- Data is stored in a structured text format (Title/Author/ISBN/Year).

🚀 Getting Started
- Prerequisites
    - Node.js (v18 or newer recommended)
    - npm (installed automatically with Node.js)
- Installation
    - Clone or download the repository.
-   Install dependencies:
```bash
npm install
```
- Running the Application
    - The application requires the database file path as a command-line argument:
```bash
cd src
npx ts-node library-database-cli.ts book-db.txt
```
🛠 Architecture
- types.ts: Shared interfaces.
- book-repository.ts: Handles file I/O operations and encapsulates the file format.
- book-service.ts: Contains the core logic for data sorting and validation.

🏗 Technologies Used
- TypeScript
- Chalk
- Readline-sync
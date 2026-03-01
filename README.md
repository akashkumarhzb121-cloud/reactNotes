# React JS Master Notes ⚛️

A comprehensive, interactive study guide for React.js, built with React and Vite. This project transforms static notes into an interactive learning experience with AI-powered tutoring and quizzes.

## ✨ Features

- **Masonry Grid Layout**: Organized, easy-to-read notes covering React fundamentals to advanced topics.
- **🤖 AI Tutor (ELI5)**: Integrated with Google Gemini to explain complex concepts simply ("Explain Like I'm 5") at the click of a button.
- **📝 AI Pop Quiz**: Generates dynamic 3-question multiple-choice quizzes based on the actual note content to test your knowledge.
- **📊 Mermaid Diagrams**: Visual representations of React concepts (Virtual DOM, Redux flow, etc.) using Mermaid.js.
- **🖨️ Print Friendly**: dedicated styles for printing the notes as a physical cheat sheet.

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **AI**: Google Gemini API (`gemini-2.5-flash`)
- **Visualization**: Mermaid.js
- **Styling**: CSS3 (Variables, Flexbox, CSS Columns)

## 🚀 Getting Started

### Prerequisites

- Node.js installed on your machine.
- A Google Gemini API Key (get one from Google AI Studio).

### Installation

1.  **Clone the repository** (or navigate to your project folder):
    ```bash
    cd react-notes
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Setup Environment Variables**:
    Create a `.env` file in the root directory to store your API key.
    ```bash
    # Create .env file
    echo VITE_GEMINI_API_KEY=your_actual_api_key_here > .env
    ```
    *Make sure to replace `your_actual_api_key_here` with your real key.*

4.  **Run the development server**:
    ```bash
    npm run dev
    ```

## 📂 Project Structure

```text
react-notes/
├── src/
│   ├── components/    # Note, NotesList, Header components
│   ├── utils/         # API logic (gemini.js)
│   ├── App.jsx        # Main layout & Quiz logic
│   └── main.jsx       # Entry point
├── .env               # API Key configuration
└── vite.config.js     # Vite configuration
```
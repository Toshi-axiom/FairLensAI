# FairLens AI 🛡️

**FairLens AI** is an intelligent, high-fidelity frontend platform designed to help users identify, analyze, and understand bias in data and AI models. The system acts as a smart assistant that simplifies complex fairness concepts into clear, actionable insights through a modern, web-based interface.

![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)

## ✨ Core Features

- **Dynamic Theming Engine:** A sophisticated styling system allowing users to freely toggle between a hyper-modern "Tech-Noir" Dark Mode and a highly legible "Frosted Silver" Light Mode.
- **Mock Authentication Pipeline:** A complete simulated Auth module mapping user data into LocalStorage for session prototyping, including email parsing, password validation logic, and a Google SSO layout.
- **Interactive Onboarding:** A built-in user tour (`react-joyride`) that guides first-time users smoothly through the dashboard layout and core product functionality.
- **Bias Analysis Engine:** A chat-integrated diagnostic pane where users can communicate with the "FairLens Assistant" to interrogate identified dataset biases directly.
- **Glassmorphic Component Library:** Specialized UI assets mapped uniquely to CSS variables using Tailwind plugins and Framer Motion context wrappers.

## 🚀 Quick Start

This project is built directly on the **Vite** bundler for blistering rapid development.

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

Navigate to `http://localhost:5173` to interact with the environment.

## 📂 Project Structure

- `/src/components`: Reusable layout modules (`GlassCard`, `NeonButton`, `TopBar`, `Sidebar`, `TourProvider`).
- `/src/pages`: Top-level navigational route containers (`Welcome`, `Auth`, `Dashboard`, `Analysis`, `Settings`, `Datasets`).
- `/src/contexts`: Global state providers (`ThemeContext`, `AuthContext`) driving the application memory arrays.

## 🛠️ Next Steps (Backend Integration)

Currently, the application runs entirely in the browser as a **presentation prototype**. The next phase requires:

1. Binding the `@react-oauth/google` provider to the Google Sign-in button with a valid Cloud Client ID.
2. Replacing LocalStorage mocks in `AuthContext` with a remote JWT authentication layer.
3. Hooking real fairness APIs (like Python's `AIF360` or `Fairlearn`) into the REST requests on the `Analysis.tsx` endpoint.

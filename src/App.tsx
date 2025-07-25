import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import PrivateRoute from "./lib/PrivateRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { Home } from "./pages/Home";
import { ThreadDetail } from "./pages/ThreadDetail";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* User Routes */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/thread/:thread_id"
              element={
                <PrivateRoute>
                  <ThreadDetail />
                </PrivateRoute>
              }
            />
          </Routes>

          {/* TOAST */}
          <ToastContainer position="top-right" autoClose={3000} />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

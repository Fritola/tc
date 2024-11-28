import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { Dashboard } from './pages/dashboard';
import { Login } from './pages/login';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

function App() {

  const theme = createTheme({
    palette: {
      mode: 'dark',
      secondary: {
        main: '#053b97',
        contrastText: '#000000',
      },
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
      text: {
        primary: '#000',
        secondary: '#aaaaaa',
      },
    },
    colorSchemes: {
      dark: {
        palette: {
          primary: {
            main: '#ff5252',
            contrastText: '#000',
          },
          secondary: {
            main: '#2979ff',
            contrastText: '#000000',
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
          text: {
            primary: '#000',
            secondary: '#aaaaaa',
          },
        },
      },
      light: {
        palette: {
          primary: {
            main: '#82aef9',
            contrastText: '#000',
          },
          secondary: {
            main: '#ff5252',
            contrastText: '#000000',
          },
          background: {
            default: '#000',
            paper: '#f5f5f5',
          },
          text: {
            primary: '#000000',
            secondary: '#444444',
          },
        },
      },
    },
  });


  const PublicRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const accessToken = localStorage.getItem("userToken");

    if (accessToken) {
      return <Navigate to="/dashboard" replace />;
    }
    return children;
  };

  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const accessToken = localStorage.getItem("userToken");

    if (!accessToken) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <ThemeProvider theme={theme} defaultMode='dark'>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

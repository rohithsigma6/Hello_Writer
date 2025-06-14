import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { queryConfig } from './lib/react-query';
import React from 'react';
// import ProtectedRoute from './lib/auth';
import Login from './pages/login';
import Dashboard from './pages/dashboard';

function App() {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      }),
  );

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          {/* Public Route */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              // <ProtectedRoute>
                <Dashboard />
              // </ProtectedRoute>
            }
          />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;

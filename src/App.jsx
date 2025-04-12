import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Button } from "./components/ui/button";
import AppLayout from "./layouts/AppLayout";
import Landing from "./pages/landing"; // Ensure this path is correct
import OnBoarding from "./pages/onboarding";
import Job from "./pages/job";
import JobListing from "./pages/joblisting";
import PostJob from "./pages/postjob";
import SavedJobs from "./pages/savedjob";
import MyJobs from "./pages/myjobs";
import { ThemeProvider } from "./components/theme-provider";
import ProtectedRoute from "./components/protected-route";

const router = createBrowserRouter([
  {
    // applayout will contain the navbar nad trhe fotter section the component comon to all the pages
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/onboarding",
        element: (
          <ProtectedRoute>
            <OnBoarding />
          </ProtectedRoute>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <ProtectedRoute>
            <Job />
          </ProtectedRoute>
        ),
      },
      {
        path: "/jobs",
        element: (
          <ProtectedRoute>
            <JobListing />
          </ProtectedRoute>
        ),
      },
      {
        path: "/postjob",
        element: (
          <ProtectedRoute>
            <PostJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/savedjobs",
        element: (
          <ProtectedRoute>
            <SavedJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/myjobs",
        element: (
          <ProtectedRoute>
            <MyJobs />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;

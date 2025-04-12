import { useUser } from "@clerk/clerk-react";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { pathname } = useLocation();

  if (isLoaded && !isSignedIn) {
    return <Navigate to="/?signin=true" />;
  }

  //   ccheck if the user is candidate or recruiter
  if (
    user !== undefined &&
    !user?.unsafeMetadata?.role &&
    pathname != "/onboarding"
  ) {
    return <Navigate to="/onboarding" />;
  }

  return children;
};

export default ProtectedRoute;

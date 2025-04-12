import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Button } from "./ui/button";
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react";

const Header = () => {
  const [showSignIn, setShowSignIn] = React.useState(false);
  const { user } = useUser();
  console.log(user);

  const [search, setSerch] = useSearchParams();

  useEffect(() => {
    if (search.get("signin")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverLayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSerch({});
    }
  };

  return (
    <div>
      <nav className="py-4 flex justify-between items-center">
        <Link>
          <img src="/logo.png" className="h-40" alt="logo" />
        </Link>

        <div className="flex gap-8">
          <SignedOut>
            <Button
              variant="secondary"
              className="text-lg m-4"
              onClick={() => setShowSignIn(true)}
            >
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            {/* only to show when the user is a recruiter */}
            {user && user?.unsafeMetadata?.role === "recruiter" && (
              <Link to="/postjob">
                <Button variant="destructive" className="rounded-full text-lg">
                  <PenBox className="w-6 h-6 mr-2" />
                  Post Job
                </Button>
              </Link>
            )}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusiness size={17} />}
                  href="/myjobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={17} />}
                  href="/savedjobs"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverLayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </div>
  );
};

export default Header;

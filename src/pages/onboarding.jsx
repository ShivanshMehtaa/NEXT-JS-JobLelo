import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

const OnBoarding = () => {
  const { user, isLoaded } = useUser();
  // console.log(user);
  const navigate = useNavigate();

  // we can safe the user info in unsafe metadata objecct in log
  const handleRoleSelection = async (role) => {
    await user
      .update({
        unsafeMetadata: {
          role: role,
        },
      })
      .then(() => {
        navigate(role === "recruiter" ? "/postjob" : "/jobs");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigate(user.unsafeMetadata.role === "recruiter" ? "/postjob" : "/jobs");
    }
  }, [user]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="cyan" />;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <h2 className="gradient-title font-extrabold text-7xl sm: text-9xl tracking-tighter ">
        I am a ...
      </h2>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button
          variant="blue"
          className="h-36 text-4xl font-extrabold"
          onClick={() => handleRoleSelection("candidate")}
        >
          Candidate
        </Button>
        <Button
          variant="destructive"
          className="h-36 text-3xl font-extrabold"
          onClick={() => handleRoleSelection("recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default OnBoarding;

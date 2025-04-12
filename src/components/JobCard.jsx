import { useUser } from "@clerk/clerk-react";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import useFetch from "@/hooks/useFetch";
import { deleteJob } from "@/api/apiJobs";

const JobCard = ({
  job,
  isMyJob = true,
  savedInit = false,
  onJobSaved = () => {},
}) => {
  const { user } = useUser();
  const { loading: loadingDeleteJob, fn: fnDeleteJob } = useFetch(deleteJob, {
    job_id: job.id,
  });

  const handleDeleteJob = () => {
    fnDeleteJob();
    onJobSaved();
  };

  return (
    <Card className="flex flex-col m-4">
      <CardHeader className="flex">
        <CardTitle className="flex text-3xl justify-between font-bold">
          {job.title}
          {isMyJob && (
            <Trash2Icon
              // fill="red"
              size={24}
              className="text-red-400 cursor-pointer"
              onClick={handleDeleteJob}
            />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {job.company && <img src={job.company.logo_url} className="h-8" />}
          <div className="flex gap-2 items-center">
            <MapPinIcon size={15} /> {job.location}
          </div>
        </div>
        <hr />
        {job.description}
      </CardContent>

      <CardFooter className="flex justify-between gap-2">
        <Link to={`/job/${job.id}`}>
          <Button variant="blue" className="w-full">
            More Details
          </Button>
        </Link>
        <Heart size={20} stroke="red" fill="red" />
      </CardFooter>
    </Card>
  );
};

export default JobCard;

import { getCompanies } from "@/api/apiCompanies";
import { getJobs } from "@/api/apiJobs";
import JobCard from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/useFetch";
import { useSession, useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { State } from "country-state-city";

const JobListing = () => {
  const { isLoaded, user } = useUser();
  // console.log(user.id);

  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");

  const {
    fn: fnJobs,
    data: dataJobs,
    loading: loadingJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  const { fn: fnCompanies, data: companies } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, searchQuery, location, company_id]);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  console.log(dataJobs);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="cyan" />;
  }

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const searchQuery = formData.get("searchQuery");

    if (searchQuery) setSearchQuery(searchQuery);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCompany_id("");
    setLocation("");
  };

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-6">
        Latest Jobs
      </h1>

      {/* add filters */}
      <form
        onSubmit={handleSearch}
        className="h-14 flex w-full gap-2 items-center mb-3"
      >
        <Input
          type="text"
          name="searchQuery"
          className="h-full flex-1 p-2 mt-4 text-lg"
          placeholder="Search Jobs By Title.."
        />
        <Button type="submit" variant="blue" className="h-full mt-4 sm:w-28">
          Search
        </Button>
      </form>

      <div className="flex flex-col sm:flex-row gap-2">
        <Select value={location} onValueChange={(value) => setLocation(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {State.getStatesOfCountry("IN").map(({ name }) => {
                return (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={company_id}
          onValueChange={(value) => setCompany_id(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {companies?.map(({ name, id }) => {
                return (
                  <SelectItem key={name} value={id}>
                    {name}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          className="sm:w-1/2"
          variant="destructive"
          onClick={clearFilters}
        >
          Clear Filters
        </Button>
      </div>

      {loadingJobs && (
        <BarLoader className="mt-4" width={"100%"} color="cyan" />
      )}

      {loadingJobs === false && (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataJobs?.length ? (
            dataJobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <h1 className="text-center text-2xl">No jobs found</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default JobListing;

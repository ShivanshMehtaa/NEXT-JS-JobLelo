import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import companies from "@/data/companies.json";
// import Autoplay from "embla-carousel-autoplay";
import faqs from "@/data/faq.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Landing = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-2">
      <section className="text-center">
        <h1 className="flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4">
          Find the best job for you
          <span className="flex items-center gap-2 m-2 sm:gap-6">
            & get{" "}
            <span className="font-bold text-8xl bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
              A Job
            </span>
          </span>
        </h1>
        <p className=" text-gray-300 sm:mt-4 text-xs sm:text-2xl">
          Find the best job for you and get hired by the best companies in the
          world
        </p>
      </section>

      <div className="flex gap-6 justify-center">
        {/* buttons */}
        <Link to="/jobs">
          <Button className="mt-4" size="xl" variant="blue">
            Find Jobs
          </Button>
        </Link>
        <Link to="/postjob">
          <Button className="mt-4" variant="destructive" size="xl">
            Post Jobs
          </Button>
        </Link>
      </div>

      {/* carousel area */}
      <Carousel className="w-full py-10">
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
              <img
                src={path}
                alt={name}
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* banner image */}
      <img src="/banner.png" className="w-full h-50 rounded-2xl" />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-bold text-4xl">
              For Job Seekers
            </CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, track applications, and more.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-bold text-4xl">For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            Post jobs, manage applications, and find the best candidates.
          </CardContent>
        </Card>
      </section>

      {/* accordian */}
      <h2 className="text-center text-5xl font-bold m-4">
        Frequently Asked Questions
      </h2>
      <Accordion type="multiple" className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger className="text-xl">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
};

export default Landing;

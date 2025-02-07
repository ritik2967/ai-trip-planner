import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="flex items-center md:flex-col flex-col mx-56 gap-9">
        <h1 className="font-extrabold text-center text-[50px] mt-16">
          <span className="text-[#f56551]">
            Discover your Next Advanture with AI:
          </span>
          <br />
          Personalized Iternities at your Fingertips
        </h1>
        <p className="text-xl text-gray-500 text-center">
          Your personal trip planner and travel curtor, creating custom
          iternities tailored to your intrests and budget{" "}
        </p>
        <Link to="/create-trip">
          <Button>Get Started It's Free</Button>
        </Link>

        <img
          src="../landingPage.png"
          alt="No Photo"
          className="rounded-md shadow-md border-black -mt-[20px] p-5"
        />
      </div>
    </>
  );
};

export default Hero;

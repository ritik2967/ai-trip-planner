import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { use } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";

const Header = () => {
  const Users = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    console.log(Users);
  }, []);

  return (
    <>
      <div className="p-3 px-5 shadow-sm flex justify-between items-center md:flex-row flex-col">
        <img src="./logo.svg" alt="No Logo" />
        <div>
          {Users ? (
            <div className="flex items-center gap-5">
              <a href="/create-trip">
                <Button variant="outline" className="rounded-full">
                  + Add Trip
                </Button>
              </a>
              <a href="/my-trips">
                <Button variant="outline" className="rounded-full">
                  My Trips
                </Button>
              </a>
              <Popover>
                <PopoverTrigger>
                  <img
                    src={Users?.picture}
                    alt="No Image"
                    className="h-[35px] w-[35px] rounded-full"
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <h2
                    className="cursor-pointer"
                    onClick={() => {
                      googleLogout();
                      localStorage.clear();
                      window.location.reload();
                    }}
                  >
                    Log Out
                  </h2>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <Button>Sign In</Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;

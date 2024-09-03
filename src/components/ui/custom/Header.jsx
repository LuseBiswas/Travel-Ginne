import React, { useEffect, useState } from "react";
import { Button } from "../button";
import { FcGoogle } from "react-icons/fc";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import axios from "axios";

import { googleLogout, useGoogleLogin } from "@react-oauth/google";

function Header() {
  // Fetching user details from the local storage
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);

  // Checking if the data is received
  useEffect(() => {
    console.log(user);
  }, []);

  // Login function
  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      GetUserProfile(codeResp);
    },
    onError: (error) => console.log(error),
  });

  // Get user profile
  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload(); // For reloading window
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  // Function to navigate to the home page
  const redirectToHome = () => {
    window.location.href = "/"; // Redirect using window.location
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center">
      <div>
        {/* Use onClick handler with window.location to navigate */}
        <img
          src="/FinalLogo.svg"
          alt="Logo"
          className="h-16 w-auto cursor-pointer"
          onClick={redirectToHome}
        />
      </div>

      <div>
        {user ? (
          <div className="flex items-center gap-5">
            <a href="/create-trip">
              <Button
                variant="outline"
                className="rounded-full cursor-pointer hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] transition-all"
              >
                + Create Trip
              </Button>
            </a>

            <a href="/my-trips">
              <Button
                variant="destructive"
                className="rounded-full cursor-pointer hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] transition-all bg-[#57cc99] hover:bg-[#80ed99]"
              >
                My Trips
              </Button>
            </a>

            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  alt="P"
                  className="h-[35px] w-[35px] rounded-full shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]"
                />
              </PopoverTrigger>
              <PopoverContent className="hover:text-white hover:bg-[#e63946] transition-all cursor-pointer">
                <h2
                  className="cursor-pointer text-center hover:text-white"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/FinalLogo.svg" alt="" className="h-16 w-auto" />
              <h2 className="font-bold text-lg mt-5">Sign In With Google</h2>
              <p>Sign in to the App with Google Authentication Securely</p>

              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign in with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;

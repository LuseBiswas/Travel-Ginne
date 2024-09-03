import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelerList,
} from "@/constants/options.jsx";
import { Input } from "../components/ui/input.jsx";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Button } from "@/components/ui/button.jsx";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModel.jsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/FirebaseConfig.jsx";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate} from "react-router-dom";

const CreateTrip = () => {
  //ALL USE-STATES START HERE
  const [place, setPlace] = useState();

  const [openDialouge, setOpenDialouge] = useState(false);

  {
    /* Saving User Info */
  }
  const [formData, setFormData] = useState({});

  const [loading, setLoading] = useState(false);


  //ALL USE-STATES ENDS HERE

  {
    /* Redirecting to View Trip Page */
  }

  const navigate = useNavigate();

  const handelInputChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  //Making LOGIN Function here

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      GetUserProfile(codeResp);
    },
    onError: (error) => console.log(error),
  });

  //Making Generate Button Functional
  const OnGenerateTrip = async () => {
    //We are make sure that user must be SIGIN with Google AUth

    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialouge(true);
      return;
    }

    if (
      (formData?.NumberOfDays > 15 && !formData?.Location) ||
      !formData?.Budget ||
      !formData?.TravelrType
    ) {
      toast("Please fill all details");
      return;
    }

    setLoading(true);

    //Now we are making the actual part, where when we hit the GENRATE button and pass this detail to Gemini

    const FINAL_PORMPT = AI_PROMPT.replace(
      "{Location}",
      formData?.Location.label
    )
      .replace("{NumberOfDays}", formData?.NumberOfDays)
      .replace("{TravelrType}", formData?.TravelrType)
      .replace("{Budget}", formData?.Budget)
      .replace("{NumberOfDays}", formData?.NumberOfDays);

    //console.log(FINAL_PORMPT);

    try {
      const result = await chatSession.sendMessage(FINAL_PORMPT);
      const resultText = await result?.response?.text();
  
      // Log the raw response for inspection
      //console.log("Raw AI response:", resultText);
  
      // Sanitize the response
      const sanitizedResultText = sanitizeResponse(resultText);
  
      // Log the sanitized response
      //console.log("Sanitized AI response:", sanitizedResultText);
  
      // Attempt to parse the sanitized response as JSON
      let tripData;
      try {
        tripData = JSON.parse(sanitizedResultText);
      } catch (error) {
        console.error("Invalid JSON response:", error);
        toast("Failed to parse the response");
        setLoading(false);
        return;
      }
  
      SaveAiTrip(tripData);
    } catch (error) {
      console.error("Error generating trip:", error);
      toast("Failed to generate the trip");
      setLoading(false);
    }
  };
  //Below part is solving some unecpected error. Logic i build by AI but it Understandable
  const sanitizeResponse = (responseText) => {
    // Remove backticks and any non-JSON parts
    let sanitizedText = responseText.replace(/```json/g, "").replace(/```/g, "");
  
    // Remove any unexpected non-JSON characters from the beginning and end
    sanitizedText = sanitizedText.trim();
  
    // Ensure it is valid JSON by only allowing JSON content
    const jsonStartIndex = sanitizedText.indexOf("{");
    const jsonEndIndex = sanitizedText.lastIndexOf("}") + 1;
  
    if (jsonStartIndex === -1 || jsonEndIndex === -1) {
      throw new Error("Response does not contain valid JSON.");
    }
  
    return sanitizedText.substring(jsonStartIndex, jsonEndIndex);
  
  };

  //Saving data in Firebase
  const SaveAiTrip = async (TripData) => {
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user")); //Geting user email through local storage

    const docId = Date.now().toString();
    await setDoc(doc(db, "AiTrips", docId), {
      userSelection: formData,
      TipData: TripData,
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    //Once you SAVE the info in FireBase then redirect to ViewTrip.jsx
    navigate('/view-trip/'+docId)

  };

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
        setOpenDialouge(false);
        OnGenerateTrip();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl text-[#0077b6]">
        Tell me your Travelling Info, Aaka 🧞
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Trust me, it will be super easy and simple. And woosh you will get your
        budget friendly Travel Plan
      </p>

      {/* This is how you use GOOGLE PLACE API in order to get the place */}

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium ">
            What is your Destination ?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handelInputChange("Location", v);
              },
            }}
          />
        </div>

        {/* This is how you use GOOGLE PLACE API in order to get the place */}

        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days of trip you want ?
          </h2>
          <Input
            placeholder={"Ex: 3"}
            type="number"
            onChange={(e) => handelInputChange("NumberOfDays", e.target.value)}
          />
        </div>
      </div>

      {/*Budget Section Start Here */}

      <div>
        <h2 className="text-xl my-3 font-medium">What is your Budget ?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {/* We want to Iterate over the Budget Object List which we made in option.jsx */}
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handelInputChange("Budget", item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                ${
                  formData?.Budget == item.title &&
                  "shadow-lg border-[#d00000] border-x-[#000000]"
                }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg text-[#0077b6]">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      {/*Budget Section Ends Here */}

      {/* Travle Section Start here */}

      <div>
        <h2 className="text-xl my-3 font-medium">Type of your Travle Gang ?</h2>
        <div className="grid grid-cols-4 gap-5 mt-5">
          {/* We want to Iterate over the Budget Object List which we made in option.jsx */}
          {SelectTravelerList.map((item, index) => (
            <div
              key={index}
              onClick={() => handelInputChange("TravelrType", item.people)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg 
                ${
                  formData?.TravelrType == item.people &&
                  "shadow-lg border-[#d00000] border-x-[#000000]"
                }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg text-[#0077b6]">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Travle Section Ends here */}

      <div className="my-10 justify-end flex">
        <Button disabled={loading} onClick={OnGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      {/*Dialouge Box for GOOGLE AUTH SIGIN*/}
      <Dialog open={openDialouge}>
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
                Sigin with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;

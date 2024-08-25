import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';


function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate=useNavigate();
  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: async (codeResp) => {
      console.log(codeResp);
      await GetUserProfile(codeResp);
    },
    onError: (error) => console.log(error),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formData.location || !formData.budget || !formData.traveler || formData.noOfDays > 5) {
      toast.error('Please fill in all the details or ensure the number of days is not more than 5.');
      return;
    }

    setLoading(true); // Start loading

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log("--", result?.response?.text());
      SaveAiTrip(result?.response?.text());
    } catch (error) {
      console.error('Error generating trip:', error);
      setLoading(false); // Stop loading on error
    }
  };
  const SaveAiTrip = async (TripData) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const docId = Date.now().toString();
  
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(TripData),
        userEmail: user?.email,
        id: docId
      });
  
      console.log('Trip saved successfully with ID:', docId); // Debugging log
  
      setLoading(false); // Ensure loading is stopped after saving data
      
      // Navigate to the dynamic route after saving the data
      navigate('/view-trip/' + docId);
    } catch (error) {
      console.error('Error saving trip data:', error);
      setLoading(false); // Stop loading on error
    }
  };
  
  const GetUserProfile = async (tokenInfo) => {
    try {
      const resp = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'Application/json'
        }
      });
      console.log(resp.data);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      onGenerateTrip();
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Share Your Travel Interests.</h2>
      <p className='mt-3 text-gray-400 text-xl'>
        Simply provide some basic information, and our trip planner will create a customized itinerary tailored to your preferences.
      </p>

      <div className='mt-12 flex flex-col gap-9'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your preferred destination?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_APY_KEY}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInputChange('location', v); },
            }}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium pt-5'>How many days are you planning?</h2>
          <Input
            placeholder='Ex. 5'
            type='number'
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium pt-5'>What is your budget?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item) => (
            <div
              key={item.id}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border cursor-pointer rounded-lg 
                hover:shadow-lg
                ${formData?.budget === item.title && 'shadow-lg border-black'}
              `}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className='text-xl my-3 font-medium pt-5'>How many travelers?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelesList.map((item) => (
            <div
              key={item.id}
              onClick={() => handleInputChange('traveler', item.people)}
              className={`p-4 border cursor-pointer rounded-lg 
                hover:shadow-lg
                ${formData?.traveler === item.people && 'shadow-lg border-black'}
              `}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='my-10 justify-end flex'>
        <Button 
          disabled={loading}
          onClick={onGenerateTrip}
        >
          {loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'}
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription></DialogDescription>
            <span><img src="/logo.svg" alt="Logo"/></span>
            <h2 className='font-bold text-lg mt-6'>Sign In with Google</h2>
            <p className='mb-4'>Sign In to the App with Google Authentication securely</p>
            <Button 
              onClick={() => login()}
              className='w-full mt-20 flex gap-4 items-center'
            >
              <FcGoogle className='h-7 w-7'/>
              Sign In with Google
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;

import React, { useEffect, useState } from 'react'
import { Button } from '../button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';



function Header() {

  const user=JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(()=>{
    console.log(user)
  },[])

  const login = useGoogleLogin({
    onSuccess: async (codeResp) => {
      console.log(codeResp);
      await GetUserProfile(codeResp);
    },
    onError: (error) => console.log(error),
  });

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
      window.location.reload();
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  return (
    <div className='p-2 shadow-sm flex justify-between items-center px-3'>
      <img src='/logo.svg'/>
        <div>
          {user?
          <div className='flex items-center gap-4'>
            <a href="/create-trip">
            <Button variant="outline" className="rounded-full"> + Create Trip</Button>
            </a>
            <a href="/my-trips">
            <Button variant="outline" className="rounded-full"> My Trips</Button>
            </a>
            <Popover>
             <PopoverTrigger>
             <img src={user?.picture} className='h-[35px]  w=[35px] rounded-full'/>

             </PopoverTrigger>
             <PopoverContent>
              <h2 className='cursor-pointer' onClick={()=>{
                googleLogout;
                localStorage.clear();
                window.location.reload();
                }}>LOGOUT</h2>
              </PopoverContent>
            </Popover>

          </div>
          :<Button onClick={()=>setOpenDialog(true)}> Sign In</Button>
        }
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
  )
}

export default Header
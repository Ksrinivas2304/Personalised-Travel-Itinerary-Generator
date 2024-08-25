import axios from "axios"

const BASE_URL='https://places.googleapis.com/v1/places:searchText'

const config={
  headers:{
    'Content-Type':'application/json',
    'X-Goog-Api-Key':import.meta.env.VITE_GOOGLE_PLACE_APY_KEY,
    'X-Goog-FeildMask':[
      'places.photos',
      'places.displayName',
      'places.id'
    ]
  }
}

export const GetPlaceDetails=(data)=>axios.post(BASE_URL,data,config)
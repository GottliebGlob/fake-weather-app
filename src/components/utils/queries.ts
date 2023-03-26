import { useQuery } from "react-query"
import * as Location from "expo-location"
import { getGeocodeAsync } from "../helpers/helpers"

const fetchWeather = async (url: string) => {
  const res = await fetch(url)
  return await res.json()
}

export const useWeather = (city: string) => {
  return useQuery({
    queryKey: "weather",
    queryFn: async () => {
      const data = await fetchWeather(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1349e3bf3355f35f23b51bc251498163`,
      )
      return data
    },
  })
}

export const useGeolocation = () => {
  return useQuery({
    queryKey: "geo",
    queryFn: async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        alert(
          "You've cancelled the location permissions so have to find your city by your own",
        )
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      })
      const { latitude, longitude } = location.coords

      const geo = await getGeocodeAsync(latitude, longitude)
      return geo
    },
  })
}

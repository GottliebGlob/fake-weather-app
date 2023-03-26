import * as Location from "expo-location"

export const toCelsius = (temp: string) => {
  return (Number(temp) - 273.15).toFixed(0)
}

export const getGeocodeAsync = async (latitude: number, longitude: number) => {
  const geocode = await Location.reverseGeocodeAsync({ latitude, longitude })

  if (geocode[0].city) {
    return geocode[0].city
  }
  return "London"
}

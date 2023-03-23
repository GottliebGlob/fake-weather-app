import { useQuery } from "react-query"

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

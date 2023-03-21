import { useEffect, useState } from "react"
import { Text, TextInput, View } from "react-native"
import { useQuery } from "react-query"
import { Feather } from "@expo/vector-icons"
import WeatherRow from "../../components/WeatherRow/WeatherRow"
import WeatherListItem from "../../components/WeatherListItem/WeatherListItem"
import { SafeAreaView } from "react-native-safe-area-context"

const Weather = () => {
  const [city, setCity] = useState("Moscow")
  const [weatherIcon, setWeatherIcon] = useState<
    | "cloud"
    | "sun"
    | "cloud-lightning"
    | "cloud-drizzle"
    | "cloud-rain"
    | "cloud-snow"
    | "cloud-off"
  >("cloud-off")
  const [temp, setTemp] = useState("0")
  const [tempMin, setTempMin] = useState("0")
  const [tempMax, setTempMax] = useState("0")
  const [weather, setWeather] = useState("clear")
  const [humidity, setHumidity] = useState("0")
  const [pressure, setPressure] = useState("0")
  const [windSpeed, setWindSpeed] = useState("0")
  const [clouds, setClouds] = useState("0")
  const [globalError, setGlobalError] = useState(false)

  const fetchWeather = async () => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1349e3bf3355f35f23b51bc251498163`,
    )
    return await res.json()
  }

  const { data, isLoading, error, refetch } = useQuery("weather", fetchWeather)

  const toCelsius = (temp: string) => {
    return (Number(temp) - 273.15).toFixed(0)
  }

  useEffect(() => {
    if (data) {
      setGlobalError(false)
      if (data?.weather[0]) {
        setWeather(data.weather[0].description)
        switch (data.weather[0].main) {
          case "Clouds":
            setWeatherIcon("cloud")
            break
          case "Clear":
            setWeatherIcon("sun")
            break
          case "Thunderstorm":
            setWeatherIcon("cloud-lightning")
            break
          case "Drizzle":
            setWeatherIcon("cloud-drizzle")
            break
          case "Rain":
            setWeatherIcon("cloud-rain")
            break
          case "Snow":
            setWeatherIcon("cloud-snow")
            break
          default:
            setWeatherIcon("cloud-off")
        }
      }

      if (data?.main) {
        const t = toCelsius(data.main.temp)
        const tMax = toCelsius(data.main.temp_max)
        const tMin = toCelsius(data.main.temp_min)
        setTemp(t)
        setTempMin(tMin)
        setTempMax(tMax)
        setHumidity(data.main.humidity)
        setPressure(data.main.pressure)
      }
      if (data?.wind) {
        setWindSpeed(data.wind.speed.toFixed(0))
      }
      if (data?.clouds) {
        setClouds(data.clouds.all)
      }
    } else {
      setGlobalError(true)
    }
  }, [data])

  if (isLoading) {
    return (
      <View className="flex-1 bg-main-200 items-center justify-center p-3">
        <Feather name="sun" size={100} color="#3c97ff" />
        <Text className="text-2xl capitalize text-gray-400 text-center mt-5 mb-5">
          Loading...
        </Text>
      </View>
    )
  }

  if (error || data === undefined || globalError) {
    return (
      <View className="flex-1 bg-main-200 items-center justify-center p-3">
        <Feather name="cloud-off" size={150} color="white" />
        <Text className="text-2xl capitalize text-gray-400 text-center mt-5 mb-5">
          We are really sorry but something went wrong. Please try to reload the
          app.
        </Text>
      </View>
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-main-200 justify-between">
      <View className="bg-main-100 rounded-2xl h-14 items-center flex flex-row justify-between py-2 px-4 m-3">
        <TextInput
          onChangeText={setCity}
          value={city}
          placeholder="search"
          className="text-white text-2xl w-[70%]"
        />
        <Feather
          name="search"
          size={24}
          color="white"
          onPress={() => refetch()}
        />
      </View>

      <View className="w-full flex items-center justify-center">
        <Text className="text-3xl capitalize text-gray-400 text-center mt-5 mb-5">
          {weather}
        </Text>

        <Feather name={weatherIcon} size={150} color="white" />

        <Text className="text-6xl mt-10 font-bold text-white text-center ">
          {temp}°
        </Text>

        <View className="flex flex-row mt-5">
          <Text className="text-blue-500 text-2xl text-center">{tempMin}°</Text>
          <Text className="text-gray-500 text-2xl mx-3 text-center">/</Text>
          <Text className="text-red-500 text-2xl text-center">{tempMax}°</Text>
        </View>
      </View>
      <View>
        <WeatherRow>
          <WeatherListItem amount={`${humidity} %`} parameter="Humidity" />
          <WeatherListItem amount={`${pressure} hPa`} parameter="Pressure" />
        </WeatherRow>

        <WeatherRow>
          <WeatherListItem amount={`${windSpeed} m/sec`} parameter="Wind" />
          <WeatherListItem amount={`${clouds} %`} parameter="Clouds" />
        </WeatherRow>
      </View>
    </SafeAreaView>
  )
}

export default Weather

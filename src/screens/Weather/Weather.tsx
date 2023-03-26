import { useEffect, useState } from "react"
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native"
import WeatherRow from "../../components/WeatherRow/WeatherRow"
import WeatherListItem from "../../components/WeatherListItem/WeatherListItem"
import { SafeAreaView } from "react-native-safe-area-context"
import { Image, ImageSource } from "expo-image"
import { Asset, useAssets } from "expo-asset"
import { useGeolocation, useWeather } from "../../components/utils/queries"
import { toCelsius } from "../../components/helpers/helpers"
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen"
import ErrorScreen from "../../components/ErrorScreen/ErrorScreen"
import SearchBar from "../../components/SearchBar/SearchBar"

const Weather = () => {
  const [assets, assetsError] = useAssets([
    require("../../../assets/weather/clear.png"),
    require("../../../assets/weather/cloud.png"),
    require("../../../assets/weather/clear.png"),
    require("../../../assets/weather/mist.png"),
    require("../../../assets/weather/rain.png"),
    require("../../../assets/weather/snow.png"),
  ])

  const [city, setCity] = useState("London")
  const [weatherIcon, setWeatherIcon] = useState<Asset>()
  const [temp, setTemp] = useState("0")
  const [tempMin, setTempMin] = useState("0")
  const [tempMax, setTempMax] = useState("0")
  const [weather, setWeather] = useState("clear")
  const [humidity, setHumidity] = useState("0")
  const [pressure, setPressure] = useState("0")
  const [windSpeed, setWindSpeed] = useState("0")
  const [clouds, setClouds] = useState("0")
  const [globalError, setGlobalError] = useState(false)

  const { data, isLoading, error, refetch } = useWeather(city)
  const { data: geoData, isLoading: isGeoLoading } = useGeolocation()

  useEffect(() => {
    if (data) {
      setGlobalError(false)

      if (data.cod === 200) {
        if (assets) {
          setWeather(data.weather[0].description)
          switch (data.weather[0].main) {
            case "Clouds":
              setWeatherIcon(assets[1])
              break
            case "Clear":
              setWeatherIcon(assets[0])
              break
            case "Thunderstorm":
              setWeatherIcon(assets[3])
              break
            case "Drizzle":
              setWeatherIcon(assets[3])
              break
            case "Rain":
              setWeatherIcon(assets[3])
              break
            case "Snow":
              setWeatherIcon(assets[4])
              break
            default:
              setWeatherIcon(assets[2])
          }
        }

        const t = toCelsius(data.main.temp)
        const tMax = toCelsius(data.main.temp_max)
        const tMin = toCelsius(data.main.temp_min)
        setTemp(t)
        setTempMin(tMin)
        setTempMax(tMax)
        setHumidity(data.main.humidity)
        setPressure(data.main.pressure)
        setWindSpeed(data.wind.speed.toFixed(0))
        setClouds(data.clouds.all)
      } else {
        alert("Sorry but we can't find a city you are looking for")
      }
    } else {
      setGlobalError(true)
    }
  }, [data])

  useEffect(() => {
    if (geoData) {
      setCity(geoData)
    }
  }, [geoData])

  if (isLoading || isGeoLoading || !assets) {
    return <LoadingScreen />
  }

  if (error || data === undefined || globalError || assetsError) {
    return <ErrorScreen />
  }

  return (
    <SafeAreaView className="flex-1 bg-main-200 justify-between">
      <SearchBar city={city} setCity={setCity} refetch={refetch} />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="w-full flex items-center justify-center">
          <Text className="text-3xl capitalize text-gray-400 text-center mt-5 mb-5">
            {weather}
          </Text>

          <Image
            style={{ width: 150, height: 150 }}
            source={weatherIcon as ImageSource}
            placeholder="image"
            contentFit="cover"
            transition={1000}
          />

          <Text className="text-6xl mt-10 font-bold text-white text-center ">
            {temp}°
          </Text>

          <View className="flex flex-row mt-5">
            <Text className="text-blue-500 text-2xl text-center">
              {tempMin}°
            </Text>
            <Text className="text-gray-500 text-2xl mx-3 text-center">/</Text>
            <Text className="text-red-500 text-2xl text-center">
              {tempMax}°
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
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

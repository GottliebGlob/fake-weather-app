import React from "react"
import { View } from "react-native"

interface WeatherRowProps {
  children: React.ReactNode
}

const WeatherRow = ({ children }: WeatherRowProps) => {
  return (
    <View className="flex flex-row px-4 py-3 justify-between">{children}</View>
  )
}

export default WeatherRow

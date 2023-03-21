import React from "react"
import { View, Text } from "react-native"

interface WeatherListItemProps {
  parameter: string
  amount: string
}

const WeatherListItem = ({ parameter, amount }: WeatherListItemProps) => {
  return (
    <View className="bg-main-100 flex items-start rounded-2xl p-4 w-[47%] ">
      <Text className="text-2xl text-gray-400 text-center ">{parameter}</Text>

      <Text className="text-4xl mt-4 font-bold text-center text-white">
        {amount}
      </Text>
    </View>
  )
}

export default WeatherListItem

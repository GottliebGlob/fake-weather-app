import React from "react"
import { View, Text } from "react-native"
import { Feather } from "@expo/vector-icons"

const LoadingScreen = () => {
  return (
    <View className="flex-1 bg-main-200 items-center justify-center p-3">
      <Feather name="sun" size={100} color="#3c97ff" />
      <Text className="text-2xl capitalize text-gray-400 text-center mt-5 mb-5">
        Loading...
      </Text>
    </View>
  )
}

export default LoadingScreen

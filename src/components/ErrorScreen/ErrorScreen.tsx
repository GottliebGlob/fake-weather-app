import React from "react"
import { View, Text } from "react-native"
import { Feather } from "@expo/vector-icons"

const ErrorScreen = () => {
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

export default ErrorScreen

import React from "react"
import { View, TextInput } from "react-native"
import { Feather } from "@expo/vector-icons"

interface SearchBarProps {
  city: string
  setCity: React.Dispatch<React.SetStateAction<string>>
  refetch: unknown
}

const SearchBar = ({ city, setCity, refetch }: SearchBarProps) => {
  return (
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
  )
}

export default SearchBar

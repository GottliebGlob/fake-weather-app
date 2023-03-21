import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { QueryClient, QueryClientProvider } from "react-query"
import Secret from "./src/screens/Secret/Secret"
import Weather from "./src/screens/Weather/Weather"

const Stack = createNativeStackNavigator()
const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Weather" component={Weather} />
          <Stack.Screen name="Secret" component={Secret} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  )
}

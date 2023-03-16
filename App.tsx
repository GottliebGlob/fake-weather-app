import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Secret from './src/screens/Secret/Secret';
import Weather from './src/screens/Weather/Weather';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="Weather" component={Weather} />
    <Stack.Screen name="Secret" component={Secret} />
      </Stack.Navigator>
      </NavigationContainer>
  );
}



import React from "react";
import AboutUs from "./screens/AboutUs";
import Home from "./screens/Home";
import YourCloset from "./screens/YourCloset";
import Location from "./screens/Location";
import Weather from "./screens/Weather";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
	return (
		<NavigationContainer independent={true}>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="YourCloset" component={YourCloset} />
				<Stack.Screen name="Location" component={Location} />
				<Stack.Screen name="Weather" component={Weather} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

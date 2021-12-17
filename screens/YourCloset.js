import React from "react";
import { SafeAreaView } from "react-native";
import YourClosetHeader from "../components/YourCloset/YourClosetHeader";
import YourClosetBody from "../components/YourCloset/YourClosetBody";
export default function YourCloset({ navigation }) {
	return (
		<SafeAreaView>
			<YourClosetHeader />
			<YourClosetBody navigation={navigation} />
		</SafeAreaView>
	);
}

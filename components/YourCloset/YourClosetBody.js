import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import YourClosetItemList from "./YourClosetItemList";
const YourClosetBody = ({ navigation }) => {
	return (
		<View>
			<YourClosetItemList navigation={navigation} />
		</View>
	);
};
export default YourClosetBody;

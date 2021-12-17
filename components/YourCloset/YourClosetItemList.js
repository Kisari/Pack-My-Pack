import React from "react";
import { View, Text, TouchableOpacity, Avatar, ScrollView, StyleSheet } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { ListItem, Button } from "react-native-elements";
import YourClosetItem from "./YourClosetItem";
const YourClosetBody = ({ navigation, item_data }) => {
	const item_data_list = [
		{
			id: 1,
			name: "Umbrella",
			icon: "icon.png",
		},
		{
			id: 2,
			name: "Sunglasses",
			icon: "icon.png",
		},
		{
			id: 3,
			name: "Hat",
			icon: "icon.png",
		},
		{
			id: 4,
			name: "Shirt",
			icon: "umbrella.jfif",
		},
	];
	return (
		<View style={styles.wrapper}>
			{item_data_list.map((item_data) => {
				return <YourClosetItem key={item_data.id} navigation={navigation} item_data={item_data} />;
			})}
		</View>
	);
};
export default YourClosetBody;
const styles = StyleSheet.create({
	wrapper: {
		marginTop: 20,
		marginBottom: 20,
	},
	listItem: {
		borderRadius: 20,
		backgroundColor: "#4C516D",
	},
});

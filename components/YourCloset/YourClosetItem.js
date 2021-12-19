import React from "react";
import { View, Text, TouchableOpacity, Avatar, ScrollView, StyleSheet, Image } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { ListItem, Button } from "react-native-elements";
const YourClosetBody = ({ navigation, item_data, remove_item }) => {
	var image_source = "../../assets/Images/" + item_data.icon;
	return (
		// <ListItem.Swipeable style={styles.wrapper}>
		// 	<Avatar style={styles.image} source={require("../../assets/images/your-closet.png")} />
		// 	<Text style={styles.text}>Umbrella</Text>
		// </ListItem.Swipeable>

		<View>
			<ListItem.Swipeable
				// onPress={log}
				style={styles.listItem}
				bottomDivider
				leftContent={<Button title="Info" icon={{ name: "info", color: "white" }} buttonStyle={{ minHeight: "100%" }} />}
				rightContent={
					<Button
						title="Remove"
						icon={{ name: "delete", color: "white" }}
						buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
						onPress={() => {
							remove_item(item_data.id);
						}}
					/>
				}
			>
				{/* create an Avatar.Image tag with the source that contains the item_data.icon variable */}
				<Image style={styles.image} source={require("../../assets/Images/favicon.png")} />

				<ListItem.Content>
					<ListItem.Title>{item_data.name}</ListItem.Title>
				</ListItem.Content>
				<ListItem.Chevron />
			</ListItem.Swipeable>
			<Text></Text>
		</View>
	);
};
export default YourClosetBody;
const styles = StyleSheet.create({
	listItem: {
		borderRadius: 20,
		backgroundColor: "#4C516D",
	},
	image: {
		width: 50,
		height: 50,
	},
});

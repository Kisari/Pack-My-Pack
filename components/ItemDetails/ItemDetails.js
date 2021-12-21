import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { Dropdown } from "react-native-element-dropdown";
import Entypo from "react-native-vector-icons/Entypo";
import * as ImagePicker from "expo-image-picker";
const ItemDetails = ({ route, navigation }) => {
	const [positionIndex, setPositionIndex] = useState(null);
	const [itemIcon, setItemIcon] = useState("");
	const { item_data } = route.params;
	console.log("the item icon is: ", itemIcon);
	const renderItem = (item) => {
		return (
			<View style={styles.item}>
				<Text style={styles.textItem}>position - {item}</Text>
				{/* {item.value === value && <AntDesign style={styles.icon} color="red" name={item.icon ? item.icon : "checkcircle"} size={20} />} */}
			</View>
		);
	};
	const handleChoosePhoto = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== "granted") {
			alert("...");
		} else {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});

			console.log(result);

			if (!result.cancelled) {
				setItemIcon(result.uri);
			}
		}
	};
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Item Details</Text>
			</View>
			<ScrollView style={styles.scrollView}>
				<View style={styles.itemDetails}>
					<View style={styles.itemDetailsHeader}>
						<Text style={styles.itemDetailsHeaderText}>Item Info</Text>
					</View>
					<View style={styles.itemDetailsBody}>
						<View style={styles.itemDetailsBodyRow}>
							<Text style={styles.itemDetailsBodyRowText}>Item Name</Text>
							<TextInput style={styles.itemDetailsHeaderTextInput} placeholder="Search" />
							<Text style={styles.itemDetailsBodyRowText}>{item_data.name}</Text>
						</View>
						<View style={styles.itemDetailsBodyRow}>
							<Text style={styles.itemDetailsBodyRowText}>Item Icon</Text>
							<TouchableOpacity onPress={handleChoosePhoto}>
								<Icon name="image" type="font-awesome" color="black" />
							</TouchableOpacity>
							{itemIcon ? (
								<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
									<Image source={{ uri: itemIcon }} style={{ width: 200, height: 200 }} />
								</View>
							) : null}
						</View>
						<View style={styles.itemDetailsBodyRow}>
							<Text style={styles.itemDetailsBodyRowText}>Position in closet</Text>
							<Dropdown
								style={styles.dropdown}
								placeholderStyle={styles.placeholderStyle}
								selectedTextStyle={styles.selectedTextStyle}
								iconStyle={styles.iconStyle}
								data={[1, 2, 3, 4, 5, 6, 7, 8]}
								maxHeight={300}
								labelField="label"
								valueField="value"
								placeholder="Choose the item's position in the closet"
								onChange={(item) => {
									setPositionIndex(item);
								}}
								value={positionIndex}
								renderLeftIcon={() => <Entypo style={styles.icon} color="black" name="location" size={20} />}
								renderItem={renderItem}
							/>
						</View>
					</View>
					<View style={styles.itemDetailsHeader}>
						<Text style={styles.itemDetailsHeaderText}>Location</Text>
					</View>
					<View style={styles.itemDetailsBody}>
						<View style={styles.itemDetailsBodyRow}>
							<Text style={styles.itemDetailsBodyRowText}>Position</Text>
							{/* Make a dropdown list here */}
						</View>
					</View>
					<View style={styles.itemDetailsBody}>
						<View style={styles.itemDetailsBodyRow}>
							<Text style={styles.itemDetailsBodyRowText}>Weather</Text>
							{/* Make a dropdown list here */}
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	);
};
export default ItemDetails;
const styles = StyleSheet.create({
	dropdown: {
		margin: 16,
		height: 50,
		backgroundColor: "white",
		borderRadius: 12,
		padding: 12,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,

		elevation: 2,
		flexGrow: 1,
	},
	placeholderStyle: {
		fontSize: 16,
	},
	selectedTextStyle: {
		fontSize: 16,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
	item: {
		padding: 17,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	textItem: {
		flex: 1,
		fontSize: 16,
	},

	container: {
		backgroundColor: "#4C516D",
	},
	header: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 10,
		backgroundColor: "#3D4C6F",
	},
	headerText: {
		color: "#fff",
		fontSize: 20,
		fontWeight: "bold",
	},
	scrollView: {},
	itemDetails: {
		padding: 20,
	},
	itemDetailsHeader: {},
	itemDetailsHeaderText: {
		color: "#fff",
		fontSize: 20,
		fontWeight: "bold",
	},
	itemDetailsBody: {
		marginTop: 20,
	},
	itemDetailsBodyRow: {
		marginBottom: 10,
	},
	itemDetailsBodyRowText: {
		color: "#fff",
		fontSize: 16,
	},
	itemDetailsHeaderTextInput: {
		backgroundColor: "#fff",
		color: "black",
	},
});

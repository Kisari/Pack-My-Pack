import React from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

import LocationItemList from "./LocationItemList";
import LocationCreate from "./LocationCreate";
const LocationBody = ({ navigation }) => {
	const location_list = [
		{ label: "Tan Hung General Hospital", value: "0", place: "Hospital", laditude: "10.7511639", longitude: "106.6962811" },
		{ label: "RMIT Vietnam", value: "1", place: "School", laditude: "10.7295037", longitude: "106.6960337" },
		{ label: "McDonald's", value: "2", place: "Restaurant", laditude: "10.7295629", longitude: "106.7036329" },
		{ label: "Ben Thanh Market", value: "3", place: "Market", laditude: "10.7721095", longitude: "106.6982784" },
		{ label: "Bui Vien Walking Street", value: "4", place: "Park", laditude: "10.7652592", longitude: "106.6902981" },
	];
	// const [currentPlace, setCurrentPlace]
	// const selectLocation = useCallback({
	// 	label: "Tan Hung General Hospital",
	// 	value: "0",
	// 	place: "Hospital",
	// 	laditude: "10.7511639",
	// 	longitude: "106.6962811",
	// });

	// })
	const place_type = ["Market", "School", "WorkPlace", "Hospital", "Park", "Restaurant", "Library"];
	return (
		<View>
			<LocationItemList navigation={navigation} location_list={location_list} place_type={place_type} />
			{/* <LocationCreate navigation={navigation} location_list={locationList} /> */}
			<LocationCreate navigation={navigation} />
		</View>
	);
};

export default LocationBody;

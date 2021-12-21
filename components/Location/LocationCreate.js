import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { useState, useEffect, useRef } from "react";
import { View, Text, Dimensions, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import * as Location from "expo-location";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Hideo } from "react-native-textinput-effects";
import { Fumi } from "react-native-textinput-effects";

const LocationCreate = ({}) => {
	const [pin, setPin] = useState({
		latitude: 37.78825,
		longitude: -122.4324,
	});
	// const [value, setValue] = useState(null);
	// const [items, setItems] = useState([
	//   { label: "Market", value: "1" },
	//   { label: "School", value: "2" },
	//   { label: "WorkPlace", value: "3" },
	//   { label: "Hospital", value: "4" },
	//   { label: "Park", value: "5" },
	//   { label: "Restaurant", value: "6" },
	//   { label: "Library", value: "7" },
	// ]);
	const { width, height } = Dimensions.get("screen");
	const headToLocation = useRef(null);
	const [currentPosition, setCurrentPosition] = useState({});
	const getDirections = async (startLoc, desLoc) => {
		try {
			const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}`);
			const respJson = await resp.json();
		} catch (error) {
			console.log("Error: ", error);
		}
	};
	useEffect(async () => {
		_getLocationAsync = async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			console.log("the permission status is: ", status);
			if (status === "granted") {
				let location = await Location.getCurrentPositionAsync({});
				var location_formated = {
					latitude: location.coords.latitude,
					longitude: location.coords.longitude,
					latitudeDelta: 0.1,
					longitudeDelta: 0.05,
				};
				setCurrentPosition(location_formated);
				setRegion(location_formated);
			} else {
				const response = await Location.getCurrentPositionAsync({});
			}
		};
		_getLocationAsync();
	}, []);
	const [region, setRegion] = useState({});
	const renderLocationImage = (item) => {
		console.log("the item is: ", item);
		return (
			<Image
				style={{
					flex: 1,
					width: width * 0.95,
					alignSelf: "center",
					height: height * 0.15,
					position: "absolute",
					bottom: height * 0.05,
					zIndex: 90,
				}}
				source={{ uri: item.placeIcon }}
			/>
		);
	};
	const renderItem = (item) => {
		return (
			<View style={styles.item}>
				<Text style={styles.textItem}>{item.label}</Text>
				{item.value === value && <AntDesign style={styles.icon} color="red" name={item.icon ? item.icon : "checkcircle"} size={20} />}
			</View>
		);
	};
	return (
		<View style={{ flex: 1, position: "relative" }}>
			{/* </View> */}
			<MapView ref={headToLocation} style={styles.map} initialRegion={currentPosition} loadingEnabled provider="google" followUserLocation showsUserLocation>
				{region.latitude && region.longitude ? (
					<Marker
						draggable={true}
						pinColor="blue"
						description="The region's location"
						coordinate={{
							latitude: region.latitude,
							longitude: region.longitude,
						}}
					/>
				) : null}
				{currentPosition.latitude && currentPosition.longitude ? (
					// You can add image property to change the marker's shape: E.x: image={require("../../assets/Images/favicon.png")}
					<Marker
						draggable={true}
						description="Your current location"
						coordinate={{
							latitude: currentPosition.latitude,
							longitude: currentPosition.longitude,
						}}
					>
						<Callout style={{ width: 200, backgroundColor: "#4C516D" }}>
							<View
								style={{
									flex: 1,
									flexDirection: "row",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								<TouchableOpacity>
									<Entypo name="location-pin" size={30} color="red" />
								</TouchableOpacity>
								<Text style={{ color: "white" }}>You are here</Text>
							</View>
						</Callout>
					</Marker>
				) : null}
			</MapView>
			{/* <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={items}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Choose your location"
        searchPlaceholder="Location searching..."
        value={value}
        onChange={(item) => {
          setValue(item.value);
        }}
        renderLeftIcon={() => (
          <Entypo style={styles.icon} color="black" name="location" size={20} />
        )}
        renderItem={renderItem}
      /> */}

			<GooglePlacesAutocomplete
				placeholder="Search"
				fetchDetails={true}
				minLength={3}
				listViewDisplayed={true}
				GooglePlacesSearchQuery={{
					rankby: "distance",
				}}
				onPress={(data, details = null) => {
					headToLocation.current.animateToRegion(
						{
							latitude: details.geometry.location.lat,
							longitude: details.geometry.location.lng,
							latitudeDelta: 0.1,
							longitudeDelta: 0.05,
						},
						350,
					);
					setRegion({
						latitude: details.geometry.location.lat,
						longitude: details.geometry.location.lng,
						latitudeDelta: 0.1,
						longitudeDelta: 0.05,
						placeIcon: details.icon,
					});
					renderLocationImage({
						latitude: details.geometry.location.lat,
						longitude: details.geometry.location.lng,
						latitudeDelta: 0.1,
						longitudeDelta: 0.05,
						placeIcon: details.icon,
					});
				}}
				onFail={(error) => console.error(error)}
				query={{
					key: "AIzaSyDzT8t3Lq9XQ5X7zRGz55OcAXr39mp1muI",
					language: "en",
					// types: "(cities)",
				}}
				styles={{
					container: {
						flex: 0,
						width: "80%",
						zIndex: 1,
						marginTop: 10,
						position: "absolute",
					},
					listView: { backgroundColor: "white" },
				}}
			/>
			<View
				style={{
					display: "flex",
					flexDirection: "column",
					backgroundColor: "white",
					alignItems: "center",
					position: "absolute",
					margin: 0,
					width: "100%",
					top: 750,
					height: Dimensions.get("window").height - 750,
					zIndex: 1,
				}}
			>
				{/* <Hideo
            style={{ marginTop: 0, flex: 2, marginHorizontal: 10 }}
            iconClass={FontAwesomeIcon}
            iconName={"envelope"}
            iconColor={"white"}
            // this is used as backgroundColor of icon container view.
            iconBackgroundColor={"#f2a59d"}
            inputStyle={{ color: "#464949" }}
          />
          <Hideo
            style={{ margin: 0, flex: 2, marginHorizontal: 10 }}
            iconClass={FontAwesomeIcon}
            iconName={"envelope"}
            iconColor={"white"}
            // this is used as backgroundColor of icon container view.
            iconBackgroundColor={"#f2a59d"}
            inputStyle={{ color: "#464949" }}
          /> */}
				<View
					style={{
						marginTop: 5,
						borderBottomColor: "grey",
						borderRadius: 30,
						borderBottomWidth: 10,
						width: "20%",
					}}
				/>
				<Fumi
					style={{
						width: "95%",
						marginTop: 15,
						marginBottom: 30,
						backgroundColor: "#dedede",
						borderRadius: 10,
					}}
					label={"Location Name"}
					iconClass={MaterialIcons}
					iconName={"location-history"}
					iconColor={"#f95a25"}
					iconSize={25}
					iconWidth={45}
					inputPadding={16}
				/>
				<Fumi style={{ width: "95%", backgroundColor: "#dedede", borderRadius: 10 }} label={"Location Type"} iconClass={MaterialIcons} iconName={"location-city"} iconColor={"#f95a25"} iconSize={25} iconWidth={45} inputPadding={16} />
			</View>
		</View>
	);
};

export default LocationCreate;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
		zIndex: 0,
	},
});

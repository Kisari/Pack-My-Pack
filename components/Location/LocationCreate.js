import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { useState, useEffect, useRef } from "react";
import { View, Text, Dimensions, PermissionsAndroid, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Entypo from "react-native-vector-icons/Entypo";
const LocationCreate = ({ location_list }) => {
	const [pin, setPin] = useState({
		latitude: 37.78825,
		longitude: -122.4324,
	});
	const headToLocation = useRef(null);
	const [currentPosition, setCurrentPosition] = useState({});
	useEffect(async () => {
		_getLocationAsync = async () => {
			let { status } = await Permissions.askAsync(Permissions.LOCATION);
			console.log("the permission status is: ", status);
			if (status === "granted") {
				let location = await Location.getCurrentPositionAsync({});
				console.log("the current location is: ", location);
				var location_formated = { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.1, longitudeDelta: 0.05 };
				setCurrentPosition(location_formated);
				setRegion(location_formated);
			}
		};
		_getLocationAsync();
	}, []);
	const [region, setRegion] = useState({});

	return (
		<View style={{ marginTop: 50, flex: 1 }}>
			<GooglePlacesAutocomplete
				placeholder="Search"
				fetchDetails={true}
				minLength={3}
				listViewDisplayed={true}
				GooglePlacesSearchQuery={{
					rankby: "distance",
				}}
				onPress={(data, details = null) => {
					console.log("the laditude and longitude of the place is: ", details.geometry.location.lat, details.geometry.location.lng);
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
					});
				}}
				onFail={(error) => console.error(error)}
				query={{
					key: "AIzaSyCG4AL8db0VHirXhLZbh_ORFJXCNuxikfg",
					language: "en",
					// types: "(cities)",
				}}
				styles={{
					container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
					listView: { backgroundColor: "white" },
				}}
			/>
			<MapView ref={headToLocation} style={styles.map} initialRegion={currentPosition} loadingEnabled provider="google" followUserLocation={true} showsUserLocation={true}>
				{currentPosition.latitude && currentPosition.longitude ? (
					<Marker draggable={true} image={require("../../assets/Images/favicon.png")} description="Your current location" coordinate={{ latitude: currentPosition.latitude, longitude: currentPosition.longitude }}>
						<Callout tooltip style={{ width: 200, backgroundColor: "#4C516D" }}>
							<View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
								<TouchableOpacity>
									<Entypo name="location-pin" size={30} color="red" />
								</TouchableOpacity>
								<Text style={{ color: "white" }}>You are here</Text>
							</View>
						</Callout>
					</Marker>
				) : null}
				{currentPosition.latitude && currentPosition.longitude ? <Circle center={currentPosition} radius={500} /> : null}
				{region.latitude && region.longitude ? <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} /> : null}
			</MapView>
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
	},
});

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator, SafeAreaView, ScrollView, FlatList, Alert, RefreshControl } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

const WeatherMain = ({ navigation }) => {
	const API_key = "651f17426e3a852e30a3107b8f1dd555";
	const [forecast, setForecast] = useState(null);
	const [refreshing, setRefreshing] = useState(false);
	let url = `https://api.openweathermap.org/data/2.5/onecall?&units=metric&exclude=minutely&appid=${API_key}`;
	const loadForecast = async () => {
		setRefreshing(true);
		const { status } = await Permissions.askAsync(Permissions.LOCATION);
		console.log("the status is: ", status);
		if (status !== "granted") {
			console.log("Permission to access location was denied");
		}
		let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
		const response = await fetch(`${url}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`);
		if (response) {
			const data = await response.json();
			console.log("the weather data is: ", data);
			setForecast(data);
		} else {
			console.log("oh no");
		}
		setRefreshing(false);
	};

	useEffect(() => {
		if (!forecast) {
			loadForecast();
		}
	});
	// if (!forecast) {
	// 	return (
	// 		<SafeAreaView style={styles.loading}>
	// 			<Text>oh no</Text>
	// 			<ActivityIndicator size="large" />
	// 		</SafeAreaView>
	// 	);
	// }
	const current = forecast ? forecast.current.weather[0] : null;

	return current ? (
		<View style={styles.container}>
			<Text style={styles.title}>Current Weather</Text>
			<ScrollView
				refreshControl={
					<RefreshControl
						onRefresh={() => {
							loadForecast();
						}}
						refreshing={refreshing}
					/>
				}
			>
				<Text style={styles.title}>Current Weather</Text>
				<View style={styles.current}>
					<Image
						style={styles.largeIcon}
						source={{
							uri: `http://openweathermap.org/img/wn/${current.icon}@4x.png`,
						}}
					/>
					<Text style={styles.currentTemp}>{Math.round(forecast.current.temp)}°C</Text>
				</View>

				<Text style={styles.currentDescription}>{current.description}</Text>
				<View>
					<Text style={styles.subtitle}>Hourly Forecast</Text>
					<FlatList
						horizontal
						data={forecast.hourly.slice(0, 24)}
						keyExtractor={(item, index) => index.toString()}
						renderItem={(hour) => {
							const weather = hour.item.weather[0];
							var dt = new Date(hour.item.dt * 1000);
							return (
								<View style={styles.hour}>
									<Text>{dt.toLocaleTimeString().replace(/:\d+ /, " ")}</Text>
									<Text>{Math.round(hour.item.temp)}°C</Text>
									<Image
										style={styles.smallIcon}
										source={{
											uri: `http://openweathermap.org/img/wn/${weather.icon}@4x.png`,
										}}
									/>
									<Text>{weather.description}</Text>
								</View>
							);
						}}
					/>
				</View>

				<Text style={styles.subtitle}>Next 5 Days</Text>
				{forecast.daily.slice(0, 5).map((d) => {
					//Only want the next 5 days
					const weather = d.weather[0];
					var dt = new Date(d.dt * 1000);
					return (
						<View style={styles.day} key={d.dt}>
							<Text style={styles.dayTemp}>{Math.round(d.temp.max)}°C</Text>
							<Image
								style={styles.smallIcon}
								source={{
									uri: `http://openweathermap.org/img/wn/${weather.icon}@4x.png`,
								}}
							/>
							<View style={styles.dayDetails}>
								<Text>{dt.toLocaleDateString()}</Text>
								<Text>{weather.description}</Text>
							</View>
						</View>
					);
				})}
			</ScrollView>
		</View>
	) : (
		<View style={styles.container}>
			<Text style={styles.title}>Current Weather</Text>
			<ActivityIndicator size="large" />
		</View>
	);
};

const styles = StyleSheet.create({
	title: {
		width: "100%",
		textAlign: "center",
		fontSize: 42,
		color: "#e96e50",
	},
	subtitle: {
		fontSize: 24,
		marginVertical: 12,
		marginLeft: 4,
		color: "#e96e50",
	},
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	loading: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	current: {
		flexDirection: "row",
		alignItems: "center",
		alignContent: "center",
	},
	currentTemp: {
		fontSize: 32,
		fontWeight: "bold",
		textAlign: "center",
	},
	currentDescription: {
		width: "100%",
		textAlign: "center",
		fontWeight: "200",
		fontSize: 24,
		marginBottom: 24,
	},
	hour: {
		padding: 6,
		alignItems: "center",
	},
	day: {
		flexDirection: "row",
	},
	dayDetails: {
		justifyContent: "center",
	},
	dayTemp: {
		marginLeft: 12,
		alignSelf: "center",
		fontSize: 20,
	},
	largeIcon: {
		width: 250,
		height: 200,
	},
	smallIcon: {
		width: 100,
		height: 100,
	},
});

export default WeatherMain;

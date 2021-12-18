import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import LocationItemList from "./LocationItemList";
const LocationBody = ({ navigation }) => {
  return (
    <View>
      <LocationItemList navigation={navigation} />
    </View>
  );
};

export default LocationBody;

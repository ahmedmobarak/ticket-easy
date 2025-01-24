import React, { useState, useEffect, useRef, useContext } from "react";
import { Platform, Text, View, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { FAB, Title } from "react-native-paper";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { themes } from "../../themes/themes";
import { LangContext } from "../../context/langContext";
import { ThemeContext } from "../../context/themeContext";
import { useNavigation } from "@react-navigation/native";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { EventsApi } from "../../fetch/events";

export default function MapScreen() {

  const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitudeDelta: 0.0092,
    longitudeDelta: 0.0092,
    latitude: 25.2357225,
    longitude: 55.2954408
  });
  const [list, setList] = useState([]);

  const langContext = useContext(LangContext);
  const themeContext = useContext(ThemeContext).theme;

  const navigation = useNavigation();

  useEffect(() => {
    EventsApi.listMapEvents().then(function (res) {
      setList(res.data);
  }).catch(function (error) {
      return error
  });
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      if (location?.coords) {
        // Pre-cached location are stringified which should be a STRING
        // value and cause app to crash. Parse them to Number(float) value
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;

        // Gradually animate map to user position
        const region = {
          latitudeDelta: 0.0092,
          longitudeDelta: 0.0092,
          latitude,
          longitude,
        };
        setRegion(region);
        mapRef.current?.animateToRegion(region, 1000);
      }
    })();
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: themes[themeContext].primary}]}>
      <ExpoStatusBar translucent={true} backgroundColor={themes[themeContext].primary} style='auto' />
            <View style={{ padding: 5, backgroundColor: '#789', flexDirection: 'row', direction: langContext.isRTL ? 'rtl' : 'ltr', alignSelf: langContext.isRTL ? 'flex-start' : 'flex-end' }}>
                <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => navigation.goBack()}><Ionicons size={30} color={themes[themeContext].orange} name={langContext.isRTL ? "chevron-back" : "chevron-forward"}></Ionicons></TouchableOpacity>
            </View>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 0,
          longitude: 0,
          longitudeDelta: 0,
          latitudeDelta: 0,
        }}
        region={region}>
        {list.length > 0 ? list.map(i => (
          <Marker
          key={i._id}
          icon={require('../../assets/icon.png')}
          coordinate={{ latitude: Number(i.latitude), longitude: Number(i.longitude) }}
          title={i.title}
          description={i.description}
          image={{ height: 10, width: 10, uri: 'https://mybayutcdn.bayut.com/mybayut/wp-content/uploads/Al-Mamzar-Beach-Park-Cover-26-04.jpg' }}
        />
        )) : ''}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    marginTop: StatusBar.currentHeight,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  icon: {
    color: '#ac3aac',
    alignSelf: 'center',
  },
});
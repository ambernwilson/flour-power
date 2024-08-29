import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Header from '../components/Header';
import MapView, { Marker, Callout } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet/';
import { COLORS } from '../theme/theme';
import * as Location from 'expo-location';
import LocationCard from '../components/LocationCard';


const Locations = () => {
    const [starbucksLocations, setStarbucksLocations] = useState([]); 
    const [location, setLocation] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [region, setRegion] = useState({
        latitude: 37.78825,
		longitude: -122.4324,
    })


    useEffect(() => {
        (async () => {
            // request location permission
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
            }
      
            // get current location
            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation.coords);
            setRegion({
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
        })();
    }, []);

    // fetch location whenever region changes
    useEffect(() => {
        if (region) {
            fetchStarbucksLocations();
        }
    }, [region])


    // use google places apo to fetch locations
    const fetchStarbucksLocations = async () => {
        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${region.latitude},${region.longitude}&radius=5000&type=coffee_shop&keyword=starbucks&key=AIzaSyApSguSfrQvC5_oXV1HypkFGJbSTNW4FeQ`);
            const data = await response.json();
            const locations = data.results;

            // get detailed info for each place
            const detailedLocations = await Promise.all(
                locations.map(async (place) => {
                    const detailsResponse = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&key=AIzaSyApSguSfrQvC5_oXV1HypkFGJbSTNW4FeQ`);
                    const detailsData = await detailsResponse.json();
                    const placeDetails = detailsData.result;

                    return {
                        latitude: place.geometry.location.lat,
                        longitude: place.geometry.location.lng,
                        name: placeDetails.name,
                        address: placeDetails.formatted_address,
                        hours: placeDetails.current_opening_hours.weekday_text,
                        number: placeDetails.formatted_phone_number
                    };
                })
            );
                
            setStarbucksLocations(detailedLocations);
        } catch (error) {
            console.error("Error fetching Starbucks locations", error);
        }
    };

    // modal slide from bottom
    const snapPoints = useMemo(() => ['25%', '50%', '75%'], [])

    // handle marker press
    const bottomSheetRef = useRef(null);
    const handleOpen = (location) => {
        setSelectedLocation(location); // set selected location
        bottomSheetRef.current.expand() // open modal
    };

    // render modal backdrop
    const renderBackdrop = useCallback(
        (props) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />,
        []
    );

    return (
        <SafeAreaView style={styles.screenContainer}>
            <View style={styles.header}>
                <Header title='Find your Flour Power'/>
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    fetchDetails={true}
                    GooglePlacesSearchQuery={{
                        rankby: 'distance',
                    }}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(data, details);
                    }}
                    query={{
                        key: 'AIzaSyApSguSfrQvC5_oXV1HypkFGJbSTNW4FeQ',
                        language: 'en',
                        components: 'country:us',
                        types: 'establishment',
                        radius: 30000,
                        location: `${region.latitude}, ${region.longitude}`
                    }}
                    styles={{
                        container: styles.search,
                        textInput: styles.searchBar,
                        listView: {backgroundColor: 'white'}
                    }}
                />
            </View>
            
            <View style={styles.content}>
                <View style={styles.mapContainer}>
                    <MapView 
                        style={styles.map}
                        showsUserLocation
                        showsMyLocationButton
                        region={region}
                    >
                        {starbucksLocations.map((location, index) => (
                            <Marker 
                                key={index}
                                coordinate={{
                                    latitude: location.latitude,
                                    longitude: location.longitude
                                }}
                                pinColor={COLORS.primary}
                            >
                                <Callout>
                                    <TouchableOpacity onPress={() => handleOpen(location)}>
                                        <Text>{location.address}</Text>
                                    </TouchableOpacity>
                                </Callout>
                            </Marker>
                        ))}  
                    </MapView>
                </View>
                <View>

                </View>
            </View>
            <BottomSheet 
                ref={bottomSheetRef} 
                snapPoints={snapPoints} 
                enablePanDownToClose={true}
                handleIndicatorStyle={{ backgroundColor: COLORS.black }}
                backdropComponent={renderBackdrop}
                index={-1}
            >
                <LocationCard location={selectedLocation}/>
            </BottomSheet>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
    },
    header: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        position: 'absolute',
        width: '100%',
        top: 56,
        zIndex: 2,
        backgroundColor: COLORS.lightGrey,
        paddingTop: 8
    },
    map: {
        height: '100%',
        width: '100%',
    },
    searchBar: {
        borderRadius: 12,
    },
    search: {
        padding: 12,
        marginHorizontal: 14,
        alignContent: 'center',
    },
});

export default Locations;

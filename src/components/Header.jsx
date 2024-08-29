import { StyleSheet, TouchableOpacity, View, Text, Animated } from 'react-native';
import React, { useRef } from 'react';
import {LinearGradient} from "expo-linear-gradient"
import store from '../store/store';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/theme';
import { useNavigation } from '@react-navigation/native';

const Header = ({ dessert, title, backBtn }) => {
    const addFav = store((state) => state.addToFavs);
    const removeFav = store((state) => state.removeFromFavs);
    const isFavorite = dessert ? store((state) => state.isFav(dessert.idMeal)) : false;

    const toggleFavs = () => {
        if (isFavorite) {
            removeFav(dessert.idMeal);
        } else {
            addFav(dessert);
        }
    };

    const navigation = useNavigation();
    const backHandler = () => {
        navigation.goBack();
    };

    return (
        <View>
            { backBtn ? (
                <View>
                    <LinearGradient 
                        colors={['rgba(0,0,0,0.8)', 'transparent']} 
                        style={styles.gradient}
                    >
                        <View style={styles.noTitle}>
                            <TouchableOpacity
                                style={styles.backBtn}
                                onPress={() => {backHandler()}}
                            >
                                <Ionicons
                                    name='arrow-back'
                                    size={32}
                                    color={COLORS.white}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={toggleFavs}
                            >
                                <Ionicons
                                    name={isFavorite ? 'heart' : 'heart-outline'}
                                    size={32}
                                    color={COLORS.white}
                                />
                            </TouchableOpacity>
                        </View>
                    </LinearGradient> 
                </View>
            ) : (
                <View style={styles.container}>
                    <Text style={styles.withTitle}>{title}</Text> 
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    gradient: {
        height: '90%',
        width: '100%',
    },
    container: {
        paddingBottom: 12,
        backgroundColor: COLORS.lightGrey
    },
    noTitle:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 56,
    },
    withTitle: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.black
    },
});

export default Header;
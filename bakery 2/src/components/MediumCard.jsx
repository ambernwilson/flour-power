import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import React from 'react';
import store from '../store/store';
import { Feather, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/theme';
 
const MediumCard = ({ dessert }) => {
    const removeFav = store((state) => state.removeFromFavs);
    const addFav = store((state) => state.addToFavs);
    const isFavorite = dessert ? store((state) => state.isFav(dessert.idMeal)) : false;

    const toggleFavs = () => {
        if (isFavorite) {
            removeFav(dessert.idMeal);
        } else {
            addFav(dessert);
        }
    };
 
    return (
        <View style={styles.container}>
            <ImageBackground 
                source={{ uri: dessert.strMealThumb}} 
                style={styles.img}
                imageStyle={{ borderRadius: 12 }}
            >
                <TouchableOpacity 
                    style={styles.heartBtn}
                    onPress={toggleFavs}
                >    
                    <Ionicons
                        name={isFavorite ? 'heart' : 'heart-outline'}
                        size={32}
                        color={COLORS.black}
                    />
                </TouchableOpacity>
            </ImageBackground>
            <View style={styles.info}>
                <View>
                    <Text style={styles.name} numberOfLines={2}>{dessert.strMeal}</Text>
                </View>
                <TouchableOpacity style={styles.addBtn}>
                    <Feather
                        name='plus'
                        size={24}
                        color={COLORS.white}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginVertical: 12
    },
    img: {
        height: 160,
        width: 160,
        resizeMode: 'cover',
        borderRadius: 12,
        alignItems: 'flex-end'
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12,
        height: 56
    },
    heartBtn: {
        paddingLeft: 8,
        paddingBottom: 8,
        backgroundColor: COLORS.lightGrey,
        borderBottomLeftRadius: 300
    },
    name: {
        maxWidth: 100,
        fontSize: 18,
        fontWeight: '500' // semi-bold
    },
    addBtn: {
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        paddingHorizontal: 12,
        borderRadius: 12
    }
});

export default MediumCard;


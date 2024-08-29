import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import store from '../store/store';
import { COLORS } from '../theme/theme';
import Feather from '@expo/vector-icons/Feather'

const LargeCard = ({ dessert }) => {  
    const add = store((state) => state.addToCart);
    
    return (
        <View style={styles.container}>
            <Image source={{ uri: dessert.strMealThumb}} style={styles.img}/>
            <View style={styles.info}>
                <View>
                    <Text style={styles.name} numberOfLines={1}>{dessert.strMeal}</Text>
                    <Text style={styles.price}>$6.50</Text>
                </View>
                <TouchableOpacity 
                    style={styles.addBtn}
                    onPress={() => add(dessert)}
                >
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
    container: {
        maxWidth: 240,
        paddingTop: 12,
    },
    img: {
        width: 240,
        height: 240,
        resizeMode: 'cover',
        borderRadius: 10
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 8
    },
    addBtn: {
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        paddingHorizontal: 12,
        borderRadius: 12
    },
    name: {
        maxWidth: 164,
        fontSize: 18,
        fontWeight: '500' // semi-bold
    },
    price: {
        fontSize: 18
    }
});

export default LargeCard;
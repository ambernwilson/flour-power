import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { COLORS } from '../theme/theme';

const Promo = () => {
  return (
    <View style={styles.imgContainer}>
      <Image source={require('../assets/promo1.png')} style={styles.img}/>
    </View>
  )
}

const styles = StyleSheet.create({
    imgContainer: {
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: .1,
        shadowRadius: 5,
    },
    img: {
        width: 345,
        height: 288,
        resizeMode: 'cover',
        alignSelf: 'center',
        borderRadius: 15
    }
})

export default Promo;
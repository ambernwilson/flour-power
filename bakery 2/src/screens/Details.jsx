import { StatusBar, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import React, { useState, useMemo, useRef } from 'react';
import BottomSheet from '@gorhom/bottom-sheet/';
import ItemDetails from '../components/ItemDetails';
import Header from '../components/Header';
import { COLORS } from '../theme/theme';
import store from '../store/store';

const Details = ({ route }) => {
    const {dessert} = route.params;

    const [quantity, setQuantity] = useState(1);

    const add = store((state) => state.addToCart)

    // modal slide from bottom
    const snapPoints = useMemo(() => ['45%', '75%'], [])
    const bottomSheetRef = useRef(null);
    const handleOpen = () => {
        bottomSheetRef.current.expand() // open modal
    };

    return (
        <View style={styles.screenContainer}>
            <StatusBar/>
            <ImageBackground 
                source={{ uri: dessert.strMealThumb}} 
                style={styles.img}
            >
                <Header backBtn={true} dessert={dessert} style={{ position: 'absolute', zIndex: 3 }}/>
            </ImageBackground>
            <BottomSheet 
                ref={bottomSheetRef} 
                snapPoints={snapPoints} 
                enablePanDownToClose={false}
                handleIndicatorStyle={{ backgroundColor: COLORS.black }}
                index={0}
            >
                <ItemDetails
                    dessert={dessert}
                />
            </BottomSheet>
            <View style={styles.ctaContainer}>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => setQuantity(quantity != 1 ? quantity - 1 : quantity)}>
                        <Text style={styles.quantityChange}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantity}</Text>
                    <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                        <Text style={styles.quantityChange}>+</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                    style={styles.ctaBtn}
                    onPress={() => {
                        for (let i = 0; i < quantity; i++) {
                            add(dessert);
                        }
                    }}
                >
                    <Text style={styles.ctaText}>Add to cart</Text>
                </TouchableOpacity>
            </View>
        </View>
  )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    img: {
        flex: 1,
        width: '100%',
        height: 500,
        position: 'relative',
        zIndex: -1
    },
    overlay: {
        position: 'relative',
        justifyContent: 'flex-end',
        top: 0,
        left: 0,
        right: 0,
        bottom: 76,
        zIndex: 2
    },
    ctaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingBottom: 40,
        paddingTop: 12,
        backgroundColor: COLORS.white,
        borderTopColor: COLORS.mediumGrey,
        borderTopWidth: 1,
    },
    quantityContainer: {
        width: 120,
        flexDirection: 'row',
        gap: 24,
        padding: 12,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.mediumGrey,
    },
    quantityChange: {
        fontSize: 24
    },
    quantityText: {
        fontSize: 24
    },
    ctaBtn: {
        width: 204,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    ctaText: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.white
    }
});

export default Details;
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import Confirm from './Confirm';
import store from '../store/store';
import { COLORS } from '../theme/theme';

const SmallCard = () => {
    const cart = store((state) => state.cart);
    const remove = store((state) => state.removeFromCart);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleRemoveItem = (item) => {
        setSelectedItem(item);
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleConfirm = () => {
        remove(selectedItem.idMeal);
        setIsModalVisible(false);
    };

    return (
            <FlatList
                data={cart}
                keyExtractor={item => item.idMeal}
                contentContainerStyle={styles.listContainer}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <View style={styles.leftSection}>
                            <Image source={{ uri: item.strMealThumb}} style={styles.img}/>
                            <View style={styles.leftText}>
                                <Text style={styles.name} numberOfLines={2}>{item.strMeal}</Text>
                                <Text style={styles.quantity}>$12.50 
                                    <Text style={styles.otherText}> X </Text>{item.quantity}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.rightSection}>
                            <View style={styles.iconRow}>
                                <TouchableOpacity>
                                    <FontAwesome5
                                        name='edit'
                                        size={24}
                                        color={COLORS.black}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleRemoveItem(item)}>
                                    <Ionicons
                                        name='trash-bin'
                                        size={24}
                                        color={COLORS.black}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Confirm
                                isVisible={isModalVisible}
                                onCancel={handleCancel}
                                onConfirm={handleConfirm}
                                dessert={item}
                            />
                            <Text style={styles.totalPrice}>${(12.50 * item.quantity).toFixed(2)}</Text>
                        </View>
                    </View>
                )}
            />
            
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 24
    },
    listContainer: {
        paddingBottom: 24
    },  
    leftSection: {
        flexDirection: 'row',
        gap: 12
    },
    img: {
        height: 80,
        width: 80,
        borderRadius: 10
    },
    leftText: {
        justifyContent: 'space-between'
    },
    name: {
        maxWidth: 164,
        fontSize: 18,
        fontWeight: '600' // semi-bold
    },
    quantity: {
        fontSize: 18,
        fontWeight: '400',

    },
    otherText: {
        fontWeight: '600',
        color: COLORS.primary

    },
    rightSection: {
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    iconRow: {
        flexDirection: 'row',
        gap: 24,
        alignItems: 'center'
    },
    totalPrice: {
        fontWeight: '700',
        fontSize: 18,
        color: COLORS.primary
    },
    addBtn: {
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        padding: 8,
        borderRadius: 10
    }
});

export default SmallCard;
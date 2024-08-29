import {  ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLORS } from '../theme/theme'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import Ingredients from './Ingredients'

const ItemDetails = ({ dessert }) => {
    const [details, setDetails] = useState([]);

    // use id that was passed in to retrieve full info
    const API = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const id = dessert.idMeal;
                const response = await fetch(API + id);
                if (!response.ok) {
                    throw new Error('Failed to fetch dessert details');
                }
                const data = await response.json();
                    setDetails(data.meals[0]);
            } catch (error) {
                console.error('Error fetching details:', error.message)
            }
        }
        fetchDetails();
    }, [dessert]);
    
    return (
        <View style={styles.infoContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <Text style={styles.name}>{dessert.strMeal}</Text>
                    <Text style={styles.price}>$12.50</Text>
                </View> 
                <Text style={styles.area}>{dessert.strArea ? `A ${dessert.strArea} delight!` : 'Straight from the chef\'s vault!'}</Text>
                <View style={styles.uspContainer}>
                    <View style={styles.uspContent}>
                        <FontAwesome5
                            name='shipping-fast'
                            size={24}
                            color={COLORS.primary}
                        />
                        <Text style={styles.uspText}>15 min{`\n`}delivery</Text>
                    </View>
                    <View style={styles.uspContent}>
                        <Ionicons
                            name='star'
                            size={24}
                            color={COLORS.primary}
                        />
                        <View>
                            <Text style={styles.uspText}>4.6 rating</Text>
                            <Text style={styles.ratingSecondary}>{`(2.7k ratings)`}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.subTitle}>The recipe rundown:</Text>
                    <Ingredients
                        dessert={details}
                    />
                </View>
            </ScrollView>
        </View>   
    )
}

const styles = StyleSheet.create({
    infoContainer: {
        padding: 24,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    name: {
        fontSize: 24,
        fontWeight: '600',
        maxWidth: 272,
        color: COLORS.black
    },
    price: {
        fontSize: 24,
        color: COLORS.black
    },
    area: {
        fontSize: 16,
        paddingTop: 4
    },
    uspContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        gap: 24,
        borderColor: COLORS.black,
        padding: 24,
        borderRadius: 10,
        backgroundColor: COLORS.lightGrey,
        marginVertical: 36
    },
    uspContent: {
        flexDirection: 'row',
        gap: 12,
        alignItems:'center'
    },
    uspText: {
        fontSize: 16,
        color: COLORS.black
    },
    ratingSecondary: {
        fontSize: 12
    },
    subTitle: {
        fontSize: 18,
        fontWeight: '500',
        color: COLORS.black
    }
});

export default ItemDetails;
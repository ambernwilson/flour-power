import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Ingredients = ({ dessert }) => {
    // extract ingredients
    const getIngredients = (dessert) => {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = dessert[`strIngredient${i}`];
            if (ingredient && ingredient.trim()) {
                ingredients.push(`${ingredient}`.trim());
            }
        }
        return ingredients;
    }
    const ingredients = getIngredients(dessert);

    return (
        <View style={styles.listContainer}>
            {ingredients.map((item, index) => (
                <View key={index} style={styles.listItem}>
                    <Image 
                        source={require('../assets/bullet.png')}
                        style={styles.bullet}/>
                    <Text style={styles.itemText}>{item}</Text>
                </View>    
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    listContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingTop: 12,
        paddingBottom: 100
    },
    listItem: {
        flexDirection: 'row',
        width: 148,
        height: 44,
        gap: 12,
        marginVertical: 8,
        marginHorizontal: 12,
        alignItems: 'flex-start'
    },
    bullet: {
        height: 24,
        width: 24
    },
    itemText: {
        fontSize: 16,
        maxWidth: 124
    }
});

export default Ingredients;
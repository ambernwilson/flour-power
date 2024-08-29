import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS } from '../theme/theme'
import Promo from '../components/Promo'
import LargeCard from '../components/LargeCard'

const Home = ({ navigation }) => {
    const tabBarHeight = useBottomTabBarHeight();
    
    // declare variables
    const [weeklyDesserts, setWeeklyDesserts] = useState([]);
    const [popularDesserts, setPopularDesserts] = useState([]);

    // declare api --> retrieve items in dessert category
    const API = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert';

    // fetch api
    useEffect(() => {
        // define async function
        const fetchDesserts = async () => {
            try {
                const response = await fetch(API);
                if (!response.ok) {
                    throw new Error('Failed to fetch dessert data');
                }
                const data = await response.json();

                // helper function to get random items
                const randomDesserts = (items, count, exclude =[]) => {
                    const result = [];
                    const usedIndices = new Set(exclude);
                    while (result.length < count && usedIndices.size < items.length) {
                        const randomIndex = Math.floor(Math.random() * items.length);
                        if (!usedIndices.has(randomIndex)) {
                            usedIndices.add(randomIndex);
                            result.push(items[randomIndex]);
                        }
                    }
                    return result;
                };

                // get random for weekly section
                const randomWeekly = randomDesserts(data.meals, 5);

                // get random for popular sections
                const randomPopular = randomDesserts(data.meals, 5, randomWeekly.map(dessert => data.meals.indexOf(dessert)));

                setWeeklyDesserts(randomWeekly);
                setPopularDesserts(randomPopular);
                
            } catch (error) {
                console.error('Error fetching desserts:', error.message)
            }
        }
        fetchDesserts();
    }, []);

    return (
        <View style={styles.container}>
            {/* HEADER SECTION */}
            <View style={styles.headerContainer}>
                    <View style={styles.menuBtn}>
                        <Image source={require('../assets/Flower.png')} style={styles.logo}/>                            
                        <Ionicons
                            name='menu'
                            size={36}
                            color={COLORS.black}
                        />
                    </View>
                </View>
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollView}
            >
                <View style={styles.textContainer}>
                    <Text style={styles.headerSubtitle}>Hi Amber,</Text>
                    <Text style={styles.headerTitle}>Ready to order?</Text>
                </View>
                
                {/* HERO / PROMO */}
                <Promo/>

                {/* TASTES OF THE WEEK */}
                <Text style={styles.sectionHeader}>Tastes of the week</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={weeklyDesserts}
                    keyExtractor={(item) => item.idMeal}
                    contentContainerStyle={styles.list}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.push('Details', { dessert: item })
                                }}
                            >
                                <LargeCard 
                                    dessert={item}
                                />
                            </TouchableOpacity>
                        )
                    }}
                />
                    
                

                {/* POPULAR ITEMS SECTION */}
                <Text style={styles.sectionHeader}>Popular Menu Items</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={popularDesserts}
                    keyExtractor={(item) => item.idMeal}
                    contentContainerStyle={[styles.list, {paddingBottom: tabBarHeight + 24}]}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity
                            onPress={() => {
                                navigation.push('Details', { dessert: item })
                            }}
                            >
                                <LargeCard 
                                    dessert={item}
                                />
                            </TouchableOpacity>
                        )
                    }}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        opacity: 1,
    },
    scrollView: {
        flexGrow: 1,
        paddingBottom: 40
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingTop: 56
    },
    logo: {
        height: 100,
        width: 100
    },
    menuBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textContainer: {
        paddingHorizontal: 25,
        paddingBottom: 24
    },
    img: {
        height: 48,
        width: 48,
        borderRadius: 100
    },
    headerSubtitle: {
        fontSize: 18,
        color: COLORS.black
    },
    headerTitle: {
        fontSize: 24,
        color: COLORS.black

    },
    sectionHeader: {
        fontSize: 24,
        fontWeight: '600',
        paddingLeft: 24,
        paddingTop: 24,
        color: COLORS.primary
    },
    list: {
        gap: 24,
        paddingHorizontal: 24
    },
})

export default Home;
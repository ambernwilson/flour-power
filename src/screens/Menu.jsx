import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import MediumCard from '../components/MediumCard';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme/theme';

const categories = ['All', 'Cakes', 'Cookies', 'Mousse', 'Pies', 'Souffle', 'Tarts'];

const Menu = ({ navigation }) => {
    const [search, setSearch] = useState('');
    const [desserts, setDesserts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const tabBarHeight = useBottomTabBarHeight();

    // to hide on scroll
    const [visible, setVisible] = useState(true);
    const scrollY = useRef(new Animated.Value(0)).current;
    const prevScrollY = useRef(0);

    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: false,
            listener: (event) => {
                const currentScrollY = event.nativeEvent.contentOffset.y;
                setVisible(prevScrollY.current > currentScrollY);
                if (currentScrollY === 0) {
                    setVisible(true);
                }
                prevScrollY.current = currentScrollY;
                
            }
        }
    );

    const headerTranslateY = scrollY.interpolate({
        inputRange: [0, 10],
        outputRange: [0, -200],
        extrapolate: 'clamp'
    });


    // fetch data from api
    const API = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=dessert';
    useEffect(() => {
        const fetchDesserts = async () => {
            try {
                const response = await fetch(API);
                if (!response.ok) {
                    throw new Error('Failed to fetch desserts');
                }
                const data = await response.json();
                setDesserts(data.meals || []);
                setFilteredProducts(data.meals || []);
            } catch (error) {
                console.error('Error fetching details:', error.message)
            }
        }
        fetchDesserts();
    }, []);

    //
    useEffect(() => {
        filterProducts();
    }, [search, selectedCategory]);

    const filterProducts = () => {
        let filtered = desserts;

        if (search) {
            filtered = filtered.filter(product =>
                product.strMeal.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (selectedCategory !== 'All') {
            filtered = filtered.filter(product => {
                if (selectedCategory === 'Cakes') {
                    const keywords = ['cake'];
                    return keywords.some(keyword =>
                        product.strMeal.toLowerCase().includes(keyword)
                    );
                }
                if (selectedCategory === 'Pies') {
                    const keywords = ['pie', 'pies', 'cheesecake'];
                    return keywords.some(keyword =>
                        product.strMeal.toLowerCase().includes(keyword)
                    );
                }
                return product.strMeal.toLowerCase().includes(selectedCategory.toLowerCase())
            });
        }

        setFilteredProducts(filtered);
    };
    
    // search function
    const handleSearch = (query) => {
        setSearch(query);
    };

    // reset search
    const resetSearch = () => {
        setSearch('');
    };

    // filter by category
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    }

    return (
        <SafeAreaView style={styles.screenContainer}>
            <View style={styles.headerContainer}>
                <Header title='Menu' backBtn={false}/>

                {/* HIDE ON SCROLL */}
                <Animated.View style={[styles.animationContainer, {
                    transform: [{ translateY: visible ? 0 : headerTranslateY }],
                }]}>
                    {/* SEARCH BAR */}
                    <View style={styles.searchContainer}>
                        <View style={styles.mainSearch}>
                            <TouchableOpacity onPress={() => {
                                searchDessert(search);
                            }}>
                                <Ionicons
                                    name='search'
                                    size={24}
                                    color={search.length > 0 ? COLORS.primary : COLORS.grey}
                                    style={styles.searchIcon}
                                />
                            </TouchableOpacity>
                            <TextInput
                                placeholder='Find your dessert...'
                                value={search}
                                onChangeText={handleSearch}
                                placeholderTextColor={COLORS.grey}
                            />
                        </View>
                        {search.length > 0 ? (
                            <TouchableOpacity onPress={resetSearch}>
                                <Ionicons
                                    name='close'
                                    size={24}
                                    color={COLORS.grey}
                                    style={styles.searchIcon}
                                />
                            </TouchableOpacity>
                        ) : (
                            <></>
                        )}
                    </View>

                    {/* CATEGORY SLIDER */}
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={styles.categoryContainer}>
                            {categories.map((category) => (
                                <TouchableOpacity
                                    key={category}
                                    onPress={() => {handleCategorySelect(category)}}
                                >
                                    <View style={styles.categoryItem}>
                                        <Text style={
                                            selectedCategory === category ? styles.selectedCategoryBtn : styles.categoryText
                                        }>{category}</Text>
                                        {selectedCategory === category ? (
                                            <View style={styles.activeIndicator}></View>
                                        ) : (
                                            <></>
                                        )}
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </Animated.View> 
            </View>
            
            {/* LIST OF DESSERTS */}
            <View style={styles.productContainer}>
                <Animated.FlatList
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No results.</Text>
                        </View>
                    }
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    data={filteredProducts}
                    contentContainerStyle={[styles.productSection, {marginBottom: tabBarHeight, }]}
                    columnWrapperStyle={styles.listContainer}
                    keyExtractor={(item) => item.idMeal.toString()}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                navigation.push('Details', { dessert: item })
                            }}>
                                <MediumCard dessert={item}/>
                            </TouchableOpacity>
                        )
                    }}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
    },
    headerContainer: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 3.5,
        zindex: 2,
        width: '100%',
    },
    animationContainer: {
        position: 'absolute',
        top: 32,
        left: 0,
        right: 0,
        zIndex: 2,
        backgroundColor: COLORS.lightGrey,
        paddingTop: 0
    },
    searchContainer: {
        flexDirection: 'row',
        padding: 12,
        backgroundColor: COLORS.white,
        borderRadius: 12,
        justifyContent: 'space-between',
        marginHorizontal: 24
    },
    mainSearch: {
        flexDirection: 'row',
        gap: 12,
    },
    categoryContainer: {
        flexDirection: 'row',
        marginVertical: 12,
        gap: 24,
        marginHorizontal:24
    },
    categoryItem: {
        alignItems: 'center',
        gap: 4
    },
    categoryText: {
        fontSize: 16,
        fontWeight: '600'
    },
    selectedCategoryBtn: {
        color: COLORS.primary,
        fontSize: 16,
        fontWeight: '600'
    },
    activeIndicator: {
        height: 8,
        width: 24,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        position: 'absolute',
        marginTop: 28
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 80
    },
    productContainer: {
        zIndex: -1,
    },
    productSection: {
        marginHorizontal: 24,
        marginTop: 88
    },
    listContainer: {
        justifyContent: 'space-between',
    }
})

export default Menu;
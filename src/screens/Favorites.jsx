import { FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import store from '../store/store';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import MediumCard from '../components/MediumCard';
import { COLORS } from '../theme/theme';

const Favorites = () => {
    const navigation = useNavigation(); 
    const favList = store((state) => state.favorites)

    const tabBarHeight = useBottomTabBarHeight();


    return (
        <SafeAreaView style={styles.screenContainer}>
            <View style={styles.header}>
                <Header title='Favorites' backBtn={false} style={styles.header}/>
            </View>
            {favList.length !== 0 ? (
                <FlatList
                    data={favList}
                    numColumns={2}
                    keyExtractor={item => item.idMeal}
                    columnWrapperStyle={styles.gridColumn}
                    contentContainerStyle={[styles.gridContainer, {paddingBottom: tabBarHeight} ]}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                navigation.push('Details', { dessert: item })
                            }}
                        >
                            <MediumCard 
                                dessert={item}
                            />
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text>No favorites.</Text>
                </View>
            )}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        padding: 24,
        opacity: 1
    },
    header: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    gridColumn: {
        justifyContent: 'space-between'
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    gridContainer: {
        paddingHorizontal: 24
    },
})

export default Favorites;
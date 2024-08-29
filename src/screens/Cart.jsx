import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Button, TextInput, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import Header from '../components/Header';
import SmallCard from '../components/SmallCard';
import store from '../store/store';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../theme/theme';

const Cart = () => {
    const cart = store((state) => state.cart);
    const navigation = useNavigation();

    // functional promo codes -- only use 1 time
    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [isValid, setIsValid] = useState(false);
    const [promoAlert, setPromoAlert] = useState('');
    const [isApplied, setIsApplied] = useState(false);

    const validCodes = {
        'SAVE15': 15,
        'FREEDELIVERY': 5,
        'SURPRISE': 'random' // will generate random discount
    };

    const applyCode = () => {
        const code = promoCode.toUpperCase();
        if (validCodes.hasOwnProperty(code)) {
            if(validCodes[code] === 'random') {
                // to return 10, 20, or 30
                const randomDiscount = Math.floor(Math.random() * 3) * 10 + 10;
                setDiscount(randomDiscount);
                setIsValid(true);
                //setIsNotValid(false);
                setPromoAlert(`Congratulations! You get ${randomDiscount}% off.`)
                setIsApplied(true);
            } else {
                setDiscount(validCodes[code]);
                setIsValid(true);
                //setIsNotValid(false);
                setPromoAlert(`${validCodes[code]}% discount has been applied.`)
                setIsApplied(true);
            }
        } else {
            setIsValid(false);
            //setIsNotValid(true);
            setPromoAlert('Invalid promo code.');        
        }
    }
   
    // calculate subtotal
    const calcSubtotal = () => {
        return cart.reduce((total, item) => total + (item.quantity * 12.50), 0);
    }
    const subtotal = calcSubtotal();

    // calculate tax, discount, & total
    const promoDiscount = isValid 
        ? (discount > 0 && discount <= 100 
            ? (subtotal * (discount / 100)) 
            : discount) 
        : 0;
    const tax = (subtotal - promoDiscount) * 0.0825;
    const delivery = 5;
    const total = (subtotal - promoDiscount) + tax + delivery;

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.header}>
                <Header title='Cart' backBtn={false}/>
            </View>
            
            {cart.length !== 0 ? (
                <KeyboardAvoidingView 
                    behavior='padding'
                    style={styles.screenContainer}
                    keyboardVerticalOffset={-224}
                >
                    <View style={styles.topContainer}>
                        <SmallCard/>
                    </View>
                    <View style={styles.details}>
                        <View>
                            <View style={styles.promoCode}>
                                <TextInput
                                    placeholder='Promo code'
                                    placeholderTextColor={COLORS.grey}
                                    style={styles.input}
                                    value={promoCode}
                                    onChangeText={setPromoCode}
                                />
                                <TouchableOpacity
                                    style={[styles.applyContainer, isApplied && styles.disabledContainer]}
                                    onPress={applyCode}
                                    disabled={isApplied}
                                >
                                    <Text style={[styles.applyBtn, isApplied && styles.disabledBtn]}>Apply</Text>
                                </TouchableOpacity>
                            </View>
                            {/* CONDITIONAL ALERT MESSAGE */}
                            {promoAlert && (
                                <View style={styles.msgText}>
                                    <Text style={isValid ? styles.successMssg : styles.errorMssg}>
                                        {promoAlert}
                                    </Text>
                                </View>
                            )}
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoText}>Subtotal</Text>
                                <Text style={styles.infoNumber}>${subtotal.toFixed(2)}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoText}>Delivery fee</Text>
                                <Text style={styles.infoNumber}>${delivery.toFixed(2)}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoText}>Tax</Text>
                                <Text style={styles.infoNumber}>${tax.toFixed(2)}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.infoText}>Discount</Text>
                                <Text style={styles.infoNumber}>${promoDiscount.toFixed(2)}</Text>
                            </View>
                            <View style={styles.horizontalLine}></View>
                            <View style={styles.infoRow}>
                                <Text style={styles.totalText}>Total</Text>
                                <Text style={styles.totalText}>${total.toFixed(2)}</Text>
                            </View>
                        </View>
                        <TouchableOpacity 
                            style={styles.checkoutBtn}
                        >
                            <Text style={styles.checkoutText}>Proceed to checkout</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            ) : (
                <View style={styles.emptyContainer}>
                    <Text>Cart is empty.</Text>
                    <TouchableOpacity>
                        <Button
                            onPress={() => {
                                
                            }}
                            title='Start shopping'
                            color={COLORS.primary}
                        />
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    screenContainer: {
        flex: 1,
        justifyContent: 'space-between',
        marginBottom: 64
    },
    header: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    topContainer: {
        flex: 0,
        height: 356,
    },
    details: {
        flex: 1,
        justifyContent: 'flex-end',
        gap: 28,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    promoCode: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 12,
        backgroundColor: COLORS.lightGrey,
    },
    input: {
        height: 40,
        width: 272,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: COLORS.mediumGrey,
        padding: 12
    },
    applyContainer: {
        backgroundColor: COLORS.lightGrey,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.black,
        height: 40,
    },
    disabledContainer: {
        backgroundColor: COLORS.mediumGrey,
        borderWidth: 0
    },
    applyBtn: {
        fontWeight: 'bold',
        padding: 12,
        color: COLORS.black
    },
    disabledBtn: {
        color: COLORS.black
    },
    infoContainer: {
        marginHorizontal: 24,
        gap: 12,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    infoText: {

    },
    infoNumber: {

    },
    totalText: {
        fontWeight: '600'
    },
    msgText: {
        paddingHorizontal: 24,
        paddingTop: 4,
        position: 'absolute',
        top: 52,
        backgroundColor: COLORS.lightGrey,
        width: '100%'
    },
    successMssg: {
        color: COLORS.success
    },
    errorMssg: {
        color: COLORS.danger
    },
    horizontalLine: {
        borderBottomColor: COLORS.mediumGrey,
        borderBottomWidth: 1,
    },
    checkoutBtn: {
        borderRadius: 10,
        backgroundColor: COLORS.primary,
        width: 270,
        alignSelf: 'center',
    },
    checkoutText: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.white,
        padding: 12,
        textAlign: 'center',
    }
});

export default Cart;
import { View, Modal, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react'
import { COLORS } from '../theme/theme';

const Confirm = ({ isVisible, onCancel, onConfirm, dessert }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onCancel}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.text}>Remove {dessert.strMeal} from cart?</Text>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.secondaryBtn} onPress={onCancel}>
                            <Text style={styles.secondaryText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.primaryBtn} onPress={onConfirm}>
                            <Text style={styles.primaryText}>Yes, remove</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.transparentBlack
    },
    content: {
        backgroundColor: COLORS.white,
        padding: 20,
        borderRadius: 20,
        alignItems: 'center'
    },
    text: {
        textAlign: 'center',
        marginBottom: 24,
        fontSize: 18,
        maxWidth: 232
    },
    btnContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    secondaryBtn: {
        padding: 12,
        borderRadius: 10,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.mediumGrey
    },
    primaryBtn: {
        padding: 12,
        borderRadius: 10,
        backgroundColor: COLORS.primary
    },
    primaryText: {
        fontWeight: '700',
        color: COLORS.white
    },
    secondaryText: {
        fontWeight: '700',
        color: COLORS.primary
    },
});

export default Confirm;
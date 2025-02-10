import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PawnCard = ({ pawn, setModalAction, setSelectedPawn, setIsModalOpen }) => {
    const handleHeal = () => {
        setSelectedPawn && setSelectedPawn(pawn);
        setModalAction && setModalAction("heal");
        setIsModalOpen && setIsModalOpen(true);
    };

    const handleAttack = () => {
        setSelectedPawn && setSelectedPawn(pawn);
        setModalAction && setModalAction("attack");
        setIsModalOpen && setIsModalOpen(true);
    };

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle} numberOfLines={1}>{pawn.name}</Text>
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.cardText}>Mana: {pawn.mana?.current ?? "?"} / {pawn.mana?.max ?? "?"}</Text>
                <Text style={styles.cardText}>Physical: {pawn.physical?.current ?? "?"} / {pawn.physical?.max ?? "?"}</Text>
                <Text style={styles.cardText}>Mental: {pawn.mental?.current ?? "?"} / {pawn.mental?.max ?? "?"}</Text>
                <Text style={styles.cardText}>Pathological: {pawn.pathological?.current ?? "?"} / {pawn.pathological?.max ?? "?"}</Text>
                <Text style={styles.cardText}>Endurance: {pawn.endurance?.current ?? "?"} / {pawn.endurance?.max ?? "?"}</Text>
                <Text style={styles.cardTextBold}>Side: {pawn.side}</Text>
                {setModalAction && setSelectedPawn && setIsModalOpen && (
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, styles.healButton]} onPress={handleHeal}>
                            <Text style={styles.buttonText}>Soigner</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.attackButton]} onPress={handleAttack}>
                            <Text style={styles.buttonText}>Attaquer</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '100%',
        maxWidth: 350,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        borderRadius: 10,
        padding: 10,
    },
    cardHeader: {
        marginBottom: 5,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    cardContent: {
        marginVertical: 10,
    },
    cardText: {
        fontSize: 14,
        color: '#4A4A4A',
    },
    cardTextBold: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1A1A1A',
    },
    buttonContainer: {
        flexDirection: 'column',
        gap: 10,
        marginTop: 15,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    healButton: {
        backgroundColor: 'green',
    },
    attackButton: {
        backgroundColor: 'red',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: '600',
    },
});

export default PawnCard;

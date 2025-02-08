import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import CharacterModifiactionUtils from '@/services/CharacterModificationUtils';
import { CharacterBasicInfo } from '@/types/character_types';

const CharactersPage = () => {
    const [characters, setCharacters] = useState<CharacterBasicInfo[]>([]);
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            CharacterModifiactionUtils.getCharacters().then((characters) => {
                setCharacters(characters);
                console.log(characters);
            });
        }, [])
    );

    useEffect(() => {
        CharacterModifiactionUtils.getCharacters().then((characters) => {
            setCharacters(characters);
            console.log(characters);
        });
    }, []);

    const renderCharacter = ({ item }: { item: CharacterBasicInfo }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('character_detail', { id: item.id })}
        >
            {/* <View style={styles.cardImage}>
                <Text style={styles.imageText}>Photo</Text>
            </View> */}
            <Text style={styles.cardTitle}>{item.infos.name}</Text>
            <Text style={styles.cardInfo}>Âge : {item.infos.age}</Text>
            <Text style={styles.cardInfo}>Espèce : {item.infos.race}</Text>
            <Text style={styles.cardInfo}>Genre : {item.infos.gender}</Text>
        </TouchableOpacity>
    );

    return (
        <ImageBackground
            source={require('@/assets/drag.png')}
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.header}>Personnages</Text>

                <TouchableOpacity
                    style={styles.createButton}
                    onPress={() => navigation.navigate('create_character')}
                >
                    <Text style={styles.createButtonText}>+ Créer un personnage</Text>
                </TouchableOpacity>

                <FlatList
                    data={characters}
                    renderItem={renderCharacter}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={1}
                    contentContainerStyle={styles.list}
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    header: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'rgb(0, 0, 0)',
        marginBottom: 20,
        textAlign: 'center',
    },
    createButton: {
        backgroundColor: '#f0a500',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        alignSelf: 'flex-end',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    createButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    list: {
        paddingBottom: 30,
    },
    card: {
        backgroundColor: 'white',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        width: '100%',
    },
    cardImage: {
        width: '100%',
        height: 150,
        backgroundColor: '#d1d1d1',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginBottom: 10,
    },
    imageText: {
        color: '#7f8c8d',
        fontSize: 18,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    cardInfo: {
        fontSize: 16,
        color: '#7f8c8d',
        marginVertical: 3,
    },
});

export default CharactersPage;

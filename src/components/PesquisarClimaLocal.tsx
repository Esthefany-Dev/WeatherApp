import React, {useState} from "react";
import {View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function PesquisarClimaLocal({ onCityChange }) {
    const [city, setCity] = useState('');
    const handleCityChange = () =>  onCityChange(city);

    return (
        <View style={styles.container}>
            <TextInput style={styles.search} placeholder="Pesquisar Cidade" value={city} onChangeText={(text) => setCity(text)} />
            <TouchableOpacity onPress={handleCityChange} style={styles.button}> 
                <Text>Pesquisar</Text> 
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    search: {
        backgroundColor: '#fff',
        marginTop: 15,
        padding: 5,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 25,
        fontSize: 16,
        color: '#333'
    },
    button: {
        backgroundColor: '#e3e8fc',
        marginTop: 15,
        padding: 6,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 25,
        fontSize: 16,
    }
})
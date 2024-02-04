import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

export default function PainelClima({ city }) {
    const [newCity, setNewCity] = useState()
    const [pais, setPais] = useState(null);
    const [temperatura, setTemperatura] = useState(null);

    const apiWeatherKey = 'b0415ca215544690881b2d99ae3c1b88';
    
    const getWeatherData = async () => {
        const apiWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiWeatherKey}&lang=pt`;
        try {
            const res = await fetch(apiWeatherUrl);
            const data = await res.json();

            if(data.message == 'city not found') {
                Alert.alert("Ops, cidade não encontrada !", "Verifique o nome da cidade e tente novamente.");
                return;
            } else {
                if(data.cod == 200 && newCity !== city) setNewCity(city);
    
                const paisAtual = data.sys.country;
                setPais(paisAtual);
    
                const temperaturaAtual = data.main.temp;
                setTemperatura(temperaturaAtual);
            }
        } catch (error) {
            console.error('Erro ao obter dados de clima: ', error);
        }
    };
    useEffect(() => {
        getWeatherData();
    }, [city]);

    // Estilo dinâmico:
    const hours = new Date().getHours();
    let cidadeStyle, paisStyle, temperaturaStyle;
    
    if (hours >= 5 && hours <= 12) {
        // Day
        cidadeStyle = styles.dayCidade;
        paisStyle = styles.dayPais;
        temperaturaStyle = styles.dayTemperatura;
    } else if (hours >= 13 && hours <= 16) {
        // Afternoon
        cidadeStyle = styles.afternoonCidade;
        paisStyle = styles.afternoonPais;
        temperaturaStyle = styles.afternoonTemperatura;
    } else if (hours >= 17 && hours <= 18) {
        // Evening
        cidadeStyle = styles.eveningCidade;
        paisStyle = styles.eveningPais;
        temperaturaStyle = styles.eveningTemperatura;
    } else {
        // Night
        cidadeStyle = styles.nightCidade;
        paisStyle = styles.nightPais;
        temperaturaStyle = styles.nightTemperatura;
    }
    
    return (
        <View style={styles.container}>
            <View>
                {city !== null && <Text style={cidadeStyle}>{newCity}</Text>}
                {pais !== null && <Text style={paisStyle}>{pais}</Text>}
            </View>
            {temperatura !== null && (<Text style={temperaturaStyle}>{Math.round(temperatura)}°c</Text>)}
        </View>
    );
};

const styles = StyleSheet.create({
    // Common styles
    container: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    // Day styles
    dayCidade: {
        fontWeight: '700',
        fontSize: 20,
        color: '#e6f6ff',
    },
    dayPais: {
        fontWeight: '700',
        fontSize: 40,
        color: '#023554',
    },
    dayTemperatura: {
        fontWeight: '700',
        fontSize: 50,
        color: '#023554',
    },
    // Afternoon styles
    afternoonCidade: {
      fontWeight: '700',
      fontSize: 20,
      color: '#000000',
    },
    afternoonPais: {
        fontWeight: '700',
        fontSize: 40,
        color: '#632a01',
    },
    afternoonTemperatura: {
        fontWeight: '700',
        fontSize: 50,
        color: '#632a01',
    },
    // Evening styles
    eveningCidade: {
      fontWeight: '700',
      fontSize: 20,
      color: '#e3e8fc',
    },
    eveningPais: {
        fontWeight: '700',
        fontSize: 40,
        color: '#ffffff',
    },
    eveningTemperatura: {
        fontWeight: '700',
        fontSize: 50,
        color: '#ffffff',
    },
    // Night styles
    nightCidade: {
        fontWeight: '700',
        fontSize: 20,
        color: '#e3e8fc',
    },
    nightPais: {
        fontWeight: '700',
        fontSize: 40,
        color: '#ffffff',
    },
    nightTemperatura: {
        fontWeight: '700',
        fontSize: 50,
        color: '#ffffff',
    }
});
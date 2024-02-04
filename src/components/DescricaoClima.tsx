import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function DescricaoClima({city}){
    const [descricao, setDescricao] = useState(null);

    const apiWeatherKey= 'b0415ca215544690881b2d99ae3c1b88'; 

    const getWeatherData = async () => {
        const apiWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiWeatherKey}&lang=pt`;
        try {
          const res = await fetch(apiWeatherUrl);
          const data = await res.json();

          if (data && data.weather && data.weather[0].description !== undefined)
            setDescricao(data.weather[0].description.toUpperCase());
        
        } catch (error) {
          console.error('Erro ao obter dados de clima: ', error);
        }
    };
    useEffect(() => {
        getWeatherData();
    }, [city]);

    // Estilo dinâmico:
    const hours = new Date().getHours();
    let descricaoStyle;
     
    if (hours >= 5 && hours <= 12) descricaoStyle = styles.dayDescricao; // Day
    else if (hours >= 13 && hours <= 16) descricaoStyle = styles.afternoonDescricao; // Afternoon 
    else if (hours >= 17 && hours <= 18) descricaoStyle = styles.eveningDescricao; // Evening
    else descricaoStyle = styles.nightDescricao; // Night
        
    return(
        <View>
            {descricao !== null && ( <Text style={descricaoStyle}>{descricao}</Text> )}
        </View>
    )
}

const styles = StyleSheet.create({
    // Day Style
    dayDescricao:{
        fontWeight:'700',
        fontSize: 17,
        color:"#e6f6ff"
    },
    // Afternoon Style
    afternoonDescricao:{
        fontWeight:'700',
        fontSize: 17,
        color:"#000000"
    },
    // Evening Style
    eveningDescricao:{
        fontWeight:'700',
        fontSize: 17,
        color:"#e3e8fc"
    },
    // Night Style
    nightDescricao:{
        fontWeight:'700',
        fontSize: 17,
        color:"#e3e8fc"
    }
})
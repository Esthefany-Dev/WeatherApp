import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function DashboardClima({city}){
    const [umidade, setUmidade] = useState(0);
    const [temperaturaMinima, setTemperaturaMinima] = useState(0);
    const [velocidadeVentos, setVelocidadeVentos] = useState(0);
    const [sensacaoTermica, setSensacaoTermica] = useState(0)

    const apiWeatherKey= 'b0415ca215544690881b2d99ae3c1b88'; 

    const getWeatherData = async () => {
      const apiWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiWeatherKey}&lang=pt`;
  
      try {
        const res = await fetch(apiWeatherUrl);
        const data = await res.json();

        if (data && data.main && data.main.humidity !== undefined)
            setUmidade(data.main.humidity);

        if (data && data.main && data.main.temp_min !== undefined) 
            setTemperaturaMinima(data.main.temp_min);
        
        if (data && data.wind && data.wind.speed !== undefined) 
            setVelocidadeVentos(data.wind.speed);
        
        if (data && data.main && data.main.feels_like !== undefined) 
            setSensacaoTermica(data.main.feels_like);

      } catch (error) {
        console.error('Erro ao obter dados de clima:', error);
      }
    };
    useEffect(() => {
      getWeatherData();
    }, [city]);

     // Estilo dinâmico:
     const hours = new Date().getHours();
     let container, elementTitle, elementValue;
     
     if (hours >= 5 && hours <= 12) {
         // Day
         container = styles.dayContainer;
         elementTitle = styles.dayElementTitle;
         elementValue = styles.dayElementValue;
     } else if (hours >= 13 && hours <= 16) {
         // Afternoon
         container = styles.afternoonContainer;
         elementTitle = styles.afternoonElementTitle;
         elementValue = styles.afternoonElementValue;
     } else if (hours >= 17 && hours <= 18) {
         // Evening
         container = styles.eveningContainer;
         elementTitle = styles.eveningElementTitle;
         elementValue = styles.eveningElementValue;
     } else {
         // Night
         container = styles.nightContainer;
         elementTitle = styles.nightElementTitle;
         elementValue = styles.nightElementValue;
     }

    return(
        <View style={container}>
            <View style={styles.groupColumn}>
                <View style={styles.groupElement}>
                    <Text style={elementTitle} >UMIDADE</Text>
                    {umidade !== null && ( <Text style={elementValue} >{umidade}%</Text> )}
                </View>
                <View style={styles.groupElement}>
                    <Text style={elementTitle} >TEMP. MÍNIMA</Text>
                    {temperaturaMinima !== null && ( <Text style={elementValue} >{temperaturaMinima} °c</Text> )}
                </View>
            </View>

            <View style={styles.groupColumn}>
                <View style={styles.groupElement}>
                    <Text style={elementTitle} >VENTO</Text>
                    {velocidadeVentos !== null && ( <Text style={elementValue} >{velocidadeVentos} m/s</Text> )}
                </View>
                <View style={styles.groupElement}>
                    <Text style={elementTitle} >SENSAÇÃO TÉRMICA</Text>
                    {sensacaoTermica !== null && ( <Text style={elementValue} >{sensacaoTermica} °c</Text> )}
                 </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    groupColumn:{
        margin: 10
    },
    groupElement:{
        margin: 7
    },
    // Day Style
    dayContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        borderRadius: 30,
        padding: 10,
        marginTop: 300,
        backgroundColor:'#e6f6ff',
        opacity: 0.9 
    },
    dayElementTitle:{
        fontWeight: '700',
        fontSize: 14,
        textAlign: 'center',
        color: '#001929',
    },
    dayElementValue:{
        fontWeight: '700',
        fontSize: 24,
        textAlign: 'center',
        color: '#023554',
    },
    // Afternoon Style
    afternoonContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        borderRadius: 30,
        padding: 10,
        marginTop: 300,
        backgroundColor:'#fcedbb',
        opacity: 0.9 
    },
    afternoonElementTitle:{
        fontWeight: '700',
        fontSize: 14,
        textAlign: 'center',
        color: '#000000',
    },
    afternoonElementValue:{
        fontWeight: '700',
        fontSize: 24,
        textAlign: 'center',
        color: '#632a01',
    },
     // Evening Style
     eveningContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        borderRadius: 30,
        padding: 10,
        marginTop: 300,
        backgroundColor:'#e3e8fc',
        opacity: 0.9 
    },
    eveningElementTitle:{
        fontWeight: '700',
        fontSize: 14,
        textAlign: 'center',
        color: '#495791',
    },
    eveningElementValue:{
        fontWeight: '700',
        fontSize: 24,
        textAlign: 'center',
        color: '#7288e0',
    },
     // Night Style
     nightContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        borderRadius: 30,
        padding: 10,
        marginTop: 300,
        backgroundColor:'#e3e8fc',
        opacity: 0.9
    },
    nightElementTitle:{
        fontWeight: '700',
        fontSize: 14,
        textAlign: 'center',
        color: '#1e2b5e',
    },
    nightElementValue:{
        fontWeight: '700',
        fontSize: 24,
        textAlign: 'center',
        color: '#495791',
    }
})
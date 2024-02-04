import React, {useState} from 'react';
import {View, StyleSheet, ImageBackground, StatusBar, Text} from 'react-native';

import DataSemanal from '../components/DataSemanal';
import PesquisarClimaLocal from '../components/PesquisarClimaLocal';
import PainelClima from '../components/PainelClima';
import DescricaoClima from '../components/DescricaoClima';
import DashboardClima from '../components/DashboardClima';
import Footer from '../components/Footer';

export default function WeatherApp(){
    const [city, setCity] = useState('Fortaleza');
    const handleCityChange = (newCity) => setCity(newCity);
    
    const hours = new Date().getHours();
    let backgroundApp = ''; 
    let statusBarStyle = 'dark-content';

    if (hours >= 5 && hours <= 12)
        backgroundApp = require('../../assets/backgrounds/background-dia.jpeg');
    else if (hours >= 13 && hours <= 16)
        backgroundApp = require('../../assets/backgrounds/background-tarde.jpeg');
    else if (hours >= 17 && hours <= 18){
        backgroundApp = require('../../assets/backgrounds/background-fimDeTarde.jpeg');
        statusBarStyle = 'light-content';
    } else {
        backgroundApp = require('../../assets/backgrounds/background-noite.jpeg');
        statusBarStyle = 'light-content'
    } 
    return (
        <ImageBackground source={backgroundApp} resizeMode="cover" style={styles.image}>
            <StatusBar translucent backgroundColor='transparent' barStyle={statusBarStyle}/>
            <View style={styles.container}>
                <DataSemanal city={city}/>
                <PesquisarClimaLocal onCityChange={handleCityChange} />
                <PainelClima city={city} />
                <DescricaoClima city={city}/>
                <DashboardClima city={city}/>
                <Footer/>
            </View>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    container:{
        flexDirection:'column',
        padding: 20,
    },
    image:{
        flex: 1
    }
})
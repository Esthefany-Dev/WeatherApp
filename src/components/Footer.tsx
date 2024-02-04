import React from "react";
import {Text, StyleSheet} from 'react-native';

export default function Footer(){
    const hours = new Date().getHours();
    let footerStyle;

    if (hours >= 5 && hours <= 16) footerStyle = styles.lightFooter;
    else footerStyle = styles.darkFooter;
    
    return(
        <Text style={footerStyle}>@ESTHEFANY-DEV</Text>
    )
}
const styles = StyleSheet.create({
    lightFooter:{
        textAlign: 'center',
        fontWeight: '600',
        color: '#fff',
        marginTop: 20,
        fontSize: 11,
        opacity: 0.8
    },
    darkFooter:{
        textAlign: 'center',
        fontWeight: '600',
        color: '#e3e8fc',
        marginTop: 20,
        fontSize: 11
    }
});
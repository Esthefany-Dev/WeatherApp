import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from 'react-native';

export default function DataSemanal({ city }) {
  const [dataSemanal, setDataSemanal] = useState<string | null>(null);

  const apiWeatherKey = 'b0415ca215544690881b2d99ae3c1b88';

  const getWeatherData = async () => {
    const apiWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiWeatherKey}&lang=pt`;

    try {
      const res = await fetch(apiWeatherUrl);
      const data = await res.json();
      // Data Atual
      const timestamp = data.dt;
      const dataAtual = new Date(timestamp * 1000);

      // Obter a semana
      const nomeSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
      const semana = nomeSemana[dataAtual.getUTCDay()];
      // Obter o dia 
      const diaAtual = dataAtual.getUTCDate();
      // Obter o nome do mês 
      const mesesAno = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
      const mes = mesesAno[dataAtual.getUTCMonth()];

      const dataHoje = `${semana}, ${diaAtual} de ${mes}`;
      setDataSemanal(dataHoje.toUpperCase());
    } catch (error) {
      console.error('Erro ao obter dados de clima:', error);
    }
  };
  useEffect(() => {
    getWeatherData();
  }, []);

  // Estilo dinâmico:
  const hours = new Date().getHours();
  let containerStyle;

  if (hours >= 5 && hours <= 12) containerStyle = styles.dayWeeklyDate; // Day
  else if (hours >= 13 && hours <= 16) containerStyle = styles.afternoonWeeklyDate; // Afternoon 
  else if (hours >= 17 && hours <= 18) containerStyle = styles.eveningWeeklyDate; // Evening
  else containerStyle = styles.nightWeeklyDate; // Night

  return (
    <View>
      {dataSemanal !== null && (<Text style={containerStyle}>{dataSemanal}</Text>)}
    </View>
  );
}

const styles = StyleSheet.create({
  // Day Style
  dayWeeklyDate:{
    marginTop: 30,
    color: "#023554",
    fontWeight: '700',
    fontSize: 14 
  },
  // Afternoon Style
  afternoonWeeklyDate:{
    marginTop: 30,
    color: "#000000",
    fontWeight: '700',
    fontSize: 14 
  },
  // Evening Style
  eveningWeeklyDate:{
    marginTop: 30,
    color: "#ffffff",
    fontWeight: '700',
    fontSize: 14 
  },
  // Night Style
  nightWeeklyDate:{
    marginTop: 30,
    color: "#ffffff",
    fontWeight: '700',
    fontSize: 14 
  }
});


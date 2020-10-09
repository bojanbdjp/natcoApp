import React from 'react';
import { View, StyleSheet, Text, Image} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

import day1 from '../../../assets/day1.png'
const Day1Screen = () => {
  const tableHead= ['', 'Day 1 - Essence'];
  const tableTitle= ['10:00-10:15', '10:15-10:30', '10:30-10:45', '10:45-11:00',
                     '11:00-11:15', '11:15-11:30', '11:30-11:45', '11:45-12:00',
                     '12:00-12:15', '12:15-12:30', '12:30-12:45', '12:45-13:00',
                     '13:00-13:15', '13:15-13:30', '13:30-13:45', '13:45-14:00',
                     '14:00-14:15', '14:15-14:30', '14:30-14:45', '14:45-15:00'];
  const    tableData= [
    ['OPENING PLENARY'],
        ['Break'],
        ['ESSENCE'],
        ['Break'],
        ['AIESEC in Serbia ??'],
        ['Leading through uncertainty - PAI'],
        ['Lunch break'],
        ['TM Track opening', '2', 'EB Track opening'],
        ['Break'],
        ['EVENING PLENARY']];

    return <View style={styles.container}>
       <Image source={day1} style={styles.image}/>
      </View>
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: {  height: 40,  backgroundColor: '#f1f8ff'  },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa'},
    titl2e: { flex: 3, backgroundColor: '#f6f8fa'},
    row: {  height: 28  },
    text: { textAlign: 'center', fontSize: 10 },
    titleText: { marginRight: 6, textAlign:'right' },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain', 
      
    }, 
});

export default Day1Screen;
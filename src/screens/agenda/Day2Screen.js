import React, {useContext} from 'react';
import { View, StyleSheet, Text, Image} from 'react-native';
import { HomeTitleContext } from '../../context/HeaderContext'
import { useFocusEffect } from '@react-navigation/native';

import day1 from '../../../assets/construction2.png'
const Day2Screen = () => {

    const { setTitle } = useContext(HomeTitleContext);
    useFocusEffect(() => {
        setTitle('Agenda');
    });


    return <View style={styles.container}>
    <Image source={day1} style={styles.image}/>
   </View>
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain', 
      }, 
});

export default Day2Screen;
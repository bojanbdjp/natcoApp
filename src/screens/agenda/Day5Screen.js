import React, {useContext} from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { HomeTitleContext } from '../../context/HeaderContext'
import { useFocusEffect } from '@react-navigation/native';

const Day5Screen = () => {

    const { setTitle } = useContext(HomeTitleContext);
    useFocusEffect(() => {
        setTitle('Agenda');
    });


    return <Text>Day5</Text>
}

const styles = StyleSheet.create({});

export default Day5Screen;
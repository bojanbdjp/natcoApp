import React, {useContext} from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { HomeTitleContext } from '../../context/HeaderContext'
import { useFocusEffect } from '@react-navigation/native';

const Day4Screen = () => {

    const { setTitle } = useContext(HomeTitleContext);
    useFocusEffect(() => {
        setTitle('Agenda');
    });


    return <Text>Day4</Text>
}

const styles = StyleSheet.create({});

export default Day4Screen;
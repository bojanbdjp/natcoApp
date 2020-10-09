import React, {useContext} from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { HomeTitleContext } from '../../context/HeaderContext'
import { useFocusEffect } from '@react-navigation/native';

const Day3Screen = () => {

    const { setTitle } = useContext(HomeTitleContext);
    useFocusEffect(() => {
        setTitle('Agenda');
    });


    return <Text>Day3</Text>
}

const styles = StyleSheet.create({});

export default Day3Screen;
import React, {useContext} from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { HomeTitleContext } from '../../context/HeaderContext'
import { useFocusEffect } from '@react-navigation/native';

const Day2Screen = () => {

    const { setTitle } = useContext(HomeTitleContext);
    useFocusEffect(() => {
        setTitle('Agenda');
    });


    return <Text>Day2</Text>
}

const styles = StyleSheet.create({});

export default Day2Screen;
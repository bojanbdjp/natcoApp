import React, { useState, useEffect, useContext} from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { HomeTitleContext } from '../../context/HeaderContext'
import { useFocusEffect } from '@react-navigation/native';
import Construction from '../../components/Construction';

const AdminEvaluationScreen = () => {
    const { setTitle } = useContext(HomeTitleContext);
    
    useFocusEffect(() => {
        setTitle('Evaluacije');
    });

    return (
        <View>
        <Construction />
        </View>
        
    )
}


const styles = StyleSheet.create({
    
});

export default AdminEvaluationScreen;
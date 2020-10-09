import React, {useContext}  from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { HomeTitleContext } from '../context/HeaderContext'
import { useFocusEffect } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const PartnersScreen = ({navigation}) => {


    const { setTitle } = useContext(HomeTitleContext);
    useFocusEffect(() => {
        setTitle('Uputstva');

    });
  

    return <ScrollView style={styles.container}>

        <View style={styles.oneInfo}>
            <Text style={styles.header}>Evaluacije</Text>
            <Text>Evaluaciju za svaki session mozete dodati samo jednom.</Text>
        </View>

        <View style={styles.oneInfo}>
            <Text style={styles.header}>Sugar Cubes</Text>
            <Text>Svakom delegatu mozete posalati samo jedan sugar cube.</Text>
        </View>

        <View style={styles.oneInfo}>
            <Text style={styles.header}>Nalog</Text>
            <Text>Postupak dodavanja slike je izaberi sliku, dodaj sliku.</Text>
            <View style={{flexDirection: 'row'}} >
                <TouchableOpacity><Text style={styles.pickImage}>Izaberi sliku</Text></TouchableOpacity> 
                <AntDesign name="arrowright" size={24} color="black" style={styles.arrow}/>
                <TouchableOpacity><Text style={styles.addImage}>Dodaj sliku</Text></TouchableOpacity> 
            </View>
        </View>
     
            
    </ScrollView>
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingHorizontal: 10,

    },header:{
        fontSize: 20,
        paddingBottom: 2
    },oneInfo:{padding: 10},
    pickImage: {
        borderColor: '#0056d8',
        borderWidth: 1,
        padding: 5,
        color: '#0056d8',
        fontWeight: 'bold',
        marginRight: 10,
        marginVertical: 10,
        fontSize: 18
    },
    addImage: {
        borderColor: 'green',
        borderWidth: 1,
        padding: 5,
        color: 'green',
        fontWeight: 'bold',
        marginRight: 10,
        marginVertical: 10,
        fontSize: 18
    },arrow:{ padding: 15, paddingLeft: 7}
});

export default PartnersScreen;
import React, {useContext, useState}  from 'react';
import { View, StyleSheet, Text, Button} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { HomeTitleContext } from '../context/HeaderContext'
import { useFocusEffect } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Rating, AirbnbRating } from 'react-native-ratings';

import server, {URL} from '../api/server'
import AsyncStorage from '@react-native-community/async-storage';

const PartnersScreen = ({navigation}) => {
    const [rating, setRating] = useState(3);

    const { setTitle } = useContext(HomeTitleContext);
    useFocusEffect(() => {
        setTitle('Uputstva');

    });

    const rateApp = async () => {
        const email = await AsyncStorage.getItem('email');
        try {
            let result = await server.post(`${URL}/rateApp`, {email, rating})
            console.log("rez", result);
        } catch (err){
            console.log("ovo je greska ", err);
        }
    }
  

    return <ScrollView style={styles.container}>

        <View style={styles.oneInfo}>
            <Text style={styles.header}>Evaluacije</Text>
            <Text>Evaluaciju za svaki session možete dodati samo jednom.</Text>
        </View>

        <View style={styles.oneInfo}>
            <Text style={styles.header}>Sugar Cubes</Text>
            <Text>Svakom delegatu možete poslati samo jedan sugar cube.</Text>
        </View>

        <View style={styles.oneInfo}>
            <Text style={styles.header}>Nalog</Text>
            <Text>Postupak dodavanja slike je izaberi sliku, dodaj sliku.</Text>
            <Text>Svaki delegat može promeniti sliku dva puta nakon prvog dodavanja.</Text>
            <View style={{flexDirection: 'row'}} >
                <TouchableOpacity><Text style={styles.pickImage}>Izaberi sliku</Text></TouchableOpacity> 
                <AntDesign name="arrowright" size={24} color="black" style={styles.arrow}/>
                <TouchableOpacity><Text style={styles.addImage}>Dodaj sliku</Text></TouchableOpacity> 
            </View>
        </View>

        <View style={styles.oneInfo}>
            <AirbnbRating 
                count={5}
                reviews={["Loše", "Onako", "OK", "Dobro", "Odlično"]}
                defaultRating={3}
                size={30}
                onFinishRating={setRating}
            />
           

            <TouchableOpacity style={styles.submit}
                onPress={() => rateApp()}>
                <Text style={styles.submitText}>Oceni aplikaciju</Text>
            </TouchableOpacity> 
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
    },arrow:{ padding: 15, paddingLeft: 7},
    submit: {
        backgroundColor:'#0056d8',
        borderRadius: 15,
        marginHorizontal: 5,
        marginVertical: 10,
        padding: 10,
        display: 'flex',
        alignItems: 'center',

      },  submitText:{
        fontWeight: 'bold',
        fontSize: 17,
        color: '#fff'
      },
});

export default PartnersScreen;
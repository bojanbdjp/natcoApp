import React from 'react';
import {View, StyleSheet, Image,Text, TouchableOpacity} from 'react-native';

const BigPartner = ({image, openModal}) => {
    return <View style={styles.container}>

        <TouchableOpacity onPress={openModal}>
            <Image source={image} style={styles.imageStyle}/>
        </TouchableOpacity>

    </View>
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: 'gold',
        height: 150,
        justifyContent: 'center',
        backgroundColor: '#fff'
    }, 
    imageStyle: {
        resizeMode: 'contain',
        width: '90%',
        alignSelf: 'center'
    }
})
   
export default BigPartner;
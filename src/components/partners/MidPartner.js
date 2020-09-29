import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';

const MidPartner = ({style, image, openModal}) => {
    return <View style={[styles.container, style]}>

        <TouchableOpacity style={styles.touchable} onPress={openModal}>
            <Image source={image} style={styles.imageStyle}/>
        </TouchableOpacity>

    </View>
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1.5,
        borderColor: 'silver',
        width: '49.5%',
        height: 125,
        backgroundColor: '#fff'
         
    },
    imageStyle: {
        resizeMode: 'contain',
        width: '90%',
        height: '100%',
        alignSelf: 'center',
    }, touchable: {
        paddingTop: 10
    }
})
   
export default MidPartner;
import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';

const SmallPartner = ({image, style, openModal}) => {
    return <View style={[styles.container, style]}>


        <TouchableOpacity onPress={openModal}>
            <Image source={image} style={styles.imageStyle}/>
        </TouchableOpacity>

    </View>
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1.2,
        borderColor: '#cd7f32',
        width: '32.7%',
        height: 100,
        backgroundColor: '#fff',
        paddingVertical: 5,
    },
    imageStyle: {
        resizeMode: 'contain',
        width: '90%',
        height: '100%',
        alignSelf: 'center',
    }
})
   
export default SmallPartner;
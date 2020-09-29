import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import construction from '../../assets/construction.png'

const Spacer = () => {
    return <View style={styles.container}>
        <Image style={styles.image} source={construction}/>
    </View>
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    }
})
   
export default Spacer;
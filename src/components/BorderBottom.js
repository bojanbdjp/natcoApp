import React from 'react';
import {View, StyleSheet} from 'react-native';

const BorderBottom = () => {
    return <View style={styles.fakeBorder}></View>
}

const styles = StyleSheet.create({
    fakeBorder: {
        borderTopWidth: 1,
        borderColor: 'rgba(0,86,216, 0.3)',
        height: 10,
        width: '90%',
        alignSelf: 'center',
    }
})
   
export default BorderBottom;
import React from 'react';
import {View, StyleSheet} from 'react-native';

const BorderBottom = () => {
    return <View style={styles.fakeBorder}></View>
}

const styles = StyleSheet.create({
    fakeBorder: {
        borderTopWidth: 1,
        borderColor: '#ffcaca',
        height: 10,
        width: '90%',
        alignSelf: 'center',
    }
})
   
export default BorderBottom;
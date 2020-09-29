import React from 'react';
import {View, StyleSheet} from 'react-native';

const Spacer = () => {
    return <View style={styles.devider}></View>
}

const styles = StyleSheet.create({
    devider: {
        borderColor: '#c4bbb3',
        borderBottomWidth: 1,
        width: '90%',
        alignSelf: 'center',
        marginBottom: 5

    }
})
   
export default Spacer;
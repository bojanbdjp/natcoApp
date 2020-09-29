import React, {useEffect, useContext} from 'react';
import { Animated, Easing, View, StyleSheet, Text, Image} from 'react-native';
import logo from '../../assets/logoNatco.png'
import { Context as AuthContext} from '../context/AuthContext'

const ResolveAuthScreen = ({navigation}) => {
    const {tryLocalSignin} = useContext(AuthContext);

    useEffect(() => {
        const timer = setTimeout(() => {
            tryLocalSignin();
        }, 2000);
        return () => clearTimeout(timer);
      }, []);

    const spinValue = new Animated.Value(0)

    // First set up animation 
    Animated.timing( spinValue,
    {
        toValue: 1,
        duration: 2500,
        easing: Easing.linear,
        useNativeDriver: true  // To make use of native driver for performance
    }
    ).start()

    // Second interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
    })



    return (
        <View style={styles.container}>
            <Animated.Image resizeMode='contain'
                style={{transform: [{rotateY: spin}], 
                flex: 1,
                width: 300,
                height: 300,
                resizeMode: 'contain',
                }}
                source={logo} />
        </View>
    )
}
ResolveAuthScreen.navigationOptions = {
    headerShown: false,
};


const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ResolveAuthScreen;
import React, { useState } from "react";
import {Text, TouchableOpacity, StyleSheet} from "react-native";
import Spacer from "./Spacer";
import { useNavigation } from '@react-navigation/native';

const NavLink = ({text, stackName, pageName}) => {
    const navigation = useNavigation();

    return (
        <Spacer>
            <TouchableOpacity onPress={() => {
                navigation.navigate(stackName, {screen: pageName})}
            }>
                <Text style={styles.link}>
                    {text}
                </Text>
            </TouchableOpacity>
        </Spacer>
    )

}

const styles = StyleSheet.create({
    link: {
        color: 'blue'
    }
});

export default NavLink;
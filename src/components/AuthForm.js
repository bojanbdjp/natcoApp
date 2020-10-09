import React, { useState, useContext} from "react";
import {Platform, StyleSheet, View, ActivityIndicator} from "react-native";
import {Picker} from '@react-native-community/picker'
import RNPickerSelect from 'react-native-picker-select';
import { Text, Input, Button, Image} from "react-native-elements";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import {Context as AuthContext} from '../context/AuthContext'
import Spacer from "./Spacer";
import logo from '../../assets/logoNatco.png'


const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText, isSignup}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [track, setTrack] = useState("");
    const [lc, setLc] = useState("");

    const {state} = useContext(AuthContext);

    const radio_props = [
      {label: 'TM', value: 0, color: 'green'},
      {label: 'TL', value: 1, color: 'blue' },
      {label: 'EB', value: 2, color: 'red' }
    ];

    const validateForm = () => {
        
    }

    let loader;
    if(errorMessage) {
      loader =  <Text style={styles.errorMessage}>{errorMessage}</Text>
    }

    if(state.loading) {
      loader = <ActivityIndicator size="large" color="#F15946" />  
    }

   // {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

    let lcPickerComp;
    
    if (Platform.OS === 'android') {
      lcPickerComp = (
       <Picker style={styles.pickercomp}
            selectedValue={lc}
            onValueChange={setLc}
            itemStyle={{paddingRight: 30}} >
            <Picker.Item label="Izaberi LC" value="" />
            <Picker.Item label="Singidunum" value="sin" />
            <Picker.Item label="FON" value="fon" />
            <Picker.Item label="EF" value="eko" />
            <Picker.Item label="KG" value="kag" />
            <Picker.Item label="Nis" value="nis" />
            <Picker.Item label="MET" value="met" />
            <Picker.Item label="NS" value="nsa" />
            <Picker.Item label="SU" value="sub" />
          </Picker> )

         } else {
            lcPickerComp = ( 
              <RNPickerSelect useNativeAndroidPickerStyle={true}
                  onValueChange={setLc}
                  placeholder={{
                      label: 'Izaberi LC',
                      color: '#fff',
                      value: null,
                  }} style={{ ...pickerSelectStyles }}
                  items={[
                      { label: 'Singidunum', value:"sin", key: 'sin'},
                      { label: 'FON',  value:"fon", key: 'fon'},
                      { label: 'EF', value:"eko" , key: 'eko' },
                      { label: 'KG', value:"kag" , key: 'kag' },
                      { label: 'Nis',  value:"nis", key: 'nis' },
                      { label: 'MET',  value:"met", key: 'met' },
                      { label: 'NS', value:"nsa" , key: 'nsa' },
                      { label: 'SU', value:"sub" , key: 'sub' },
              ]}/> 
            )
          }
          
    



    return (
        <>
        <Spacer />
            <View style={styles.imageContainer}>
              <Image style={styles.image}
                  source={logo} />
            </View>

          <Input 
            placeholder="Email" 
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            inputStyle={styles.inputStype}
            inputContainerStyle={{borderBottomWidth:0}}
            placeholderTextColor='#fff'
          />
 
          <Input 
            placeholder="Password"
            secureTextEntry value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
            inputStyle={styles.inputStype}
            inputContainerStyle={{borderBottomWidth:0}}
            placeholderTextColor='#fff'
          />

          { isSignup 
          ?  <View> 
          <View style={styles.lcpicker}>
          {lcPickerComp}
      </View>

        <RadioForm
          formHorizontal={true}
          animation={true}
          style={styles.radio}
          >
          {/* To create radio buttons, loop through your array of options */}
          {
            radio_props.map((obj, i) => (
              <RadioButton labelHorizontal={true} key={i} >
                {/*  You can set RadioButtonLabel before RadioButtonInput */}
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  borderWidth={1}
                  onPress={setTrack}
                  isSelected={track === i}
                  buttonInnerColor={obj.color}
                  buttonOuterColor={obj.color}
                  buttonSize={30}
                  buttonOuterSize={40}
                  buttonStyle={{}}
                  buttonWrapStyle={{marginLeft: 10}}
                />
                <RadioButtonLabel
                  onPress={() => console.log("testets")}
                  obj={obj}
                  index={i}
                  labelHorizontal={true}
                  labelStyle={{fontSize: 20, color: obj.color, fontWeight: 'bold'}}
                  labelWrapStyle={{}}
                />
              </RadioButton>
            ))
          }  
        </RadioForm> 
        </View> 
        : null }

         
          {loader}
          <Spacer>
            <Button buttonStyle={styles.submit}
              title={submitButtonText}
              onPress={() => onSubmit({email, password, track, lc})}
            />
          </Spacer>
        </>
    )
}

const styles = StyleSheet.create({
    errorMessage: {
        fontSize: 16,
        color: 'red',
        marginLeft: 15,
        marginTop: 15
    },
    image: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
      
    }, 
    imageContainer: {
      alignSelf: 'center',
      marginBottom: 15
    },
    inputStype:{
      borderWidth: 1,
      borderColor: '#53B3CB',
      borderRadius: 15,
      backgroundColor: '#53B3CB',
      marginHorizontal: 0,
      paddingLeft: 10,
      marginVertical: -10,
      color: '#fff'
    }, 
    submit: {
      backgroundColor:'#F15946',
      borderRadius: 15,
    }, 
    radio: {
      alignSelf: 'center',
    }, 
    lcpicker: {
      color: 'red',
      backgroundColor: '#53B3CB',
      borderRadius: 15,
      marginHorizontal: 10,
      marginBottom: 15,
      marginTop: -10,
    },
    pickercomp: {
      height: 40,
      color: '#fff',
      fontSize: 20,
    }
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: 16,
      paddingTop: 9,
      marginHorizontal: 10,  
      borderRadius: 15,
      backgroundColor: '#53B3CB',
      color: 'white',
      marginBottom: 8
  },
});

export default AuthForm;
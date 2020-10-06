import React, { useState, useEffect, useContext} from 'react';
import { View, StyleSheet, ScrollView} from 'react-native';
import { Button, Image, Text} from "react-native-elements";
import { useFocusEffect } from '@react-navigation/native';

import Input from '../../components/Input'
import apiurl from '../../api/server'
import ChooseTrack from '../../components/ChooseTrack';
import { HomeTitleContext } from '../../context/HeaderContext'
import server, {URL} from '../../api/server'
import AuthForm from '../../components/ChooseTrack';

const AdminLCPage = () => {
    const [singi, setSingi] = useState();
    const [ef, setEf] = useState("");
    const [fon, setFon] = useState("");
    const [met, setMet] = useState("");
    const [nis, setNis] = useState("");
    const [kg, setKg] = useState("");
    const [ns, setNs] = useState("");
    const [sub, setSub] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const { setTitle } = useContext(HomeTitleContext);
    
    useFocusEffect(() => {
        setTitle('Prijave');
    });

    useEffect(() => {
        getApplications();
    }, []);



    const getApplications = async () => {
        try {
            let result = await server.get(`${URL}/getApplications`)
            result = result.data.applications;
            setSingi(result.singi);
            setEf(result.ef);
            setFon(result.fon);
            setMet(result.met);
            setNis(result.nis);
            setKg(result.kg);
            setNs(result.ns);
            setSub(result.sub);
        } catch (err){
            console.log("ovo je greska ", err);
        }
    }

    const updateApplications = async () => {
        try {
            let result = await server.post(`${URL}/updateApplications`, 
            {singi: +singi, ef: +ef, fon: +fon, met: +met, nis: +nis, kg: +kg, ns: +ns, sub: +sub})
    
        } catch (err){
            console.log("ovo je greska ", err);
        }
    }

    return (
        <ScrollView>
        <View style={styles.container}>

            <View style={styles.messageView}>

                <View style={styles.lcView}>
                    <Text style={styles.text}>LC Singi:</Text>
                    <Input val={singi} setVal={setSingi}
                        style={styles.inputStype}
                        constyle={styles.inputContainerStyle}
                        placeholderTextColor='#E01A4F'/>
                </View>

                <View style={styles.lcView}>
                    <Text style={styles.text}>LC EF:</Text>
                    <Input val={ef} setVal={setEf}
                        style={styles.inputStype}
                        constyle={styles.inputContainerStyle}
                        placeholderTextColor='#E01A4F'/>
                </View>


                <View style={styles.lcView}>
                    <Text style={styles.text}>LC FON:</Text>
                    <Input val={fon} setVal={setFon}
                        style={styles.inputStype}
                        constyle={styles.inputContainerStyle}
                        placeholderTextColor='#E01A4F'/>
                </View>


                <View style={styles.lcView}>
                    <Text style={styles.text}>LC MET:</Text>
                    <Input val={met} setVal={setMet}
                        style={styles.inputStype}
                        constyle={styles.inputContainerStyle}
                        placeholderTextColor='#E01A4F'/>
                </View>

                <View style={styles.lcView}>
                    <Text style={styles.text}>LC NIS:</Text>
                    <Input val={nis} setVal={setNis}
                        style={styles.inputStype}
                        constyle={styles.inputContainerStyle}
                        placeholderTextColor='#E01A4F'/>
                </View>

                <View style={styles.lcView}>
                    <Text style={styles.text}>LC KG:</Text>
                    <Input val={kg} setVal={setKg}
                        style={styles.inputStype}
                        constyle={styles.inputContainerStyle}
                        placeholderTextColor='#E01A4F'/>
                </View>

                <View style={styles.lcView}>
                    <Text style={styles.text}>LC NS:</Text>
                    <Input val={ns} setVal={setNs}
                        style={styles.inputStype}
                        constyle={styles.inputContainerStyle}
                        placeholderTextColor='#E01A4F'/>
                </View>

                <View style={styles.lcView}>
                    <Text style={styles.text}>LC Sub:</Text>
                    <Input val={sub} setVal={setSub}
                        style={styles.inputStype}
                        constyle={styles.inputContainerStyle}
                        placeholderTextColor='#E01A4F'/>
                </View>
               


               

                <Button buttonStyle={styles.submit}
                    title="Sačuvaj"
                    onPress={() => updateApplications()}
                />

                {successMessage != "" ?<Text style={styles.success}>{successMessage}</Text> : null }
            </View>
        </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        paddingTop: 20,
        
    },
    heading: {
        fontSize: 17,
        paddingLeft: 15,
    },

    lcView:{
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
    },

    inputStype:{
        flex: 0.3,
        borderWidth: 1,
        borderColor: '#0056d8',
        borderRadius: 5,
        backgroundColor: '#fff',
        marginHorizontal: 0,
        color: '#0056d8',
        alignSelf: 'flex-end',
        textAlign: 'center',

      }, 
      inputContainerStyle: {
        borderBottomWidth:0, 
        maxWidth: '60%',
        justifyContent: 'flex-end',
        
      },
      submit: {
        backgroundColor:'#0056d8',
        borderRadius: 15,
        marginHorizontal: 5,
        marginVertical: 10
      }, 
      error: {
          color: 'red',
          fontWeight: 'bold',
          fontSize: 20,
          marginLeft: '5%',
          alignSelf: 'center'
      },
      success: {
        color: '#00af07',
        fontWeight: 'bold',
        marginLeft: 10,
        fontSize: 20,
        marginLeft: '5%',
        alignSelf: 'center'
      },
      text: {
          fontSize: 20,
          width: 100,
          marginRight: 30
      }
});

export default AdminLCPage;
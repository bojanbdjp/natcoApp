import React, {useContext, useEffect, useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, Text, Button} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext'
import CountDown from 'react-native-countdown-component';
import {VictoryPie} from 'victory-native'
import Svg from 'react-native-svg'
import { HomeTitleContext } from '../context/HeaderContext'
import { Entypo } from '@expo/vector-icons';
import {Badge } from 'react-native-elements'
import InformationRow from '../components/InfomationRow';
import BorderDevider from '../components/BorderDevider';

import notification from '../components/NotificationFunction'
import server, {URL} from '../../src/api/server'

const HomeScreen = ({navigation}) => {
    const [pieData, setPieData] = useState([{ y: 10, x: 'Nis'},
                                            { y: 90, x: 'Singi'},
                                            { y: 50, x: 'EF'},
                                            { y: 20, x: 'FON'},
                                            { y: 20, x: 'NS'},
                                            { y: 20, x: 'KG'},
                                            { y: 10, x: 'SU'},
                                            { y: 15, x: 'MET'}]);

    const [appCount, setAppCount] = useState();

    const { setTitle } = useContext(HomeTitleContext);
    useFocusEffect(() => {
        setTitle('Početna');
       
        

    });

    useEffect(() => {
        notification();
    
        const unsubscribe = navigation.addListener('focus', () => {
            getApplications();
        });
        return unsubscribe; 
    }, [])

    const getApplications = async () => {
        try {
            let result = await server.get(`${URL}/getApplications`)
            result = result.data.applications;

            let count = result.nis + result.singi + result.ef + result.fon + result.ns + result.kg + result.sub + result.met;
            let pieDataArray = []
            result.nis   > 0 ? pieDataArray.push({ y: result.nis,   x: 'Nis'}) : null;
            result.singi > 0 ? pieDataArray.push({ y: result.singi, x: 'Singi'}) : null;
            result.ef    > 0 ? pieDataArray.push({ y: result.ef,    x: 'EF'}) : null;
            result.fon   > 0 ? pieDataArray.push({ y: result.fon, x: 'FON'}) : null;
            result.ns    > 0 ? pieDataArray.push({ y: result.ns,  x: 'NS'}) : null;
            result.kg    > 0 ? pieDataArray.push({ y: result.kg,  x: 'KG'}) : null;
            result.sub   > 0 ? pieDataArray.push({ y: result.sub,  x: 'SU'}) : null;
            result.met   > 0 ? pieDataArray.push({ y: result.met, x: 'MET'}) : null;

            setPieData(pieDataArray);
            setAppCount(count);
        } catch (err){
            console.log("ovo je greska ", err);
        }
    }

    
    const today = new Date();
    const lastDay = new Date(2020, 9, 28, 0, 0, 0 ,0);
    const rest =  Math.abs((lastDay.getTime() - today.getTime()) / 1000);
    
    const graphicColor= ['blue', 'red', '#1E90FF', '#32CD32', '#FFD700', 'orange', '#FF1493', 'pink'];

        let pie = (
            <Svg width={350} height={260} style={styles.svg}>
                
                <VictoryPie
                    standalone={false}
                    origin={{ x: 180, y: 130 }}
                    data={pieData}
                    width={350}
                    height={300}
                    
                    colorScale={graphicColor}
                    
                
                style={{
                    labels: {
                    fontSize: 15, padding: 10
                    }
                }}
                /> 
              </Svg>
        )

        




        return (
        <View style={styles.pietest}>
           <Text style={styles.heading}>NatCo 116th počinje za</Text>
           <BorderDevider />
           <CountDown style={{marginTop: 10}}
                until={rest}
                onFinish={() => alert('finished')}
                size={20}
                digitStyle={{backgroundColor: '#F15946'}}
                digitTxtStyle={{fontWeight: 'normal'}}
            />

            <Text style={styles.heading}>Broj Prijava: {appCount}</Text>
            <BorderDevider />
            {pie}
              {/*<View style={styles.info}>
                <Text style={styles.headingInfo}>Informacije</Text>
                <Badge value="99+" status="error" />
              </View>
              

              <View>
                    <InformationRow type='EB' text='Primer jedne informacije'/>
                    <InformationRow type='SVI' text='Večernja plenarna je odložena za 22h'/>
              </View>*/}
              
              
        </View>
    )
}


const styles = StyleSheet.create({
    numberText: {
        top: 110,
        left: 163,
        fontSize: 30
    }, 
    heading: {
        paddingVertical: 5,
        marginTop: 7,
        width: '100%',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: '5%',
        color: '#0C090D'     
    },
    headingInfo: {
        fontWeight: 'bold',
        fontSize: 16,
        marginHorizontal: 7,
        marginLeft: '5%',
        color: '#0C090D'     
    },
    svg: {
        alignSelf: 'center'
    },
    info: {
        marginBottom: 5,
        flexDirection: 'row',

    }
});

export default HomeScreen;
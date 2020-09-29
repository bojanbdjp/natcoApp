import React, {useState} from 'react';
import { View, StyleSheet, Text} from 'react-native';

import BigPartner from '../components/partners/BigPartner';
import MidPartner from '../components/partners/MidPartner';
import SmallPartner from '../components/partners/SmallPartner';
import PartnerOverview from './partners/PartnerOverview'
import cola from '../../assets/cocacola.png'
import durex from '../../assets/durex.png'
import jaffa from '../../assets/jaffa.png'
import jelen from '../../assets/jelen.jpg'
import cookie from '../../assets/cookie.png'
import rosa from '../../assets/rosa.png'
import { LongPressGestureHandler } from 'react-native-gesture-handler';



const PartnersScreen = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState();
    const [text, setText] = useState();
    const [partner, setPartner] = useState();
    const [partnerStyle, setPartnerStyle] = useState();


    setPropers = (image, text, partner, partnerStyle) => {
        console.log("ovo su setProps ",image, text, partner);
        setImage(image);
        setText(text);
        setPartner(partner);
        setPartnerStyle(partnerStyle)
        setModalVisible(true);
    }

    return <View style={styles.container}>
        
        <PartnerOverview 
            modalVisible={modalVisible}
            modalImage={image}
            modalText={text}
            modalPartner={partner}
            partnerStyle={partnerStyle}
            closeModal={() => setModalVisible(!modalVisible)}/>

        <View>
            <BigPartner image={cola} 
                openModal={() => setPropers(cola,
                    "Mi smo internacionalna organizacija koja okuplja mlade ljude širom sveta i omogućuje im da razviju svoj liderski potencijal kroz volonterska i stručna iskustva u inostranstvu, kao i kroz uključivanje u različite projekte koje organizujemo.",
                    'Nacionalni partner',
                    '#037ef3'
                    )}/>

        </View>
       
        <View style={styles.midView}>
            <MidPartner image={jaffa} style={styles.marginBetween}
                openModal={() => setPropers(jaffa,
                        "Mi smo internacionalna organizacija koja okuplja mlade ljude širom sveta i omogućuje im da razviju svoj liderski potencijal kroz volonterska i stručna iskustva u inostranstvu, kao i kroz uključivanje u različite projekte koje organizujemo.",
                        'Partner konferencije',
                        'gold'
                        )}/>
            <MidPartner image={durex} 
                openModal={() => setPropers(durex,
                    "Mi smo internacionalna organizacija koja okuplja mlade ljude širom sveta i omogućuje im da razviju svoj liderski potencijal kroz volonterska i stručna iskustva u inostranstvu, kao i kroz uključivanje u različite projekte koje organizujemo.",
                    'Srebrni partner',
                    'silver'
                    )}/>
        </View>
            

        <View style={styles.midView}>
            <SmallPartner image={jelen} style={styles.marginBetween}
                openModal={() => setPropers(jelen,
                    "Mi smo internacionalna organizacija koja okuplja mlade ljude širom sveta i omogućuje im da razviju svoj liderski potencijal kroz volonterska i stručna iskustva u inostranstvu, kao i kroz uključivanje u različite projekte koje organizujemo.",
                    'Bronzani partner',
                    '#cd9932'
                    )}/>
            <SmallPartner image={cookie} style={styles.marginBetween} 
                openModal={() => setPropers(cookie,
                    "Mi smo internacionalna organizacija koja okuplja mlade ljude širom sveta i omogućuje im da razviju svoj liderski potencijal kroz volonterska i stručna iskustva u inostranstvu, kao i kroz uključivanje u različite projekte koje organizujemo.",
                    'Bronzani partner',
                    '#cd9932'
                    )}/>
            <SmallPartner image={rosa} 
                openModal={() => setPropers(rosa,
                    "Mi smo internacionalna organizacija koja okuplja mlade ljude širom sveta i omogućuje im da razviju svoj liderski potencijal kroz volonterska i stručna iskustva u inostranstvu, kao i kroz uključivanje u različite projekte koje organizujemo.",
                    'Bronzani partner',
                    '#cd9932'
                    )}/>
        </View>
            
    </View>
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginTop: 15
    },
    midView: {
        flexDirection: 'row',
        marginTop: 10
    },
    marginBetween: {
        marginRight: 3
    },
    goldBack: {
        backgroundColor: 'blue'
    }
});

export default PartnersScreen;
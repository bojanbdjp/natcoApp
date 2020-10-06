import React, {useState} from 'react';
import { View, StyleSheet, Text} from 'react-native';

import BigPartner from '../components/partners/BigPartner';
import MidPartner from '../components/partners/MidPartner';
import SmallPartner from '../components/partners/SmallPartner';
import PartnerOverview from './partners/PartnerOverview'
import cola from '../../assets/cocacola.png'
import pandg from '../../assets/pandg.png'
import erste from '../../assets/erste.png'



const PartnersScreen = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState();
    const [text, setText] = useState();
    const [textSecond, setTextSecond] = useState();
    const [partner, setPartner] = useState();
    const [partnerStyle, setPartnerStyle] = useState();


    setPropers = (image, text, textSecond, partnerStyle) => {
        console.log("ovo su setProps ",image, text, partner);
        setImage(image);
        setText(text);
        setTextSecond(textSecond);
        setPartnerStyle(partnerStyle)
        setModalVisible(true);
    }

    return <View style={styles.container}>
        
        <PartnerOverview 
            modalVisible={modalVisible}
            modalImage={image}
            modalText={text}
            modalTextSecond={textSecond}
            partnerStyle={partnerStyle}
            closeModal={() => setModalVisible(!modalVisible)}/>

        <View style={styles.bigPartnerCont}>
            <BigPartner image={cola} 
                openModal={() => setPropers(cola,
                    " MI SMO PARTNERSKA PUNIONICA KOMPANIJE COCA‑COLA I DEO COCA‑COLA SISTEMA, NAJVEĆEG SISTEMA ZA DISTRIBUCIJU BEZALKOHOLNIH NAPITAKA NA SVETU.  " +
                   " Kompanija Coca‑Cola i njenih 300 partnerskih punionica, uključujući i Coca‑Cola HBC, zajedno čine Coca‑Cola sistem. Sistem stvara vrednost i za kupce i potrošače, što ga čini jedinstvenim među kompanijama.",
                    "Održiv rast celog sistema zavisi od zajedničkih vrednosti i ciljeva kompanije Coca‑Cola i njenih partnerskih punionica, kao i od saradnje i međusobne podrške svih strana.",
                    '#037ef3'
                    )}/>
        </View>


        <View style={styles.bigPartnerCont}>
            <BigPartner image={pandg}
                openModal={() => setPropers(pandg,
                    "Procter & Gamble je jedna od kompanija sa najdužom tradicijom koja je svoje poslovanje započela proizodeći sapune i mirisne sveće, a danas nakon 180 godina stoji iza 60 različitih brendova kojima opslužuje blizu 160 tržišta među kojima je i naše. Samo neki od brendova koje smo sigurno svi bar nekada koristili su Pampers, Ariel, Head & Shoulders, Panten, Gillette i brojni drugi. Njenih korisnika ima bizu 5 milijardi, a njihov godišnji prihod iznosi čak . Ulažu mnogo u zaposlene, pa su proglašeni za kompaniju koja od prodavaca pravi direktore i koja kroz svoje programe obuke ne sprema zaposlene samo za rad u P&G-u, već i za rukovodeće pozicije u drugim kompanijama i industrijama. Osvojili su i nagradu za kompaniju koja podstiče i podržavaj razvoj ženskih lidera",
                    'Etičko poslovanje, društvena odgovornost, jednakost među polovima i održivost životne sredine su samo neke od vrednosti na kojima zasnivaju svoje poslovanje, pa možemo onda i reći da su P&G i AIESEC slični zbog čga godina ostvarujemo saradnju',
                    '#037ef3'
                    )}/>
        </View>

        <View style={styles.bigPartnerCont}>
            <BigPartner image={erste} 
                openModal={() => setPropers(erste,
                    "Erste Banka je 2005. godine kupila Novosadsku Banku, najstariju finansijsku instituciju u našoj zemlji, osnovanu 1864. godine. Podstičemo kreativnost, ulažemo u razvoj zaposlenih i negujemo inkluzivno i zdravo radno okruženje. " +
                   "Jedna smo od vodećih finansijskih institucija u Centralnoj i Istočnoj Evropi i društvenu odgovornost shvatamo kao sastavni deo dugoročne poslovne strategije.",
                    'Ako verujete u sebe i prepoznajete se u našim vrednostima i svrsi postojanja, naša banka je pravo mesto za vas.',
                    '#037ef3'
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
    },
    bigPartnerCont: {
        marginBottom: 15
    }
});

export default PartnersScreen;
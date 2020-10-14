import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Animated, Dimensions, Easing} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import BorderBottom from './BorderBottom';

const {height} = Dimensions.get('window');

const animatedEndY = Math.ceil(height * 0.7);
const negativeEndY = animatedEndY* -1;

let heartCount = 1

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min
}

class MusicRow extends React.Component {

    state = {
        hearts: []
    }

    addHeart = () => {
        this.props.vote({name:this.props.songName})
        this.setState(
            {
                hearts: [
                    ...this.state.hearts,
                    {
                        id: heartCount,
                        right: getRandomNumber(10, 50)
                    }
                ]
            },
            () => {
                heartCount++;
            }
        )
    }

    removeHeart = id => {
        this.setState({
            hearts: this.state.hearts.filter(heart => {
                return heart.id !== id
            })
        })
    }

        
    

    render() {
        let currVoter = this.props.voters.includes(this.props.currentUser)
      


        return <View >
            <View style={styles.container}>
                <Text style={styles.votes}>{this.props.votes}</Text>
                <Text style={styles.songName}>{this.props.songName}</Text>

            

                <TouchableOpacity onPress={this.addHeart} style={styles.icon} 
                    disabled={currVoter}>
                    {currVoter 
                    ? <AntDesign name="heart" size={24} color='#E01A4F' />
                    : <AntDesign name="hearto" size={24} color='black' />}
                    
                </TouchableOpacity>
                
                <View>
                {this.state.hearts.map(heart => {
                    return (
                        <HeartContainer key={heart.id} style={{right: heart.right}}
                                onComplete={() => this.removeHeart(heart.id)} />
                    )
                })}
                </View>
                {/*onPress={() => this.props.vote({name:this.props.songName})} */ }
                


            </View>
            <BorderBottom />
        </View>
    }
}

class HeartContainer extends React.Component {
    constructor() {
        super()

        this.yAnimation = this.state.position.interpolate({
            inputRange: [negativeEndY, 0],
            outputRange: [animatedEndY, 0]
        })


        this.opacityAnimation = this.yAnimation.interpolate({
            inputRange: [0, animatedEndY],
            outputRange: [1, 0]
        })

        this.scaleAnimation = this.yAnimation.interpolate({
            inputRange: [0, 15, 30],
            outputRange: [0, 1.4, 1],
            extrapolate: "clamp"
        })

        this.xAnimation = this.yAnimation.interpolate({
            inputRange: [0, animatedEndY / 6, animatedEndY / 3, animatedEndY / 2, animatedEndY],
            outputRange: [0, 25, 15, 0, 10]
        })

        this.rotateAnimation = this.yAnimation.interpolate({
            inputRange: [0, animatedEndY / 6, animatedEndY / 3, animatedEndY / 2, animatedEndY],
            outputRange: ['0deg', '-10deg', '0deg', '10deg', '0deg']
        })
    }

    state = {
        position: new Animated.Value(0)
    }

    static defaultProps = {
        onComplete() {

        }
    }


    componentDidMount() {


        Animated.timing(this.state.position, {
            duration: 2000,
            toValue: negativeEndY,
            easing: Easing.ease,
            useNativeDriver: true
        }).start(this.props.onComplete);
    }

    getHeartStyle() {
        return {
            transform: [
                {translateY: this.state.position},
                {scale: this.scaleAnimation},
                {translateX: this.xAnimation},
                {rotate: this.rotateAnimation}
                ],
            opacity: this.opacityAnimation
        }
    }

    render() {
        return (
            <Animated.View style={[styles.heartContainer, this.getHeartStyle(), this.props.style]}>
               <Heart color="#0056d8"/>
            </Animated.View>
        )
    }
}


const Heart = props => (
    <View {...props} style={[styles.heart, props.style]}>
        <AntDesign name="heart" size={28} color={props.color}/>
    </View>
)

const styles = StyleSheet.create({
    container: {   
        flexDirection: 'row',
        marginBottom: 5,
        marginHorizontal: 10,
        
    },
    votes: {
        width: 25,
        marginRight: 20,
    },
    icon: {
        paddingRight: 5

    },
    songName: {
        flex: 1
    },
    heartContainer: {
        position: "absolute",
        backgroundColor: "transparent",
    }, 
    heart: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: "transparent",

    },
})
   
export default MusicRow;
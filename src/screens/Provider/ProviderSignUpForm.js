import React, {Component} from 'react';
import {Text, Image, Platform, Dimensions, TextInput, View, TouchableOpacity} from 'react-native';
import { Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {connect} from 'react-redux';
// import {signUp} from './actionCreators';


const hearderHeight = 60;
const itemWidth = '88%';

const {height} = Dimensions.get('window');

const style = {
    button: {
        alignContent:'center',
        backgroundColor: '#F9BA32',
        borderRadius: 5,
        paddingVertical: 10,
        width: '88%',
        height: 60,
        marginBottom: 30,
        alignSelf:'center'
    },
    buttonText:{
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',

    },
    parentView1:{
        backgroundColor:"white",
        justifyContent:'space-between',
        alignItems:'center',
        width: '100%',
        height: '100%'
    },
    text: {
        width:itemWidth,
        marginHorizontal:'6%',
        fontSize:18,
        color: 'black',
        fontWeight: 'bold',
        marginBottom:30

    },
    input: {
        width:itemWidth,
        marginHorizontal:'6%',
        fontSize:18,
        borderBottomWidth:1,
        borderBottomColor:'#D1D1D1',
        marginBottom:30
    },
    checkBox: {
        boxSize:30
    },
    header:{
        width:'100%',
        paddingHorizontal:'6%',
        borderWidth:0,
        elevation: 0,
        shadowOpacity: 0,
        alignSelf:'center',
        backgroundColor: 'transparent',
        height:hearderHeight,
    },
    footer: {
        width:'100%'
    }
};

class ProviderSignUp extends Component {

    static navigationOptions = ( { navigation } ) => ({
        headerTitle: "",
        headerTitleStyle: {
            textAlign: 'center',
            flexGrow: 1
        },
        headerLeft: (

            <TouchableOpacity onPress={()=> navigation.navigate('providerPersonalProfile')}>
                <Image
                    style={{width:18, height:30, marginBottom:2}}
                    source={require('../image/left.jpg')}
                />
            </TouchableOpacity>

        ),
        headerRight: (<View/>),
        headerStyle:style.header
    });

  render(){
    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{
                backgroundColor: 'white',
                position:'absolute',
                top:-hearderHeight,
                width: '100%',
                alignItems:'center',
                height:height-26,
                justifyContent:'space-between',
                zIndex:10

            }}
            enableOnAndroid
        >
            <Image source={{uri: 'https://torinit.com/assets/workorbe/Blue-Hexagon-Top.png'}} style={{height: 135, width: 250, position: 'absolute', resizeMode: 'contain', top: 0, right: (Platform.OS == 'android' ? -75 : -72)}}/>
            <Image source={{uri: 'https://torinit.com/assets/workorbe/New-Logo.png'}} style={{height: 150, width: 300, alignSelf: 'center', resizeMode: 'contain', marginTop: 18, marginBottom: -20}}/>

            <View style={{width:'100%', alignItems:'center'}}>

                <TextInput
                    placeholder="Name"
                    style={style.input}
                    placeholderTextColor={'#D1D1D1'}
                    underlineColorAndroid='rgba(0,0,0,0)'

                />

                <Text style={style.text}>{'Aecon Inc.'}</Text>
                <Text style={style.text}>{'sadfafds@aecon.com'}</Text>

                <TextInput
                    placeholder="Password"
                    style={style.input}
                    placeholderTextColor={'#D1D1D1'}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    secureTextEntry
                />

                <TextInput
                    placeholder="Confirm Password"
                    style={style.input}
                    placeholderTextColor={'#D1D1D1'}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    secureTextEntry
                />

            </View>

            <View style={style.footer}>

                <TouchableOpacity
                    style={{...style.button,marginBottom:10,justifyContent:'center',alignItems:'center'}}
                    onPress={() => this.props.navigation.navigate('seekerCapability')}
                >
                    <Text style={{...style.buttonText,fontSize:20}}>Join Now</Text>
                    <Text style={{...style.buttonText,fontSize:15}}>Become a Workorbe Member!</Text>
                </TouchableOpacity>

                <View style={{flexDirection:'row',marginTop:5}}>
                    <Image
                        style={{height:140,width:130,zIndex:-1}}
                        source={require('../image/blue_hexagon_bottom_360.png')}
                    />

                    <View style={{zIndex:10,marginTop:80}}>
                        <Text style={{color:'#D1D1D1', textAlign:'center'}}> Copyright 2018 Workorbe</Text>
                        <Text style={{color:'#D1D1D1',textAlign:'center'}}> All right reserved</Text>
                    </View>
                </View>

            </View>

        </KeyboardAwareScrollView>
    )
  };
}



// const mapStateToProps = (state) => {
//   const {email, password, loading, error, signedUp, name, phone, company, passwordConfirmation, passwordNotConfirmed} = state.auth;
//   return{
//     email: email,
//     password: password,
//     loading: loading,
//     error: error,
//     signedUp: signedUp,
//     name: name,
//     company: company,
//     phone: phone,
//     passwordConfirmation: passwordConfirmation,
//     passwordNotConfirmed: passwordNotConfirmed
//   }
// };

// const mapDispatchToProps = (dispatch) => {
//   return{
//     emailChanged: (text) => dispatch({type: 'emailChanged', value: text}),
//     passwordChanged: (text) => dispatch({type: 'passwordChanged', value: text}),
//     signUpUser: (email, password, phone, company, name) => dispatch(signUp(email, password, phone, company, name)),
//     nameChanged: (text) => dispatch({type: 'nameChanged', value: text}),
//     companyChanged: (text) => dispatch({type: 'companyChanged', value: text}),
//     phoneChanged: (text) => dispatch({type: 'phoneChanged', value: text}),
//     confirmationChanged: (text) => dispatch({type: 'confirmationChanged', value: text}),
//     loadingLoginPage: () => dispatch({type: 'loadingLoginPage'}),
//   }
// };

export default ProviderSignUp
// export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);

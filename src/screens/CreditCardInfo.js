import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Image, TouchableOpacity, Dimensions, TextInput, Text} from 'react-native';
import { Button } from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {StatusBar} from 'react-native';

import axios from "axios";
import * as creditCardAction from "../actions/Onboarding";

const hearderHeight = 60;
const statusBarHeight = StatusBar.currentHeight;

const {height, width} = Dimensions.get('window');

const style = {
    button: {
        alignContent:'center',
        backgroundColor: '#F9BA32',
        borderRadius: 5,
        paddingVertical: 10,
        width: '88%',
        height: 45,
        marginTop: 0,
        marginBottom: 15
    },
    buttonText:{
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
    },

    text: {
        fontSize:18,
        color: 'black',
        alignSelf: 'center',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    input: {
        width:'88%',
        fontSize:18,
        borderBottomWidth:1,
        borderBottomColor:'#D1D1D1',
        marginBottom:35
    },
    checkBox: {
        boxSize:30
    },
    dropDown: {
        borderBottomWidth:1,
        borderBottomColor:'#D1D1D1',
        marginBottom:35
    },
    cardNumberInput:{
        flexDirection:'row',
        width:'88%',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'#D1D1D1',
        marginBottom:35
    },
    header:{
        width:'100%',
        paddingHorizontal:'6%',
        alignSelf:'center',
        backgroundColor: 'transparent',
        height:hearderHeight
    },
    imageTopRightStyle:{
        position:'absolute',
        top:statusBarHeight,
        right:0,
        zIndex:-10,
        height:130,
        width:95
    },
    footer: {
        width:'100%'
    }
};

class CreditCardInfo extends Component {

    static navigationOptions = ( { navigation } ) => ({
        headerTransparent:true,
        headerLeft: (

            <TouchableOpacity onPress={()=> navigation.navigate('seekerCapability')}>
                <Image
                    style={{width:18, height:30, marginBottom:2}}
                    source={require('./image/left.jpg')}
                />
            </TouchableOpacity>

        ),

        headerStyle:style.header
    });

    state = {

        countryList:[],
        stateList:{'Country':[]}

    };

    componentDidMount() {

        const processRawCountryData = array => {
            const country = array.map(item => item.country_name);
            console.log('country',country);
            return country;
        };

        const processRawStateData = array => {

            let states = {'Country':['State']};

            array.forEach(country => {
               states[country.country_name] = country.state_data.map( state => state.state_name );
            });

            return states;
        };

        const updateCountryAndStateList = (countryList,stateList) => {

            this.setState({countryList, stateList});

        };

        async function getCountryAndStateData() {

            try {

                const countryAndStateData = await axios.get('http://34.233.61.228/workorbe/public/api/onboarding/commondata/provider');
                const countryAndState = countryAndStateData.data.data.country_data;
                const countryList = processRawCountryData(countryAndState);
                const stateList = processRawStateData(countryAndState);
                updateCountryAndStateList(countryList,stateList);

            } catch (e) {
                console.log(e);
            }

        }

        getCountryAndStateData();

    }

    onNameOnCardChange = name => {
        // console.log(name);
        this.props.onCreditCardInputChange({name});
    };

    onNameOnCardNumberChange = cardNumber => {
        // console.log(cardNumber);
        cardNumber = `${cardNumber}`;
        if (cardNumber.length < 20) {
            console.log('cardnumberLength: ', cardNumber.length);
            if ((cardNumber.length+1)%5 === 0 && cardNumber.length !== 19 && cardNumber.length !== 0 ) {
                cardNumber += ' ';
            }
            this.props.onCreditCardInputChange({cardNumber});
        }
    };

    onExpMonthChange = expMM => {
        // console.log(expMM);

            this.props.onCreditCardInputChange({expMM});
    };

    onExpYearChange = expYY => {
            this.props.onCreditCardInputChange({expYY});
    };

    onCVVChange = cvv => {
        // console.log(cvv);
            this.props.onCreditCardInputChange({cvv});
    };

    onBillingAddressChange = billingAddress => {
        // console.log(billingAddress);
        this.props.onCreditCardInputChange({billingAddress});

    };

    onCountrySelect = country => {
        this.props.onCreditCardInputChange({country,state:'State'});
    };

    onStateSelect = state => {
        this.props.onCreditCardInputChange({state});
    };

    onCityChange = city => {
        // console.log(city);
        this.props.onCreditCardInputChange({city});
    };

    onPostalCodeChange = postalCode => {
        // console.log(postCode);
        this.props.onCreditCardInputChange({postalCode});
    };

    render() {

        return (

            <KeyboardAwareScrollView
                contentContainerStyle={{
                    backgroundColor: 'white',
                    width: '100%',
                    alignItems:'center',
                    height:'100%',
                    justifyContent:'space-between',
                    zIndex:10
                }}
                enableOnAndroid
                extraHeight={500}
            >

                <Image source={{uri: 'https://torinit.com/assets/workorbe/Blue-Hexagon-Top.png'}} style={style.imageTopRightStyle}/>

                <Image
                    style={{width:'85%',height:46, marginBottom:50, marginTop:hearderHeight+25}}
                    source={require('./image/new-logo.png')}
                />

                <View style={{width:'100%',alignItems:'center'}}>

                    <TextInput
                        placeholder="Name on Card"
                        style={style.input}
                        placeholderTextColor={'#D1D1D1'}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        value={this.props.creditCard.name}
                        onChangeText={text => this.onNameOnCardChange(text)}
                    />

                    <View style={style.cardNumberInput}>
                        <Image
                            style={{width:20, height:15, marginBottom:3, marginRight:6}}
                            source={require('./image/creditcard_icon.jpg')}
                        />

                        <TextInput
                            placeholder="Card Number"
                            style={{...style.input,borderBottomWidth:0, marginBottom:3}}
                            keyboardType='numeric'
                            placeholderTextColor={'#D1D1D1'}
                            underlineColorAndroid='rgba(0,0,0,0)'
                            maxLength={19}
                            value={this.props.creditCard.cardNumber}
                            onChangeText={input => this.onNameOnCardNumberChange(input)}
                        />
                    </View>

                    <View style={{flexDirection:'row',width:'88%',justifyContent:'space-between'}}>

                        <View style={{flexDirection:'row',justifyContent:'flex-start', width: '45%', alignItems:'center',borderBottomWidth:1, borderBottomColor:'#D1D1D1', marginBottom:35}}>
                            <TextInput
                                placeholder="Exp.MM"
                                keyboardType='numeric'
                                style={{...style.input,width:(this.props.creditCard.expMM ? 27 : '45%'),borderBottomWidth:0, marginBottom:1,marginRight:0}}
                                placeholderTextColor={'#D1D1D1'}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                value={this.props.creditCard.expMM}
                                maxLength={2}
                                onChangeText={input => this.onExpMonthChange(input)}
                            />

                            <Text style={{...style.input,color:'#D1D1D1',width:'5%',borderBottomWidth:0,marginBottom:1,marginRight:5}}>
                                /
                            </Text>

                            <TextInput
                                placeholder="YY"
                                style={{...style.input, marginLeft:0, width:'46%',borderBottomWidth:0, marginBottom:1}}
                                placeholderTextColor={'#D1D1D1'}
                                keyboardType='numeric'
                                underlineColorAndroid='rgba(0,0,0,0)'
                                value={this.props.creditCard.expYY}
                                maxLength={2}
                                onChangeText={input => this.onExpYearChange(input)}
                            />
                        </View>

                        <View style={{flexDirection:'row',justifyContent:'flex-start', width: '45%', alignItems:'center',borderBottomWidth:1, borderBottomColor:'#D1D1D1', marginBottom:35}}>

                            <TextInput
                                placeholder="CVV"
                                keyboardType='numeric'
                                style={{...style.input,borderBottomWidth:0, width: '85%',marginBottom:1}}
                                placeholderTextColor={'#D1D1D1'}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                value={this.props.creditCard.cvv}
                                maxLength={3}
                                onChangeText={input => this.onCVVChange(input)}
                            />

                            <Image
                                style={{width:18, height:16, marginBottom:2}}
                                source={require('./image/pentagon_questionmark.jpg')}
                            />
                        </View>
                    </View>

                    <TextInput
                        placeholder="Billing Address"
                        style={style.input}
                        placeholderTextColor={'#D1D1D1'}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        value={this.props.creditCard.billingAddress}
                        onChangeText={input => this.onBillingAddressChange(input)}
                    />

                    <View style={{flexDirection:'row',width:'88%',justifyContent:'space-between'}}>

                        <ModalDropdown
                            options={this.state.countryList}
                            defaultValue={"Country"}
                            style={{...style.dropDown, width:'50%'}}
                            dropdownTextStyle={{...style.text, fontWeight:'normal'}}
                            dropdownStyle={{width:'50%'}}
                            textStyle={{...style.text,color:'#D1D1D1',fontWeight:'normal'}}
                            onSelect={(index, country) => this.onCountrySelect(country)}
                            showsVerticalScrollIndicator={true}
                        >
                            <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between', alignItems:'center'}}>
                                <Text style={{fontSize:18,color:(this.props.creditCard.country ==='Country' ? '#D1D1D1' : 'black')}}>{this.props.creditCard.country}</Text>
                                <Image
                                    style={{height:13, width:28}}
                                    source={require('./image/dropdown_pg5.jpg')}
                                />
                            </View>

                        </ModalDropdown>

                        <ModalDropdown
                            options={this.state.stateList[this.props.creditCard.country]}
                            defaultValue={"State"}
                            disabled={ (this.props.creditCard.country === 'Country' || this.state.stateList[this.props.creditCard.country].length === 0)? true : false}
                            style={{...style.dropDown, width:'40%'}}
                            dropdownTextStyle={{...style.text, fontWeight:'normal'}}
                            dropdownStyle={{width:'40%'}}
                            textStyle={{...style.text,color:'#D1D1D1',fontWeight:'normal'}}
                            onSelect={(index, state) => this.onStateSelect(state)}
                            showsVerticalScrollIndicator={true}
                        >
                            <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between', alignItems:'center'}}>
                                <Text style={{fontSize:18,color:(this.props.creditCard.state === 'State' ? '#D1D1D1' : 'black')}}>{this.props.creditCard.state}</Text>
                                <Image
                                    style={{height:13, width:28}}
                                    source={require('./image/dropdown_pg5.jpg')}
                                />
                            </View>
                        </ModalDropdown>
                    </View>

                    <View style={{flexDirection:'row',width:'88%',justifyContent:'space-between'}}>
                        <TextInput
                            placeholder="City"
                            style={{...style.input,width:'50%'}}
                            placeholderTextColor={'#D1D1D1'}
                            underlineColorAndroid='rgba(0,0,0,0)'
                            value={this.props.creditCard.city}
                            onChangeText={input => this.onCityChange(input)}
                        />

                        <TextInput
                            placeholder="Postal Code"
                            style={{...style.input,width:'40%'}}
                            placeholderTextColor={'#D1D1D1'}
                            underlineColorAndroid='rgba(0,0,0,0)'
                            value={this.props.creditCard.postalCode}
                            onChangeText={input => this.onPostalCodeChange(input)}
                        />
                    </View>
                </View>

                <View style={style.footer}>

                    <Button
                        title="Continue"
                        titleStyle={style.buttonText}
                        buttonStyle={style.button}
                        onPress={() => this.props.navigation.navigate('ProviderCompanyProfile')}
                        uncheckedColor=""
                        containerStyle={{ width: '100%', alignSelf:'center', zIndex:20}}
                    />

                    <View style={{flexDirection:'row',marginTop:-75}}>
                        <Image
                            style={{height:140,width:130,zIndex:-1}}
                            source={require('./image/orange_hexagon_bottom_360.png')}
                        />

                        <View style={{zIndex:10,marginTop:80}}>
                            <Text style={{color:'#D1D1D1', textAlign:'center'}}> Copyright 2018 Workorbe</Text>
                            <Text style={{color:'#D1D1D1',textAlign:'center'}}> All right reserved</Text>
                        </View>
                    </View>

                </View>
            </KeyboardAwareScrollView>

        );
    }
}


const mapStateToProps = state => {
    console.log('creditCard:',state.onBoarding.creditCard);
    return {creditCard:state.onBoarding.creditCard};
};


export default connect(mapStateToProps, creditCardAction)(CreditCardInfo);
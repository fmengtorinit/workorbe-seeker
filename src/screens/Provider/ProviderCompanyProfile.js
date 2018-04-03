import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Image, TouchableOpacity, Dimensions, TextInput, Text,} from 'react-native';
import { Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Exponent, { Constants, ImagePicker, registerRootComponent } from 'expo';
import ModalDropdown from 'react-native-modal-dropdown';
// import axios from "axios";
// import * as creditCardAction from "../actions/Onboarding";

const hearderHeight = 60;
const itemWidth = '88%';

const {height, width} = Dimensions.get('window');

const style = {
    button: {
        alignContent:'center',
        backgroundColor: '#F9BA32',
        borderRadius: 5,
        paddingVertical: 10,
        width: '88%',
        height: 45,
        marginBottom: 30
    },
    buttonText:{
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
    },
    parentView1:{
        backgroundColor:"white",
        alignItems:'center',
        width: '100%',
    },
    text: {
        fontSize:18,
        color: 'black',
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    input: {
        width:'88%',
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
        backgroundColor: 'white',
        height:hearderHeight,
    },
    footer: {
        width:'100%'
    }
};


class ProviderCompanyProfile extends Component {

    static navigationOptions = ( { navigation } ) => ({
        headerTitle: "Company Profile",
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

    state = {
        imageUri:null,
        companyName:'Aecon Inc'
    };

    _pickImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
        });

        // if (pickerResult.uri) {
        //     if (index === 'new') {
        //         const data = [...this.props.media];
        //         data.push({uploadUri:pickerResult.uri});
        //         this.props.onMediaInputChange({data, index});
        //     } else {
        //         const data = {uploadUri:pickerResult.uri};
        //         this.props.onMediaInputChange({data, index});
        //     }
        // }

        if (pickerResult.uri) {
            this.setState({imageUri:pickerResult.uri});
        }



        // this._handleImagePicked(pickerResult);
    };

    renderImage() {

        if (!this.state.imageUri) {
            return (

                <Image
                    style={{height:100, width:120,marginVertical:30}}
                    source={require('../image/Company_Logo_Image_Placeholder.png')}
                    onPress={this._pickImage}
                />
            );
        } else {
            return (

                <Image
                    style={{height:100, width:120,marginVertical:30}}
                    source={{uri:this.state.imageUri}}
                />

            );
        }
    };

    render() {

        return (

            <KeyboardAwareScrollView
                contentContainerStyle={style.parentView1}
                enableOnAndroid={true}
                extraHeight={200}
            >

                <Text style={{...style.text,marginVertical:30,width:'100%',paddingHorizontal:'6%'}}> {this.state.companyName} </Text>

                <TextInput
                    placeholder="*Designation"
                    style={style.input}
                    placeholderTextColor={'#D1D1D1'}
                    underlineColorAndroid='rgba(0,0,0,0)'

                    // value={this.props.creditCard.name}
                    // onChangeText={text => this.onNameOnCardChange(text)}
                />

                <TextInput
                    placeholder="*Company Address"
                    style={style.input}
                    placeholderTextColor={'#D1D1D1'}
                    underlineColorAndroid='rgba(0,0,0,0)'

                    // value={this.props.creditCard.name}
                    // onChangeText={text => this.onNameOnCardChange(text)}
                />

                <TextInput
                    placeholder="Address Line 2"
                    style={style.input}
                    placeholderTextColor={'#D1D1D1'}
                    underlineColorAndroid='rgba(0,0,0,0)'

                    // value={this.props.creditCard.name}
                    // onChangeText={text => this.onNameOnCardChange(text)}
                />

                <TextInput
                    placeholder="Company Phone"
                    style={style.input}
                    placeholderTextColor={'#D1D1D1'}
                    underlineColorAndroid='rgba(0,0,0,0)'

                    // value={this.props.creditCard.name}
                    // onChangeText={text => this.onNameOnCardChange(text)}
                />

                <TextInput
                    placeholder="Website"
                    style={style.input}
                    placeholderTextColor={'#D1D1D1'}
                    underlineColorAndroid='rgba(0,0,0,0)'

                    // value={this.props.creditCard.name}
                    // onChangeText={text => this.onNameOnCardChange(text)}
                />

                <Text style={{fontSize:18, width:'100%',paddingLeft:'6%', marginBottom:10}}>Company Logo</Text>

                {this.renderImage()}

                <Button
                    title="Upload Logo"
                    titleStyle={style.buttonText}
                    buttonStyle={style.button}
                    onPress={this._pickImage}
                    uncheckedColor=""
                    containerStyle={{ width: '60%', alignSelf:'center', zIndex:20}}
                />

                <View style={{width:'100%',alignItems:'center'}}>
                    <Text style={{fontSize:18, width:itemWidth,marginBottom:10}}>*Company Summary</Text>

                    <TextInput
                        style={{textAlignVertical: "top",width:itemWidth, height:200, borderWidth:1, borderColor:'#D1D1D1', marginBottom: 30}}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        multiline
                        // value={description}
                        // onChangeText={input => this.onDescriptionChange(input,index)}
                    />
                </View>


                <View style={style.footer}>

                    <Button
                        title="Continue"
                        titleStyle={style.buttonText}
                        buttonStyle={{...style.button,marginBottom:10}}
                        onPress={() => this.props.navigation.navigate('providerSignUp')}
                        uncheckedColor=""
                        containerStyle={{ width: '100%', alignSelf:'center', zIndex:20}}
                    />

                    <View style={{flexDirection:'row',marginTop:-75}}>
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

        );
    }
}


// const mapStateToProps = state => {
//     console.log('creditCard:',state.onBoarding.creditCard);
//     return {creditCard:state.onBoarding.creditCard};
// };

export default ProviderCompanyProfile;
// export default connect(mapStateToProps, creditCardAction)(CreditCardInfo);
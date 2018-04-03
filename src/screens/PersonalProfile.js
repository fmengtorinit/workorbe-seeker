import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Image, TouchableOpacity, Dimensions, TextInput, Text,} from 'react-native';
import { Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {ImagePicker} from 'expo';
import * as profileAction from "../actions/Onboarding";

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
        marginBottom: 10
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
        height: '100%',
        justifyContent:'space-between'
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
        alignContent:'center',
        alignSelf:'center',
        backgroundColor: 'white',
        height:hearderHeight,
    },
    footer: {
        width:'100%'
    }
};


class PersonalProfile extends Component {

    static navigationOptions = ( { navigation } ) => ({
        headerTitle: "Personal Profile",
        headerTitleStyle: {
            textAlign: 'center',
            flexGrow: 1
        },
        headerLeft: (

            <TouchableOpacity onPress={()=> navigation.navigate('seekerReview')}>
                <Image
                    style={{width:18, height:30, marginBottom:2}}
                    source={require('./image/left.jpg')}
                />
            </TouchableOpacity>

        ),
        headerRight: (<View/>),
        headerStyle:style.header
    });

    state = {
        imageUri:null

    };

    _pickImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
        });

        if (pickerResult.uri) {
            this.props.onUserProfileChange({uploadUri:pickerResult.uri});
        }

    };

    onAddressChange = address => {
        this.props.onUserProfileChange({address})
    };

    onAddressLine2Change = addressLine2 => {
        this.props.onUserProfileChange({addressLine2})
    };

    onPhoneChange = phone => {
        this.props.onUserProfileChange({phone})
    };

    onDescriptionChange = description => {
        this.props.onUserProfileChange({description})
    };


    renderImage = () => {

        if (!this.props.userProfile.uploadUri) {
            return (

                <Image
                    style={{height:100, width:120,marginTop:10}}
                    source={require('./image/Default_Pro_Pic.png')}
                    onPress={this._pickImage}
                />
            );
        } else {
            return (
                <View
                    style={{alignItems:'center',marginTop:10}}
                >
                    <Image
                        style={{height:100, width:120}}
                        source={{uri:this.props.userProfile.uploadUri}}
                    />

                    <Image
                        style={{height:104, width:120,marginTop:-102}}
                        source={require('./image/Hexagon_Frame.png')}
                    />

                </View>
            );
        }
    };

    renderAddress = () => {
        if (this.props.userType === 'seeker') {
            return (
                    <TextInput
                        placeholder="Address"
                        style={style.input}
                        placeholderTextColor={'#D1D1D1'}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        value={this.props.userProfile.address}
                        onChangeText={text => this.onAddressChange(text)}
                    />
            );
        }
    };

    renderAddress2 = () => {
        if (this.props.userType === 'seeker') {
            return (
                <TextInput
                    placeholder="Address Line 2"
                    style={style.input}
                    placeholderTextColor={'#D1D1D1'}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    value={this.props.userProfile.addressLine2}
                    onChangeText={text => this.onAddressLine2Change(text)}
                />
            );
        }
    };

    renderLogo = () => {
        if (this.props.userType === 'provider') {
            return (
                <Image
                    style={{height:140,width:130,zIndex:-1}}
                    source={require('./image/blue_hexagon_bottom_360.png')}
                />
            );
        } else {
            return (
                <Image
                    style={{height:140,width:130,zIndex:-1}}
                    source={require('./image/orange_hexagon_bottom_360.png')}
                />
            );
        }
    };

    render() {

        return (

            <KeyboardAwareScrollView
                contentContainerStyle={style.parentView1}
                enableOnAndroid={true}
                extraHeight={800}
            >
                {this.renderImage()}


                <Button
                    title="Upload Profile Image"
                    titleStyle={style.buttonText}
                    buttonStyle={style.button}
                    onPress={this._pickImage}
                    uncheckedColor=""
                    containerStyle={{ width: '60%', alignSelf:'center', zIndex:20}}
                />

                {this.renderAddress()}
                {this.renderAddress2()}

                <TextInput
                    placeholder="Phone"
                    style={style.input}
                    placeholderTextColor={'#D1D1D1'}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    value={this.props.userProfile.phone}
                    onChangeText={text => this.onPhoneChange(text)}

                />

                <View style={{width:'100%',alignItems:'center'}}>
                    <Text style={{fontSize:18, width:itemWidth,marginBottom:5}}>Description</Text>

                    <TextInput
                        style={{fontSize:18,textAlignVertical: "top",width:itemWidth, height:(this.props.userType === 'provider' ? 200 : 150), borderWidth:1, borderColor:'#D1D1D1', marginBottom: 20}}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        multiline
                        value={this.props.userProfile.description}
                        onChangeText={text => this.onDescriptionChange(text)}
                    />
                </View>

                <View style={style.footer}>

                    <Button
                        title="Continue"
                        titleStyle={style.buttonText}
                        buttonStyle={style.button}
                        onPress={() => this.props.navigation.navigate('seekerCapability')}
                        uncheckedColor=""
                        containerStyle={{ width: '100%', alignSelf:'center', zIndex:20}}
                    />

                    <View style={{flexDirection:'row',marginTop:-75}}>

                        {this.renderLogo()}
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
    console.log('userType:',state.onBoarding.userType);
    return {
        userProfile:state.onBoarding.userProfile,
        userType:state.onBoarding.userType
    };
};

export default connect(mapStateToProps, profileAction)(PersonalProfile);
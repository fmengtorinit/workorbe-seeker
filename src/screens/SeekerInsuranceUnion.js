import React, {Component} from 'react';
import {View, ScrollView, Image, TouchableOpacity, Platform, Dimensions, FlatList, TextInput, Text, KeyboardAvoidingView} from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Exponent, { Constants, ImagePicker, registerRootComponent } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as insuranceUnionAction from "../actions/seeker/SeekerOnboarding";
import {connect} from "react-redux";

const {height, width} = Dimensions.get('window');

const hearderHeight = 60;
const itemWidth = '88%';
const marginBottom = 30;

const style = {
    button: {
        alignContent:'center',
        backgroundColor: '#F9BA32',
        borderRadius: 5,
        paddingVertical: 10,
        width: itemWidth,
        height: 45,
        marginTop: 0,
        marginBottom: 15
    },
    buttonText:{
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
    text: {
        fontSize:20,
        color: 'black',
        alignSelf: 'center',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    input: {
        fontSize:20,
        width:'itemWidth',
        borderBottomWidth:1,
        borderBottomColor:'#D1D1D1',
        marginBottom:marginBottom
    },
    parentView1:{
        backgroundColor:"white",
        alignItems:'center',
        width: '100%',
        justifyContent: 'space-between',
        height: '100%'
    },
    parentView2:{
        backgroundColor:"white",
        alignItems:'center',
        width: '100%'
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
    }
};

class InsuranceUnion extends Component {

    static navigationOptions = ( { navigation } ) => ({
        headerTitle: "Insurance",
        headerTitleStyle: {
            textAlign: 'center',
            flexGrow: 1
        },
        headerLeft: (<View/>),

        headerRight: (

            <TouchableOpacity style={{backgroundColor: 'transparent'}} onPress={()=> navigation.navigate('seekerCapability')}>
                <Text style={{color:'#3C5A99',fontWeight:'bold',fontSize:20}}>Skip</Text>
            </TouchableOpacity>
        ),
        headerStyle:style.header
    });

    state = {
        longerThanFullScreen:false,
    };

    _pickImage = async (type) => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false
        });

        const uploadUri = pickerResult.uri;
        if (uploadUri) {
            if (type === 'union') {
                this.props.onUnionInputChange({uploadUri});
            } else {
                this.props.onInsuranceInputChange({uploadUri});
            }
        }

    };

    onInsuranceNameInputChange = name => {
        this.props.onInsuranceInputChange({name});
    };

    onUnionNameInputChange = name => {
        this.props.onUnionInputChange({name});
    };

    onUnionNumInputChange = number => {
        this.props.onUnionInputChange({number});
    };

    renderUpload = type => {

        if ((type === "union" ? this.props.union.uploadUri : this.props.insurance.uploadUri)) {
            return (
                <TouchableOpacity
                    style={{width:'100%', marginBottom:40}}
                    onPress={() => this._pickImage(type)}
                >
                    <Image
                        style={{height:200, width:200, alignSelf:'center'}}
                        source={{uri:(type === "union" ? this.props.union.uploadUri : this.props.insurance.uploadUri)}}
                    />
                </TouchableOpacity>
            );
        }
    };

    renderMediaBtn = type => {

        if (!this.props[type].uploadUri) {

            return (

                <TouchableOpacity
                    style={{width:'100%', marginBottom:20}}
                    onPress={() => this._pickImage(type)}
                >
                    <Image
                        style={{height:45, width:53, alignSelf:'flex-start'}}
                        source={require('./image/Add_Pentagon.jpg')}
                    />
                </TouchableOpacity>
            );
        }
    };

    render() {

        return (

            <KeyboardAwareScrollView
                contentContainerStyle={this.props.insurance.uploadUri || this.props.union.uploadUri ? style.parentView2 : style.parentView1}
                enableOnAndroid={true}
                extraHeight={200}
            >

                <View style={{width:itemWidth,marginTop:20}}>

                    <TextInput
                        placeholder="Insurance Name"
                        style={{...style.input, width:'100%'}}
                        placeholderTextColor={style.placeholderColor}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        value={this.props.insurance.name}
                        onChangeText={input => this.onInsuranceNameInputChange(input)}
                    />

                    <Text key="insurance" style={{...style.text,alignSelf:'flex-start', marginBottom:20}}>Media</Text>

                    {this.renderMediaBtn('insurance')}
                    {this.renderUpload('insurance')}
                </View>

                <View style={{width:itemWidth}}>

                    <Text style={{...style.text,marginBottom:30}}>Union</Text>

                    <TextInput
                        placeholder="Union Name"
                        style={{...style.input, width:'100%'}}
                        placeholderTextColor={style.placeholderColor}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        value={this.props.union.name}
                        onChangeText={input => this.onUnionNameInputChange(input)}

                    />

                    <TextInput
                        placeholder="Union Number"
                        style={{...style.input, width:'100%'}}
                        placeholderTextColor={style.placeholderColor}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        value={this.props.union.number}
                        onChangeText={input => this.onUnionNumInputChange(input)}
                    />

                    <Text key="union" style={{...style.text,alignSelf:'flex-start', marginBottom:20}}>Media</Text>

                    {this.renderMediaBtn('union')}
                    {this.renderUpload('union')}

                </View>

                <View style={{width:'100%'}}>
                    <Button
                        title="Continue"
                        titleStyle={style.buttonText}
                        onPress={() => this.props.navigation.navigate('seekerReview')}
                        buttonStyle={style.button}
                        uncheckedColor=""
                        containerStyle={{ width: '100%', alignSelf:'center', zIndex:20}}
                    />

                    <View style={{flexDirection:'row',marginTop:-75}}>
                        <Image
                            style={{height:140,width:130,zIndex:0,}}
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
    return {
        insurance: state.seekerOnBoarding.insurance,
        union: state.seekerOnBoarding.union
    };
};

export default connect(mapStateToProps, insuranceUnionAction)(InsuranceUnion);
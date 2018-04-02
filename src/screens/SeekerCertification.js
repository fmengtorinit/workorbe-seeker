import React, {Component} from 'react';
import {View, ScrollView, Image, TouchableOpacity, Platform, Dimensions,TextInput, Text} from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import Exponent, { Constants, ImagePicker, registerRootComponent } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as certificationAction from "../actions/seeker/SeekerOnboarding";
import {connect} from "react-redux";


const {height, width} = Dimensions.get('window');

const hearderHeight = 60;
const itemWidth = '88%';
const inputMarginTop = 40;
const plusBtnMarginBottom = 40;
const inputHeight = 30;
const plusMediaBtnHeight = 45;
const mediaHeight = 30;
const mediaMarginV = 30;
const plusCertBtnHeight = 30;
const spacerViewHeight = height - ((inputMarginTop + inputHeight)*3 + mediaMarginV*2 + mediaHeight + plusMediaBtnHeight + plusBtnMarginBottom) - hearderHeight -20 ;

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
        height:mediaHeight,
        fontSize:20,
        color: 'black',
        alignSelf: 'center',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    input: {
        height:inputHeight,
        fontSize:20,
        width:'itemWidth%',
        borderBottomWidth:1,
        borderBottomColor:'#D1D1D1',
        marginTop:inputMarginTop
    },
    parentView1:{
        backgroundColor:"white",
        alignItems:'center',
        justifyContent: 'space-between',
        width: '100%',
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
        height:hearderHeight
    }
};

class SeekerCertification extends Component {

    static navigationOptions = ( { navigation } ) => ({
        headerTitle: "Certification",
        headerTitleStyle: {
            textAlign: 'center',
            flexGrow: 1
        },
        headerLeft: (<View/>),
        headerRight: (
            <TouchableOpacity style={{backgroundColor: 'transparent'}} onPress={()=> navigation.navigate('seekerInsuranceUnion')}>
                <Text style={{color:'#3C5A99',fontWeight:'bold',fontSize:20}}>Skip</Text>
            </TouchableOpacity>
        ),
        headerStyle:style.header
    });

    state = {
        showSpec: false,
        certificationList:[{key:'cert1',name:'', authority:'', year:'', uploadUri:''}],
        isSpecSelectedDone:false,
        numOfCertificationSelected:0
    };

    _pickImage = async index => {
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false
        });

        const uploadUri = pickerResult.uri;
        if (uploadUri) {
            const data = {uploadUri};
            this.props.onCertificationInputChange({data, index});
        }
    };

    onNameChange = (name,index) => {
        const data = {name};
        this.props.onCertificationInputChange({data, index});
    };

    onAuthorityChange = (authority,index) => {
        const data = {authority};
        this.props.onCertificationInputChange({data, index});
    };

    onYearChange = (year,index) => {
        if (year.length < 5) {
            const data = {year};
            this.props.onCertificationInputChange({data, index});
        }
    };

    renderCertDoc = (uploadUri='',index) => {
        return (
            <TouchableOpacity
                style={{width:'100%'}}
                onPress={() => this._pickImage(index)}
            >
                <Image
                    style={{height:200, width:200, alignSelf:'center'}}
                    source={{uri:uploadUri}}
                />
            </TouchableOpacity>
        );
    };

    renderAddMediaBtn = index => {

        return (
            <TouchableOpacity
                style={{width:'100%'}}
                onPress={() => this._pickImage(index)}
            >
                <Image
                    style={{height:plusMediaBtnHeight, width:53, alignSelf:'flex-start'}}
                    source={require('./image/Add_Pentagon.jpg')}
                />
            </TouchableOpacity>
        );
    };

    renderCertification = (cert,index) => {

        const {name,authority,year,uploadUri} = cert;

        return (
            <View key={index} style={{width:itemWidth}}>

                <TextInput
                    placeholder="Certification Name"
                    style={{...style.input, width:'100%'}}
                    placeholderTextColor={style.placeholderColor}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    value={name}
                    onChangeText={input => this.onNameChange(input, index)}
                />

                <TextInput
                    placeholder="Certification Authority"
                    style={{...style.input,width:'100%'}}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    value={authority}
                    onChangeText={input => this.onAuthorityChange(input, index)}
                />

                <TextInput
                    placeholder="Year"
                    style={{...style.input,width:'15%' }}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    keyboardType='numeric'
                    value={year}
                    onChangeText={input => this.onYearChange(input, index)}
                />

                <Text style={{...style.text, alignSelf:'flex-start', marginVertical:mediaMarginV}}>Media</Text>

                {uploadUri !== '' ? null : this.renderAddMediaBtn(index)}
                {uploadUri !== '' ? this.renderCertDoc(uploadUri,index) : null}
                {this.renderAddCertBtn(index)}

            </View>
        );
    };

    renderAddCertBtn = index => {
        const certQty = Object.keys(this.props.certification).length;
        if (index === certQty -1 && certQty < 6) {
            return (
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'center',
                    alignSelf: 'center',
                    zIndex: 100,
                    marginTop: 20,
                    marginBottom: 60
                }}>

                    <TouchableOpacity
                        style={{
                            width: 28,
                            height: 28,
                            backgroundColor: '#F9BA32',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: 20,
                            zIndex: 20,
                        }}
                        onPress={this.addCert}
                    >
                        <Image
                            style={{height: 28, width: 28, zIndex: 10}}
                            source={require('./image/add_new.jpg')}
                        />
                    </TouchableOpacity>

                    <Text style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontWeight:'bold',
                        fontSize:20
                    }}
                    >
                        Add Certification
                    </Text>

                </View>
            );
        } else {
            return (<View style={{height:60,backgroundColor:'white'}}/>);
        }
    };

    addCert = () => {

        let data = [...this.props.certification];
        data.push({name:'', authority:'', year:'', uploadUri:''});
        const index = 'new';
        this.props.onCertificationInputChange({data, index});

    };

    renderCertificationList = () => this.props.certification.map( (cert,index) => this.renderCertification(cert,index) ) ;

    render() {

        console.log('this.props.certification[0].uploadUri: ',this.props.certification[0].uploadUri);
        console.log("this.props.certification[0].uploadUri ==='': ", this.props.certification[0].uploadUri === '');

        return (

            <KeyboardAwareScrollView

                contentContainerStyle={ (Object.keys(this.props.certification).length === 1 || this.props.certification[0].uploadUri === '' ? style.parentView1 : style.parentView2)}
                enableOnAndroid={true}
                extraHeight={200}
            >
                <View style={{}}>
                    {this.renderCertificationList()}
                </View>
                <View style={{width:'100%'}}>

                    <Button
                        title="Continue"
                        titleStyle={style.buttonText}
                        buttonStyle={style.button}
                        onPress={() => this.props.navigation.navigate('seekerInsuranceUnion')}
                        uncheckedColor=""
                        containerStyle={{ width: '100%', alignSelf:'center', zIndex:20}}
                    />

                    <View style={{flexDirection:'row',marginTop:-75}}>
                        <Image
                            style={{height:140,width:130,zIndex:0}}
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

const mapStateToProps = state => ({certification:state.seekerOnBoarding.certification});

export default connect(mapStateToProps, certificationAction)(SeekerCertification);
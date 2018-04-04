import React, {Component} from 'react';
import {View, Image, TouchableOpacity, Platform, Dimensions, Text} from 'react-native';
import { Button} from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import seekerMap from "./Map";
import * as seekerOnBoardingAction from '../actions/seeker/SeekerOnboarding';
import * as OnBoardingActionAction  from "../actions/Onboarding";
import {connect} from "react-redux";

const {height, width} = Dimensions.get('window');

const hearderHeight = 60;
const itemWidth = '100%';
const inputMarginTop = 40;
const plusBtnMarginBottom = 40;
const inputHeight = 30;
const plusMediaBtnHeight = 45;
const mediaHeight = 30;
const mediaMarginV = 30;

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
        height:30,
        fontSize:20,
        color: 'black'
    },
    input: {
        height:inputHeight,
        fontSize:20,
        width:'itemWidth%',
        borderBottomWidth:1,
        borderBottomColor:'#D1D1D1',
        marginTop:inputMarginTop
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
        borderBottomWidth: 0

    },
};

class SeekerReview extends Component {

    static navigationOptions = ( { navigation } ) => ({
        headerTitle: "Review",
        headerTitleStyle: {
            textAlign: 'center',
            flexGrow: 1
        },
        headerLeft: null,
        headerRight: null,
        headerStyle:style.header
    });

    state = {

    };

    renderEditBtn = (screen ='',marginTop=30) => (
        <TouchableOpacity
            style={{marginTop,alignSelf:'flex-end'}}
            onPress={() => this.props.navigation.navigate(screen)}
        >
            <Image
                style={{width:30,height:30}}
                source={require('./image/edit_pen_icon.jpg')}
            />
        </TouchableOpacity>
    );

    renderProfile = profile => {
        const {name,address,addressLine2,phone,description,uploadUri} = profile;

        return (
            <View style={{width:itemWidth, alignItems:'center',paddingHorizontal:'6%',marginBottom:30}}>

                {this.renderEditBtn('personalProfile',0)}

                {this.renderImage(uploadUri,'profile')}

                <Text style={{...style.text,fontWeight:'bold',marginVertical:20}}>{name}</Text>
                {address ? <Text style={style.text}>{address}</Text> : null}
                {addressLine2 ? <Text style={style.text}>{addressLine2}</Text> : null}
                {description ? <Text style={{fontSize:20, color: 'black'}}> {description} </Text> : null}

            </View>

        );
    };

    renderAvailability = availability => {

        const {date} = availability;

        return (
            <View style={{width:itemWidth, alignItems:'center', borderTopWidth:1, borderTopColor:'#D1D1D1',borderStyle:'dotted',marginBottom:30}}>

                <View style={{width:'88%'}}>
                    <Text style={{...style.text, fontWeight:'bold',textAlign:'center', marginTop:30}}> Availability </Text>
                    {this.renderEditBtn('',-35)}
                </View>
            </View>
        );
    };

    renderSpecializations = specializations => {

        const specList = [];
        const specializationsList = [];

        for (let spec in specializations) {
            if (specializations.hasOwnProperty(spec)) {
                specializationsList.push(spec);
            }
        }

        if (specializationsList.length > 0) {

            specializationsList.forEach((spec, index) => {

                if (index % 2 !== 0) {

                    specList.push(
                        <View key={index}
                              style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text key={specializationsList[index - 1]} style={{
                                ...style.text,
                                fontWeight: 'normal'
                            }}> {specializationsList[index - 1]} </Text>
                            <Text key={spec} style={{...style.text, fontWeight: 'normal'}}> {spec} </Text>
                        </View>
                    );

                } else if (index === specializationsList.length - 1) {

                    specList.push(
                        <View key={index}
                              style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                            <Text key={spec} style={{...style.text, fontWeight: 'normal'}}> {spec} </Text>
                        </View>
                    );
                }
            });

            return (
                <View style={{marginBottom: 30}}>
                    {specList}
                </View>
            );
        }
    };

    renderExperience = expList => {
        if (expList.length > 0) {


            const exp = expList.map(({title, companyName, fromMM, fromYYYY, toMM, toYYYY, description},index) => {

                if (title || companyName || fromMM || fromYYYY || toMM || toYYYY || description) {

                    let from;
                    let to;

                    if (!fromMM) {
                        from = fromYYYY;
                    } else {
                        from = `${fromMM}/${fromYYYY}`;
                    }

                    if (!toMM) {
                        to = toYYYY;
                    } else {
                        to = `${toMM}/${toYYYY}`;
                    }

                    return (
                                <View key={index} style={{alignItems:'flex-start', marginBottom:40}}>
                                    {companyName ? <Text style={{...style.text,fontWeight:'bold',height:25}}>{companyName}</Text> : null}
                                    {title ? <Text style={{...style.text,height:25}}>{title}</Text> : null}
                                    <View style={{flexDirection:'row', alignItems:'center'}}>
                                        <Text style={{...style.text,height:25}}>{from}</Text>
                                        <Text style={{marginHorizontal:10}}>{to && from ? '-' : ''}</Text>
                                        <Text style={{...style.text,height:25}}>{to}</Text>
                                    </View>
                                    {description ? (<Text style={{fontSize:20, color: 'black', marginTop:10}}>{description}</Text>) : null}
                                </View>
                    );
                }
            });

            return (
                <View>
                    {exp}
                </View>
            );
        }
    };

    renderCapability = cap => {
        const {capability='', specializations={}, rate=0, yearsOfExperience=0,experience=[]} = cap;
        return (
            <View style={{width:itemWidth, alignItems:'center',borderTopWidth:1, borderTopColor:'#D1D1D1',borderStyle:'dotted'}}>

                <View style={{width:'88%',justifyContent:'center'}}>

                    <Text style={{...style.text, alignSelf:'center',fontWeight:'bold',marginTop:30}}> Capability/Portfolio </Text>

                    {this.renderEditBtn('seekerCapability',-30)}

                    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20}}>

                        <Text style={{...style.text,color:'#426E86',fontWeight:'bold'}}>{capability}</Text>

                        <View style={{flexDirection:'row', alignItems:'center'}}>

                            <Image
                                style={{height:18, width:10,marginRight:3}}
                                source={require('./image/Dollar.png')}
                            />

                            <Text style={{...style.text}}>{rate}</Text>

                        </View>

                    </View>

                    <Text style={{...style.text, alignSelf:'flex-start',fontWeight:'normal',marginBottom:30}}>{'Years of Experience:  ' + (yearsOfExperience ? (yearsOfExperience + ' yrs') : '' )}</Text>
                    {Object.keys(specializations).length === 0 && specializations.constructor === Object ? null : <Text style={{...style.text,fontWeight:'bold',textAlign:'center',marginBottom:30}}> Specializations </Text>}

                    {this.renderSpecializations(specializations)}

                    {experience.length > 0 ? <Text style={{...style.text,fontWeight:'bold',textAlign:'center', marginBottom:30}}> Experience </Text> : null }

                    {this.renderExperience(experience)}


                </View>
            </View>

        );
    };


    renderMedia = media => {

        const renderMediaList = media.map( ({uploadUri},index) => this.renderImage(uploadUri,`media-${index}`));

        return (
            <View style={{width:itemWidth, alignItems:'center',borderTopWidth:1, borderTopColor:'#D1D1D1',borderStyle:'dotted',marginBottom:30}}>
                <View style={{width:'88%',justifyContent:'center'}}>
                    <Text style={{...style.text,fontWeight:'bold',marginTop:30,alignSelf:'center'}}>Media</Text>

                    {this.renderEditBtn('media',-30)}

                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around',marginTop:(renderMediaList.length > 0 ? 30 : 0)}}>

                        {renderMediaList}

                    </View>
                </View>
            </View>
        );
    };


    renderCertificationList = certifications => {

        const certificationList = certifications.map( ({name,authority,year,uploadUri}) => {

            if (name || authority || year || uploadUri) {

                return (
                        <View key={name} style={{marginBottom:20,alignItems:'flex-start'}}>
                            {name ? (<Text style={{...style.text,fontWeight:'bold',marginTop:30, marginBottom:5, color:'#426E86'}}>{name}</Text>) : null}
                            {authority ? (<Text style={style.text}>{authority}</Text>) : null}
                            {year ? (<Text style={style.text}>{year}</Text>) : null}
                            {this.renderImage(uploadUri,'',{marginTop:10})}
                        </View>
                );
            }
        });

        return (
            <View style={{width:itemWidth, alignItems:'center',borderTopWidth:1, borderTopColor:'#D1D1D1',borderStyle:'dotted',marginBottom:30}}>

                <View style={{width:'88%',justifyContent:'center'}}>
                    <Text style={{...style.text,fontWeight:'bold',marginTop:30, alignSelf:'center'}}>Certification</Text>

                    {this.renderEditBtn('seekerCertification',-30)}

                    {certificationList}

                </View>

            </View>

        );
    };


    renderInsurance = insurance => {

        const {name, uploadUri} = insurance;

        return (
            <View style={{width:itemWidth, alignItems:'center',borderTopWidth:1, borderTopColor:'#D1D1D1',borderStyle:'dotted',marginBottom:30}}>

                <View style={{width:'88%',alignItems:'flex-start'}}>

                    <Text style={{...style.text,fontWeight:'bold',marginTop:30,alignSelf:'center'}}>Insurance</Text>

                    {this.renderEditBtn('seekerInsuranceUnion',-30)}

                    <Text style={{...style.text, fontWeight:'bold', color:'#426E86',width:'88%', marginTop: (name ? 30 : 0), height:(name ? 30 : 0)}}>{name}</Text>

                    {this.renderImage(uploadUri,'insurance',{marginTop:20})}

                </View>
            </View>
        );
    };


    renderImage = (uri,index='',style={borderWidth:0}) => {
        if (uri) {
            return (
                <View
                    key={index}
                    style={{alignItems:'center',...style}}
                >
                    <Image
                        style={{height:100, width:120,zIndex:-1}}
                        source={{uri}}
                    />

                    <Image
                        style={{height:104, width:120,marginTop:-102,zIndex:10}}
                        source={require('./image/Hexagon_Frame.png')}
                    />

                </View>
            );
        }
    };

    renderUnion = union => {

        const {name, number, uploadUri} = union;

        return (
            <View style={{width:itemWidth, alignItems:'center',borderTopWidth:1, borderTopColor:'#D1D1D1',borderStyle:'dotted',marginBottom:30}}>

                <View style={{width:'88%',alignItems:'flex-start'}}>
                    <Text style={{...style.text,fontWeight:'bold',alignSelf:'center',marginTop:30}}>Union</Text>

                    {this.renderEditBtn('seekerInsuranceUnion',-30)}

                    <Text style={{...style.text, fontWeight:'bold', color:'#426E86',width:'88%',marginTop: (name ? 30 : 0)}}>{name}</Text>
                    <Text style={{...style.text, fontWeight:'bold', color:'black',width:'88%',marginTop: (number ? 10 : 0)}}>{number}</Text>

                    {uploadUri ? this.renderImage(uploadUri, 'union',{marginTop:20}) : null}

                </View>

            </View>

        );
    };


    render() {

        return (

            <KeyboardAwareScrollView

                contentContainerStyle={{ width:'100%', backgroundColor:'white', alignItems:'center'}}
                enableOnAndroid={true}
                extraHeight={200}
            >

                {this.renderProfile(this.props.userProfile)}

                {this.renderAvailability({
                    dates:'safasfsf'
                })}

                {this.renderCapability({
                    ...this.props.capability,
                    experience:this.props.experience
                })}

                {this.renderMedia(this.props.media)}

                {this.renderCertificationList(this.props.certification)}

                {this.renderInsurance(this.props.insurance)}

                {this.renderUnion(this.props.union)}

                <View style={{width:itemWidth, marginTop:40}}>

                    <Button
                        title="Start Now"
                        titleStyle={style.buttonText}
                        onPress={() => this.props.navigation.navigate('creditCardInfo')}
                        buttonStyle={style.button}
                        uncheckedColor=""
                        containerStyle={{ width: '88%', alignSelf:'center', zIndex:20}}
                    />

                    <View style={{flexDirection:'row', marginTop:-75}}>
                        <Image
                            style={{height:140, width:130, zIndex:0,}}
                            source={require('./image/orange_hexagon_bottom_360.png')}
                        />

                        <View style={{zIndex:10, marginTop:80}}>
                            <Text style={{color:'#D1D1D1', textAlign:'center'}}> Copyright 2018 Workorbe</Text>
                            <Text style={{color:'#D1D1D1', textAlign:'center'}}> All right reserved</Text>
                        </View>
                    </View>

                </View>
            </KeyboardAwareScrollView>

        );
    }
}

async function uploadImageAsync(uri) {
    let apiUrl = 'https://file-upload-example-backend-dkhqoilqqn.now.sh/upload';

    // Note:
    // Uncomment this if you want to experiment with local server
    //
    // if (Constants.isDevice) {
    //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
    // } else {
    //   apiUrl = `http://localhost:3000/upload`
    // }

    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append('photo', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
    });

    let options = {
        method: 'POST',
        body: formData,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
    };

    return fetch(apiUrl, options);
}

const mapStateToProps = state => {
    return {
        media:state.onBoarding.media,
        creditCard:state.onBoarding.creditCard,
        certification:state.seekerOnBoarding.certification,
        capability:state.seekerOnBoarding.capability,
        experience:state.seekerOnBoarding.experience,
        insurance:state.seekerOnBoarding.insurance,
        union:state.seekerOnBoarding.union,
        userProfile:state.onBoarding.userProfile
    };
};

export default connect(mapStateToProps, {seekerOnBoardingAction,OnBoardingActionAction})(SeekerReview);

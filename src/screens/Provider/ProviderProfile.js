import React, {Component} from 'react';
import {View, Image, TouchableOpacity, Platform, Dimensions, Text} from 'react-native';
import { Button} from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import * as seekerOnBoardingAction from '../actions/seeker/SeekerOnboarding';
// import * as OnBoardingActionAction  from "../actions/Onboarding";
import {connect} from "react-redux";

const {height, width} = Dimensions.get('window');

const hearderHeight = 60;
const profileImageWidth = 100;
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

class ProviderProfile extends Component {

    static navigationOptions = ( { navigation } ) => ({
        headerTitle: "Profile",
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
                source={require('../image/edit_pen_icon.jpg')}
            />
        </TouchableOpacity>
    );

    renderProfile = profile => {

        const {full_name,email,address,company_data,company_title,mobile_no,profile_pic,rating, numOfRating} = profile;

        return (
            <View style={{width:itemWidth, alignItems:'center',paddingHorizontal:'6%'}}>

                {this.renderEditBtn('',0)}

                <View>
                    <Image
                        style={{height:100, width:110, borderWidth:1, borderColor:'red',marginTop:-30}}
                        source={require('../image/new-logo.png')}
                    />

                    <Image
                        style={{height:100, width:110, borderWidth:1, borderColor:'red', marginTop:-100}}
                        source={require('../image/Hexagon_Frame.png')}
                    />

                </View>

                <Text style={{...style.text,fontWeight:'bold',marginTop:20}}>{full_name}</Text>
                <Text style={{...style.text,fontWeight:'bold',color:'#426E86'}}>{company_title}</Text>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Image
                        style={{height:23, width:23, marginRight:10}}
                        source={require('../image/Star.png')}
                    />

                    <Text style={{...style.text}}>{rating}/5 ({numOfRating})</Text>

                </View>
                {/*<Text style={style.text}>{address}</Text>*/}

                <Text style={{fontSize:20, color: 'black'}}> {} </Text>

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


    renderImage = (uri='',index='',style={borderWidth:0}) => {
        if (uri) {
            return (
                <View
                    key={index}
                    style={style}
                >
                    <Image
                        style={{height:100, width:110, zIndex:-10}}
                        source={{uri}}
                    />

                    <Image
                        style={{height:100, width:110, zIndex:10}}
                        source={require('../image/Hexagon_Frame.png')}
                    />

                </View>
            );
        }
    };

    renderReviewList = reviews => {

        const renderReviewList = reviews.map(({raterName, profileImageUrl, rating, date, comment},index) => {
            if (raterName || rating || date || comment || profileImageUrl) {
                return (
                    <View key={'review'+index} style={{width:'88%'}}>
                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>

                            {this.renderImage(profileImageUrl,index,{borderWidth:1, borderColor:'red', margin:0, height:100, width:profileImageWidth})}

                            <View style={{width: (width - profileImageWidth -20)}}>
                                <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between'}}>
                                    <Text style={style.text}>{raterName}</Text>
                                    <Text style={style.text}>{date}</Text>
                                </View>

                                <View style={{flexDirection:'row'}}>
                                    <Image
                                        style={{height:23, width:23, marginRight:10}}
                                        source={require('../image/Star.png')}
                                    />

                                    <Text style={{...style.text}}>{rating}/5</Text>

                                </View>
                            </View>

                        </View>
                    </View>
                )
            }
        });

        return (
            <View style={{width:itemWidth, alignItems:'center',borderTopWidth:1, borderTopColor:'#D1D1D1',borderStyle:'dotted',marginBottom:30}}>
                <View style={{width:'88%',justifyContent:'center'}}>
                    <Text style={{...style.text,fontWeight:'bold',marginTop:30,alignSelf:'center'}}>Review</Text>

                    <View style={{marginTop:(renderReviewList.length > 0 ? 30 : 0)}}>

                        {renderReviewList}

                    </View>
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

                {/*full_name,email,address,company_data,mobile_no,profile_pic*/}

                {this.renderProfile({
                    full_name:"John Van Eck",
                    email:'assdf@sdffas.com',
                    company_title:'CEO',
                    numOfRating:32,
                    mobile_no:'1-647-234-3434',
                    address:"350 Adelaide St, Toronto, ON, M5V1R7",
                    rating:4.3,
                    description:"asdadsfaasf asdsfadsdfafs asdfasfasfsa asdfasfsfasf asfsadffasfsa asdsfasfsdafadsfsaf asdfasfsafsdfaf asdsfasfadfsafa  asdfasfsafasfs assdfsafdsfasfas"
                })}


                {this.renderMedia([
                        {uploadUri:'https://torinit.com/assets/workorbe/Blue-Hexagon-Top.png'},
                        {uploadUri:'https://torinit.com/assets/workorbe/Blue-Hexagon-Top.png'}
                    ])
                }


                {this.renderReviewList([
                        {profileImageUrl:'https://torinit.com/assets/workorbe/Blue-Hexagon-Top.png',raterName:'Akshit', rating:4.3, date:'Oct 21.2017', comment:'Well done'},
                        {profileImageUrl:'https://torinit.com/assets/workorbe/Blue-Hexagon-Top.png',raterName:'Akshit', rating:1, date:'Oct 21.2017', comment:'Badly done'},
                        {profileImageUrl:'https://torinit.com/assets/workorbe/Blue-Hexagon-Top.png',raterName:'Akshit', rating:3, date:'Oct 21.2017', comment:'so so'}
                    ])
                }

                <View style={{width:itemWidth, marginTop:40}}>

                    <Button
                        title="Start Now"
                        titleStyle={style.buttonText}
                        onPress={() => this.props.navigation.navigate('seekerCapability')}
                        buttonStyle={style.button}
                        uncheckedColor=""
                        containerStyle={{ width: '88%', alignSelf:'center', zIndex:20}}
                    />

                    <View style={{flexDirection:'row', marginTop:-75}}>
                        <Image
                            style={{height:140, width:130, zIndex:0,}}
                            source={require('../image/orange_hexagon_bottom_360.png')}
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

// async function uploadImageAsync(uri) {
//     let apiUrl = 'https://file-upload-example-backend-dkhqoilqqn.now.sh/upload';
//
//     // Note:
//     // Uncomment this if you want to experiment with local server
//     //
//     // if (Constants.isDevice) {
//     //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
//     // } else {
//     //   apiUrl = `http://localhost:3000/upload`
//     // }
//
//     let uriParts = uri.split('.');
//     let fileType = uriParts[uriParts.length - 1];
//
//     let formData = new FormData();
//     formData.append('photo', {
//         uri,
//         name: `photo.${fileType}`,
//         type: `image/${fileType}`,
//     });
//
//     let options = {
//         method: 'POST',
//         body: formData,
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'multipart/form-data',
//         },
//     };
//
//     return fetch(apiUrl, options);
// }

// const mapStateToProps = state => {
//     return {
//         media:state.onBoarding.media,
//         creditCard:state.onBoarding.media,
//         certification:state.seekerOnBoarding.certification,
//         capability:state.seekerOnBoarding.capability,
//         experience:state.seekerOnBoarding.experience,
//         insurance:state.seekerOnBoarding.insurance,
//         union:state.seekerOnBoarding.union
//     };
// };

export default ProviderProfile;

// export default connect(mapStateToProps, {seekerOnBoardingAction,OnBoardingActionAction})(ProviderProfile);

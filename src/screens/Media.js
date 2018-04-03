import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, ScrollView, Image, TouchableOpacity, Platform, Dimensions, Text} from 'react-native';
import { Button } from 'react-native-elements';
import Exponent, { Constants, ImagePicker, registerRootComponent } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as mediaAction  from "../actions/Onboarding";

const {height, width} = Dimensions.get('window');

const hearderHeight = 60;

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
    parentView1:{
        backgroundColor:"white",
        alignItems:'center',
        width: '100%',
        height: '100%',
        justifyContent:'space-between'
    },
    parentView2:{
        backgroundColor:"white",
        alignItems:'center',
        width: '100%',
    },
    input: {
        width:'88%',
        borderBottomWidth:1,
        borderBottomColor:'#D1D1D1',
        marginBottom:20
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
        width:'100%',
        bottom:0,
    },
};


class Media extends Component {

    static navigationOptions = ( { navigation } ) => ({
        headerTitle: "Media",
        headerTitleStyle: {
            textAlign: 'center',
            flexGrow: 1
        },
        headerLeft: (<View/>),

        headerRight: (

            <TouchableOpacity style={{backgroundColor: 'transparent'}} onPress={()=> navigation.navigate('seekerCertification')}>
                <Text style={{color:'#3C5A99',fontWeight:'bold',fontSize:20}}>Skip</Text>
            </TouchableOpacity>
        ),
        headerStyle:style.header
    });

    state = {
        image: null,
        uploading: false,
        uri:[]
    };

    _pickImage = async (index) => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
        });

        if (pickerResult.uri) {
            if (index === 'new') {
                const data = [...this.props.media];
                data.push({uploadUri:pickerResult.uri});
                this.props.onMediaInputChange({data, index});
            } else {
                const data = {uploadUri:pickerResult.uri};
                this.props.onMediaInputChange({data, index});
            }
        }

        // this._handleImagePicked(pickerResult);
    };

    // _handleImagePicked = async pickerResult => {
    //     let uploadResponse, uploadResult;
    //
    //     try {
    //         this.setState({ uploading: true });
    //
    //         if (!pickerResult.cancelled) {
    //             uploadResponse = await uploadImageAsync(pickerResult.uri);
    //             console.log('uploadResponse: ',uploadResponse);
    //             uploadResult = await uploadResponse.json();
    //             this.setState({ image: uploadResult.location });
    //         }
    //     } catch (e) {
    //         console.log({ uploadResponse });
    //         console.log({ uploadResult });
    //         console.log({ e });
    //         alert('Upload failed, sorry :(');
    //     } finally {
    //         this.setState({ uploading: false });
    //     }
    // };

    renderImageList = () => {

        if (this.props.media.length > 0) {
            return this.props.media.map( ({uploadUri},index) => (
                    <TouchableOpacity
                        style={{width:'100%', marginBottom:40}}
                        onPress={() => this._pickImage(index)}
                        key={index}
                    >
                        <Image
                            style={{height:200, width:200, alignSelf:'center'}}
                            source={{uri:uploadUri}}
                        />
                    </TouchableOpacity>
                )
            );
        }
    };

    renderAddMediaBtn = () => {
        if (this.props.media.length < 3 ) {
            return (
                <TouchableOpacity
                    style={{width:'88%', marginBottom:30}}
                    onPress={() => this._pickImage('new')}
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
                contentContainerStyle={ this.props.media.length > 1 ? style.parentView2 : style.parentView1 }
                enableOnAndroid
            >
                <View style={{width:'100%',alignItems:'center'}}>
                    <Text style={{width:'88%',fontSize:19, marginBottom: 30,marginTop:60, textAlign:'center'}}>Showcase your completed projects here.</Text>

                    {this.renderAddMediaBtn()}

                    <View style={{width:'100%', alignItems:'center'}}>
                        {this.renderImageList()}
                    </View>
                </View>

                <View style={style.footer}>

                    <Button
                        title="Continue"
                        titleStyle={style.buttonText}
                        buttonStyle={style.button}
                        onPress={() => this.props.navigation.navigate('seekerCertification')}
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

// async function uploadImageAsync(uri) {
//     let apiUrl = 'http://34.233.61.228/workorbe/public/api/common/uploadfile';
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

const mapStateToProps = state => {
    console.log('state: ',state);
    return ({media:state.onBoarding.media});
};

export default connect(mapStateToProps, mediaAction)(Media);

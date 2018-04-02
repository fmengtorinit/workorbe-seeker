import React, {Component} from 'react';
import {View, ScrollView, Image, TouchableOpacity, Platform, Dimensions, FlatList, TextInput, Text, Picker,KeyboardAvoidingView} from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MapView, Constants, Location, Permissions} from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


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
        width:'itemWidth%',
        borderBottomWidth:1,
        borderBottomColor:'#D1D1D1',
        marginBottom:marginBottom
    },
    parentViewStyle1:{
        backgroundColor:"white",
        alignItems:'center',
        width: '100%',
        justifyContent: 'space-between',
        height: '100%'
    },

    parentViewStyle2:{
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
        backgroundColor: '#426E86',
        height:hearderHeight,
    },
    ontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: 'center',
    }
};

class seekerMap extends Component {

    static navigationOptions = ( { navigation } ) => ({
        headerTitle: "",
        headerTitleStyle: {
            textAlign: 'center',
            flexGrow: 1
        },
        headerLeft: (<View/>),

        headerRight: (

            <TouchableOpacity style={{backgroundColor: 'transparent'}} onPress={()=> navigation.navigate('seekerSignupCapability')}>
                <Text style={{color:'#F9BA32',fontWeight:'bold',fontSize:20}}>Go</Text>
            </TouchableOpacity>
        ),
        headerStyle:style.header
    });

    state = {
        maploaded: false,
        location:{
            latitude: 43,
            longitude: -79,
            latitudeDelta: 0.09,
            longitudeDelta: 0.04
        }
    };


    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);

        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
        console.log('location:',location);
        let {latitude,longitude} = location.coords;
        console.log('latitude,longitude:',[latitude,longitude]);
        this.setState({ location: {latitude,longitude}} );
        console.log('location:', this.state.location);

    };



    render() {
        console.log('location@render:', this.state.location);
        return (

            <View>
                <MapView
                    style={{width:'100%',height:'100%'}}
                    region={{
                        ...this.state.location,
                        latitudeDelta: 0.09,
                        longitudeDelta: 0.04
                    }}
                    showsUserLocation
                    showsCompass
                >

                </MapView>
            </View>

        );
    }
}


export default seekerMap;
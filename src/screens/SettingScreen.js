import React, {Component} from 'react';
import {View, Text} from 'react-native';

class SettingScreen extends Component {

    static navigationOptions = ( { navigation } ) => ({
        headerTitle: "Setting",
        headerStyle:{
            backgroundColor:"rgba(0,0,0,0)"
        }
    });

    render() {

        return (
            <View style={{
                backgroundColor:"red",
                height: "100%",
                position: "absolute",
                top: -100
            }}>
                <Text> SettingScreen Screen</Text>
                <Text> SettingScreen Screen</Text>
                <Text> SettingScreen Screen</Text>
                <Text> SettingScreen Screen</Text>
                <Text> SettingScreen Screen</Text>
                <Text> SettingScreen Screen</Text>
                <Text> SettingScreen Screen</Text>
            </View>

        );
    }
}

export default SettingScreen;
import React, {Component} from 'react';
import {View, ScrollView, TouchableOpacity, Platform, Dimensions, FlatList, TextInput, Text, Image} from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalDropdown from 'react-native-modal-dropdown';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as capabilityAction from '../actions/seeker/SeekerOnboarding';
import {connect} from "react-redux";

const {height, width} = Dimensions.get('window');

const itemWidth = '88%';

const specListItemHeight = 40;

const checkedImage = (
    <Image
        style={{height:28, width:28, zIndex:10}}
        source={require('./image/ticked_box.jpg')}
    />
);

const capabilitiesRaw = [
            {name:"Plumber"},
            {name:"Developer"},
            {name:"Electrician"},
            {name:"Healthcare"}
];

const specializations = [

    {name:"specialization1"},
    {name:"specialization2"},
    {name:"specialization3"},
    {name:"specialization4"},
    {name:"specialization5"}

];

const processCapabilitiesRaw = capabilitiesRaw => {
    return capabilitiesRaw.map(cap => cap.name)
};

let expIndex = 0;

const navbarHeight = 40;

const marginBottom = 35;

const style = {
    itemWidth:itemWidth,
    button: {
        alignContent:'center',
        backgroundColor: '#F9BA32',
        borderRadius: 5,
        paddingVertical: 10,
        width: itemWidth,
        height: 45,
        marginTop: 0,
        marginBottom: 15,
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
        width:itemWidth,
        fontSize:18,
        borderBottomWidth:1,
        borderBottomColor:'#D1D1D1',
        marginBottom:marginBottom
    },
    checkBox: {
        boxSize:30
    },
    placeholderColor: '#D1D1D1',
    capability: {
        height:30,
        marginTop: navbarHeight + 20,
        width:itemWidth,
        borderBottomWidth:1,
        borderBottomColor:'#D1D1D1'
    }
};


class SeekerCapability extends Component {

    static navigationOptions = ( { navigation } ) => ({
        headerTitle: "",
        headerRight: null,
        headerLeft: null,
        headerStyle:{
            backgroundColor: 'transparent',
            height: 0
        }
    });

    state = {
        onChecked: {
            checked:false,
            key:null
        },
        capability:'*Capability',
        showSpec: false,
        isSpecSelectedDone:false,
    };

    onMMInputChange = (mm,key) => {
            const dividerPos = (key.indexOf('-'));
            const index = key.substring(dividerPos + 1);
            const type = key.substring(0,dividerPos)+'MM';
            const data = {};
            data[type] = mm;
            this.props.onExpInputChange({data, index});
    };

    onYYYYInputChange = (yy,key) => {
            const dividerPos = (key.indexOf('-'));
            const index = key.substring(dividerPos + 1);
            const type = key.substring(0, dividerPos) + 'YYYY';
            const data = {};
            data[type] = yy;
            this.props.onExpInputChange({data, index});
    };

    onTitleChange = (title,index) => {
        const data = {title};
        this.props.onExpInputChange({data, index});

    };

    onCompanyNameChange = (companyName,index) => {
        const data = {companyName};
        this.props.onExpInputChange({data, index});
    };

    onDescriptionChange = (description,index) => {
        const data = {description};
        this.props.onExpInputChange({data, index});
    };

    onCurrentWorkChange = (currentWork,index) => {
        const data = {currentWork:!currentWork};
        this.props.onExpInputChange({data, index});
    };

    dateInput = (key,mm,yyyy) => (
        <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:'#D1D1D1', width:97}} key={key}>

            <TextInput
                placeholder="MM"
                style={{...style.input,width:(mm ? 22 : 34), borderBottomWidth:0, marginBottom:1,marginRight:0}}
                placeholderTextColor={style.placeholderColor}
                underlineColorAndroid='rgba(0,0,0,0)'
                keyboardType='numeric'
                value={mm}
                onChangeText={input => this.onMMInputChange(input,key)}
                maxLength={2}

            />

            <Text style={{...style.input,color:'#D1D1D1',width:8, borderBottomWidth:0,marginBottom:1,marginRight:0, paddingRight:0}}>
                /
            </Text>

            <TextInput
                placeholder="YYYY"
                style={{...style.input, marginLeft:0,borderBottomWidth:0, marginBottom:1,paddingHorizontal:0}}
                placeholderTextColor={style.placeholderColor}
                underlineColorAndroid='rgba(0,0,0,0)'
                keyboardType='numeric'
                value={yyyy}
                maxLength={4}
                onChangeText={input => this.onYYYYInputChange(input,key)}
            />

        </View>
    );

    renderCheckedMark = currentWork => {
        if (currentWork) {
            return checkedImage;
        }

    };

    renderExperience(exp,index) {

        const {title,companyName,fromMM,fromYYYY,toMM,toYYYY,description,currentWork} = exp;

        return(
            <View style={{width:'100%', marginTop:35}} key={`exp${index}`}>
                <TextInput
                    placeholder="Title"
                    style={{...style.input, width:'100%'}}
                    placeholderTextColor={style.placeholderColor}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    value={title}
                    onChangeText={input => this.onTitleChange(input, index)}

                />

                <TextInput
                    placeholder="Company Name"
                    style={{...style.input, width:'100%'}}
                    placeholderTextColor={style.placeholderColor}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    value={companyName}
                    onChangeText={input => this.onCompanyNameChange(input,index)}

                />

                <View style={{
                    width:'100%',
                    flexDirection:'row',
                    justifyContent:'space-between',
                    marginBottom:marginBottom
                }}>

                    <View style={{width:97}}>
                        <Text style={{...style.text,alignSelf:'flex-start'}}>From</Text>
                        {this.dateInput(`from-${index}`,fromMM,fromYYYY)}
                    </View>

                    <View style={{width:97}}>
                        <Text style={{...style.text,alignSelf:'flex-start'}}>To</Text>
                        {this.dateInput(`to-${index}`,toMM,toYYYY)}
                    </View>

                </View>

                <View style={{
                    flexDirection:'row',
                    marginBottom:marginBottom,
                    alignItems:'center',
                    width:'100%'
                }}
                >
                    <TouchableOpacity
                        style={{
                            width:28,
                            height:28,
                            backgroundColor: '#F9BA32',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight:20,
                            borderRadius:5
                        }}
                        onPress={() => {this.onCurrentWorkChange(currentWork,index)}}
                    >
                        {this.renderCheckedMark(currentWork)}
                    </TouchableOpacity>

                    <Text style={{fontSize:18}}>I currently work here</Text>

                </View>

                <Text style={{fontSize:18,fontWeight: 'bold', width:'100%',marginBottom:20}}>Description</Text>

                <TextInput
                    style={{textAlignVertical: "top", fontSize:18,width:'100%', height:100, borderWidth:1, borderColor:'#D1D1D1', marginBottom: 20}}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    multiline
                    value={description}
                    onChangeText={input => this.onDescriptionChange(input,index)}
                />
            </View>
        );
    }

    renderExpList = () => {
        return this.props.experience.map((exp,index) => this.renderExperience(exp,index));
    };

    addExp = () => {
        let data = [...this.props.experience];
        data.push({title:'',companyName:'',fromMM:'',fromYYYY:'',toMM:'',toYYYY:'',description:'',currentWork:false});
        const index = 'new';
        this.props.onExpInputChange({data, index});
    };

    onCapabilitySelect = capability => {
        console.log('component state: ', this.state);
        this.setState({showSpec:true,numOfSpecSelected:0,isSpecSelectedDone:false});
        this.props.onCapabilityInputChange({capability,specializations:{}});
    };

    onRateInputChange = rate => {
            this.props.onCapabilityInputChange({rate});
    };

    onExperienceInputChange = yearsOfExperience => {
            this.props.onCapabilityInputChange({yearsOfExperience});
    };

    onSpecSelected = spec => {

        let specializations = this.props.capability.specializations;

        if (specializations[spec]) {
            delete specializations[spec];
            this.props.onCapabilityInputChange({specializations});
        } else {
            specializations[spec] = true;
            this.props.onCapabilityInputChange({specializations});
        }
    };

    numOfSpecializationsSelected = () => {
        const specLength = Object.keys(this.props.capability.specializations).length;
        return (specLength > 0 ? specLength + ' selected' : 'Please Select Specializations');
    };


    showSpecList = () => {
        if (this.state.showSpec) {
            return (
                <View>
                    <FlatList
                        data={specializations}
                        keyExtractor={item => item.name}
                        renderItem={this.renderSpecListItem}
                        style={{width:'90%',height:specListItemHeight*3}}
                    />

                    <TouchableOpacity
                        style={{backgroundColor:'#F9BA32', alignSelf:'center', width: 70, paddingVertical:5, borderRadius:5, marginTop:20}}
                        onPress={() => this.setState({showSpec: false, isSpecSelectedDone: true})}
                    >
                      <Text style={{fontWeight:'bold',color:'white',textAlign:'center'}}>
                          Done
                      </Text>
                    </TouchableOpacity>
                </View>
            );
        }
    };

    renderSpecListItem = ({item}) => (

        <View style={{
                flexDirection: 'row',
                height: specListItemHeight,
                margin: 0,
                borderWidth: 1,
                borderTopWidth: 0,
                borderColor: '#D1D1D1',
                alignItems: 'center'
            }}
        >
            <TouchableOpacity
                style={{
                    width: 28,
                    height: 28,
                    backgroundColor: '#F9BA32',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                    marginLeft: 5,
                    borderRadius: 5
                }}
                onPress={() => this.onSpecSelected(item.name)}
            >
                {this.props.capability.specializations[item.name] ? checkedImage : null}
            </TouchableOpacity>

            <Text>{item.name}</Text>

        </View>
    );

    renderSpecializations = () => {
        if (this.state.showSpec && !this.state.isSpecSelectedDone) {
            return (
                <View style={{width: itemWidth,marginBottom:marginBottom}}>

                    <Text style={{...style.text, alignSelf:'flex-start', marginBottom:marginBottom}}>Add Specialization Tags</Text>

                    <TouchableOpacity
                        style={{
                            flexDirection:'row',
                            width:'100%',
                            justifyContent:'space-between',
                            alignItems:'center',
                            borderBottomWidth:1,
                            borderBottomColor:'#D1D1D1'
                        }}
                        onPress={() => this.setState({showSpec: true})}
                    >
                        <Text style={{fontSize:18}}>
                            {this.numOfSpecializationsSelected()}
                        </Text>

                        <Image
                            style={{height:13, width:28}}
                            source={require('./image/dropdown_pg5.jpg')}
                        />

                    </TouchableOpacity>

                    {this.showSpecList()}

                </View>
            );
        }
    };

    removeSpec = () => {
        this.setState({showSpec:false, isSpecSelectedDone: false});
        this.props.onCapabilityInputChange({specializations:{}});

    };

    renderSpecSelectedSummary = () => {

        const isEmpty = Object.keys(this.props.capability.specializations).length === 0 && this.props.capability.specializations.constructor === Object;

        if (!isEmpty && this.state.showSpec === false) {

            let specList = [];

            temp = this.props.capability.specializations;

            for (let key in temp) {
                if (temp[key]) {
                    specList.push(<Text style={{fontSize:18}} key={key}>{key}</Text>);
                }
            }

            return (
                <View style={{flexDirection:'row',width:itemWidth, alignItems:'center', marginBottom:marginBottom}}>

                    <View>
                        {specList}
                    </View>

                    <TouchableOpacity
                        style={{
                            marginLeft:60
                        }}
                        onPress={() => this.removeSpec()}
                    >
                        <Image
                            style={{height:28, width:28}}
                            source={require('./image/red_cancel_symbol.jpg')}
                        />

                    </TouchableOpacity>

                </View>
            );
        }
    };

    render() {

        return (

            <KeyboardAwareScrollView
                contentContainerStyle={{
                    backgroundColor:"white",
                    width: '100%',
                    alignContent:'center',
                    alignItems:'center'
                }}
                enableOnAndroid={true}
                extraHeight={200}
            >
                <Text style={{...style.text, marginTop:30}}>Capability/Portfolio</Text>

                <ModalDropdown
                    style={{...style.capability,marginBottom:(this.state.isSpecSelectedDone && Object.keys(this.props.capability.specializations).length > 0 ? 10 : marginBottom)}}
                    dropdownStyle={{width:itemWidth, marginTop:0}}
                    dropdownTextStyle={{...style.text,textAlign:'left'}}
                    options={ processCapabilitiesRaw(capabilitiesRaw) }
                    defaultValue={'*Capabilities'}
                    onSelect={(index, value) => this.onCapabilitySelect(value)}
                >
                    <View style={{flexDirection:'row',width:'100%',justifyContent:'space-between', alignItems:'center'}}>
                        <Text style={{fontSize:18,color:(this.props.capability.capability ==='*Capability' ? '#D1D1D1' : 'black')}}>{this.props.capability.capability}</Text>
                        <Image
                            style={{height:13, width:28}}
                            source={require('./image/dropdown_pg5.jpg')}
                        />
                    </View>

                </ModalDropdown>

                {this.renderSpecSelectedSummary()}
                {this.renderSpecializations()}

                <View style={{flexDirection:'row',width:'50%',marginLeft:'6%', marginBottom:1,borderBottomWidth:1, justifyContent:'flex-start',alignItems:'center',borderBottomColor:'#D1D1D1',alignSelf:'flex-start'}}>

                    {this.props.capability.rate ? (
                        <Image
                            style={{height:18, width:10, marginRight:5}}
                            source={require('./image/Dollar.png')}
                        />
                    ) : null}

                    <TextInput
                        placeholder="*Rate/hr"
                        style={{...style.input,marginBottom:1,width:(this.props.capability.rate ? 30 : 80),borderBottomWidth:0,alignSelf: 'flex-start' }}
                        placeholderTextColor={style.placeholderColor}
                        keyboardType='numeric'
                        underlineColorAndroid='rgba(0,0,0,0)'
                        onChangeText={(text) => this.onRateInputChange(text)}
                        maxLength={3}
                        value={this.props.capability.rate !== 0 ? `${this.props.capability.rate}` : ''}
                    />

                    {this.props.capability.rate ? (<Text style={{...style.text, fontWeight:'normal'}}> /h </Text>) : null}
                </View>

                <View style={{flexDirection:'row',width:itemWidth,justifyContent:'flex-start', alignItems:'center', marginVertical:marginBottom}}>

                    <Text style={{...style.text, color:'#D1D1D1', fontWeight:'normal'}}>*Years of Experience</Text>

                    <TextInput
                        placeholder="15"
                        style={{borderWidth:1, borderColor:'#D1D1D1',fontSize:18, width:30, marginLeft:10, textAlign:'center', borderRadius:5}}
                        placeholderTextColor={style.placeholderColor}
                        keyboardType='numeric'
                        underlineColorAndroid='rgba(0,0,0,0)'
                        maxLength={2}
                        onChangeText={(text) => this.onExperienceInputChange(text)}
                        value={this.props.capability.yearsOfExperience !== 0 ? `${this.props.capability.yearsOfExperience}` : ''}
                    />

                </View>

                <Text style={{...style.text}}> Experience </Text>

                <View style={{width:itemWidth}}>
                    {this.renderExpList()}
                </View>

                <View style={{flexDirection:'row',width:itemWidth, marginLeft:0, alignItems:'center', marginBottom:20}}>

                    <TouchableOpacity
                        style={{

                            width:28,
                            height:28,
                            backgroundColor: '#F9BA32',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight:20,

                        }}
                        onPress={this.addExp}
                    >

                        <Image
                            style={{height:28, width:28, zIndex:10}}
                            source={require('./image/add_new.jpg')}
                        />

                    </TouchableOpacity>

                    <Text style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontWeight:'bold',
                            fontSize:18
                        }}
                    >
                        Add Experience
                    </Text>

                </View>

                <Button
                    title="Continue"
                    titleStyle={style.buttonText}
                    onPress={() => this.props.navigation.navigate('media')}
                    buttonStyle={style.button}
                    uncheckedColor=""
                    containerStyle={{ width: '100%', marginTop:50, marginBottom:65 }}
                />

                <Image
                    style={{position:'absolute', bottom:0, left:0, height:140,width:130,zIndex:-1}}
                    source={require('./image/orange_hexagon_bottom_360.png')}
                />

                <View style={{position:'absolute', bottom:20,zIndex:10}}>
                    <Text style={{color:'#D1D1D1', textAlign:'center'}}>© Copyright 2018 Workorbe</Text>
                    <Text style={{color:'#D1D1D1',textAlign:'center'}}> All right reserved</Text>
                </View>

            </KeyboardAwareScrollView>

        );
    }
}

const mapStateToProps = state => {
    console.log('state: ', state);
    return {
        capability:state.seekerOnBoarding.capability,
        experience:state.seekerOnBoarding.experience
    }

};

export default connect(mapStateToProps, capabilityAction)(SeekerCapability);
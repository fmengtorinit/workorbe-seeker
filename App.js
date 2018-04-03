import React, {Component} from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import SeekerOnBoardingReducer from './src/reducers/seeker/SeekerOnBoardingReducer';
import OnBoardingReducer from './src/reducers/OnBoardingReducer';
import { StackNavigator } from 'react-navigation';
import {View} from 'react-native';

import SeekerCapability from './src/screens/SeekerCapability';
import CreditCardInfo from './src/screens/CreditCardInfo';
import Media from './src/screens/Media';
import SeekerCertification from "./src/screens/SeekerCertification";
import SeekerInsuranceUnion from "./src/screens/SeekerInsuranceUnion";
import SeekerReview from "./src/screens/SeekerReview";
import ProviderProfile from "./src/screens/Provider/ProviderProfile";
import PersonalProfile from "./src/screens/PersonalProfile";
import ProviderCompanyProfile from "./src/screens/Provider/ProviderCompanyProfile";
import ProviderSignUp from "./src/screens/Provider/ProviderSignUpForm";


export default class App extends Component {

    render() {

    const rootReducer = combineReducers({
        seekerOnBoarding: SeekerOnBoardingReducer,
        onBoarding:OnBoardingReducer,
        // provider:ProviderReducer
    });

    const store = createStore(rootReducer, {});

    const MainNavigator = StackNavigator({

        personalProfile: {screen: PersonalProfile},
        ProviderCompanyProfile:{screen: ProviderCompanyProfile},
        providerProfile: {screen: ProviderProfile},
        providerSignUp:{screen:ProviderSignUp},
        creditCardInfo: { screen: CreditCardInfo },
        media:{ screen: Media },
        seekerCapability: { screen: SeekerCapability },
        seekerCertification: {screen: SeekerCertification},
        seekerInsuranceUnion: {screen: SeekerInsuranceUnion},
        seekerReview: {screen: SeekerReview}

    });

    return (
      <Provider store={store}>
          <View style={{width:'100%',height:'100%'}}>
              <MainNavigator />
          </View>
      </Provider>
    );
  }
}



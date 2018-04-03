import React from 'react';

const initialState = {
    media:[],
    creditCard:{name:'',cardNumber:'',expMM:'',expYY:'',cvv:'',billingAddress:'',country:'Country',state:'State',city:'', postalCode:''},
    userType:'seeker',
    userProfile:{name:'Feida Meng',address:'',addressLine2:'',phone:'',description:'',uploadUri:''}
};

const OnBoardingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'mediaInputChange':
            if (action.index === 'new') {
                console.log();
                return {...state, media:action.payload}
            } else {
                let mediaTemp = [...state.media];
                mediaTemp[action.index] = {...mediaTemp[action.index],...action.payload};
                return {...state, media:mediaTemp};
            }
        case 'creditCardInputChange':
            return {...state, creditCard:{ ...state.creditCard, ...action.payload }};
        case 'userTypeSelected':
            return {...state, userType:action.payload};
        case 'userProfileChange':
            return {...state, userProfile:{ ...state.userProfile, ...action.payload}};
        default:
            return state;
    }
};

export default OnBoardingReducer;
import React from 'react';

const initialState = {
    media:{uri:[]},
    creditCard:{name:'',cardNumber:'',expMM:'',expYY:'',cvv:'',billingAddress:'',country:'Country',state:'State',city:'', postalCode:''},
    capability:{capability:'*Capability',rate:0,specializations:[],yearsOfExperience:0 },
    experience:[{title:'',companyName:'',fromMM:'',fromYYYY:'',toMM:'',toYYYY:'',description:'',currentWork:false}]
};

const ProviderReducer = (state = initialState, action) => {
    switch (action.type) {

        // case 'capabilityInputChange':
        //     return {...state, capability:{ ...state.capability, ...action.payload }};
        case 'expInputChange':
            if (action.index === 'new') {
                return {...state, experience:action.payload}
            } else {
                let temp = state.experience.slice();
                temp[action.index] = {...temp[action.index],...action.payload};
                return {...state, experience:temp};

            }

        default:
            return state;
    }
};

export default ProviderReducer;
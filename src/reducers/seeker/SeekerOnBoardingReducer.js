import React from 'react';
import InsuranceUnion from "../../screens/SeekerInsuranceUnion";

const initialState = {
    capability:{capability:'*Capability',specializations:{},rate:0,yearsOfExperience:0 },
    experience:[{title:'',companyName:'',fromMM:'',fromYYYY:'',toMM:'',toYYYY:'',description:'',currentWork:false}],
    certification:[{name:'', authority:'', year:'', uploadUri:''}],
    insurance:{name:'', uploadUri:''},
    union:{name:'',number:'',uploadUri:''}
};

const SeekerOnBoardingReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'capabilityInputChange':
            return {...state, capability:{ ...state.capability, ...action.payload }};
        case 'expInputChange':
            if (action.index === 'new') {
                return {...state, experience:action.payload}
            } else {
                let expTemp = [...state.experience];
                expTemp[action.index] = {...expTemp[action.index],...action.payload};
                return {...state, experience:expTemp};
            }
        case 'certificationInputChange':
            if (action.index === 'new') {
                return {...state, certification:action.payload}
            } else {
                let certTemp = [...state.certification];
                certTemp[action.index] = {...certTemp[action.index],...action.payload};
                return {...state, certification:certTemp};
            }
        case 'insuranceInputChange':
            console.log('action.payload: ',action.payload);
            return {...state, insurance:{ ...state.insurance, ...action.payload }};
        case 'unionInputChange':
            return {...state, union:{ ...state.union, ...action.payload }};
        default:
            return state;
    }
};

export default SeekerOnBoardingReducer;
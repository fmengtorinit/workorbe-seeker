// import React from 'react';
//
// const initialState = {
//     // profile:[],
//     // creditCard:{name:'',cardNumber:'',expMM:'',expYY:'',cvv:'',billingAddress:'',country:'Country',state:'State',city:'', postalCode:''},
//     profile:{name:'', email:'', mobile:'', profilePic:'', companyTitle:'', rating:0, description:'' },
//     companyProfile:{companyName:'', comAddressLine1:'', comAddressLine2:'', comLogo:'', rating:0, comPhone:'', comWebsite:'', comSummary:''}
// };
//
// //
// const ProviderReducer = (state = initialState, action) => {
//     switch (action.type) {
//         // case 'mediaInputChange':
//         //     if (action.index === 'new') {
//         //         console.log();
//         //         return {...state, media:action.payload}
//         //     } else {
//         //         let mediaTemp = [...state.media];
//         //         mediaTemp[action.index] = {...mediaTemp[action.index],...action.payload};
//         //         return {...state, media:mediaTemp};
//         //     }
//         case 'profile':
//             return {...state, profile:action.payload };
//         default:
//             return state;
//     }
// };
//
// export default ProviderReducer;
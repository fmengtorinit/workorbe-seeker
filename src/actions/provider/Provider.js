//
// import axios from "axios";
//
// export const onMediaInputChange = input => {
//     console.log('onMediaInputChange:',input);
//
//     return {type:'mediaInputChange', payload: input}
// };
//
// export const onCreditCardInputChange = input => {
//     console.log('onCreditCardInputChange:',input);
//
//     return {type:'creditCardInputChange', payload: input}
// };
//
// export const profile = () => {
//
//     return dispatch => {
//
//         async function getCountryAndStateData() {
//
//             try {
//
//                 const countryAndStateData = await axios.get('http://34.233.61.228/workorbe/public/api/onboarding/commondata/provider');
//
//             } catch (e) {
//                 console.log(e);
//             }
//
//         }
//         return dispatch({type:'profile',payload});
//     }
// };
//
// // export const onExpInputChange = input => {
// //     console.log('onExpInputChange:',input);
// //
// //     return {type:'expInputChange', payload: input.data, index: input.index}
// // };
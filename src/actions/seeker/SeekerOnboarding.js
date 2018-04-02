
export const onMediaInputChange = input => {
    console.log('onMediaInputChange:',input);
    return {type:'mediaInputChange', payload: input}
};

export const onCreditCardInputChange = input => {
    console.log('onCreditCardInputChange:',input);

    return {type:'creditCardInputChange', payload: input}
};

export const onCapabilityInputChange = input => {
    console.log('onCapabilityInputChange:',input);

    return {type:'capabilityInputChange', payload: input}
};

export const onExpInputChange = input => {
    console.log('onExpInputChange:',input);

    return {type:'expInputChange', payload: input.data, index: input.index}
};

export const onSpecInputChange = input => {
    console.log('onSpecInputChange:',input);

    return {type:'specInputChange', payload: input.data, index: input.index}
};

export const onCertificationInputChange = input => {
    console.log('onCertificationInputChange:',input);

    return {type:'certificationInputChange', payload: input.data, index: input.index}
};

export const onInsuranceInputChange = input => {
    console.log('onInsuranceInputChange:',input);

    return {type:'insuranceInputChange', payload: input};

};

export const onUnionInputChange = input => {
    console.log('onInsuranceInputChange:',input);

    return {type:'unionInputChange', payload: input};
};


export const onMediaInputChange = input => {
    console.log('onMediaInputChange:',input);

    return {type:'mediaInputChange', payload: input.data, index: input.index}
};

export const onCreditCardInputChange = input => {
    console.log('onCreditCardInputChange:',input);

    return {type:'creditCardInputChange', payload: input}
};


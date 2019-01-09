module.exports = {
    symbol2string : (value)=>{
        if(value.indexOf('$')>-1){
            let arr = value.split('$');
            let price = arr[0] === '' ? arr[1] : arr[0];
            return `${price} USD`
        } else if(value.indexOf('¢')>-1){
            let arr = value.split('¢');
            let price = arr[0] === '' ? arr[1] : arr[0];
            return `${price} CENT`
        }
    },

    transformString : (str,transformTo)=>{
        if(str){
            if(transformTo === 'string'){
                let strArr = str.split(' ');
                strArr = strArr.filter(Boolean);
                let values = strArr.filter(x=> x.indexOf('$')>-1 || x.indexOf('¢')>-1);
                if(values.length){
                    let finalString=str;
                    for(let i=0; i<values.length; i++){
                        if(values[i].indexOf('$') > -1){
                            if(values[i].length > 1){
                                let arr = values[i].split('$');
                                let price = arr[0] === '' ? arr[1] : arr[0];
                                let n = strArr.indexOf(values[i]);
                                let priceInt = parseInt(price);
                                strArr[n] = `${price} ${priceInt > 1 ? 'dollars' : 'dollar'}`;
                                finalString = strArr.join(' ');
                            }else {
                                let n = strArr.indexOf(values[i]);
                                let front = parseInt(strArr[n+1]);
                                let back = parseInt(strArr[n-1]);
                                if(front){
                                    strArr[n] = strArr[n+1];
                                    strArr[n+1] = front > 1 ? 'dollars' : 'dollar';
                                    finalString =  strArr.join(' ');
                                }else if(back){
                                    strArr[n] = back > 1 ? 'dollars' : 'dollar';
                                    strArr[n-1] = strArr[n-1];
                                    finalString =  strArr.join(' ');
                                }else{
                                    finalString =  strArr.join(' ');
                                }
                            }
                        }else if(values[i].indexOf('¢') > -1){
                            if(values[i].length > 1){
                                let arr = values[i].split('¢');
                                let price = arr[0] === '' ? arr[1] : arr[0];
                                let n = strArr.indexOf(values[i]);
                                price = parseInt(price);
                                strArr[n] = `${price} ${price > 1 ? 'cents' : 'cent'}`;
                                finalString =  strArr.join(' ');
                            }else {
                                let n = strArr.indexOf(values[i]);
                                let front = parseInt(strArr[n+1]);
                                let back = parseInt(strArr[n-1]);
                                if(front){
                                    strArr[n] = front.toString();
                                    strArr[n+1] = front > 1 ? 'cents' : 'cent';
                                    finalString = strArr.join(' ');
                                }else if(back){
                                    strArr[n] = back > 1 ? 'cents' : 'cent';
                                    strArr[n-1] = back.toString();
                                    finalString =  strArr.join(' ');
                                }else{
                                    finalString =  strArr.join(' ');
                                }
                            }
                        }
                    }
                    return finalString;
                }else {
                    return str;
                }
            } else if(transformTo === 'symbol'){
                return str;
            }
        } else{
            return '';
        }
    }

};

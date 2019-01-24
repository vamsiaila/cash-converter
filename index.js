module.exports = {
    symbol2string : (str)=>{
        if(str.indexOf('$')>-1){
            let arr = str.split('$');
            let price = arr[0] === '' ? arr[1] : arr[0];
            return `${price} USD`
        } else if(str.indexOf('¢')>-1){
            let arr = str.split('¢');
            let price = arr[0] === '' ? arr[1] : arr[0];
            return `${price} CENT`
        }
    },

    string2symbol : (str)=>{

    },

    transformString : (str,transformTo)=>{
        if(str){
            if(transformTo === 'string'){
                let strArr = str.split(' ');
                strArr = strArr.filter(Boolean);
                let values = strArr.filter(x=> x.indexOf('$')>-1 || x.indexOf('¢')>-1);
                function divideAndJoin(price){
                    let priceInt = parseInt(price);
                    let centString = '';
                    if(price.indexOf('.')>-1) {
                        let priceArr = price.split('.');
                        let centValue = parseInt(priceArr[1]);
                        centString = `${centValue} ${centValue > 1 ? 'cents' : 'cent'}`;
                    }
                    return `${priceInt} ${priceInt > 1 ? 'dollars' : 'dollar'} ${centString}`;
                }
                if(values.length){
                    let finalString=str;
                    for(let i=0; i<values.length; i++){
                        if(values[i].indexOf('$') > -1){
                            if(values[i].length > 1){
                                let arr = values[i].split('$');
                                let price = arr[0] === '' ? arr[1] : arr[0];
                                let n = strArr.indexOf(values[i]);
                                strArr[n] = divideAndJoin(price);
                                finalString = strArr.join(' ');
                            }else {
                                let n = strArr.indexOf(values[i]);
                                let front = parseInt(strArr[n+1]);
                                let back = parseInt(strArr[n-1]);
                                if(front){
                                    strArr[n+1] = divideAndJoin(strArr[n+1]);
                                    finalString =  strArr.join(' ');
                                }else if(back){
                                    strArr[n-1] = divideAndJoin(strArr[n-1]);
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

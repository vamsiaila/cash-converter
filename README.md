# Cash Converter

cash converter is a string conversion module it can find currency 
values inyour string and replaces with the currency string or 
currency code or currency symbol and it has many more features 
to convert your money values.

### Installing

```
npm install cash-converter
```

## Getting Started

* symbol2string
* string2symbol
* transformString

```javascript
const convert = require('cash-converter');
```

#### symbol2string
```javascript
let value = convert.symbol2string('$100');
```
it returns "100 USD "

#### string2symbol
```javascript
let value = convert.string2symbol('100USD')
```
it returns "$100"

#### transformString
convert.transformString(Stringvalue,converstionType);
```javascript
let value = convert.transformString('you saved 100$ ','string')
```
it returns "you saved 100 dollars" 
```javascript
let value = convert.transformString('you saved 100$ ','cashCode')
```
it returns "you saved 100 USD" 
```javascript
let value = convert.transformString('you saved 100 USD ','symbol')
```
it returns "you saved $100" ;

##conclusion
you can try many types of conversions with this module please raise issue 
in github if you found any bug.


## Authors

* **Vamsi Aila**

## License

This project is licensed under the MIT License

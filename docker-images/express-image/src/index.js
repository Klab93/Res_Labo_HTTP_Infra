const express = require('express')
const app = express()
const port = 3000

const Chance = require('chance');
const chance = new Chance();

app.get('/', (req, res) => {
  res.send( generateAddress() )
})

app.listen(port, () => {
  console.log(`App Listening at http://localhost:${port}`)
})

let generateAddress = () => {
    
    const nAddress = chance.integer({
       min: 2, max : 9
    });
    
    console.log(nAddress);
    
    let address = [];
    
    for (let i = 0; i < nAddress; ++i) {
        let street = chance.address();
        let areaCode = chance.areacode();
        let city = chance.city();
        
        address.push({
            street : street,
            areaCode : areaCode,
            city : city
        });
    }
    
    console.log(address);
    return address;
}
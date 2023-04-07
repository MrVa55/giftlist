const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

const arguments = process.argv.slice(2);
const name = arguments.join(' ') 

async function main() {
      if (!name){console.log("You need to provide your name: node index.js <your-name>")}else{

      const merkleTree = new MerkleTree(niceList);

      const index = niceList.findIndex(n => n === name);
      const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {name, proof})
    // TODO: add request body parameters here!
  
   if (gift=="You got a toy robot!"){
    console.log(`
    _________________
 |'-========OoO===='-.
 | ||'-.____'-.'-.____'-.          __
 | ||  |      |  |      |         (**\\ Go ahead!
  '-|  |      |  |      |         -.' \\  Open it!
     '-|______|__|______|           , .\`
                                 /__|
                                // ||
                               -'  -'
${gift}
`)}else{console.log(gift)};
}
}

main(name);
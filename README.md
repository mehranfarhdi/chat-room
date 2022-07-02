# asghar-agha-chat-room

Web chat application developed with Express.js, Socket.IO, ReactJS and redux.js, Bulma and RSA, AES, node-mac.

## How to Use

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
git clone https://github.com/mehranfarhdi/chat-room.git
cd chat-room
```

### Server

```sh
cd server
npm install
npm start
```

Your app should now be running on [localhost:1234](http://localhost:1234/).

### Client

```sh
cd client
npm install
npm start
```

Your app should now be running on [localhost:3000](http://localhost:3000/).

This module provides a JavaScript RSA algorithm encryption tool, complete with key generation and functions to encrypt, decrypt, encode and decode strings.

## Usage

For usage example check out [`example.js`](./example.js):

```js
const RSA = require('./rsa');
// Message
const message = 'Hello, World!';
// Generate RSA keys
const keys = RSA.generate(250);
console.log('Keys');
console.log('n:', keys.n.toString());
console.log('d:', keys.d.toString());
console.log('e:', keys.e.toString());
const encoded_message = RSA.encode(message);
const encrypted_message = RSA.encrypt(encoded_message, keys.n, keys.e);
const decrypted_message = RSA.decrypt(encrypted_message, keys.d, keys.n);
const decoded_message = RSA.decode(decrypted_message);
console.log('Message:', message);
console.log('Encoded:', encoded_message.toString());
console.log('Encrypted:', encrypted_message.toString());
console.log('Decrypted:', decrypted_message.toString());
console.log('Decoded:', decoded_message.toString());
console.log();
console.log('Correct?', message === decoded_message);
```

## API

### `RSA.generate(keysize)`

You can generate an encryption key of a given keysize (in bits), using `RSA.generate()`. This function will return an object with `n` (publc key), `e` (public exponet), and `d` (private key) properties.

### `RSA.encode(string)`

Convert a string of alphanumerical characters to standard utf-8 decimal encoding. Only numbers can be encrypted, so an encoding is necessary to encrypt any non-numerical data.

### `RSA.encrypt(data, publicKey, publicExponet)`

Encrypt numerical data using public parts of a generated or transmitted key. These will be the `n` and `e` properties in the object returned by the `RSA.generate()` function.

### `RSA.decrypt(text, privateKey, publicKey)`

Using the private part of the encryption key (which should not be transfered via network), decrypt a cipher-text string of numerals. Will return an encoded string or simply a number, depending on intent of data transmission

### `RSA.decode(number)`

Revert data back to string form if it was originally encoded in utf-8 code.


## Screenshot
![user](https://github.com/mehranfarhdi/chat-room/blob/main/sample.PNG)


# License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details

Created by [Mehran Farhadi](https://www.linkedin.com/in/mehran-farhadi-312154199/)

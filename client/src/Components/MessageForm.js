import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import socket from '../Socket';
import RSA from "../RSA/Rsa";
import {setKeyAction} from "../action/setKey";
const AesEncryption = require('aes-encryption')
const crypto = require('crypto');
const MacCrypt = require('node-mac-crypt');
let fullName = '';
let publicKey = '';
let publicExponet = '';
let secretKey = '';

class MessageForm extends Component {

  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.appendEmoji = this.appendEmoji.bind(this);
  }

  componentDidMount() {
    let emojiList = document.getElementById('EmojiList')
    let emojRange = [[128513, 128591], [128640, 128704]];

    for (let i = 0; i < emojRange.length; i++) {
      let range = emojRange[i];
      for (let x = range[0]; x < range[1]; x++) {
        let newEmoji = document.createElement('button');
        newEmoji.className = 'button is-white is-paddingless is-medium'
        newEmoji.innerHTML = '&#' + x + ';';
        newEmoji.addEventListener('click', this.appendEmoji);
        emojiList.appendChild(newEmoji);
      }
    }
  }
  appendEmoji(event) {
    let emoji = event.target.innerHTML;
    ReactDOM.findDOMNode(this.refs.message).value += emoji;
  }
  onLogin(event) {


    let loginDOM = ReactDOM.findDOMNode(this.refs.login),
      textareaDOM = ReactDOM.findDOMNode(this.refs.textarea),
      messageDOM = ReactDOM.findDOMNode(this.refs.message),
      buttonDOM = ReactDOM.findDOMNode(this.refs.button),
      resultDOM = ReactDOM.findDOMNode(this.refs.result),
      userDOM = ReactDOM.findDOMNode(this.refs.user);

    event.preventDefault();
    let keys = RSA.generate(250)
    fullName = userDOM.value;
    publicKey = keys.n;
    publicExponet = keys.e;

    // Login
    socket.emit('login', fullName, publicKey, publicExponet);


    socket.on('check user', function (isUsing, encrypted_message) {
      const decrypted_message = RSA.decrypt(encrypted_message, keys.d, keys.n);
      setKeyAction(decrypted_message);
      secretKey = decrypted_message;
      console.log(decrypted_message);
      if (!isUsing) {
        loginDOM.classList.add('is-hidden');
        textareaDOM.classList.remove('is-hidden');
        messageDOM.focus();
        buttonDOM.classList.remove('is-hidden');
      } else {
        resultDOM.textContent = 'This username is already in use.';
        resultDOM.classList.remove('is-hidden');
      }
    });
  }
  checkSubmit(event) {
    if ((event.ctrlKey || event.metaKey) && (event.keyCode === 13 || event.keyCode === 10)) {
      this.onSubmit();
    }
  }
  onSubmit() {
    let message = ReactDOM.findDOMNode(this.refs.message);
    const aes = new AesEncryption()
    secretKey = secretKey.toString()
    let massage = message.value;
    aes.setSecretKey(secretKey.toString());
    localStorage.setItem("secret key", secretKey.toString());

    const crypt = new MacCrypt({
      key: secretKey,
      iv: crypto.randomBytes(16)
    });
    let mac = crypt.encrypt(massage);
    // Send message
    socket.emit('send message', {
      user: fullName,
      text: aes.encrypt(massage.toString()),
    });

    // Add message
    this.props.onAddMessage({
      type: 'primary',
      user: fullName,
      text: message.value,
      time: `${new Date().getHours()}:${new Date().getMinutes()}`
    });

    message.value = '';
  }
  render() {
    return (
      <div className="columns is-mobile has-background-white is-paddingless has-text-centered messageform">

        <div ref="login" className="column">
          <form onSubmit={this.onLogin}>
            <div className="field is-grouped is-grouped-centered">
              <div className="control">
                <input ref="user" className="input" type="text" placeholder="Full name" required="required" pattern="([\w]+[ ]+[\w])\w+" autoFocus={true} />
                <p ref="result" className="help is-danger is-hidden"></p>
              </div>
              <div className="control">
                <input className="button" type="submit" value="Login" />
              </div>
            </div>
          </form>
        </div>

        <div ref="textarea" className="column is-paddingless is-hidden">
          <textarea ref="message" className="textarea is-shadowless" rows="2" placeholder="Type a message" onKeyDown={this.checkSubmit.bind(this)}></textarea>
        </div>

        <div ref="button" className="column is-2-mobile is-1-tablet is-paddingless is-hidden">
          <div className="emoji-wrapper">
            <button className="button is-medium is-paddingless is-white" id="Emoji"><i className="far fa-smile"></i></button>
            <div id="EmojiList" className="popover has-background-white"></div>
          </div>
          <button className="button is-medium is-paddingless is-white" onClick={this.onSubmit}><i className="far fa-paper-plane"></i></button>
        </div>

      </div>
    );
  }
};

export default MessageForm;

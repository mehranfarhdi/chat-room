import React from 'react';

const ChatHeader = (props) => {
  return (
    <header className="columns is-mobile">
      <div className="column"><h1 className="is-size-5-tablet has-text-centered">{props.title}</h1></div>
      <div className="column is-2-mobile is-hidden-tablet has-text-right"><i className="fas fa-bars"></i></div>
    </header>
  );
};

export default ChatHeader;
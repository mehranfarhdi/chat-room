import React from 'react';
import Status from './Status';

const ChatFooter = () => {
  return (
    <footer className="columns">
      <div className="column is-hidden-mobile has-text-left"><small>&copy; {new Date().getFullYear()} - Mehran Farhadi Bajestani</small></div>
      <div className="column has-text-right-tablet has-text-centered">
        <Status />
      </div>
    </footer>
  );
};

export default ChatFooter;

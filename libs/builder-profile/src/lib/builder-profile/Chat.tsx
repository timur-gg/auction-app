import {
  ChatContainer,
  MainContainer,
  Message,
  MessageInput,
  MessageList,
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.css';
import { useRef, useState } from 'react';

const ExtendedInput = () => {
  return (
    <div>
      <span>Custom content</span>
      <MessageInput />
    </div>
  );
};

const messages = {};

// const addMessage() => {

//     <Message model={{
//         message: "Hello my friend",
//         sentTime: "15 mins ago",
//         sender: "Patrik",
//         direction: "outgoing",
//         position: "last"
//       }} />

// }

export const Chat = () => {
  const [messageInputValue, setMessageInputValue] = useState('');
  const inputFile = useRef<HTMLInputElement>(null);
  const handleFileClick = () => {
    if (inputFile.current !== null) {
      inputFile.current.click();
    }
  };

  return (
    <MainContainer style={{ border: 'none' }}>
      <input ref={inputFile} type="file" style={{ display: 'none' }} />
      <ChatContainer>
        <MessageList>
          <Message
            model={{
              message: 'Hi! How can we help you?',
              sentTime: 'just now',
              sender: 'Joe',
              direction: 'incoming',
              position: 'single',
            }}
          />
        </MessageList>

        <MessageInput
          placeholder="Type message here"
          value={messageInputValue}
          onChange={(val) => setMessageInputValue(val)}
          onSend={() => setMessageInputValue('')}
          onAttachClick={handleFileClick}
        />
        {/* <ExtendedInput as={MessageInput} /> */}
      </ChatContainer>
    </MainContainer>
  );
};

import {
  MultiChatSocket,
  MultiChatWindow,
  useMultiChatLogic,
} from 'react-chat-engine-advanced'
import Header from '@/components/customHeader'
import StandardMessageForm from '@/components/customMessageForms/StandarMessageForm'
import AiChat from '@/components/customMessageForms/AiChat'
import AiGrammarChecker from '@/components/customMessageForms/AiGrammarChecker'

const Chat = ({ user, secret }) => {
  const chatProps = useMultiChatLogic(
    import.meta.env.VITE_PROJECT_ID,
    user,
    secret
  )
  return (
    <div style={{ flexBasis: '100%' }}>
      <MultiChatSocket {...chatProps} />
      <MultiChatWindow
        {...chatProps}
        style={{ height: '100vh' }}
        renderChatHeader={(chat) => <Header chat={chat} />}
        renderMessageForm={(props) => {
          if (chatProps.chat?.title.startsWith('Ai_Chat')) {
            return <AiChat props={props} activeChat={chatProps.chat} />
          }
          if (chatProps.chat?.title.startsWith('Ai_Grammar_Checker')) {
            return (
              <AiGrammarChecker props={props} activeChat={chatProps.chat} />
            )
          }
          return (
            <StandardMessageForm props={props} activeChat={chatProps.chat} />
          )
        }}
      />
    </div>
  )
}

export default Chat

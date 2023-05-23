import React, { useState } from 'react'
import MessageFormUI from './MessageFormUI'

const StandarMessageForm = ({ props, activeChat }) => {
  const [message, setMessage] = useState('')
  const [attachment, setAttachment] = useState('')

  const handleChange = (e) => setMessage(e.target.value)

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    if (message.trim() !== '') {
      const date = new Date()
        .toISOString()
        .replace('T', ' ')
        .replace('Z', `${Math.floor(Math.random() * 1000)}+00:00`)

      const at = attachment ? [{ blob: attachment, file: attachment.name }] : []

      const form = {
        attachments: at,
        created: date,
        sender_username: props.username,
        text: message,
        activeChatId: activeChat.id,
      }

      props.onSubmit(form)
      setMessage('')
      setAttachment('')
    }
  }

  return (
    <MessageFormUI
      setAttachment={setAttachment}
      message={message}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleKeyDown={handleKeyDown}
    />
  )
}

export default StandarMessageForm

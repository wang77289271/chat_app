import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv'
import { openai } from '../index.js'

dotenv.config()
const router = express.Router()

router.post('/chat', async (req, res) => {
  try {
    const { text, activeChatId } = req.body

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: text },
      ],
    })

    await axios.post(
      `https://api.chatengine.io/chats/${activeChatId}/messages/`,
      { text: response.data.choices[0].message.content },
      {
        headers: {
          'Project-ID': process.env.PROJECT_ID,
          'User-Name': process.env.BOT_USER_NAME,
          'User-Secret': process.env.BOT_USER_SECRET,
        },
      }
    )

    res.status(200).json({ text: response.data.choices[0].message.content })
  } catch (error) {
    console.error('error', error.response.data.error)
    res.status(500).json({ error: error.message })
  }
})

router.post('/grammar-checker', async (req, res) => {
  try {
    const { text, activeChatId } = req.body

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'assistant',
          content:
            'You are a grammar checker who only check grammar for the message you have received',
        },
        { role: 'user', content: text },
      ],
    })

    await axios.post(
      `https://api.chatengine.io/chats/${activeChatId}/messages/`,
      { text: response.data.choices[0].message.content },
      {
        headers: {
          'Project-ID': process.env.PROJECT_ID,
          'User-Name': process.env.BOT_USER_NAME,
          'User-Secret': process.env.BOT_USER_SECRET,
        },
      }
    )

    res.status(200).json({ text: response.data.choices[0].message.content })
  } catch (error) {
    console.error('error', error.response.data.error)
    res.status(500).json({ error: error.message })
  }
})

export default router
import express from 'express';
import Message from '../models/Message';

const messageRouter = express.Router();

messageRouter.post('/', async (req, res) => {
  try {
    const message = new Message(req.body);
    const newMessage = await message.save();
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

messageRouter.get('/:conversationId', async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
});

export default messageRouter;

import express from 'express';
import Conversation from '../models/Coonversation';

const conversationRouter = express.Router();

conversationRouter.post('/', async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $in: [senderId, receiverId] },
    });

    if (conversation) {
      res.status(200).json(conversation);
    } else {
      const conversation = new Conversation([
        req.body.senderId,
        req.body.receiverId,
      ]);
      res.status(200).json(conversation);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

conversationRouter.get('/userId', async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default conversationRouter;

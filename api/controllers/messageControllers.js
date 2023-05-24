import MessageModel from "../models/MessageModel.js";

export const addMessage = async (req, res) => {
  const { chatID, senderID, text } = req.body;
  const msg = new MessageModel({
    chatID,
    senderID,
    text,
  });
  try {
    const result = await msg.save();
    return res.status(200).send(result);
  } catch (error) {
    return res.status(401).send(error);
  }
};
export const getMsg = async (req, res) => {
  const { chatID } = req.params;
  try {
    const result = await MessageModel.find({ chatID });
    return res.status(200).send(result);
  } catch (error) {
    return res.status(401).send(error);
  }
};

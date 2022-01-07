const db = require("../db");
const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");

// associations

const UserConversation = db.define("user_conversation", {});
const Unread = db.define("unread", {});

User.belongsToMany(Conversation, { through: UserConversation });
Conversation.belongsToMany(User, { through: UserConversation });
Message.belongsTo(Conversation);
Conversation.hasMany(Message);
Message.belongsToMany(User, { through: Unread });
User.belongsToMany(Message, { through: Unread });

module.exports = {
  User,
  Conversation,
  Message,
};

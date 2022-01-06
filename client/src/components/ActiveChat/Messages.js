import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId, photo } = props;
  const lastReadIndex = messages.findIndex(message => message.read && message.senderId === userId);

  return (
    <Box>
      {[...messages].map((message, i) => {
        const time = moment(message.createdAt).format("h:mm");
        const lastRead = i === lastReadIndex;

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} lastRead={lastRead} photo={photo} />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      }).reverse()}
    </Box>
  );
};

export default Messages;

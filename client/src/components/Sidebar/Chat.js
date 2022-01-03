import React from "react";
import { useState } from "react";
import { Box } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab"
    }
  }
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation } = props;
  const { otherUser } = conversation;

  const getUnread = () => {
    return conversation.messages.some(message => message.read === false && message.senderId === otherUser.id);
  };

  const getCount = () => {
    const reducerFunc = (acc, curr) => {
      if (curr.senderId !== otherUser.id) return acc;
      return acc + !curr.read;
    };

    return unread ? conversation.messages.reduce(reducerFunc, 0) : 0;
  };

  const [unread, setUnread] = useState(getUnread());
  const [unreadCount, setUnreadCount] = useState(getCount());

  const handleClick = async (conversation) => {
    await props.setActiveChat(conversation.otherUser.username);
    setUnread(false);
    setUnreadCount(0);
  };

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent 
        conversation={conversation} 
        unread={unread} 
        unreadCount={unreadCount} 
      />
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    }
  };
};

export default connect(null, mapDispatchToProps)(Chat);

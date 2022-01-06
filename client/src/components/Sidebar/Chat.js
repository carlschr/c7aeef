import React, { useEffect, useState, useCallback, useMemo } from "react";
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
  const { conversation } = useMemo(() => props, [props]);
  const { otherUser } = conversation;

  const getUnread = useCallback(() => {
    return conversation.messages.some(message => message.read === false && message.senderId === otherUser.id);
  }, [conversation.messages, otherUser.id]);

  const getCount = useCallback((isUnread) => {
    const reducerFunc = (acc, curr) => {
      if (curr.senderId !== otherUser.id) return acc;
      return acc + !curr.read;
    };

    const count = isUnread ? conversation.messages.reduce(reducerFunc, 0) : 0;
    return count;
  }, [conversation.messages, otherUser.id]);

  const [unread, setUnread] = useState(() => {
    return getUnread();
  });
  const [unreadCount, setUnreadCount] = useState(() => {
    return getCount(unread);
  });

  useEffect(() => {
    const newUnread = getUnread();
    const newCount = getCount(newUnread);

    setUnread(newUnread);
    setUnreadCount(newCount);
  }, [conversation, getCount, getUnread])

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

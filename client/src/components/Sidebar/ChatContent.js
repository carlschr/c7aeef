import React from "react";
import { Box, Typography, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  previewTextUnread: {
    fontSize: 12,
    color: "#000",
    letterSpacing: -0.17,
  },
  chip: {
    marginRight: 20,
    padding: 5,
    fontSize: 12,
    fontWeight: "bold"
  }
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation, unread, unreadCount } = props;
  const { latestMessageText, otherUser } = conversation;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography className={unread ? classes.previewTextUnread : classes.previewText}>
          {latestMessageText}
        </Typography>
      </Box>
      {unreadCount ? <Chip className={classes.chip} label={unreadCount} color="primary" /> : ""}
    </Box>
  );
};

export default ChatContent;

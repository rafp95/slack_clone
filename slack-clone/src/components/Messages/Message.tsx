import { Comment, Image } from "semantic-ui-react";
import moment from "moment";
import { LoggedUser } from "../../models/LoggedUser";
import { Fragment } from "react";

interface MessageProps {
  message: any;
  user?: LoggedUser;
  isLastElem?: boolean;
}

export const Message = ({ message, user, isLastElem }: MessageProps) => {
  const isOwnMessage = (message: any) =>
    user?.uid == message.user.id ? "message__self" : "";
  const timeFromNow = (timestamp: number) => moment(timestamp * 1000).fromNow();

  const isPhoto = (message: object) => message.hasOwnProperty("photo");

  return (
    <Fragment key={message.timestamp}>
      <Comment className={isLastElem ? "fadein__animation" : ""}>
        <Comment.Avatar src={message?.user?.avatar} />
        <Comment.Content className={isOwnMessage(message)}>
          <Comment.Author>{message.user.name}</Comment.Author>
          <Comment.Metadata>{timeFromNow(message.timestamp)}</Comment.Metadata>
          {isPhoto(message) ? (
            <Image src={message.photo} className="message__image" />
          ) : (
            <Comment.Text>{message.content}</Comment.Text>
          )}
        </Comment.Content>
      </Comment>
    </Fragment>
  );
};

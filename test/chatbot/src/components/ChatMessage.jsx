import RobotProfileImage from '../assets/bot.jpg'
import UserProfileImage from '../assets/user.jpg'

import './ChatMessage.css'

export function ChatMessage({ message, sender }) {
        // const message = props.message;
        // const sender = props.sender;
        // const { message, sender } = props;

        /*
        if (sender === 'bot') {
          return (
            <div>
              <img src="bot.png" width="50" />
              {message}
            </div>
          );
        }
        */

        return (
          <div className={sender==="user" ? "user-message":"bot-message"}>
            {sender === 'bot' && (
              <img src={RobotProfileImage} className="profile-img" />
            )}
            <div className="message">
              {message}
              </div>
            {sender === 'user' && (
              <img src={UserProfileImage} className="profile-img" />
            )}
          </div>
        );
      }
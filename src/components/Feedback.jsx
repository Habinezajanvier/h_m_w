import "../assets/styles/components/feedback.scss";
import { Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import veryHappyEmoji from "../assets/images/very-happy-emoji.svg";
import normalEmoji from "../assets/images/normal-emoji.svg";
import happyEmoji from "../assets/images/happy-emoji.svg";
import upsetEmoji from "../assets/images/upset-emoji.svg";
import angerEmoji from "../assets/images/anger-emoji.svg";
import plusIcon from "../assets/images/plus-icon.svg";
import deleteIcon from "../assets/images/delete-icon.svg";
import thankyouImg from "../assets/images/thankyou.png";
import Button from "./Button";

const Feedback = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  return (
    <Dialog
      maxWidth={false}
      open={isOpen}
      color="primary"
      PaperProps={{
        style: {
          backgroundColor: "#30323E",
          width: "424px",
          height: "650px",
          marginTop: "100px",
        },
      }}
      onClose={() => onClose && onClose()}
    >
      <div className="feedback">
        <div className="feedback-header flex justify-between">
          <div className="feedback-header-title">Feedback</div>
          <div className="feedback-header-close">
            <CloseIcon
              onClick={() => {
                setIsOpen(false);
                onClose();
              }}
            />
          </div>
        </div>

        {!isSubmitted ? (
          <>
            <div className="feedback-upper">
              <div className="feedback-upper-text flex fd-column">
                <div className="feedback-text">
                  We would like your feedback to improve our app.
                </div>
                <div className="feedback-text">
                  {" "}
                  What is your opinion about our app?
                </div>
              </div>

              <ul className="emojiList flex items-center">
                <li className="emojiItem c-pointer">
                  <img src={angerEmoji} alt="anger" />
                </li>
                <li className="emojiItem c-pointer">
                  <img src={upsetEmoji} alt="anger" />
                </li>
                <li className="emojiItem c-pointer">
                  <img src={normalEmoji} alt="anger" />
                </li>
                <li className="emojiItem c-pointer">
                  <img src={happyEmoji} alt="anger" />
                </li>
                <li className="emojiItem c-pointer">
                  <img src={veryHappyEmoji} alt="anger" />
                </li>
              </ul>
            </div>

            <div className="feedback-submit">
              <div className="feedback-text">
                We would love to to hear about anything you like or don’t like
                about our app so that we can continue making improvements.
              </div>

              <div className="feedback-textbox">
                <textarea className="feedback-textarea"></textarea>

                <div className="feedback-add flex items-center justify-center c-pointer">
                  <img src={plusIcon} alt="plus icon" />
                </div>
              </div>
              <div className="feedback-add-media flex items-center">
                <div className="feedback-media-name"> Screenshot.png</div>
                <div className="feedback-media-delete flex items-center justify-center">
                  <img src={deleteIcon} alt="delete" />
                </div>
              </div>
            </div>

            <div className="feedback-submit-btn">
              <Button title={"Submit"} onClick={() => setIsSubmitted(true)} />
            </div>
          </>
        ) : (
          <div className="feedback-submitted flex fd-column justify-center">
            <div className="feedback-thankyou-img">
              <img src={thankyouImg} alt="thank you" />
            </div>
            <div className="feedback-thankyou-text">
              <div>Thank you for the feedback.</div>
              <div>Your feedback is taken into Considersation</div>
            </div>
            <div className="feedback-home-btn flex justify-center">
              <Button
                title={"Go to home"}
                onClick={() => {
                  setIsOpen(false);
                  onClose();
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default Feedback;

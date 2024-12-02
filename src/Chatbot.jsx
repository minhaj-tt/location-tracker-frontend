/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  Fab,
  Divider,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";

const ChatBot = ({ themeColors }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isChatVisible, setIsChatVisible] = useState(false);

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: userInput },
    ]);

    const botResponse = getBotResponse(userInput);

    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "bot", text: botResponse },
    ]);

    setUserInput("");
  };

  const getBotResponse = (userMessage) => {
    const responses = {
      hi: "Hello! How can I assist you today?",
      hello: "Hi there! How can I help?",
      "how are you": "I'm good, thank you! How about you?",
      bye: "Goodbye! Have a great day!",
      default: "I'm not sure how to answer that. Can you please rephrase?",
    };
    return responses[userMessage.toLowerCase()] || responses["default"];
  };

  return (
    <>
      {isChatVisible && (
        <Box
          sx={{
            position: "fixed",
            bottom: 100,
            right: 20,
            width: 400,
            height: isChatVisible ? 420 : 0,
            backgroundColor: "white",
            boxShadow: 5,
            borderRadius: 2,
            zIndex: 9999,
            padding: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden",
            transition: "height 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              marginBottom: 1,
              color: themeColors.primary,
              fontWeight: "bold",
              fontSize: "1.1rem",
              textAlign: "center",
            }}
          >
            Chat with us!
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />

          <Box sx={{ flexGrow: 1, overflowY: "auto", marginBottom: 2 }}>
            <List>
              {messages.map((message, index) => (
                <ListItem
                  key={index}
                  sx={{
                    alignSelf:
                      message.sender === "user" ? "flex-end" : "flex-start", // Align user to the right, bot to the left
                    backgroundColor:
                      message.sender === "user"
                        ? themeColors.primary
                        : "#f1f1f1",
                    color: message.sender === "user" ? "white" : "black",
                    borderRadius: 1.5,
                    padding: 1.5,
                    marginBottom: 1.5,
                    maxWidth: "80%",
                    boxShadow:
                      message.sender === "user"
                        ? `0px 4px 10px rgba(0, 0, 0, 0.2)`
                        : `0px 4px 10px rgba(0, 0, 0, 0.1)`,
                    transition: "box-shadow 0.2s ease",
                    textAlign: message.sender === "user" ? "right" : "left", // Align text direction accordingly
                  }}
                >
                  {message.text}
                </ListItem>
              ))}
            </List>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              variant="outlined"
              fullWidth
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message"
              sx={{
                backgroundColor: "#f9f9f9",
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: themeColors.primary,
                  },
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: themeColors.secondary,
                color: "white",
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: themeColors.secondaryHover,
                },
                padding: "10px 20px",
              }}
              onClick={handleSendMessage}
            >
              Send
            </Button>
          </Box>
        </Box>
      )}
      <Fab
        color="primary"
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 9999,
          backgroundColor: themeColors.primary,
          "&:hover": {
            backgroundColor: themeColors.primaryHover,
          },
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
        }}
        onClick={() => setIsChatVisible(!isChatVisible)}
      >
        <ChatIcon />
      </Fab>
    </>
  );
};

export default ChatBot;

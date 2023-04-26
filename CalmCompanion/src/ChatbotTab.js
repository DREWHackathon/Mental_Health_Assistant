import React, { useState, useEffect } from 'react';
import {FlatList, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { GiftedChat} from 'react-native-gifted-chat';
import axios from 'axios';
import config from './config.js';

import { useDispatch, useSelector } from 'react-redux';
import { pushMessage } from './actions/userInfo.js';

const apiKey = config.OPENAI_API_KEY;

const ChatbotTab = () => {

    const dispatch = useDispatch();
    const userInfoState = useSelector(state => state.userInfo);
    const history = userInfoState.chatHistory;

    const [messages, setMessages] = useState([]);

    const model = "gpt-3.5-turbo";
    // console.log("Test");
    const apiURL = 'https://api.openai.com/v1/chat/completions';
    const moderationURL = 'https://api.openai.com/v1/moderations';
    // console.log(apiKey);
    // const [textInput, setTextInput] = useState('');


    const handleSend = async (newMessages = []) => {
      console.log("async run...");
      try {
        // Get the user's message
        const userMessage = newMessages[0];
        
        // Add the user's message to the messages state
        setMessages(previousMessages => GiftedChat.append(previousMessages, userMessage));
        
        // Add [moderation]. If the user's message violates the moderation, then send a warning message and return.
        const moderation_res = await axios.post(moderationURL, {
          input: userMessage.text}
          ,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          }
        });
        console.log(moderation_res);
    
        // if moderation_res.results.categories contain any true value, return true associated warning message
        const categories = moderation_res.data.results[0].categories;
        const combinedMessage = generateCategoryMessages(categories);
        if(combinedMessage != '') {
          console.log("Here comes the combined message");
          console.log(combinedMessage);
          const botMessage = {
            _id: Math.random().toString(36).substring(7),
            text: combinedMessage,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'Calm Companion',
            }
          };
          setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
          return;
        }
        
        //add the user message in the correct form to history and send hisotry to the API
        const user_role_msg = generateContent("user", userMessage.text);
        
        // console.log(user_role_msg);
        // console.log("Here we are adding current role msg to history");

        const updatedHistory = [...history, user_role_msg];

        // console.log("Here we finished adding current role msg to history");
        // console.log(history);

        
        const response = await axios.post(apiURL, {
          model: "gpt-3.5-turbo",
          messages: updatedHistory,
          max_tokens: 2000,
          temperature: 0.6,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          }
        });


        // console.log("Here comes the response log");
        // console.log(response.data);
        // console.log("Here comes after the response log");


        const botMessage = {
          _id: Math.random().toString(36).substring(7),
          text: response.data.choices[0].message.content.trim(),
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Calm Companion',
          }
        };

        setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
        const bot_role_msg = generateContent("assistant", botMessage.text);

        dispatch(pushMessage(user_role_msg));
        dispatch(pushMessage(bot_role_msg));


      } catch(error) {
        console.log(error);
      };
    }

    return (
      <View style={{ flex:1 }}>
        <View 
          style={{
              backgroundColor: '#F5F5F5',
              padding: 10,  
              alsignItems: 'center',
              justifyContent: 'center',
              borderBottomWidth: 1,
              marginTop: 40,
              marginBottom: 5

          }}
        >
          <Text style={{
            fontSize: 32,
            fontWeight: 'bold',
          }}>
            Calm Companion
          </Text>
        </View>
          <GiftedChat
            messages={messages}
            onSend={newMessages => handleSend(newMessages)}
            user={{ _id: 1 }}
          />
        
      </View>
    )
  }

export default ChatbotTab;

// Function to generate content object
function generateContent(role, message) {
  return {
    role: role,
    content: message,
  };
}


function generateCategoryMessages(categories) {
  const categoryMessages = {
    "hate": "Content that expresses, incites, or promotes hate based on race, gender, ethnicity, religion, nationality, sexual orientation, disability status, or caste.",
    "hate/threatening": "Hateful content that also includes violence or serious harm towards the targeted group.",
    "self-harm": "Content that promotes, encourages, or depicts acts of self-harm, such as suicide, cutting, and eating disorders.",
    "sexual": "Content meant to arouse sexual excitement, such as the description of sexual activity, or that promotes sexual services (excluding sex education and wellness).",
    "sexual/minors": "Sexual content that includes an individual who is under 18 years old.",
    "violence": "Content that promotes or glorifies violence or celebrates the suffering or humiliation of others.",
    "violence/graphic": "Violent content that depicts death, violence, or serious physical injury in extreme graphic detail."
  };

  let combinedMessage = '';

  for(const category in categories) {
    if(categories[category]){
      if(combinedMessage === ''){
        combinedMessage += 'Sorry, you\'re question didn\'t pass the moderation check: ';
      }
      combinedMessage += '\n\n';
      combinedMessage += categoryMessages[category];
    }
  }
  return combinedMessage;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 75,
  },
  body: {
    backgroundColor: '#fffcc9',
    width: '102%',
    margin: 10
  },
  bot: {
    fontSize: 18,
  },
  input:{
    borderWidth: 1,
    borderColor: '#f2f2e1',
    width: '100%',
    height: 60,
    marginBottom: 10,
    borderBottomColor: '#bbb',
  },
  button:{
    backgroundColor: 'blue',
    height: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText:{
    
  },
  item: {
    padding: 15,
    fontSize: 18,
    backgroundColor: "white",
    marginBottom: 1,
  },
  textTitle: {
    fontSize: 45,
    fontWeight: 800,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
  },
  textSecondaryTitle: {
    color: "gray",
    fontSize: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5,
  }

});
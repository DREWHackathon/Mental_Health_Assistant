import React, { useState } from 'react';
import {FlatList, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { GiftedChat} from 'react-native-gifted-chat';
import axios from 'axios';
import config from './config.js';
const apiKey = config.OPENAI_API_KEY;

const ChatbotTab = () => {

    const [messages, setMessages] = useState([]);
    const [history, setHistory] = useState([{"role": "system", "content": "You are a helpful assistant."}]);

    const model = "gpt-3.5-turbo";
    console.log("Test");
    const apiURL = 'https://api.openai.com/v1/chat/completions';
    console.log(apiKey);
    // const [textInput, setTextInput] = useState('');
    
    const handleSend = async(newMessages = []) => {
      try {
        // Get the user's message
        const userMessage = newMessages[0];
        
        // Add the user's message to the messages state
        setMessages(previousMessages => GiftedChat.append(previousMessages, userMessage));
        // const messageText = userMessage.text.toLowerCase();
        // const keywords = ['anxiety', 'depression', 'mental','self', 'help']; // Add more keywords here

        // // Check if the user's message contains a keyword
        // if(!keywords.some(keword => messageText.includes(keword))){
        //   // If no keyword is found, send an error message
        //   const botMessage = {
        //     _id: Math.random().toString(36).substring(7),
        //     text: 'Sorry, I only understand messages about mental health',
        //     createdAt: new Date(),
        //     user: {
        //       _id: 2,
        //       name: 'Calm Companion',
        //       avatar: 'https://placeimg.com/140/140/any',
        //     },
        //   };
        //   setMessages(previousMessages => GiftedChat.append(previousMessages, botMessage));
        //   return;
        // }
        
        //add the user message in the correct form to history and send hisotry to the API
        const user_role_msg = generateContent("user", userMessage.text);
        console.log(user_role_msg);
        console.log("Here we are adding current role msg to history");

        setHistory(previousHistory => [...previousHistory, user_role_msg]);

        console.log("Here we finished adding current role msg to history");
        console.log(history);
        const finalJSON = generateFinalJSON(model, history);
        console.log("Here comes the final JSON");
        console.log(finalJSON);
        // Send the user's message to OpenAI API if there is a keyword
        console.log("Here is what before the response log");
        
        const response = await axios.post(apiURL, {
          model: "gpt-3.5-turbo",
          messages: history,
          max_tokens: 2000,
          temperature: 0.6,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          }
        });

      //   const response = await axios.post(apiURL, {
      //     model: "text-davinci-003",
      //     messages: [{"role": "system", "content": "You are a helpful assistant."}],
      //     max_tokens: 1024,
      //     temperature: 0.5,
      //   }, {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Authorization': `Bearer ${apiKey}`
      //     }
      // })
        // const response = await axios.post(apiURL, generateFinalJSON(model, history), {
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${apiKey}`
        //   }
        // });
        console.log("Here comes the response log");
        console.log(response.data);
        console.log("Here comes after the response log");


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
        setHistory(previousHistory => [...previousHistory, bot_role_msg]);
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
//       const messages = textInput;
//       const response = await axios.post(apiURL, {
//         model: "test-davinci",
//         messages: messages,
//         max_tokens: 1024,
//         temperature: 0.5,
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${apiKey}`
//         }
//     })
//     const text = response.data.choices[0].text;
//     console.log(text);
//     setData([...data, {type: 'user', 'text': textInput}, {type: 'bot', 'text': text}]);
//     setTextInput('');
//     };
//   return (
//     <View style={styles.container}>
//         <Text style={styles.title}>Mental Health Assistant</Text>
//             <FlatList
//                 data={data}
//                 keyExtractor={(item, index) => index.toString()}
//                 style={styles.body}
//                 renderItem={({item}) => (
//                   <View style={{flexDirection:'row', padding:10}}>
//                     <Text style={{fontWeight:'bold', color:item.type === 'user' ? 'green' : 'blue'}}>{item.type === 'user' ? 'DREW' : 'Bot'}</Text>
//                     <Text style={styles.bot}>{item.text}</Text>
//                   </View>
//                 )}
//               />
//               <TextInput
//                 style={styles.input}
//                 value={textInput}
//                 onChangeText = { text => setTextInput(text) }
//                 placeholder="Type here..."

//               />
//               <TouchableOpacity 
//                   style={styles.button}
//                   onPress={handleSend}
//               >
//                   <Text style={styles.buttonText}>Send</Text>
//               </TouchableOpacity> 
//         {/* <Text style={styles.textSecondaryTitle}>
//             Recommended tasks
//         </Text> */}
      
//     </View>
//   );
// };

export default ChatbotTab;

// Function to generate content object
function generateContent(role, message) {
  return {
    role: role,
    content: message,
  };
}

// Function to generate the final JSON object
function generateFinalJSON(model, history) {
  
  return {
    model: model,
    messages: history,
    max_tokens: 4090,
    temperature: 0.6,
  };
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
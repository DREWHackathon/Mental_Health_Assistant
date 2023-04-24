import React, { useState } from 'react';
import {FlatList, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import config from './config.js';
const apiKey = config.OPENAI_API_KEY;

const ChatbotTab = () => {

    const [data, setData] = useState([]);
    console.log(apiKey);
    
    // const apiKey = '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';
    console.log("Test");
    const apiURL = 'https://api.openai.com/v1/completions';
    const [textInput, setTextInput] = useState('');
    
    const handleSend = async() => {
      const prompt = textInput;
      const response = await axios.post(apiURL, {
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 1024,
        temperature: 0.5,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
    })
    const text = response.data.choices[0].text;
    console.log(text);
    setData([...data, {type: 'user', 'text': textInput}, {type: 'bot', 'text': text}]);
    setTextInput('');
    };
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Mental Health Assistant</Text>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                style={styles.body}
                renderItem={({item}) => (
                  <View style={{flexDirection:'row', padding:10}}>
                    <Text style={{fontWeight:'bold', color:item.type === 'user' ? 'green' : 'blue'}}>{item.type === 'user' ? 'DREW' : 'Bot'}</Text>
                    <Text style={styles.bot}>{item.text}</Text>
                  </View>
                )}
              />
              <TextInput
                style={styles.input}
                value={textInput}
                onChangeText = { text => setTextInput(text) }
                placeholder="Type here..."

              />
              <TouchableOpacity 
                  style={styles.button}
                  onPress={handleSend}
              >
                  <Text style={styles.buttonText}>Send</Text>
              </TouchableOpacity> 
        {/* <Text style={styles.textSecondaryTitle}>
            Recommended tasks
        </Text> */}
      
    </View>
  );
};

export default ChatbotTab;

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
import React, { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { updateAnxietyResults, pushMessage } from '../actions/userInfo';
import { useDispatch } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
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
    marginBottom: 15,
  },
  textSecondaryTitle: {
    color: "gray",
    fontSize: 15,
    marginBottom: 5,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    marginVertical: 4,
    padding: 15,
    backgroundColor:"gainsboro",
    borderRadius: 10,
  }

});


const DepressionTestPage = () => {
  const dispatch = useDispatch();
  const [responses, setResponses] = useState({
    q1: '0',
    q2: '0',
    q3: '0',
    q4: '0',
    q5: '0',
    q6: '0',
    q7: '0',
    q8: '0',
    q9: '0',
  });
  
  const handleChange = (question, value) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [question]: value
    }));
  };

  const handleSubmit = () => {
    // submit responses to server or perform other actions

    const stringArray = Object.values(responses);

    let numberArray = [];
    for (var i = 0; i < Object.values(responses).length; i++) numberArray.push(parseInt(stringArray[i]));
    let score = numberArray.reduce((a, b) => a + b, 0)

    // dispatch(updateAnxietyResults(score));
    let results;
    if (score <= 4) {
      results = "minimal"
    } else if (score <= 9) {
        results = "mild"
    } else if (score <= 14) {
        results = "moderate"
    } else if (score <= 19) {
        results = "moderately severe"
    } else {
        results = "severe"
    }

      if (score < 0) score = 0;
      if (score > 27) score = 27;

      // const openAINewInstruction = `You're a mental health assistant who specializes in treating anxiety disorder and depression. Based on previous test results, your patient scored a ${score} on the PHQ-9 depression test, which indicates they might have ${results} depression. You must give them a report on their test result before responding to the patient.`;
      const openAINewInstruction = `You're a mental health assistant who specializes in treating anxiety disorder and depression. Based on previous test results, I scored a ${score} on the PHQ-9 depression test, which indicates that I might have ${results} depression. You must give me a report on their test result before responding to me. And after that all of your responses should be related to mental health.`;

      dispatch(pushMessage({"role": "user", "content": openAINewInstruction}));
      dispatch(pushMessage({"role": "user", "content": openAINewInstruction}));

      alert(
        `According to your inputs, this informal test concludes that you have ${results} depression.
Please keep in mind that only trained health professionals can give you a concrete diagnosis.
It is always encourage that you find professional help if you feel like you need it. 
For now, we've handed your screening results to our Chatbot who might provide you with helpful information.
      `);
  };

  return (
    <View style={styles.container}>

    <ScrollView>
        <Text style={styles.textTitle}>
          PHQ-9 Depression Test
        </Text>
        <Text style={styles.textSecondaryTitle}>
            This is the PHQ-9 Test.{"\n"}{"\n"}
            Please keep in mind that these tests are not intended to provide a diagnosis – only trained health professionals should do this. 
        </Text>

        <Text> </Text>

      <Text style={styles.questionText}>Over the last 2 weeks, how often have you been bothered by the following problems on a scale of 0-3?</Text>
      
      <Text style={styles.questionText}>1. Little interest or pleasure in doing things</Text>
      <TextInput
        onChangeText={text => handleChange('q1', text)}
        value={responses.q1}
        placeholder="Enter a number between 0 and 3"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.questionText}>2. Feeling down, depressed, or hopeless.</Text>
      <TextInput
        onChangeText={text => handleChange('q2', text)}
        value={responses.q2}
        placeholder="Enter a number between 0 and 3"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.questionText}>3. Trouble falling or staying asleep, or sleeping too much.</Text>
      <TextInput
        onChangeText={text => handleChange('q3', text)}
        value={responses.q3}
        placeholder="Enter a number between 0 and 3"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.questionText}>4. Feeling tired or having little energy. </Text>
      <TextInput
        onChangeText={text => handleChange('q4', text)}
        value={responses.q4}
        placeholder="Enter a number between 0 and 3"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.questionText}>5. Poor appetite or overeating.</Text>
      <TextInput
        onChangeText={text => handleChange('q5', text)}
        value={responses.q5}
        placeholder="Enter a number between 0 and 3"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.questionText}>6. Feeling bad about yourself – or that you are a failure or have let yourself or your family down. </Text>
      <TextInput
        onChangeText={text => handleChange('q6', text)}
        value={responses.q6}
        placeholder="Enter a number between 0 and 3"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.questionText}>7. Trouble concentrating on things, such as reading the newspaper or watching television.</Text>
      <TextInput
        onChangeText={text => handleChange('q7', text)}
        value={responses.q7}
        placeholder="Enter a number between 0 and 3"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.questionText}>8. Moving or speaking so slowly that other people could have noticed. Or the opposite – being so fidgety or restless that you have been moving around a lot more than usual.</Text>
      <TextInput
        onChangeText={text => handleChange('q8', text)}
        value={responses.q8}
        placeholder="Enter a number between 0 and 3"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.questionText}>9. Thoughts that you would be better off dead, or of hurting yourself in some way.</Text>
      <TextInput
        onChangeText={text => handleChange('q9', text)}
        value={responses.q9}
        placeholder="Enter a number between 0 and 3"
        keyboardType="numeric"
        style={styles.input}
      />

      <Button onPress={handleSubmit} title="Submit" />
      </ScrollView>
    </View>
  );
};

export default DepressionTestPage;
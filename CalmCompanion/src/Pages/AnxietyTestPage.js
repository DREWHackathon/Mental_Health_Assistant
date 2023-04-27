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


const GAD7AnxietyTestForm = () => {
  const dispatch = useDispatch();
  const [responses, setResponses] = useState({
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    q6: '',
    q7: '',
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

    dispatch(updateAnxietyResults(score));
    let results;
    if (score <= 4) {
          results = "minimal"
      } else if (score <= 9) {
          results = "mild"
      } else if (score <= 14) {
          results = "moderate"
      } else if (score >= 15) {
          results = "severe"
      }

      if (score < 0) score = 0;
      if (score > 21) score = 21;

      const openAINewInstruction = `You're a mental health assistant who specializes in treating anxiety disorder and depression. Based on previous test results, your patient scored a ${score} on the GAD-7 anxiety test, which indicates they might have ${results} anxiety. You must give them a report on their test result before responding to the patient.`;

      dispatch(pushMessage({"role": "assistant", "content": openAINewInstruction}));

      alert(
        `According to your inputs, this informal test concludes that you have ${results} anxiety.
Please keep in mind that only trained health professionals can give you a concrete diagnosis.
It is always encourage that you find professional help if you feel like you need it. 
For now, we've handed your screening results to our Chatbot who might provide you with helpful information.
      `);
  };

  return (
    <View style={styles.container}>

    <ScrollView>
        <Text style={styles.textTitle}>
          GAD-7 Anxiety Test
        </Text>
        <Text style={styles.textSecondaryTitle}>
            This is the GAD-7 Anxiety Test.{"\n"}{"\n"}
            Please keep in mind that these tests are not intended to provide a diagnosis – only trained health professionals should do this. 
        </Text>

        <Text> </Text>

      <Text style={styles.questionText}>Over the last 2 weeks, how often have you been bothered by the following problems?</Text>
      <Text>0 - Not at all</Text>
      <Text>1 - Several days</Text>
      <Text>2 - More than half the days</Text>
      <Text>03- Nearly every day</Text>


      <Text style={styles.questionText}>1. Feeling nervous, anxious or on edge</Text>
      <TextInput
        onChangeText={text => handleChange('q1', text)}
        value={responses.q1}
        placeholder="Enter a number between 0 and 3"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.questionText}>2. Not being able to stop or control worrying</Text>
      <TextInput
        onChangeText={text => handleChange('q2', text)}
        value={responses.q2}
        placeholder="Enter a number between 0 and 3"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.questionText}>3. Worrying too much about different things</Text>
      <TextInput
        onChangeText={text => handleChange('q3', text)}
        value={responses.q3}
        placeholder="Enter a number between 0 and 3"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.questionText}>4. Trouble relaxing</Text>
      <TextInput
        onChangeText={text => handleChange('q4', text)}
        value={responses.q4}
        placeholder="Enter a number between 0 and 3"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.questionText}>5. Being so restless that it's hard to sit still</Text>
      <TextInput
        onChangeText={text => handleChange('q5', text)}
        value={responses.q5}
        placeholder="Enter a number between 0 and 3"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.questionText}>6. Becoming easily annoyed or irritable</Text>
      <TextInput
        onChangeText={text => handleChange('q6', text)}
        value={responses.q6}
        placeholder="Enter a number between 0 and 3"
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.questionText}>7. Feeling afraid as if something awful might happen</Text>
      <TextInput
        onChangeText={text => handleChange('q7', text)}
        value={responses.q7}
        placeholder="Enter a number between 0 and 3"
        keyboardType="numeric"
        style={styles.input}
      />

      <Button onPress={handleSubmit} title="Submit" />
      </ScrollView>
    </View>
  );
};

export default GAD7AnxietyTestForm;
import React from 'react';
import {FlatList, StyleSheet, Text, View, MultipleChoice} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import CheckBox from '@react-native-community/checkbox';
import { useState } from 'react';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 75,
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
    }
  
  });

const DepressionTestPage = () => {

  // const [toggleCheckBox, setToggleCheckBox] = useState(false)

  return (
    <View style={styles.container}>



        <Text style={styles.textTitle}>
            PHQ-9 Depression Test
        </Text>
        <Text style={styles.textSecondaryTitle}>
            This is the PHQ-9 Depression Test.{"\n"}{"\n"}
            Please keep in mind that these tests are not intended to provide a diagnosis – only trained health professionals should do this. 
        </Text>

        <Text> </Text>
        <Text style={styles.questionText}>Over the last 2 weeks, how often have you been bothered by any of the following problems?</Text>


    </View>
    
  );
};

export default DepressionTestPage;
import React, { useState } from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 75,
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

const DepressionTestPage = () => {
  return (
    <View style={styles.container}>

        <Text style={styles.textTitle}>
            PHQ-9 Anxiety Test
        </Text>
        <Text style={styles.textSecondaryTitle}>
            This is the PHQ-9 Depression Test.
        </Text>
      
    </View>
  );
};

export default DepressionTestPage;
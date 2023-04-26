import React from 'react';
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

const ResourcesTab = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
          <Text style={styles.textTitle}>
              Resources
          </Text>
          <Text style={styles.textSecondaryTitle}>
              This tab is under construction. However, However, our AI-Powered chatbot might give you useful information if you ask it.
          </Text>
      </View>


    </View>
  );
};

export default ResourcesTab;
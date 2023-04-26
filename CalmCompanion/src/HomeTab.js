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

const HomeTab = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList

        ListHeaderComponent={
            <View>
                <Text style={styles.textTitle}>
                    Welcome! We're here to help.
                </Text>
                <Text style={styles.textSecondaryTitle}>
                    Recommended tasks
                </Text>
            </View>
        }

        data={[
          {key: 'Take a screening test', onPressAction: () => navigation.navigate("ScreeningTab")},
          {key: 'Talk to our ChatGPT-powered chatbot', onPressAction: () => navigation.navigate("ChatbotTab")},
          {key: 'Find mental health resources', onPressAction: () => navigation.navigate("ResourcesTab")},
        ]}

        renderItem={({item}) => 
            <TouchableOpacity onPress={item.onPressAction} >
                <Text style={styles.item}>{item.key}</Text>
            </TouchableOpacity>
        }

      />

    </View>
  );
};

export default HomeTab;
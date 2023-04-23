import React from 'react';
import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import AnxietyTestPage from './Pages/AnxietyTestPage';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

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

const AnxietyTestScreen = ( {navigation} ) => {
    return (
      <AnxietyTestPage/>
    )
}

const DepressionTestScreen = ( {navigation} ) => {
    return (
      <View>
        <Text>DepressinTest</Text>
      </View>
    )
}

const ScreenTabHome = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}>
            Screening
        </Text>
        <Text style={styles.textSecondaryTitle}>
            Taking a screening test can halp you evaluate your current mental health state.{"\n"}{"\n"}
            Please keep in mind that these tests are not intended to provide a diagnosis – only trained health professionals should do this.
        </Text>
      <FlatList
        data={[
          {key: 'GAD-7 (Anxiety Screening)', screenName: "GAD7"},
          {key: 'PHQ-9 (Depression Screening)', screenName: "PHQ9"},
        ]}
        renderItem={({item}) => 
            <TouchableOpacity onPress={() => navigation.navigate(item.screenName)} >
                <Text style={styles.item}>{item.key}</Text>
            </TouchableOpacity>
        }
      />
     </View>
    );
}

const ScreeningTab = ( {navigation} ) => {
  return (      
    <Stack.Navigator initialRouteName="ScreenTabHome">
        <Stack.Screen name="ScreenTabHome" component={ScreenTabHome}/>
        <Stack.Screen name="GAD7" component={AnxietyTestScreen} />
        <Stack.Screen name="PHQ9" component={DepressionTestScreen} />
    </Stack.Navigator>
  );
};

export default ScreeningTab;
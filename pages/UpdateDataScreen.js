import * as React from 'react';
import {Button, View, Text, SafeAreaView} from 'react-native';

const UpdateDataScreen = ({route, navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <Text style={{fontSize: 18, textAlign: 'center', color: 'grey'}}>
          third page
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default UpdateDataScreen;

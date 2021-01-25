import * as React from 'react';
import {Button, View, Text, SafeAreaView} from 'react-native';

const InserdDataScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>This is Update Data Screen of the App</Text>
          <Button
            title="Updat Screen"
            onPress={() => navigation.navigate('UpdateDataScreen')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InserdDataScreen;

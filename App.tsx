import React, {useEffect} from 'react';
import {Text, Alert, SafeAreaView} from 'react-native';
import useNotificationPermission from './src/hooks/useNotificationPermission';
import usePushwoosh from './src/hooks/UsePushWoosh';
import messaging from '@react-native-firebase/messaging';
import {useState} from 'react';

const App = () => {
  const {permissionGranted, deviceToken} = useNotificationPermission();
  const [pushwooshInitialized, setPushwooshInitialized] = useState(false);
  const pushwoosh = usePushwoosh(); // Move this line here

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (permissionGranted && !pushwooshInitialized) {
      pushwoosh; // Call the init method of the pushwoosh object
      setPushwooshInitialized(true);
    }
  }, [permissionGranted, pushwooshInitialized]);

  return (
    <SafeAreaView>
      <Text>Permission Granted: {permissionGranted ? 'Yes' : 'No'}</Text>
      {deviceToken && <Text>Device Token: {deviceToken}</Text>}
    </SafeAreaView>
  );
};

export default App;

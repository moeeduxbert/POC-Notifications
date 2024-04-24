import {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';

const useNotificationPermission = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [deviceToken, setDeviceToken] = useState(null);

  useEffect(() => {
    const requestPermissionAndToken = async () => {
      try {
        // Request permission for notifications
        const authStatus = await messaging().requestPermission();
        if (
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL
        ) {
          console.log('Authorization status:', authStatus);
          setPermissionGranted(true);
          // Retrieve device token if permission granted
          const token = await messaging().getToken();
          console.log('FCM Token:', token);
          setDeviceToken(token);
        } else {
          console.log('Permission denied for notifications.');
          setPermissionGranted(false);
        }
      } catch (error) {
        console.error('Error requesting permission:', error);
        setPermissionGranted(false);
      }
    };

    requestPermissionAndToken();
  }, []);

  return {permissionGranted, deviceToken};
};

export default useNotificationPermission;

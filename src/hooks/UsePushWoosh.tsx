import {useEffect} from 'react';
import {DeviceEventEmitter} from 'react-native';
import Pushwoosh from 'pushwoosh-react-native-plugin';

const usePushwoosh = () => {
  useEffect(() => {
    const initializePushwoosh = async () => {
      try {
        // Initialize Pushwoosh
        await Pushwoosh.init({
          pw_appid: '073C1-3C29D',
          project_number: '210962444930',
        });
        // Register device with Pushwoosh
        await Pushwoosh.register();
      } catch (error) {
        console.error('Error initializing Pushwoosh:', error);
        // Handle initialization error here, e.g., show error message or retry
      }
    };

    initializePushwoosh();

    // Event listener for when push notification is received
    const pushReceivedListener = DeviceEventEmitter.addListener(
      'pushReceived',
      e => {
        try {
          console.warn('pushReceived: ' + JSON.stringify(e));
          // Implement passive reaction to a push, such as UI update or data download.
        } catch (error) {
          console.error('Error handling push notification:', error);
          // Handle error accordingly, e.g., show error message
        }
      },
    );

    // Event listener for when user clicks on notification
    const pushOpenedListener = DeviceEventEmitter.addListener(
      'pushOpened',
      e => {
        try {
          console.warn('pushOpened: ' + JSON.stringify(e));
          // Implement user interaction, such as showing push details
        } catch (error) {
          console.error('Error handling push notification:', error);
          // Handle error accordingly, e.g., show error message
        }
      },
    );

    // Clean up event listeners when component unmounts
    return () => {
      pushReceivedListener.remove();
      pushOpenedListener.remove();
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount
};

export default usePushwoosh;

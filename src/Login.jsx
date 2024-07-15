import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

const Login = () => {


  const enableBiometric = () => {
    const rnBiometrics = new ReactNativeBiometrics();
    rnBiometrics
      .isSensorAvailable()
      .then(({available, biometryType}) => {
        console.log('Hii', available, biometryType, BiometryTypes.TouchID);
        if (available && biometryType === BiometryTypes.TouchID) {
          Alert.alert(
            'TouchID',
            'Would you like to enable TouchId authentication for the next time? ',
            [
              {
                text: 'Yes Please',
                onPress: () => {
                  Alert.alert(
                    'Success',
                    'TouchId authentication enabled successfully ',
                  );
                },
              },
              {text: 'Cancel', style: 'cancel'},
            ],
          );
        } else if (available && biometryType === BiometryTypes.FaceID) {
          Alert.alert(
            'FaceID',
            'Would you like to enable FaceID authentication for the next time?',
            [
              {
                text: 'Yes please',
                onPress: () =>
                  Alert.alert(
                    'Success!',
                    'FaceID authentication enabled successfully!',
                  ),
              },
              {text: 'Cancel', style: 'cancel'},
            ],
          );
        } else if (available && biometryType === BiometryTypes.Biometrics) {
        //   Alert.alert(
        //     'Device Supported Biometrics',
        //     'Biometrics authentication is supported.',
        //   );
        } else {
          Alert.alert(
            'Biometrics not supported',
            'This device does not support biometric authentication.',
          );
        }
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert(
          'Error',
          'An error occurred while checking biometrics availability.',
        );
      });
  };

  const handleBiometricAuth = async () => {
    enableBiometric();
    try {
      const rnBiometrics = new ReactNativeBiometrics();
      const {success, error} = await rnBiometrics.simplePrompt({
        promptMessage: 'Finger Print Authentication ',
      });
      if(success) {
        Alert.alert("Success","Biometric authentication successfully");
        return true;
      }else{
        Alert.alert("Authentication failed","Biometric authentication failed" );
        return false
      }
    } catch (error) {
      Alert.alert("Error","Biometric authentication failed from the devices");
      return false
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handleBiometricAuth} style={styles.holder}>
        <Text style={styles.text}>Biometric Authentication</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
holder:{
    borderWidth:2,
    marginVertical:10,
    width:'95%',
    alignSelf:'center',
    padding:10,
    alignItems:'center',
    borderRadius:10,
    backgroundColor:'#82F4CC',
    borderColor:'#82F4CC'
},
text:{
    fontSize:18,
    fontWeight:'800',
    color:'#000000'
}
});

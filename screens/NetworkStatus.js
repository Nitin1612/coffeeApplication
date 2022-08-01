import React, { PureComponent ,useState,useEffect} from 'react';
import { View, Text, Dimensions,Image, StyleSheet, Platform } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>Internet Not available</Text>
    </View>
  );
 }

let currentNetwork;

NetInfo.fetch().then(state => {
currentNetwork = state.isConnected;
});

const NetworkStatus  = () => {
const [netInfo, setNetInfo] = useState(currentNetwork);
console.log(netInfo,"netInfo")

useEffect(() => {
const unsubscribe = NetInfo.addEventListener(state => {
setNetInfo(state.isConnected);
});
return unsubscribe;
}, []);

return(
      !netInfo?<MiniOfflineSign/>:null
    )
};




const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#212121',
    //height: 20,
    alignItems: 'center',
    flexDirection: 'row',
    width,
    position: 'absolute',
    bottom: 90,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  offlineText: {
    color: '#fff',
    justifyContent: 'flex-start',
    paddingHorizontal: 10
  },
  retryButton: {
    justifyContent: 'flex-end',
    right: 0,
    paddingHorizontal: 10
  }
});
export default NetworkStatus;
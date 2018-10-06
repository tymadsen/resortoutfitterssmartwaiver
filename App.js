import React from 'react';
import { StyleSheet, View, Text, Image, Vibration, ScrollView, CameraRoll, Dimensions, TouchableOpacity, Platform, AsyncStorage } from 'react-native';
import { WebBrowser, Permissions, Constants, FileSystem } from 'expo';
//import Camera from 'react-native-camera';

const data = require('./assets/data.json');
const { height, width } = Dimensions.get('window');
const logos = {
  "broadmooroutfitters": require("./assets/BroadmoorOutfitters.png"),
  "greenbrieroutfitters": require("./assets/GBO_LOGO.png"),
  "gasparillaadventures": require("./assets/GIA_logov2.png"),
  "boarsheadoutfitters": require("./assets/boarshead_outfitters.png")
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // permissionsGranted: null,
      // type: 'front',
      // flash: 'off',
      // autofocus: 'on',
      // photoID: 1,
      // photos: []
    };
  }

//async componentWillMount(){
  // const {status} = await Permissions.askAsync(Permissions.CAMERA);
  // this.setState({permissionsGranted: status === 'granted'});
//}

  //async componentDidMount() {
    // this._getLocationKey();
    // FileSystem.makeDirectoryAsync(FileSystem.documentDirectory+'Smartwaiver/photos').catch(e=> {
    //   console.log(e,'Directory exists');
    // });
  //}

  // takePicture = async function() {
  //   if(this.camera) {
  //     console.log('inside camera');
  //     this.camera.takePictureAsync().catch(e=>{console.log(e);}).then(data=> {
  //       CameraRoll.saveToCameraRoll(data.uri, 'photo${this.state.photoID}')
  //       Console.log(data.uri);
  //       Console.log('inside camera roll');
  //       //FileSystem.copyAsync({
  //         //from: data.uri,
  //         //to: '${FileSystem.documentDirectory}photos/Photo_${this.state.photoID}.jpg'
  //       }).then(() => {
  //         this.setState({
  //           photoID: this.state.photoID +1,
  //         });
  //         Vibration.vibrate();
  //       //  });
  //       });
  //   }
  //   console.log('picture taken');
  // }

  render() {

    if (this.state.locationKey && this.state.locationKey !== null) {
      const locationData = data[this.state.locationKey];
      if (locationData !== undefined) {
        return (
          <View style={styles.content}>
            <ScrollView contentContainerSytle={styles.container}>
              <View style={styles.imageContainer}>
                <Image
                style={styles.image}
                source={logos[this.state.locationKey]}
                />
              </View>
              {locationData.buttons.map((item, idx) => {
                return (<View key={idx}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => this._handleButtonPressAsync(item.url)}
                    >
                      <Text style={styles.buttonText}> {item.title} </Text>
                    </TouchableOpacity>
                    <View style={styles.spacer} />
                  </View>);
              })}
            </ScrollView>
          </View>
        );
      }
      else {
        return <View><Text>Error</Text></View>;
      }
    }
    else {
      return (
        <View style={styles.content}>
          <ScrollView contentContainerSytle={styles.container}>
            <View style={styles.imageContainer}>
              <Image
              style={styles.image}
              source={require('./assets/resort_outfitters.png')}
              />
            </View>
            {Object.keys(data).map((id, idx) => {
              return (<View key={idx}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this._setLocationKey(id)}
                  >
                    <Text style={styles.buttonText}> {data[id].name} </Text>
                  </TouchableOpacity>
                  <View style={styles.spacer} />
                </View>);
            })}
          </ScrollView>
        </View>
      );
    }
  };

  _handleButtonPressAsync = (uri) => {
      // this.takePicture();
      WebBrowser.openBrowserAsync('https://www.smartwaiver.com/v/'+uri);
  };

  _setLocationKey = (id) => {
    AsyncStorage.setItem('@ResortOutfitters:location', id)
    .then(() => {this.setState({locationKey: id});})
    .catch(err => {console.log(err);});
  };

  _getLocationKey = () => {
    AsyncStorage.getItem('@ResortOutfitters:location')
    .then(key => {this.setState({locationKey: key});})
    .catch(err => {console.log(err);});
  };
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  spacer: {
    height: 10
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  image: {
    height: Platform.OS === 'ios' ? height/2.5 : height/2.5,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#009900',
    padding: 10
  },
  buttonText: {
    fontSize: 30,//Platform.OS === 'ios' ? 30 : 18,
    fontWeight: 'bold'
  }
});

export default App;

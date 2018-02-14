import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Dimensions, TouchableOpacity, Platform, AsyncStorage } from 'react-native';
import { WebBrowser } from 'expo';

const data = require('./assets/data.json');
const { height, width } = Dimensions.get('window');
const logos = {
  "broadmooroutfitters": require("./assets/BroadmoorOutfitters.png"),
  "greenbrieroutfitters": require("./assets/GBO_LOGO.png"),
  "gasparillaadventures": require("./assets/GIA_logov2.png")
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this._getLocationKey();
  }

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

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
    this.state = {locationKey: await this._asyncGetLocationKey()};
  }

  // setStateAsync(state) {
  //   return new Promise((resolve) => {
  //     this.setState(state, resolve);
  //   });
  // }

  // async componentDidMount() {
  //   this.setStateAsync()
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
                    onPress={() => this._asyncSetLocationKey(id)}
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

  _handleButtonPressAsync = async (uri) => {
    let result = await WebBrowser.openBrowserAsync('https://www.smartwaiver.com/v/'+uri);
  };

  _asyncSetLocationKey = async (id) => {
    try {
      await AsyncStorage.setItem('@ResortOutfitters:location', id);
      this.setState({locationKey: id});
    }
    catch (error) {
      console.log("An error occured: ");
      console.log(error);
    }
  };

  _asyncGetLocationKey = async () => {
    try {
      const key = await AsyncStorage.getItem('@ResortOutfitters:location');
      if (key !== null) {
        return key;
      }
      else {
        return null;
      }
    }
    catch (error) {
      console.log("An error occured: ");
      console.log(error);
      return null;
    }
  };
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 20
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
    height: Platform.OS === 'ios' ? height/2.5 : height/3,
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
    fontSize: Platform.OS === 'ios' ? 30 : 18,
    fontWeight: 'bold'
  }
});

export default App;

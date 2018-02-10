import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { WebBrowser } from 'expo';

const { height, width } = Dimensions.get('window');

class App extends React.Component {

  render() {
    const urlData = [
      {title: "General", url: 'bmoorgeneral'},
      {title: "Laser Tag", url: 'bmoorlasertag'},
      {title: "Falconry", url: 'bmoorfalconry'},
      {title: "Rock Climbing", url: 'bmoorrockclimbing'},
      {title: "Bubble Soccer", url: 'bmbubblesoccer'},
      {title: "Paintball", url: 'bmoorpaintball'},
      {title: "Bike Rental", url: 'bmoorbikerental'},
      {title: "Unguided Bike Shuttle", url: 'bmoorunguided'}
    ];

    return (
      <View style={styles.content}>
        <ScrollView contentContainerSytle={styles.container}>
          <View style={styles.imageContainer}>
            <Image
            style={styles.image}
            source={require('./assets/resort_outfitters.png')}
            />
          </View>
          {urlData.map((item, idx) => {
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

  _handleButtonPressAsync = async (uri) => {
    let result = await WebBrowser.openBrowserAsync('https://www.smartwaiver.com/v/'+uri);
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
    height: height/3,
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
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default App;

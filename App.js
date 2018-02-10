import React from 'react';
import { Button, StyleSheet, View, Text, WebView, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation'

const { height, width } = Dimensions.get('window');

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Resort Outfitters',
  };

  render() {
    const { navigate } = this.props.navigation;
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
      <View style={{flex: 1}}>
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
                  onPress={() => navigate('Webview', { url: item.url })}
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
}

class WebViewScreen extends React.Component {
  static navigationOptions = {
    title: 'Resort Outfitters',
  };
  render() {
    const { state } = this.props.navigation;
    return (
      <WebView
        source={{uri: 'https://www.smartwaiver.com/v/'+state.params.url}}
        style={{marginTop: 20}}
      />
    );
  }
}

const App = StackNavigator({
  Home: { screen: HomeScreen },
  Webview: { screen: WebViewScreen },
});

const styles = StyleSheet.create({
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
    // width: width,
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

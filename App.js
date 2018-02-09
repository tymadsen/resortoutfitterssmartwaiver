import React from 'react';
import { Button, StyleSheet, View, WebView } from 'react-native';
import { StackNavigator } from 'react-navigation'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Broadmoor Outfitters',
  };

  render() {
    const { navigate } = this.props.navigation;
    const urlData = [
      {title: "General", url: 'bmoorgeneral'},
      {title: "Laser Tag", url: 'bmoorlasertag'},
      {title: "Falconry", url: 'bmoorfalconry'},
      {title: "Rock Climbing", url: 'bmoorrockclimbing'},
      {title: "Bubble Soccer", url: 'bmbubblesoccer'},
      {title: "Unguided Bike Shuttle", url: 'bmoorunguided'},
      {title: "Paintball", url: 'bmoorpaintball'},
      {title: "Bike Rental", url: 'bmoorbikerental'}
    ];

    return (
      <View style={styles.container}>

        {urlData.map((item, idx) => {
          return (<View key={idx}>
              <Button title={item.title} onPress={() => navigate('Webview', { url: item.url })} />
              <View style={styles.spacer} />
            </View>);
        })}

      </View>
    );
  }
}

class WebViewScreen extends React.Component {
  static navigationOptions = {
    title: 'Broadmoor Outfitters',
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
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10
  },
  spacer: {
    height: 10
  }
});

export default App;

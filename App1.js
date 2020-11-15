/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

export default class App extends React.Component{

  constructor(props){
    super(props);
    
    this.state = {
      loading: false,
      pokemon: [],
      url: 'https://pokeapi.co/api/v2/pokemon/'

    }

  }

  componentDidMount(){
    this.getPokemon();
  

  }

  getPokemon = () => {
    this.setState({loading:true})

    fetch(this.state.url)
    .then(res => res.json())
    .then(res => {

      this.setState({
        pokemon: res.results,
        url: res.next,
        loading: false
      })
      
    });

  };
  
  render(){
    if(this.state.loading){
      return(
        <View style={styles.container}>
          <Text>Descargando Pokemon!</Text>
        </View>
      );
    }

  return(
     <View style={{flex: 1, paddingTop:50, paddingLeft:5}}>
       <FlatList
         data = {this.state.pokemon}
         renderItem = {
           ({item}) => <Text>{item.name}</Text>  
         } 
         keyExtractor = {(item,index) => index.toString()}
         />      
     </View>
  );
 }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

//export default App;

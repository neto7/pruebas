import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
  Image
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
      recuperado: false,
      bitcoin: null,
      fecha: null, 
      url: 'https://api.coindesk.com/v1/bpi/currentprice.json'

    }

  }

  componentDidMount(){
    this.getBitcoin();
    //setInterval(this.getBitcoin, 1000)
  }

  getBitcoin = () => {
    this.setState({recuperado:true})

    fetch(this.state.url)
    .then(response => {
      if (!response.ok) throw Error(response.status);

      return response.json();
  })
  .then(response => {

      this.setState({
      bitcoin: response.bpi.USD.rate,
      fecha: response.time.updated,
      //fecha: new Date().toLocaleTimeString(),
      recuperado: false
    })
    
  })
  .then(response => console.log("ok"))
  .catch(error => console.log(error));   
  };
  
  render(){
    
    var valor = String(this.state.bitcoin);
    valor = parseFloat(valor.replace(/,/g, "")); 
    var pesochileno = valor*700;
    
    if(this.state.recuperado){
      return(
        <View style={styles.container}>
          <Image source = {require('./src/imgs/Innoapsion.png')}/>
          <Text>Obteniendo valor Bitcoin</Text>
        </View>
      );
    }

  return(
     <View style={styles.container}>
      <Image source = {require('./src/imgs/Innoapsion.png')}/> 
      <View style={styles.containertexto}> 
       <Text style={styles.texto}>Fecha y hora de última actualización {this.state.fecha}</Text>
       <Text style={styles.texto}>Un Bitcoin equivale a {valor.toFixed(2)} dolares</Text>
       <Text style={styles.texto}>Un Bitcoin equivale a {pesochileno.toFixed(2)} pesos chilenos</Text>
      </View>
       <View>
       <TouchableHighlight style={styles.boton}
           underlayColor='#f1c40f'
           onPress={() => this.componentDidMount()}>
      <Text >Actualizar Datos</Text>
      </TouchableHighlight> 
       </View>
     </View>
  );}
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#98d2c1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boton:{
    width:300,
    height:40,
    backgroundColor:'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:300,
    marginBottom: 10,
    borderRadius: 15,
    borderWidth: 1
  },
  texto:{
    color:'black',
    fontSize: 16,
  },
  containertexto:{
    marginTop:200,
    marginLeft:10
    
  }
});


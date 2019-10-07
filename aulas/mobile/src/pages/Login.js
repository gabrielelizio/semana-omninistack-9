import React, { useState, useEffect } from 'react';
import { View, AsyncStorage ,KeyboardAvoidingView, Platform, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';


import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({navigation}){
  const [email, setEmail] = useState('');
  const [techs, setTechs] = useState('');

   useEffect(()=>{
     AsyncStorage.getItem('user').then(user => {
       if(user){
        navigation.navigate('List')
       }
    })
   },[]);

  // está função acima é para verificar se existe usuário logado, se exisitir
  // será redirecionado para pagina List.



  async function handleSubmit(){
    // email, techs
    const response = await api.post('/sessions',{
      email
    })

    const { _id } = response.data;

    await AsyncStorage.setItem('user', _id);

    await AsyncStorage.setItem('techs', techs);
    
    navigation.navigate('List');
  }


  return (
  <KeyboardAvoidingView enabled={Platform.OS==='ios'} behavior="padding" style={styles.container}>
    <Image source={logo}/>

    <View style={styles.form}>
    <Text style={styles.label}> SEU E-MAIL *</Text>
    <TextInput
      style={styles.input}
      placeholder="Seu e-mail"
      placeholderTextColor= "#999"
      keyboardType="email-address"  // colocando o tipo do input como teclado
      autoCapitalize="none" // Par não colocar a primeira letra maiuscula
      autoCorrect={false} // para não corrigir o email digitado.
      value={email}
      onChangeText={setEmail}
    />


    <Text style={styles.label}>TECNOLOGIAS *</Text>
    <TextInput
      style={styles.input}
      placeholder="Tecnologias de interesse*"
      placeholderTextColor= "#999"
      autoCapitalize="words" // Colocar  primeira maisucula em maiusculo
      autoCorrect={false} // para não corrigir o email digitado.
      value={techs}
      onChangeText={setTechs}
    />

    <TouchableOpacity onPress={handleSubmit} style={styles.button}>
      <Text style={styles.buttonText}> Encontrar spots</Text>
    </TouchableOpacity>


    </View>
  </KeyboardAvoidingView>
  //KeyboardAvoidingView é utilizado pois no IOS ao clicar em tecnologia o 
  // teclado sobrepoem o campo. com isso é utilizad o KeyboardAvoidingView com o
  // behavior = padding

  );
}


const styles = StyleSheet.create({

  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems:'center'
  },

  form:{
      alignSelf: 'stretch',
      paddingHorizontal: 30,
      marginTop: 30,  
  },

  label:{
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },

 input:{
   borderWidth: 1,
   borderColor: '#ddd',
   paddingHorizontal: 20,
   fontSize: 16,
   color: '#444',
   height: 44,
  marginBottom: 20,
  borderRadius: 2,
 },

 button:{
   height: 42,
   backgroundColor: '#f05a5b',
   justifyContent: 'center',
   alignItems:'center',
   borderRadius: 2,
 },

  buttonText:{
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  }



})
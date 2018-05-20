import React from 'react';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {

		let items = [];
        let count = 0;
        responseJson.movies.forEach(child => {
          items.push({
            title: child.title,
            releaseYear: child.releaseYear,
            key: count
          });
		  count = count + 1;
        });
	  
        this.setState({
          isLoading: false,
          dataSource: items,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
		<Text>hola</Text>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.title}, {item.releaseYear}, {item.key}</Text>}
          keyExtractor={(item, index) => item.key.toString()}
        />
      </View>
    );
  }
}
import React,{Component} from 'react'
import {View,Text, FlatList, StyleSheet, Alert, SafeAreaView} from 'react-native'
import {ListItem} from 'react-native-elements'
import axios from 'axios'

export default class HomeScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            listData:[],
            url:"http://localhost:5000/"
        }
    }
    componentDidMount(){
        this.getPlanets()

    }
    getPlanets=()=>{
        const {url}=this.state;
        axios
            .get(url)
            .then(response=>{
                return this.setState({
                    listData: response.data.data
                })
            })
            .catch(error=>{
                Alert.alert(error.message)
            })
    }
    renderItem=({item,index})=>(
        <ListItem
        key={index}
        title={`planet:${item.name}`}
        subtitle={`distancefromearth:${item.distance_from_earth}`}
        titleStyle={{fontSize:18,fontWeight:"bold",color:"blue"}}
        containerStyle={{backgroundColor:"yellow"}}
        bottomDivider
        onPress={()=>this.props.navigation.navigate("details",{planet_name:item.name})}
        />
    )
    keyExtractor=(item,index)=>index.toString();
    render(){
        const {listData}=this.state
        // if (listData.length===0){
        //     return(
        //     <View style={{flex:1,justifyContent:"centre",alignItems:"centre"}}>
        //         <Text>Loading</Text>
        //     </View>
        //     )
        //}
        return(
            <View style={{flex:1,backgroundColor:"green"}}>
                <View style={{flex:0.1,justifyContent:"centre",alignItems:"centre"}}>
                    <Text style={{fontSize:30,fontWeight:"bold",color:"blue"}}>
                        Planet World
                    </Text>
                </View>
                <View style={{flex:0.9}}>
                    <FlatList>
                        keyExtractor={this.keyExtractor}
                        data={this.state.listData}
                        renderItem={this.renderItem}
                    </FlatList>
                </View>
            </View>
        )
    }
}

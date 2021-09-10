import React,{Component} from 'react'
import {View,Text, FlatList, StyleSheet, Alert, SafeAreaView,} from 'react-native'
import {Card,Icon} from 'react-native-elements'
import axios from 'axios'

export default class DetailScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            details:{},
            imagePath:"",
            url:`http://localhost:5000/planet?name=${this.props.navigation.getParam( "planet_name" )}`
        }
    }
    componentDidMount(){
        this.getDetails()

    }
    getDetails=()=>{
        const {url}=this.state;
        axios
            .get(url)
            .then(response=>{
                this.setDetails(response.data.data)
            })
            .catch(error=>{
                Alert.alert(error.message)
            })
    }
    setDetails=planetDetails=>{
        const planetType=planetDetails.planet_type;
        let imagePath="";
        switch(planetType){
            case "Gas Giant":imagePath=require("../assets/gas_giant.png");
            break;
            case "Terrestrial":imagePath=require("../assets/terrestrial.png");
            break;
            case "Super Earth":imagePath=require("../assets/super_earth.png");
            break;
            case "Neptune Like":imagePath=require("../assets/neptune_like.png");
            break;
            default:
                imagePath=require("../assets/gas_giant.png");
        }
        this.setState({
            details:planetDetails,
            imagePath:imagePath
        })
    }
    render(){
        const {details,imagePath}=this.state
        if(details.specifications){
        return(
            <View style={{flex:1}}>
                <Card title={details.name}
                image={imagePath}
                imageProps={{resizeMode:"contain",width:"100%"}}>
                <View>
                    <Text style={{marginBottom:10}}>
                        {`distance from earth:${details.distance_from_earth}`}
                    </Text>
                    <Text style={{marginBottom:10}}>
                        {`distance from sun:${details.distance_from_their_sun}`}
                    </Text>
                    <Text style={{marginBottom:10}}>
                        {`gravity:${details.gravity}`}
                    </Text>
                    <Text style={{marginBottom:10}}>
                        {`orbital period:${details.orbital_period}`}
                    </Text>
                    <Text style={{marginBottom:10}}>
                        {`orbital speed:${details.orbital_speed}`}
                    </Text>
                    <Text style={{marginBottom:10}}>
                        {`planet mass:${details.planet_mass}`}
                    </Text>
                    <Text style={{marginBottom:10}}>
                        {`planet radius:${details.planet_radius}`}
                    </Text>
                    <Text style={{marginBottom:10}}>
                        {`planet type:${details.planet_type}`}
                    </Text>
                </View>
                <View style={[styles.cardItem,{flexDirection:"column"}]}>
                    <Text>
                        {details.specifications?`specifications:`:""}
                    </Text>
                    {details.specifications.map((item,index)=>(
                        <Text key={index.toString()} style={{marginLeft:50}}>
                            {item}
                        </Text>
                    ))}
                </View>
                </Card>
            </View>
        )
    }
    return null;
}
}
const styles=StyleSheet.create({
    cardItem:{
        marginBottom:10
    }
})
import React from 'react';
import { TouchableOpacity, TextInput, KeyboardAvoidingView, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { f, auth, database, storage } from '../config/config.js';

class userAuth extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            authStep: 0,
            email: '',
            pass: '',
            moveScreen: false
        }
    }

    
    login = async() => {
        var email = this.state.email;
        var pass = this.state.pass;
        if(email != '' && pass != ''){
            try{
                let user = await auth.signInWithEmailAndPassword(email, pass);
            }catch(error){
                console.log(error);
                alert(error);
            }
        }else{
        alert('email or password is empty...');
        }
    }


    createUserObj = (userObj, email) => {
        console.log(userObj, email, userObj.uid);
        var uObj = {
            name: 'Enter name',
            username: '@name',
            avatar: 'http://www.gravatar.com/avatar',
            email: email
        };
        database.ref('users').child(userObj.uid).set(uObj);
    }

    signup = async() => {
        var email = this.state.email;
        var pass = this.state.pass;
        if(email != '' && pass != ''){
            try{
                let user = await auth.createUserWithEmailAndPassword(email, pass)
                .then((userObj) => this.createUserObj(userObj.user, email))
                .catch((error) => alert(error));
            }catch(error){
                console.log(error);
                alert(error);
            }
        }else{
        alert('email or password is empty...');
        }
    }

    componentDidMount = () =>{
        if(this.props.moveScreen==true){
        this.setState({moveScreen: true});
    }
    }

    showLogin = () => {
        if(this.state.moveScreen == true){
            this.props.navigation.navigate('Upload');
        }
        this.setState({authStep: 1});
    }
    showSignup =() => {
        if(this.state.moveScreen == true){
            this.props.navigation.navigate('Upload');
        }
        this.setState({authStep: 2});
    }

    render()
    {
        return(
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>You are not logged out</Text>
                <Text>{this.props.message}</Text>
                { this.state.authStep == 0 ? (
                    <View style={{marginVertical: 20, flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => this.setState({authStep: 1})}>
                            <Text style={{fontWeight: 'bold', color: 'green'}}>Login</Text>
                        </TouchableOpacity>
                        <Text>   or   </Text>
                        <TouchableOpacity onPress={() => this.showSignup()}>
                            <Text style={{fontWeight: 'bold', color: 'blue'}}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={{marginVertical: 20}}>
                        {this.state.authStep == 1 ? (
                            <View>
                                <TouchableOpacity onPress={() => this.setState({authStep: 0})}
                                style ={{borderBottomWidth: 1, paddingVertical: 5, marginBottom: 10, borderBottomColor: 'black' }}>
                                    <Text style = {{fontWeight:'bold'}}>Cancel</Text>
                                </TouchableOpacity>
                                <Text style={{fontWeight: 'bold', marginBottom:20}}>Login</Text>
                                <Text>Email Address</Text>
                                <TextInput
                                    editable={true}
                                    keyboardType={'email-address'}
                                    placeholder={'Enter your email address...'}
                                    onChangeText={(text) => this.setState({email: text})}
                                    value={this.state.email}
                                    style={{width: 250, marginVertical: 10, padding: 5, borderColor:'grey', borderWidth: 1, borderRadius: 3}}
                                />
                                
                                <Text>Password:</Text>
                                <TextInput
                                    editable={true}
                                    secureTextEntry
                                    placeholder={'Enter your password...'}
                                    onChangeText={(text) => this.setState({pass: text})}
                                    value={this.state.pass}
                                    style={{width: 250, marginVertical: 10, padding: 5, borderColor:'grey', borderWidth: 1, borderRadius: 3}}
                                />
                                <TouchableOpacity
                                style = {{backgroundColor:'green', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5}}
                                onPress = {() => this.login()}>
                                    <Text style={{color: 'white'}}>Login</Text>
                                </TouchableOpacity>
                            </View>
                ) : (
                    <View>
                    <TouchableOpacity onPress={() => this.setState({authStep: 0})}
                    style ={{borderBottomWidth: 1, paddingVertical: 5, marginBottom: 10, borderBottomColor: 'black' }}>
                        <Text style = {{fontWeight:'bold'}}>Cancel</Text>
                    </TouchableOpacity>
                    <Text style={{fontWeight: 'bold', marginBottom:20}}>Sign Up</Text>
                    <Text>Email Address</Text>
                    <TextInput
                        editable={true}
                        keyboardType={'email-address'}
                        placeholder={'Enter your email address...'}
                        onChangeText={(text) => this.setState({email: text})}
                        value={this.state.email}
                        style={{width: 250, marginVertical: 10, padding: 5, borderColor:'grey', borderWidth: 1, borderRadius: 3}}
                    />
                    
                    <Text>Password:</Text>
                    <TextInput
                        editable={true}
                        secureTextEntry
                        placeholder={'Enter your password...'}
                        onChangeText={(text) => this.setState({pass: text})}
                        value={this.state.pass}
                        style={{width: 250, marginVertical: 10, padding: 5, borderColor:'grey', borderWidth: 1, borderRadius: 3}}
                    />
                    <TouchableOpacity
                    style = {{backgroundColor:'blue', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5}}
                    onPress = {() => this.signup()}>
                        <Text style={{color: 'white'}}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                )}
            </View>
        )}
        </View>
        )
    
    }
}

export default userAuth;
import React, { useState } from 'react';
import { Container, Content, Form, Item, Label, Input, Button, Text, View } from 'native-base';
import { fetchPost } from '../hooks/APIHooks';
import { Alert, AsyncStorage } from 'react-native';

const Join = ({ navigation }) => {
    const [username, setUsername] = useState();

    const handleInput = (text) => {
        setUsername(text)
    };

    const joinGame = async () => {
        try {
            if (username) {
                const response = await fetchPost(username);
                if (!response.message) {
                    await AsyncStorage.setItem('token', response.token);
                    navigation.replace('Game');
                } else {
                    Alert.alert(
                        'Username',
                        response.message,
                        [
                            {text: 'OK'}
                        ]
                    );
                }
            } else {
                Alert.alert(
                    'Username',
                    'Please choose a username',
                    [
                        {text: 'OK'}
                    ]
                );
            }
        } catch (error) {
            console.log('joinGame error: ', error.message);
        }
    };

    return (
        <Container style={{flex: 1}}>
            <Content contentContainerStyle={{flex: 1}} scrollEnabled={false}>
                <View style={{top: 20, alignItems: 'center'}}>
                    <Text style={{fontSize: 40}}>Welcome!</Text>
                    <Text style={{fontSize: 20}}>Please choose a username to join the game!</Text>
                </View>
                <View style={{justifyContent: 'center', flex: 1}}>
                    <Form>
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input onChangeText={handleInput} value={username} />
                        </Item>
                        <Button success full onPress={joinGame}>
                            <Text>Join!</Text>
                        </Button>
                    </Form>
                </View>
            </Content>
        </Container>
    );
};

export default Join;
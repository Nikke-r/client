import React, { useState, useEffect } from 'react';
import { Container, Content, Text, Button, Toast, Root, View } from 'native-base';
import { fetchGet, fetchPut, fetchDel } from '../hooks/APIHooks';

const Game = ({ navigation }) => {
    const [gameOver, setGameOver]= useState(false);
    const [sendState, setSendState] = useState(false);
    const [points, setPoints] = useState();
    const [clicks, setClicks] = useState();
    const [username, setUsername] = useState();

    //When user joins the game, get the current gamestatus (clicks, own points and username)
    useEffect(() => {
        const getStatus = async () => {
            try {
                const response = await fetchGet();
                setPoints(response.user.points);
                setUsername(response.user.username);
                setClicks(response.clicks.length);
            } catch (error) {
                console.log('getStatus error: ', error.message);
            }
        };
        getStatus();
    }, []);

    //When the game button is pressed send the updated points to server and get new data from the server
    useEffect(() => {
        const sendData = async () => {
            if (points === 0) { 
                setGameOver(true);
            }
            try {
                const response = await fetchPut({points: (points - 1)});
                setClicks(response.clicks.length);
                if (response.clicks.length % 500 === 0 && response.clicks[response.clicks.length - 1].username === username) {
                    setPoints(response.user.points + 250);
                    Toast.show({
                        text: 'You won 250 points!',
                        type: 'success'
                    });
                } else if (response.clicks.length % 100 === 0 && response.clicks[response.clicks.length - 1].username === username) {
                    setPoints(response.user.points + 40);
                    Toast.show({
                        text: 'You won 40 points!',
                        type: 'success'
                    });
                } else if (response.clicks.length % 10 === 0 && response.clicks[response.clicks.length - 1].username === username) {
                    setPoints(response.user.points + 4);
                    Toast.show({
                        text: 'You won 4 points!',
                        type: 'success'
                    });
                } else {
                    setPoints(response.user.points);
                }
                setSendState(false);
            } catch (error) {
                console.log('sendData error: ', error.message);
            } 
        };

        //If statement so this useEffect doesn't run right away
        if (sendState) {
            sendData();
        }
    }, [sendState]);

    //If the user wants to try again set the points back to 20 and set the gameOver to false
    const tryAgain = async () => {
        try {
            setPoints(20);
            setGameOver(false);
        } catch (error) {
            console.log('tryAgain error: ', error.message);
        }
    };

    //If the user decides to quit the game clear the asyncstorage and delete user from the database
    const quitGame = async () => {
        try {
            await fetchDel();
            navigation.replace('Join');
        } catch (error) {
            console.log('quitGame error: ', error.message);
        }
    };

    return (
        <Root>
            <Container style={{flex: 1}}>
                {!gameOver ?
                <Content contentContainerStyle={{flex: 1}} scrollEnabled={false}>
                    <View style={{top: 10, alignItems: 'center'}}>
                        <Text style={{fontSize: 40}}> Player: {username} </Text>
                        <Text style={{fontSize: 40}}> Points: {points} </Text>
                        <Text style={{fontSize: 20}}> Clicks till next prize: {clicks}  </Text>
                    </View>
                    <View style={{justifyContent: 'center', flex: 1}}>
                        <Button full onPress={() => setSendState(true)}>
                            <Text>PRESS</Text>
                        </Button>
                    </View>
                </Content>
                :
                <Content contentContainerStyle={{flex: 1}}>
                    <View style={{top: 10, alignItems: 'center'}}>
                        <Text> Game over! </Text>                        
                    </View>
                    <View style={{justifyContent: 'center', flex: 1}}>
                        <Button full success onPress={tryAgain} >
                            <Text> Try again! </Text>
                        </Button>
                        <Button full danger onPress={quitGame} >
                            <Text> Quit </Text>
                        </Button> 
                    </View>   
                </Content>}
            </Container>
        </Root>
    );
};

export default Game;

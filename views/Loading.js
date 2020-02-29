import React, { useEffect } from 'react';
import { Container, Spinner } from 'native-base';
import { AsyncStorage } from 'react-native';

const Loading = ({ navigation }) => {

    const checkToken = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            navigation.replace(token ? 'Game' : 'Join');
        } catch (error) {
            console.log('checkToken error: ', error.message);
        }
    };

    useEffect(() => {
        checkToken();
    }, []);

    return (
        <Container style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Spinner />
        </Container>
    );
};

export default Loading;
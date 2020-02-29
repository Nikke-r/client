import { AsyncStorage } from "react-native";
const url = 'https://game-niklas-r.herokuapp.com/game';

const fetchPost = async (username) => {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: username}),
        };
        const response = await fetch(url, options);
        const toJSON = await response.json();
        return toJSON;
    } catch (error) {
        console.log('fetchPost error: ', error.message);
    }
};

const fetchGet = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        const options = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        };
        const response = await fetch(url, options);
        const toJSON = await response.json();
        return toJSON;
    } catch (error) {
        console.log('fetchGet error: ', error.message);
    }
};

const fetchPut = async (data) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(data),
        };
        const response = await fetch(url, options);
        const toJSON = await response.json();
        return toJSON;
    } catch (error) {
        console.log('fetchPut error: ', error.message);
    }
};

const fetchDel = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        const options = {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        };
        const response = await fetch(url, options);
        const toJSON = await response.json();
        return toJSON;
    } catch (error) {
        console.log('fetchDel error: ', error.message);
    }
}

export { fetchPost, fetchGet, fetchPut, fetchDel };
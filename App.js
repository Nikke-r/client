import React from 'react';
import { StatusBar } from 'react-native';
import { Container } from 'native-base';
import Navigator from './navigators/Navigator';

export default function App() {
  return (
    <Container>
      <StatusBar barStyle={'dark-content'} />
      <Navigator />
    </Container>
  );
}



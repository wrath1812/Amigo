// import React,{useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PAGES from '../constants/pages';
import AuthNavigator from './AuthNavigator';
// import AuthContext from '../context/AuthContext';

const Stack = createNativeStackNavigator();

function RootNavigator() {

    // const {authState} = useContext(AuthContext);
    // console.log(authState,"authState");

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={PAGES.LOGIN}>
                {AuthNavigator}
                
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigator;

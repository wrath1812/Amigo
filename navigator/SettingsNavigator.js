import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PAGES from '../constants/pages';
import Settings from '../pages/Settings';
import Export from '../pages/Export';

const Stack = createNativeStackNavigator();
function SettingsNavigator() {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name={PAGES.SETTINGS}
            component={Settings}
        />
        <Stack.Screen name={PAGES.EXPORT} component={Export} />
    </Stack.Navigator>
  );
}

export default SettingsNavigator;

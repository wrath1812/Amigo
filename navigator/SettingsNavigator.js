import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import PAGES from '../constants/pages';
import Export from '../pages/Export';
import Import from '../pages/Import';
import Settings from '../pages/Settings';

const Stack = createNativeStackNavigator();
function SettingsNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={PAGES.SETTINGS}
                component={Settings}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name={PAGES.EXPORT} component={Export} />
            <Stack.Screen name={PAGES.IMPORT} component={Import} />
        </Stack.Navigator>
    );
}

export default SettingsNavigator;

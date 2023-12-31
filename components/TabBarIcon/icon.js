import React from 'react';
import { EvilIcons } from '@expo/vector-icons';
import PAGES from '../../constants/pages';
import COLOR from '../../constants/Colors';
import { Octicons, Foundation } from '@expo/vector-icons';
const color = COLOR.BUTTON; // Example color, replace with actual color needed.
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default ({ size, focused, screen }) => {
    const icons = {
        [PAGES.BALANCE]: focused ? (
            <Foundation name="home" size={size} color={color} />
        ) : (
            <Octicons name="home" size={size} color={color} />
        ),
        [PAGES.GROUP_LIST]: focused ? (
            <MaterialCommunityIcons
                name="account-group"
                size={size}
                color={color}
            />
        ) : (
            <MaterialCommunityIcons
                name="account-group-outline"
                size={size}
                color={color}
            />
        ),

        [PAGES.SETTINGS]: focused ? (
            <EvilIcons name="gear" size={size} color={color} />
        ) : (
            <EvilIcons name="gear" size={size} color={color} />
        ),
    };

    return icons[screen] || null;
};

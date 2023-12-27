import {
    MaterialIcons,
    FontAwesome5,
    Ionicons,
    Entypo,
    AntDesign,
} from '@expo/vector-icons';
import { calcWidth } from '../helper/res';

const size = calcWidth(5);
const categories = [
    {
        name: 'Groceries',
        icon: (
            <MaterialIcons
                name="local-grocery-store"
                size={size}
                color="#4CAF50"
            />
        ),
    }, 
    {
        name: 'Transport',
        icon: <FontAwesome5 name="bus-alt" size={size} color="#2196F3" />,
    }, // Blue
    {
        name: 'Utilities',
        icon: <Ionicons name="water" size={size} color="#FF9800" />,
    }, // Orange
    {
        name: 'Dining',
        icon: <Ionicons name="restaurant" size={size} color="#E91E63" />,
    }, // Pink
    {
        name: 'Shopping',
        icon: <Entypo name="shop" size={size} color="#9C27B0" />,
    }, // Purple
    {
        name: 'Other',
        icon: <AntDesign name="ellipsis1" size={size} color="#607D8B" />,
    }, // Blue Grey
];

export function getCategoryIcon(name) {
    // Find the category object where the name matches the input parameter
    const category = categories.find(cat => cat.name === name);

    // Return the icon of the found category, or null if no match is found
    return category ? category.icon : null;
}



export default categories;

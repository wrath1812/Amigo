import * as Contacts from 'expo-contacts';
import sliceText from './sliceText';
async function getNamesFromContacts() {
    // Request permission to access contacts
    const { status } = await Contacts.requestPermissionsAsync();

    // If permission is not granted, return an empty object
    if (status !== 'granted') {
        console.log('Contacts permission is not granted.');
        return {};
    }

    // Fetch all contacts with permission granted
    const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.FirstName, Contacts.Fields.LastName, Contacts.Fields.PhoneNumbers],
    });

    // Create an object to store the formatted contact names
    let contactNames = {};

    // Iterate through each contact
    data.forEach(contact => {
        // Check if the contact has a phone number and a name
        if (contact.phoneNumbers && contact.firstName && contact.lastName) {
            // Iterate through each phone number
            contact.phoneNumbers.forEach(phone => {
                // Extract plain 10-digit phone number
                const plainPhoneNumber = phone.number.replace(/\D/g, '').slice(-10);
                // Format and add the contact name and phone number to the object
                contactNames[plainPhoneNumber] = `${contact.firstName} ${contact.lastName}`;
            });
        }
    });

    return contactNames;
}


async function getNames(usersArray, currentUserId) {
    // Validate input parameters
    if (!Array.isArray(usersArray) || typeof currentUserId !== 'string') {
        console.error('Invalid input to getNames function');
        return [];
    }

    try {
        const names = [];
        const contacts = await getNamesFromContacts();
        const contactsMap = new Map(Object.entries(contacts));

        for (let user of usersArray) {
            let name;

            if (user._id === currentUserId) {
                name = "You";
            } else if (user.phoneNumber && contactsMap.has(user.phoneNumber)) {
                name = sliceText(contactsMap.get(user.phoneNumber));
            } else if (user.name) {
                name = sliceText(user.name);
            } else {
                name = user.phoneNumber || 'Unknown';
            }

            names.push(name);
        }

        return names;
    } catch (error) {
        console.error('Error in getNames function:', error);
        return [];
    }
}

export default getNames;

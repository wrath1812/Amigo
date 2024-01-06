import sliceText from './sliceText';
import getNamesFromContacts from './getNamesFromContacts';
import editNames from "./editNames";
/**
 * Updates the names of users in the given array based on certain conditions.
 * @param {Array} usersArray - Array of user objects to update.
 * @param {string} currentUserId - The ID of the current user.
 * @returns {Array} The updated usersArray with modified names.
 */
async function editNamesAsync(usersArray, currentUserId) {
    
        const contacts = await getNamesFromContacts();
        const edited=await editNames(usersArray, currentUserId,contacts);
        return edited;
}


export default editNamesAsync;



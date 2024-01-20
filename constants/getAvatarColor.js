const colors=["#4EBFFF", "#FFD84E", "#FF00F5", "#007DFB", "#BF3C5E", "#D17D7D", "#FF00F5", "#C699FF", "#89D5FF", "#FFCA99"];
import generateRandomNumberBasedOnUUIDAndRange from '../helper/generateRandomNumberBasedOnUUIDAndRange';
function getAvatarColor(userId)
{
    const userColor=colors[generateRandomNumberBasedOnUUIDAndRange(userId,0,colors.length)];
    return userColor;
}

export default getAvatarColor;
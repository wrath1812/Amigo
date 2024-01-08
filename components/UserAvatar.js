import React from 'react';
import COLOR from "../constants/Colors";

import uuidToColor from "../helper/uuidToColor";

const UserAvatar = ({ uuid }) => {
  const avatarProps = getAvatarPropsFromUUID(uuid);
  return <Avatar {...avatarProps} />;
};

const getAvatarPropsFromUUID = (uuid) => {
  const hash = simpleHash(uuid);

  // Define base color for comparison
  const baseColor = COLOR.BUTTON;

  const shapes = ['circle', 'rounded', 'square'];
  const sexes = ['man', 'woman'];
  const earSizes = ['small', 'big'];
  const hairStyles = ['normal', 'thick', 'mohawk', 'womanLong', 'womanShort'];
  const hatStyles = ['none', 'beanie', 'turban'];
  const eyeStyles = ['circle', 'oval', 'smile'];
  const glassesStyles = ['none', 'round', 'square'];
  const noseStyles = ['short', 'long', 'round'];
  const mouthStyles = ['laugh', 'smile', 'peace'];
  const shirtStyles = ['hoody', 'short', 'polo'];

  // Use uuidToColor function to generate colors
  const hairColor = uuidToColor(uuid, baseColor);
  const hatColor = uuidToColor(uuid + 'hat', baseColor); // Slightly alter UUID for variation
  const shirtColor = uuidToColor(uuid + 'shirt', baseColor);
  const bgColor = uuidToColor(uuid + 'bg', baseColor);

  // Select properties based on the hash
  return {
    shape: shapes[hash % shapes.length],
    sex: sexes[hash % sexes.length],
    earSize: earSizes[hash % earSizes.length],
    hairColor,
    hairStyle: hairStyles[hash % hairStyles.length],
    hatColor,
    hatStyle: hatStyles[hash % hatStyles.length],
    eyeStyle: eyeStyles[hash % eyeStyles.length],
    glassesStyle: glassesStyles[hash % glassesStyles.length],
    noseStyle: noseStyles[hash % noseStyles.length],
    mouthStyle: mouthStyles[hash % mouthStyles.length],
    shirtStyle: shirtStyles[hash % shirtStyles.length],
    shirtColor,
    bgColor,
    isGradient: false // or true based on preference
  };
};

// Simple hash function
const simpleHash = (str) => {
  return str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);}


export default UserAvatar;
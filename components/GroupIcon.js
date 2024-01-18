import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { calcHeight, calcWidth } from '../helper/res';
import generateRandomNumberBasedOnUUIDAndRange from '../helper/generateRandomNumberBasedOnUUIDAndRange';
import { useLayoutEffect } from 'react';
import groupIcons from "../constants/groupIcons";

const defaultSize = 5;

function GroupIcon({ groupId, size = defaultSize }) {
  const [image, setImage] = useState();

  useLayoutEffect(() => {
    const imageNumber = generateRandomNumberBasedOnUUIDAndRange(groupId, 0, 39);
    const imagePath = groupIcons[imageNumber];
    
      setImage(imagePath);
  }, [groupId]);

  return (
    <Image
      source={image}
      style={{
        height: calcHeight(size),
        width: calcHeight(size),
        borderRadius: calcHeight(size),
      }}
    />
  );
}

export default GroupIcon;

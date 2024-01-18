import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { calcHeight, calcWidth } from '../helper/res';
import generateRandomNumberBasedOnUUIDAndRange from '../helper/generateRandomNumberBasedOnUUIDAndRange';
import groupIcons from "../constants/groupIcons";

const defaultSize = 5;

function GroupIcon({ groupId, size = defaultSize }) {
  return groupId && (
    <Image
      source={groupIcons[generateRandomNumberBasedOnUUIDAndRange(groupId, 0, 39)]}
      style={{
        height: calcHeight(size),
        width: calcHeight(size),
        borderRadius: calcHeight(size),
      }}
    />
  );
}

export default GroupIcon;

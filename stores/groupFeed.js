import { create } from 'zustand'; // Import create instead of createStore
import apiHelper from '../helper/apiHelper';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getNamesFromContacts from '../helper/getNamesFromContacts';
import editNames from '../helper/editNames';

const useGroupFeedStore = create(
    persist(
        (set) => ({
            feeds: {},
            addActivity: (activity, groupId) => {
                const { feeds: prev } = useGroupFeedStore.getState();

                const newGroupFeed = [activity, ...prev[groupId]];

                set({ feeds: { ...prev, groupId: newGroupFeed } });
            },
            fetchActivities: async (groupId, user) => {
                const { feeds: prev } = useGroupFeedStore.getState();
                try {
                    const { data } = await apiHelper(
                        `/activity-feed?groupId=${groupId}`,
                    );
                    const contactsData = await getNamesFromContacts();
                    for (let activity of data)
                        editNames([activity.creator], user._id, contactsData);
                    set({ feeds: { ...prev, groupId: data } });
                } catch (error) {
                    console.error('Error fetching activities:', error);
                }
            },
        }),
        {
            name: 'groupFeed',
            getStorage: () => AsyncStorage,
        },
    ),
);

export const useGroupFeed = useGroupFeedStore;


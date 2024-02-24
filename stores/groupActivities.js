import { create } from 'zustand';
import apiHelper from '../helper/apiHelper';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useGroupActivitiesStore = create(
    persist(
        (set) => ({
            activitiesHash: {},
            setActivitiesHash: (groupId, updater) => {
                set((state) => ({
                    activitiesHash: {
                        ...state.activitiesHash,
                        [groupId]: updater(state.activitiesHash[groupId] || []),
                    },
                }));
            },
            getActivities: (groupId) => {
                const { activitiesHash } = useGroupActivitiesStore.getState();
                return activitiesHash[groupId] || [];
            },
            
        }),
        {
            name: 'groupActivities',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);

const useGroupActivities = (groupId) => {
    const { setActivitiesHash, getActivities,syncAllChat } = useGroupActivitiesStore();
    const activities = getActivities(groupId);

    const setActivities = (updater) => {
        setActivitiesHash(groupId, () => updater);
    };


    return { activities, setActivities };
};

export default useGroupActivities;

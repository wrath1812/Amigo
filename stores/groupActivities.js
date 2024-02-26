import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';

import apiHelper from '../helper/apiHelper';
import { create } from '../helper/zustand';

export const useGroupActivitiesStore = create(
    persist(
        (set) => ({
            activitiesHash: {},
            _hasHydrated: false,
            setActivitiesHash: (groupId, updater) => {
                set((state) => ({
                    activitiesHash: {
                        ...state.activitiesHash,
                        [groupId]:
                            updater instanceof Function
                                ? updater(state.activitiesHash[groupId] || [])
                                : updater,
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
    const { setActivitiesHash, getActivities } = useGroupActivitiesStore();
    const activities = getActivities(groupId);

    const setActivities = (updater) => {
        setActivitiesHash(groupId, updater);
    };

    return { activities, setActivities };
};

export const storeHydrated = () => {
    return new Promise((resolve) => {
        const { _hasHydrated } = useGroupActivitiesStore.getState();
        if (_hasHydrated) {
            resolve();
        } else {
            const unsubscribe = useGroupActivitiesStore.subscribe(
                (hasHydrated) => {
                    if (hasHydrated) {
                        resolve();
                        unsubscribe();
                    }
                },
            );
        }
    });
};

export default useGroupActivities;

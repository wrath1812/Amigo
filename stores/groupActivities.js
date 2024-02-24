import { create } from 'zustand';
import apiHelper from '../helper/apiHelper';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useGroupActivitiesStore = create(
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
            syncAllChat: async () => {
                const { activitiesHash } = useGroupActivitiesStore.getState();
                const promises = [];
            
                for (const groupId in activitiesHash) {
                    const activities = Array.from(activitiesHash[groupId]);
                    
                    for (const activity of activities) {
                        if (activity.synched === "false") {
                            activity.synched = true;
                            
                            const promise = apiHelper.post(`/group/${groupId}/chat`, {
                                message: activity.relatedId.message,
                            });
                            
                            promises.push(promise);
                        }
                    }
                    
                    useGroupActivitiesStore.getState().setActivitiesHash(groupId, () => [...activities]);
                }
                await Promise.all(promises);
            }
            
            
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


    return { activities, setActivities,syncAllChat };
};

export default useGroupActivities;

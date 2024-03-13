import apiHelper from '../helper/apiHelper';
import { useGroupActivitiesStore, storeHydrated } from '../stores/groupActivities';

const syncAllChat = async () => {
    await storeHydrated();
    const { activitiesHash, getActivities, setActivitiesHash } = useGroupActivitiesStore.getState();
    const promises = [];

    for (const groupId in activitiesHash) {
        const activities = getActivities(groupId);

        const setActivities = (updater) => {
            setActivitiesHash(groupId, updater);
        };

        for (const activity of activities) {
            if (activity.synced === false) {
                let promise;
                if (activity.activityType === 'chat')
                    promise = apiHelper.post(`/group/${groupId}/chat`, {
                        message: activity.relatedId.message,
                    });
                else apiHelper.post('/transaction', activity);
                setActivities((prev) => [...prev, { ...activity, synced: true }]);

                promises.push(promise);
            }
        }
    }
    await Promise.all(promises);
};

export default syncAllChat;

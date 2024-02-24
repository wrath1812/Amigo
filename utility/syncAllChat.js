import { useGroupActivitiesStore } from "../stores/groupActivities";
const syncAllChat=async () => {
    const { activitiesHash } = useGroupActivitiesStore.getState();
    const promises = [];

    for (const groupId in activitiesHash) {
        const activities = Array.from(activitiesHash[groupId]);
        
        for (const activity of activities) {
            if (activity.synced === false) {
                activity.synced = true;
                
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

export default syncAllChat;
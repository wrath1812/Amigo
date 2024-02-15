import create from 'zustand'; // Import create instead of createStore
import apiHelper from "../helper/apiHelper";
import editNamesAsync from '../helper/editNamesAsync';

const useGroupStore = create((set) => ({ // Use create instead of createStore
    groups: [],
    loading: false,
    search: '',
    setSearch: (search) => set({ search }),
    fetchData: async (user) => {
        const { groups } = useGroupStore.getState(); 
        if (groups.length === 0) {
            set({ loading: true });
        }
        const { data } = await apiHelper('/group');
        for (let group of data)
            group.members = await editNamesAsync(group.members, user._id);
        set({ groups: data, loading: false });
    },
}));

export const useGroupList = useGroupStore; // No need for useStore, just export the store object

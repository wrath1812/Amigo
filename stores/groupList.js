import create from 'zustand'; // Import create instead of createStore
import apiHelper from '../helper/apiHelper';
import editNamesAsync from '../helper/editNamesAsync';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useGroupStore = create(
    persist(
        (set) => ({
            // Use create instead of createStore
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
                    group.members = await editNamesAsync(
                        group.members,
                        user._id,
                    );
                set({ groups: data, loading: false });
            },
        }),
        {
            name: 'groupList',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);

export const useGroupList = useGroupStore;

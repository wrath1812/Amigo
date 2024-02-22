import create from 'zustand';
import { persist,createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiHelper from '../helper/apiHelper';
import { clearAllLocalStoreData } from '../helper/localStorage';
import * as SplashScreen from 'expo-splash-screen';
const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            addName: async (name) => {
                apiHelper.put('/user', { name });
                set({ user: { ...get().user, name } });
            },
            logout: async () => {
                set({ user: null });
                clearAllLocalStoreData();
            },
            verifyOTP: async (phoneNumber, countryCode, otp) => {
                const { user } = get();
                const endpoint = user ? 'editPhoneNumber' : 'verifyOTP';
                const { data } = await apiHelper.post(`/auth/${endpoint}`, {
                    phoneNumber,
                    countryCode,
                    otp,
                });
                if (user) {
                    set({
                        user: {
                            ...get().user,
                            phoneNumber,
                            countryCode,
                        },
                    });
                    return;
                }
                if (data.status) return;
                const { userData, token } = data;
                set({ user: userData });
                set({ token });
            },
            editUser: async (editedUser) => {
                set({ user: { ...get().user, ...editedUser } });
                apiHelper.put('/user', editedUser);
            },
            fetchUser: async (set) => {
                try {
                    const { data } = await apiHelper.get('/user');
                    set({ user: data });
                } catch (e) {
                    console.error('Error fetching user data:', e);
                }
                await SplashScreen.hideAsync();
            },
        }),
        {
            name: 'auth',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);

export const useAuth = useAuthStore;
export const getToken = () => useAuthStore.getState().token;

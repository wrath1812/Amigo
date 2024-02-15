import create from 'zustand'; // Import create instead of createStore
import apiHelper from "../helper/apiHelper";
import editNamesAsync from '../helper/editNamesAsync';
import { persist } from "zustand/middleware";
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuthStore = create(persist((set) => ({ 
   
}),{
    name: "auth",
    getStorage: () => AsyncStorage
  }));

export const useAuth = useAuthStore; 
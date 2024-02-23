import { create } from 'zustand';
import apiHelper from '../helper/apiHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist, createJSONStorage } from 'zustand/middleware';
const useExpenseStore = create(
    persist(
        (set, get) => ({
            expense: [],
            range: {
                startDate: undefined,
                endDate: undefined,
            },
            loading: false,
            type: undefined,
            backendSynched: true,
            setType: (type) => set({ type }),
            setRange: (range) => set({ range }),
            resetParams: () => {
                set({
                    range: { startDate: undefined, endDate: undefined },
                    type: undefined,
                });
                const { fetchExpense } = get();
                fetchExpense();
            },
            fetchExpense: async () => {
                const { range, type, backendSynched } = get();
                if (!backendSynched) return;
                try {
                    const { expense } = useExpenseStore.getState();
                    if (expense.length === 0) set({ loading: true });
                    const filter = {
                        startDate: range.startDate,
                        endDate: range.endDate,
                        type: Array.isArray(type) ? type : [type],
                    };

                    const { data } = await apiHelper('/transaction/expenses', {
                        params: filter,
                    });
                    set({ expense: data, loading: false });
                } catch (error) {
                    console.error(error);
                }
            },
            deleteExpenseById: async (expenseId) => {
                try {
                    set((state) => ({
                        expense: state.expense.filter(
                            (item) => item.id !== expenseId,
                        ),
                        backendSynched: false,
                    }));
                    await apiHelper.delete(`transaction/${expenseId}`);
                    set({ backendSynched: true });
                } catch (error) {
                    console.error(error);
                }
            },
        }),
        {
            name: 'expense',
            storage: createJSONStorage(() => AsyncStorage),
        },
    ),
);

export const useExpense = useExpenseStore;

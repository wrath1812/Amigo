import {create} from 'zustand';
import apiHelper from '../helper/apiHelper';

const useExpenseStore = create((set, get) => ({
    expense: [],
    range: {
        startDate: undefined,
        endDate: undefined,
    },
    loading:false,
    type: undefined,
    resetParams: () => {
        set({ range: { startDate: undefined, endDate: undefined }, type: undefined });
    },
    fetchExpense: async () => {
        const { range, type } = get();
        try {
            const { expense } = useExpenseStore.getState();
            if(expense.length===0)
            set({ loading:true });
            const filter = {
                startDate: range.startDate,
                endDate: range.endDate,
                type: Array.isArray(type) ? type : [type], 
            };

            const { data } = await apiHelper('/transaction/expenses', {
                params: filter,
            });
            set({ expense: data,loading:false });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    },
}));

export const useExpense = useExpenseStore;

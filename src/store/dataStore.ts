import { create } from 'zustand';
import { DataRow, ColumnAnalysis } from '@/types';

interface DataStore {
  data: DataRow[];
  columns: ColumnAnalysis[];
  isPanelOpen: boolean;
  isLoading: boolean;
  setData: (data: DataRow[]) => void;
  setColumns: (columns: ColumnAnalysis[]) => void;
  togglePanel: () => void;
  setLoading: (loading: boolean) => void;
}

export const useDataStore = create<DataStore>((set) => ({
  data: [],
  columns: [],
  isPanelOpen: true,
  isLoading: false,
  setData: (data) => set({ data }),
  setColumns: (columns) => set({ columns }),
  togglePanel: () => set((state) => ({ isPanelOpen: !state.isPanelOpen })),
  setLoading: (loading) => set({ isLoading: loading }),
}));
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parseData, PracticeData } from '../domain/practice';
const KEY = '@levelup/practice/v1';
export const practiceStorage = {
  async load(): Promise<PracticeData> { return parseData(await AsyncStorage.getItem(KEY)); },
  async save(data: PracticeData): Promise<void> { await AsyncStorage.setItem(KEY, JSON.stringify(data)); },
};

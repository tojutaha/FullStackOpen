import { z } from 'zod';
import { NewEntrySchema } from './utils';

// export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';
export enum Weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

// export type Visibility = 'great' | 'good' | 'ok' | 'poor';
export enum Visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;
export type NewDiaryEntry = z.infer<typeof NewEntrySchema>;
export interface DiaryEntry extends NewDiaryEntry {
  id: number;
}
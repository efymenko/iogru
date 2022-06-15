import { Footprint } from '../token-entry.schema';

export interface CreateEntry {
  userId: string;
  footprint: Footprint;
}

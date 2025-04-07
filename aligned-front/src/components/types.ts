export interface LibraryItem {
  id: string;
  name: string;
  url: string;
  type: 'youtube' | 'link';
  owner?: string;
}
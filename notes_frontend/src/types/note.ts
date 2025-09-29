export type UUID = string;

export type Tag = {
  id: UUID;
  name: string;
  color?: string;
};

export type Note = {
  id: UUID;
  title: string;
  content: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
  tags?: Tag[];
  pinned?: boolean;
};

export type SortOption = 'updated_desc' | 'updated_asc' | 'title_asc' | 'title_desc' | 'created_desc' | 'created_asc';

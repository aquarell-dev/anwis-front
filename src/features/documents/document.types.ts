export type TDocument = { id: number, path: string, title?: string };

export type DocumentInitialState = {
  lastUpdatedDocument: TDocument | null,
  documents: TDocument[]
}

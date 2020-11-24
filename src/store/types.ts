export interface QueryGenerator {
  ID: number
  name: () => string,
  description: () => string,
  tag: () => string,
  createFormatedQuery: () => string,
  createUnformatedQuery: () => string,
  path: () => string
  type: () => string
}


export const CLEAR_QUERIES = 'CLEAR_QUERIES'

export interface ClearQueriesAction {
  type: typeof CLEAR_QUERIES
}


import { createContext } from 'react';

interface IPageTableContext {
  refreshList?: () => void;
}

export const PageTableContext = createContext<IPageTableContext>({});

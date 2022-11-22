import React, { ChangeEvent, useState } from 'react';
import { NewsList } from './components/NewsList/NewsList';
import { Sorter } from './components/Sorter/Sorter';
import data from './data/data.json';
import { News } from './types/News';
import './main.scss';

export const App: React.FC = () => {
  const [sortType, setSortType] = useState('fromNew');

  const handleSort = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSortType(value);
  };

  const news: News[] = [...data].sort((a, b) => {
    switch(sortType) {
    case 'mostViewed':
      return +b.viewed - +a.viewed;

    case 'rarelyViewed':
      return +a.viewed - +b.viewed;
  
    case 'fromOld':
      return +b.id - +a.id;

    default:
      return (+a.id - +b.id);
    }
  });

  return (
    <div className="App">
      <Sorter
        sortType={sortType} 
        handleSort={handleSort}
      />
      <NewsList
        news={news}
      />
    </div>
  );
};

export default App;

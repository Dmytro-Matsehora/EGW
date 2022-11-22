import React, { ChangeEvent } from 'react';
import './Sorter.scss';

type Props = {
  handleSort: (event: ChangeEvent<HTMLSelectElement>) => void;
  sortType: string;
}

export const Sorter: React.FC<Props> = ({ handleSort, sortType }) => (
  <div className='sorter'>
    <div className='sorter__sort-block sort-block'>
      Sort

      <select 
        name='sort-select' 
        className='sort-block__select'
        value={sortType}
        onChange={(event) => handleSort(event)}
      >
        <option 
          value='fromNew' 
          className='sort-block__option'
        >
          From new to old
        </option>

        <option 
          value='fromOld' 
          className='sort-block__option'
        >
          From old to new
        </option>

        <option 
          value='mostViewed' 
          className='sort-block__option'
        >
          Most viewed first
        </option>

        <option 
          value='rarelyViewed' 
          className='sort-block__option'
        >
          Rarely viewed first
        </option>
      </select>
    </div>
  </div>
);

export default Sorter;
import React from 'react';
import './NewsList.scss';
import { NewsItem } from '../NewsItem/NewsItem';
import { News } from '../../types/News';

type Props = {
  news: News[];
}
export const NewsList: React.FC<Props> = ({ news }) => (
  <ul>
    {news.map(item => (
      <li key={item.id}>
        <NewsItem item={item} />
      </li>
    ))}
  </ul>
);

import React from 'react';
import './NewsItem.scss';
import { News } from '../../types/News';

type Props = {
  item: News;
}

export const NewsItem: React.FC<Props> = ({ item }) => (
  <a 
    className='news' 
    href={`http://localhost:8080/proxy${item.href}`}
  > 
    <div className='news__header'></div>

    <div className='news__article article'>
      <div className='article__title'> {item.title} </div>
      <div className='article__description'> {item.description} </div>
    </div>

    <div className='news__data data'>
      <div className='data__time'> {item.time} </div>
      <div className='data__views'> {item.viewed} </div>
    </div>
  </a>
);

import React from 'react';

function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }  
  return (
    <article className="elements__card">
      <a href="#" className="elements__card-link" target="_self" onClick={handleClick}>
        <div className="elements__card-image" style={{ backgroundImage: `url(${card.link})` }} alt={card.name} ></div>
      </a>
      <button className="elements__icon-delete link" type="button" aria-label="Удалить карточку"></button>
      <div className="elements__label">
        <h2 className="elements__heading">{card.name}</h2>
        <ul className="elements__like">
          <li><button className="elements__icon-favorite link" type="button" aria-label="Поставить лайк"></button></li>
          <li><p className="elements__like-number">{card.likes.length}</p></li>
        </ul>
      </div>
    </article>
  )
}

export default Card;
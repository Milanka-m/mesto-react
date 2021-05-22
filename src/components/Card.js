import React from 'react'; 
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete }) { 
  const currentUser = React.useContext(CurrentUserContext);
 
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `${isOwn && 'elements__icon-delete_active'}`; 
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `${isLiked && 'elements__icon-favorite_active'}`;

  function handleClick() { 
    onCardClick(card); 
  }   

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return ( 
    <article className="elements__card"> 
      <div className="elements__card-image" style={{ backgroundImage: `url(${card.link})` }} alt={card.name} onClick={handleClick}></div> 
      <button className={`elements__icon-delete ${cardDeleteButtonClassName} link`} type="button" aria-label="Удалить карточку" onClick={handleDeleteClick}>
      </button> 
      <div className="elements__label"> 
        <h2 className="elements__heading">{card.name}</h2> 
        <ul className="elements__like"> 
          <li><button className={`elements__icon-favorite ${cardLikeButtonClassName} link`} type="button" aria-label="Поставить лайк" onClick={handleLikeClick}></button></li> 
          <li><p className="elements__like-number">{card.likes.length}</p></li> 
        </ul> 
      </div> 
    </article> 
  ) 
} 
 
export default Card; 
import React from 'react'; 
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';

function Main({ cards, onCardLike, onCardDelete, onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <button className="profile__button-avatar" 
             onClick={onEditAvatar} type="button" aria-label="Редактировать аватар">
            <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})`}}></div>
          </button>
          <div className="profile__description">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__button-edit profile__icon-edit link" 
              onClick={onEditProfile} type="button" aria-label="Редактировать профиль">
            </button>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
          <button className="profile__button-add profile__icon-add link" 
            onClick={onAddPlace} type="button" aria-label="Добавить данные">
          </button>
      </section>
      
      <section className="elements"> 
          {cards.map(card => { 
            return ( 
              <Card card={card}
              key={card._id} 
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              onCardClick={onCardClick} /> 
            ) 
          })} 
      </section> 
    </main>
  );
}

export default Main;
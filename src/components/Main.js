import React from 'react'; 
import Card from './Card';
import api from '../utils/api';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, userAvatar, userName, userDescription }) {
  const [cards, setCards] = React.useState([]);
 
  React.useEffect(() => {
    api.getCards()
    // если ответ сервера положительный, в стейт приходит массив карточек
    // каждый объект карточки из данного массива имеет следующие поля: _id, name, link, likes
      .then(setCards)
      .catch(err => console.log(err))
  }, []);


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <button className="profile__button-avatar" 
             onClick={onEditAvatar} type="button" aria-label="Редактировать аватар">
            <div className="profile__avatar" style={{ backgroundImage: `url(${userAvatar})`}}></div>
          </button>
          <div className="profile__description">
            <h1 className="profile__title">{userName}</h1>
            <button className="profile__button-edit profile__icon-edit link" 
              onClick={onEditProfile} type="button" aria-label="Редактировать профиль">
            </button>
            <p className="profile__subtitle">{userDescription}</p>
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
              // каждому элементу из массива карточек должен задаваться key
              key={card._id}
              onCardClick={onCardClick} />
            )
          })}
      </section>
    </main>
  );
}

export default Main;
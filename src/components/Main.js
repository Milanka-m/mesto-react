import React from 'react'; 
import Card from './Card';
import api from '../utils/api';

function Main(props) {
  const [cards, setCards] = React.useState([]);
 
  React.useEffect(() => {
    api.getCards()
      .then(cards => {
        setCards(cards.map(item => ({
          name: item.name,
          link: item.link,
          likes: item.likes,
          id: item._id
        })))
      })
      .catch(err => console.log(err))
  }, []);


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <button className="profile__button-avatar" 
             onClick={props.onEditAvatar} type="button" aria-label="Редактировать аватар">
            <div className="profile__avatar" style={{ backgroundImage: `url(${props.userAvatar})`}}></div>
          </button>
          <div className="profile__description">
            <h1 className="profile__title">{props.userName}</h1>
            <button className="profile__button-edit profile__icon-edit link" 
              onClick={props.onEditProfile} type="button" aria-label="Редактировать профиль">
            </button>
            <p className="profile__subtitle">{props.userDescription}</p>
          </div>
        </div>
          <button className="profile__button-add profile__icon-add link" 
            onClick={props.onAddPlace} type="button" aria-label="Добавить данные">
          </button>
      </section>

      <section className="elements">
          {cards.map(card => {
            return (
              <Card card={card}
              key={card.id} 
              name={card.name}
              link={card.link} 
              likes={card.likes} 
              onCardClick={props.onCardClick} />
            )
          })}
      </section>
    </main>
  );
}

export default Main;
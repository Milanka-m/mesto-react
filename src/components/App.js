import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardsContext } from '../contexts/CardsContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/api';

 
function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const [currentUser, setCurrentUser] = React.useState('');
  const [currentCard, setCurrentCard] = React.useState({});

  const [cards, setCards] = React.useState([]); 
  
  React.useEffect(() => { 
    api.getCards() 
    // если ответ сервера положительный, в стейт приходит массив карточек 
    // каждый объект карточки из данного массива имеет следующие поля: _id, name, link, likes 
      .then(res => {
        setCards(res);
      }) 
      .catch(err => console.log(err)) 
  }, []); 

  // функция лайка и дизлайка карточки
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      // Отправляем запрос в API и получаем обновлённые данные карточки
      api.addLikeCard(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(err => console.log(err))
    } else {
          api.removeLikeCard(card._id, isLiked)
            .then((newCard) => {
              setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(err => console.log(err))
        }
  } 

  // функция удаления карточки
  function handleCardDelete(card) {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.removeCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
      });
  }

  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  } 

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  // эффект при монтировании компонента
  // формирует api запрос для получения данных пользователя при загрузке страницы
  React.useEffect(() => {
    api.getUsers()
      .then(user => {
        setCurrentUser(user);
      })
      .catch(err => console.log(err))
  }, [])

  // Обработчик api запроса для обновления профильных данных
  function handleUpdateUser({ name, about }) {
    api.editUser({ name, about })
      .then(userData => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  } 

  // Обработчик api запроса для обновления аватара
  function handleUpdateAvatar({avatar}) {
    api.editAvatar({avatar})
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
        })
      .catch(err => console.log(err))
  }

  // Обработчик api запроса для создания новой карточки
  function handleAddPlaceSubmit({ name, link }) {
    api.addCard({ name, link })
      .then(newCard => {
        setCurrentCard(newCard);
        setCards([...cards, newCard]); 
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <CardsContext.Provider value={currentCard}>
    <div className="page">
      <div className="root">
        <Header />
        <Main  
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick} 
          onEditAvatar={handleEditAvatarClick} 
          onCardClick={handleCardClick}/>
        
        <Footer />

        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}/>
         
        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}/>
         
        <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />

        <PopupWithForm title="Вы уверены ?" name="removecard" nameButton="Да" />
           
        <ImagePopup 
          isOpen={isImagePopupOpen}
          card={selectedCard} 
          onClose={closeAllPopups}
          link={selectedCard.link}
          name={selectedCard.name} />
      </div>
    </div>
   </CardsContext.Provider>
  </CurrentUserContext.Provider>
  );
}

export default App;

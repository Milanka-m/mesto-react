import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/api';

 
function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);

  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');

  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

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
 
  React.useEffect(() => {
    api.getUsers()
      .then(user => {
        setUserName(user.name)
        setUserDescription(user.about)
        setUserAvatar(user.avatar)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="page">
      <div className="root">
        <Header />
        <Main userAvatar={userAvatar} 
        userName={userName} 
        userDescription={userDescription} 
        onEditProfile={handleEditProfileClick} 
        onAddPlace={handleAddPlaceClick} 
        onEditAvatar={handleEditAvatarClick} 
        onCardClick={handleCardClick}/>
        
        <Footer />

        <PopupWithForm isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} title="Редактировать профиль" nameButton="Сохранить" name="profile">
          <fieldset className="popup__form-input-container">
            <section className="popup__form-section">
              <input className="popup__form-input" type="text" name="name" id="name" placeholder="Имя" 
                minLength="2" maxLength="40" required />
              <span className="popup__form-input-error" id="name-error"></span>
            </section>
            <section className="popup__form-section">
              <input className="popup__form-input" type="text" name="about" id="about" placeholder="О себе" 
               minLength="2" maxLength="200" required />
              <span className="popup__form-input-error" id="about-error"></span>
            </section>
          </fieldset>
        </PopupWithForm>
         
        <PopupWithForm isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} title="Обновить аватар" nameButton="Сохранить" name="avatar">
          <fieldset className="popup__form-input-container">
            <section className="popup__form-section">
              <input className="popup__form-input" type="url" name="link" id="link" placeholder="Ссылка на картинку" required />
              <span className="popup__form-input-error" id="link-error"></span>
            </section>
          </fieldset>
        </PopupWithForm> 
         
        <PopupWithForm isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} title="Новое место" nameButton="Создать" name="card">
          <fieldset className="popup__form-input-container">
            <section className="popup__form-section">
              <input className="popup__form-input" type="text" name="namecard" id="namecard" placeholder="Название" 
                 minLength="2" maxLength="30" required />
              <span className="popup__form-input-error" id="namecard-error"></span>
            </section>
            <section className="popup__form-section">
              <input className="popup__form-input" type="url" name="linkcard" id="linkcard" placeholder="Ссылка на картинку" required />
              <span className="popup__form-input-error" id="linkcard-error"></span>
            </section>
          </fieldset>
        </PopupWithForm>

        <PopupWithForm title="Вы уверены ?" name="removecard" nameButton="Да" />
           
        <ImagePopup 
          isOpen={isImagePopupOpen}
          card={selectedCard} 
          onClose={closeAllPopups}
          link={selectedCard.link}
          name={selectedCard.name} />
      </div>
    </div>
  );
}

export default App;

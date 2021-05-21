import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup ({ onUpdateUser, isOpen, onClose }) {
  // подписка на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);

  // стейт переменные для управляемых компонентов 
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  // в форму вставяться текущие значения пользователя
   React.useEffect(() => {
    if(currentUser !== '') {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser]); 
  

  // Обработчик изменения инпута name, обновляет стейт
  function handleChangeName(e) {
    setName(e.target.value);
  }

  // Обработчик изменения инпута about, обновляет стейт
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  } 

  // Обработчик отправки формы
  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик через пропс
    onUpdateUser({
      name: name,
      about: description
    });
  }

  return (
    <PopupWithForm onSubmit={handleSubmit} isOpen={isOpen} onClose={onClose} title="Редактировать профиль" nameButton="Сохранить" name="profile">
          <fieldset className="popup__form-input-container">
            <section className="popup__form-section">
              <input className="popup__form-input" value={name} onChange={handleChangeName} type="text" name="name" id="name" placeholder="Имя" 
                minLength="2" maxLength="40" required />
              <span className="popup__form-input-error" id="name-error"></span>
            </section>
            <section className="popup__form-section">
              <input className="popup__form-input" value={description} onChange={handleChangeDescription} type="text" name="about" id="about" placeholder="О себе" 
               minLength="2" maxLength="200" required />
              <span className="popup__form-input-error" id="about-error"></span>
            </section>
          </fieldset>
      </PopupWithForm>
  );
}

export default EditProfilePopup;
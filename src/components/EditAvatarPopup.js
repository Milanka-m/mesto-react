import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup ({ onUpdateAvatar, isOpen, onClose }) {
  // реф для получения прямого доступа к полю link
  const avatarRef = React.useRef();

  React.useEffect(() => {
    if(isOpen) {
      avatarRef.current.value = '';
    }
  }, [isOpen]); 
  

  // Обработчик отправки формы
  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значение рефа во внешний обработчик через пропс
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  } 
  
  return(
    <PopupWithForm onSubmit={handleSubmit} isOpen={isOpen} onClose={onClose} title="Обновить аватар" nameButton="Сохранить" name="avatar">
      <fieldset className="popup__form-input-container">
        <section className="popup__form-section">
          <input ref={avatarRef} className="popup__form-input" type="url" name="link" id="link" placeholder="Ссылка на картинку" required />
          <span className="popup__form-input-error" id="link-error"></span>
        </section>
      </fieldset>
    </PopupWithForm> 
  )
}

export default EditAvatarPopup;
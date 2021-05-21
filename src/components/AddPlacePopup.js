import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup ({ onAddPlace, isOpen, onClose }) {

  // стейт переменные для управляемых компонентов 
  const [nameCard, setNameCard] = React.useState('');
  const [linkCard, setLinkCard] = React.useState('');

  React.useEffect(() => {
    if(isOpen) {
      setNameCard('');
      setLinkCard('');
    }
  }, [isOpen]); 

  // Обработчик изменения инпута namecard обновляет стейт
  function handleChangeNameCard(e) {
    setNameCard(e.target.value);
  }

  // Обработчик изменения инпута linkCard обновляет стейт
  function handleChangeLinkCard(e) {
    setLinkCard(e.target.value);
  } 

  // Обработчик отправки формы
  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({
      name: nameCard,
      link: linkCard
    });
  }


  return (
    <PopupWithForm onSubmit={handleSubmit} isOpen={isOpen} onClose={onClose} title="Новое место" nameButton="Создать" name="card">
      <fieldset className="popup__form-input-container">
        <section className="popup__form-section">
          <input className="popup__form-input" type="text" value={nameCard} onChange={handleChangeNameCard} name="namecard" id="namecard" placeholder="Название" 
            minLength="2" maxLength="30" required />
          <span className="popup__form-input-error" id="namecard-error"></span>
        </section>
        <section className="popup__form-section">
          <input className="popup__form-input" type="url" value={linkCard} onChange={handleChangeLinkCard} name="linkcard" id="linkcard" placeholder="Ссылка на картинку" required />
          <span className="popup__form-input-error" id="linkcard-error"></span>
        </section>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
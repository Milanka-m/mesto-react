import React from 'react';

function PopupWithForm(props) {
  const popupOpened = `${props.isOpen && 'popup_opened'}`;
  return (
    <div className={`popup popup_type_${props.name} ${popupOpened}`}>
      <div className="popup__container">
        <button className="popup__close popup-profile-close link" type="button" aria-label="Закрыть попап" onClick={props.onClose}></button>
        <form className="popup__form popup-profile-form" name={props.name} noValidate>
          <div className="popup__form-container">
            <h2 className="popup__form-title">{props.title}</h2> 
            {props.children}
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
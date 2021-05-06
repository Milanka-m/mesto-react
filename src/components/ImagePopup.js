import React from 'react';

function ImagePopup({ isOpen, onClose, link, name }) {
  const popupOpened = `${isOpen && 'popup_opened'}`;
  
  return (
    <div className={`popup-image popup ${popupOpened}`}>
      <div className="popup-image__container">
        <button className="popup__close popup-image-close link" type="button" aria-label="Закрыть попап" onClick={onClose}></button>
        <figure className="popup-image__figure">
          <img className="popup-image__illustration" src={link} alt={name} />
          <figcaption><p className="popup-image__caption">{name}</p></figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
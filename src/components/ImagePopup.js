import React from 'react';

function ImagePopup(props) {
  const popupOpened = `${props.card && 'popup_opened'}`;
  
  return (
    <div className={`popup-image popup ${popupOpened}`}>
      <div className="popup-image__container">
        <button className="popup__close popup-image-close link" type="button" aria-label="Закрыть попап" onClick={props.onClose}></button>
        <figure className="popup-image__figure">
          <img className="popup-image__illustration" src={props.link} alt={props.name} />
          <figcaption><p className="popup-image__caption">{props.name}</p></figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
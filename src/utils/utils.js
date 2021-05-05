export const buttonLoadingSubmit = (popupSelector, isLoading) => { 
  const popupElement = document.querySelector(popupSelector); 
  const formElement = popupElement.querySelector('.popup__form'); 
  const buttonElement = formElement.querySelector('.popup__form-button'); 
 
  if (isLoading) { 
    buttonElement.textContent = 'Сохранение...'; 
  } else { 
    buttonElement.textContent = 'Сохранить'; 
  } 
} 
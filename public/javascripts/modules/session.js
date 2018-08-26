const axios = require('axios');

function alterSession(attribute, text, button) {
  button.setAttribute('name', attribute);
  button.innerText = text;
}

function cancelSession(idSession, button) {
  axios.delete(`/sessions/${idSession}`);
  alterSession('supply', 'S\'inscrire', button);
}

function supplySession(idSession, button) {
  axios.post(`/sessions/${idSession}`);
  alterSession('cancel', 'Annuler', button);
}

function sessionUpdate(session) {
  // recuperer les buttons
  const buttons = session.querySelectorAll('button[type="submit"]');

  console.log(buttons);
  // ajouter l'event
  buttons.forEach((button) => {
    button.on('click', (event) => {
      // event va utiliser axios pour envoyer la requete
      if (button.getAttribute('name') === 'cancel') {
        cancelSession(event.target.value, button);
      } else {
        supplySession(event.target.value, button);
      }
    });
  });
}

export default sessionUpdate;

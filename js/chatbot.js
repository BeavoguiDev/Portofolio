let profileData = null;

fetch("data/profile.json")
  .then(res => res.json())
  .then(data => {
    profileData = data;
    console.log("Données chargées ✅", profileData);
  })
  .catch(err => {
    console.error("Erreur chargement JSON ❌", err);
  });

const chatbot = document.getElementById("chatbot") ;
const toggleBtn = document.getElementById("chatbot-toggle") ;
const closeBtn = document.getElementById("close-chatbot") ;
const sendBtn = document.getElementById("send-btn") ;
const input = document.getElementById("user-input") ;
const messages = document.getElementById("chatbot-messages") ;

// Afficher / masquer
toggleBtn.onclick = () => chatbot.style.display = "flex" ;
closeBtn.onclick = () => chatbot.style.display = "none" ;

// Envoi du message
sendBtn.onclick = sendMessage ;
input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage() ;
}) ;


function showTyping() {
  const typing = document.createElement("div");
  typing.className = "message bot typing";
  typing.id = "typing-indicator";
  typing.innerText = "Paul est en train d’écrire...";
  messages.appendChild(typing);
  messages.scrollTop = messages.scrollHeight;
}

function hideTyping() {
  const typing = document.getElementById("typing-indicator");
  if (typing) typing.remove();
}

function sendMessage() {
  const userMessage = input.value.trim();
  if (!userMessage) return;

  addMessage(userMessage, "user");
  input.value = "";

  showTyping();

  setTimeout(() => {
    hideTyping();
    addBotMessageWithTyping(getResponse(userMessage));
  }, 800);
}

function getResponse(message) {
  message = message.toLowerCase();

  if (!profileData) {
    return "Les données sont en cours de chargement, merci de patienter 🙂";
  }

  if (message.includes("compétence")) return getCompetences();
  if (message.includes("projet")) return getProjets();
  if (message.includes("expérience")) return getExperiences();
  if (message.includes("certification")) return getCertifications();
  if (message.includes("contact")) return getContact();

  if (message.includes("bonjour") || message.includes("bonsoir")) {
    return "Bonjour 👋 Je peux te parler de mes compétences, projets, expériences ou certifications.";
  }

  return "Tu peux me demander mes compétences, projets, expériences ou certifications 🙂";
}


function addMessage(text, sender) {
  const div = document.createElement("div") ;
  div.className = `message ${sender}` ;
  div.innerText = text ;
  messages.appendChild(div) ;
  messages.scrollTop = messages.scrollHeight ;
}

function addBotMessageWithTyping(text, speed = 40) {
  const div = document.createElement("div");
  div.className = "message bot";
  messages.appendChild(div);

  let i = 0;

  function type() {
    if (i < text.length) {

      // Si on rencontre une balise HTML, on l’ajoute d’un coup
      if (text.charAt(i) === "<") {
        const endTag = text.indexOf(">", i);
        div.innerHTML += text.slice(i, endTag + 1);
        i = endTag + 1;
      } else {
        div.innerHTML += text.charAt(i);
        i++;
      }

      messages.scrollTop = messages.scrollHeight;
      setTimeout(type, speed);
    }
  }

  type();
}


function handleQuickQuestion(text) {
  addMessage(text, "user");

  showTyping();

  setTimeout(() => {
    hideTyping();
    addBotMessageWithTyping(getResponse(text));
  }, 800);
}

const text = "Hi👋, je suis Paul, l'assistant de Beavogui.";
const intro = document.getElementById("intro");

let x = 0;

function afficheintro() {
    if (x < text.length) {
        intro.innerHTML += text.charAt(x);
        x++;
        setTimeout(afficheintro, 100);
    }
}

afficheintro(); 

function getCompetences() {
  const c = profileData.competences;

  let response = "<strong>Voici mes compétences :</strong><br><br>";

  response += "<strong>🖥️ Frontend</strong><br>• " +
    c.frontend.join("<br>• ") + "<br><br>";

  response += "<strong>⚙️ Backend</strong><br>• " +
    c.backend.join("<br>• ") + "<br><br>";

  response += "<strong>🧰 Outils & Gestion</strong><br>• " +
    c.outils.join("<br>• ") + "<br><br>";

  response += "<strong>🤖 Bot Trainer & IA</strong><br>• " +
    c.bot_trainer.join("<br>• ");

  return response;
}

function getProjets() {
  return profileData.projets
    .map(p => `• ${p.nom} : ${p.description}`)
    .join("<br>");
}

function getExperiences() {
  if (!profileData.experiences || profileData.experiences.length === 0) {
    return "Je n’ai pas encore renseigné mes expériences.";
  }

  return profileData.experiences.map(exp =>
    `• ${exp.poste} (${exp.periode})<br> Missions :<br> - ${exp.missions.join("<br>  - ")}`
  ).join("<br>");
}

function getCertifications() {
  return "Mes certifications :<br>• " +
    profileData.certifications.join("<br>• ");
}

function getContact() {
  return `📧 Email : ${profileData.contact.email}
🔗 LinkedIn : ${profileData.contact.linkedin}`;
}

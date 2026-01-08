const chatbot = document.getElementById("chatbot") ;
const toggleBtn = document.getElementById("chatbot-toggle") ;
const closeBtn = document.getElementById("close-chatbot") ;
const sendBtn = document.getElementById("send-btn") ;
const input = document.getElementById("user-input") ;
const messages = document.getElementById("chatbot-messages") ;

// Base de connaissances
let knowledgeBase = {
  debut : "Bonjour, comment suis-je vous aider",
  competences :  "Je suis développeur Fullstack : HTML, CSS, JavaScript, React, Django, Laravel, API REST, Git et Docker. ",
  projets : "J’ai réalisé des portfolios, applications web, dashboards et API REST.",
  contact : " Tu peux me contacter par email ou via LinkedIn depuis la section Contact du site. ",
  profil : " Je suis développeur web passionné par les nouvelles technologies et les chatbots IA. "
} ;

// Afficher / masquer
toggleBtn.onclick = () => chatbot.style.display = "flex" ;
closeBtn.onclick = () => chatbot.style.display = "none" ;

// Envoi du message
sendBtn.onclick = sendMessage ;
input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage() ;
}) ;

function sendMessage() {
  const userMessage = input.value.trim() ;
  if (!userMessage) return ;

  addMessage(userMessage, "user") ;
  input.value = "" ;

  setTimeout(() => {
    const botResponse = getResponse(userMessage) ;
    addMessage(botResponse, "bot") ;
  }, 500) ;
}

function getResponse(message) {
  message = message.toLowerCase() ;

  if (message.includes("compétence")) return knowledgeBase.competences ;
  if (message.includes("projet")) return knowledgeBase.projets ;
  if (message.includes("contact")) return knowledgeBase.contact ;
  if (message.includes("profil") || message.includes("présente")) return knowledgeBase.profil ;
  if (message.includes("Bonjour") || message.includes("Bonsoir")) return knowledgeBase.debut ;

  return "Je peux te renseigner sur mes compétences, projets, profil ou contact 🙂" ;
}

function addMessage(text, sender) {
  const div = document.createElement("div") ;
  div.className = `message ${sender}` ;
  div.innerText = text ;
  messages.appendChild(div) ;
  messages.scrollTop = messages.scrollHeight ;
}

function handleQuickQuestion(text) {
  addMessage(text, "user");

  setTimeout(() => {
    const response = getResponse(text);
    addMessage(response, "bot");
  }, 300);
}

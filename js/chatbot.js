/**
 * ask-arya.sh Terminal AI Assistant Chatbot
 */

function initChatbot() {
  const toggleBtn = document.getElementById('chat-widget-toggle');
  const chatPanel = document.getElementById('chat-widget-panel');
  const closeBtn = document.getElementById('chat-close-btn');
  const voiceToggleBtn = document.getElementById('chat-voice-toggle');
  const speakingIndicator = document.getElementById('speaking-indicator');
  const messagesContainer = document.getElementById('chat-messages');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const quickChips = document.querySelectorAll('.chip-btn');

  if (!toggleBtn || !chatPanel) return;

  let hasGreeted = false;

  // Toggle chat window
  toggleBtn.addEventListener('click', () => {
    const isOpen = chatPanel.classList.contains('open');
    if (isOpen) {
      closeChat();
    } else {
      openChat();
    }
  });

  closeBtn.addEventListener('click', closeChat);

  function openChat() {
    chatPanel.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    chatInput.focus();

    if (!hasGreeted) {
      hasGreeted = true;
      const greetingObj = window.aryaKnowledgeBase.find(k => k.intent === 'greeting');
      if (greetingObj) {
        addBotMessage(greetingObj.reply, greetingObj.actionText, greetingObj.actionTarget);
      }
    }
  }

  function closeChat() {
    chatPanel.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    if (window.voiceEngine) window.voiceEngine.stop();
    if (speakingIndicator) speakingIndicator.style.display = 'none';
  }

  // Escape key close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && chatPanel.classList.contains('open')) {
      closeChat();
    }
  });

  // Voice toggle button
  if (voiceToggleBtn) {
    if (!window.voiceEngine || !window.voiceEngine.isSupported) {
      voiceToggleBtn.style.display = 'none';
    } else {
      voiceToggleBtn.addEventListener('click', () => {
        const isMuted = window.voiceEngine.toggleMute();
        voiceToggleBtn.innerHTML = isMuted ? '🔇' : '🔊';
        voiceToggleBtn.setAttribute('aria-label', isMuted ? 'Unmute voice output' : 'Mute voice output');
      });
    }
  }

  // Handle message submission
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = chatInput.value.trim();
    if (!query) return;

    addUserMessage(query);
    chatInput.value = '';
    processQuery(query);
  });

  // Handle quick chips
  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.getAttribute('data-prompt');
      if (prompt) {
        addUserMessage(prompt);
        processQuery(prompt);
      }
    });
  });

  function addUserMessage(text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg user-msg';
    msgDiv.innerHTML = `<span class="msg-prompt">arya@user:~$</span> <span class="msg-text">${escapeHtml(text)}</span>`;
    messagesContainer.appendChild(msgDiv);
    scrollToBottom();
  }

  function processQuery(query) {
    const lowerQuery = query.toLowerCase();
    let matchedItem = null;

    if (window.aryaKnowledgeBase) {
      for (const item of window.aryaKnowledgeBase) {
        const hasMatch = item.keywords.some(kw => lowerQuery.includes(kw));
        if (hasMatch) {
          matchedItem = item;
          break;
        }
      }
    }

    if (!matchedItem) {
      matchedItem = window.defaultFallbackReply;
    }

    setTimeout(() => {
      addBotMessage(matchedItem.reply, matchedItem.actionText, matchedItem.actionTarget);
    }, 250);
  }

  function addBotMessage(replyText, actionText, actionTarget) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg bot-msg';
    
    const headerSpan = document.createElement('div');
    headerSpan.className = 'bot-msg-header';
    headerSpan.innerHTML = `<span class="msg-prompt-bot">ask-arya.sh:</span>`;
    msgDiv.appendChild(headerSpan);

    const bodySpan = document.createElement('div');
    bodySpan.className = 'bot-msg-text';
    msgDiv.appendChild(bodySpan);

    messagesContainer.appendChild(msgDiv);
    scrollToBottom();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      bodySpan.innerText = replyText;
      appendActionLink(msgDiv, actionText, actionTarget);
      scrollToBottom();
      speakText(replyText);
    } else {
      // Typewriter character effect for bot reply
      let index = 0;
      bodySpan.textContent = '';
      
      const typeInterval = setInterval(() => {
        bodySpan.textContent += replyText[index];
        index++;
        scrollToBottom();

        if (index >= replyText.length) {
          clearInterval(typeInterval);
          appendActionLink(msgDiv, actionText, actionTarget);
          scrollToBottom();
        }
      }, 15);

      speakText(replyText);
    }
  }

  function speakText(text) {
    if (window.voiceEngine && window.voiceEngine.isSupported && !window.voiceEngine.isMuted) {
      window.voiceEngine.speak(
        text,
        () => { if (speakingIndicator) speakingIndicator.style.display = 'inline-flex'; },
        () => { if (speakingIndicator) speakingIndicator.style.display = 'none'; }
      );
    }
  }

  function appendActionLink(container, actionText, actionTarget) {
    if (!actionText || !actionTarget) return;

    const actionDiv = document.createElement('div');
    actionDiv.className = 'bot-action-wrapper';

    const link = document.createElement('a');
    link.href = actionTarget;
    link.className = 'bot-action-btn';
    link.innerHTML = `<span>${escapeHtml(actionText)} →</span>`;
    
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetEl = document.querySelector(actionTarget);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
        if (window.innerWidth < 768) {
          closeChat();
        }
      }
    });

    actionDiv.appendChild(link);
    container.appendChild(actionDiv);
  }

  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
}

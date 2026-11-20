(() => {
  "use strict";

  const frequencies = [500, 1000, 2000, 4000, 6000];
  const words = [
    { heard: "rain", options: ["rain", "train", "chain"] },
    { heard: "book", options: ["look", "book", "cook"] },
    { heard: "fish", options: ["fish", "dish", "wish"] }
  ];
  const state = {
    ear: "right", index: 0, answers: { left: [], right: [] },
    lifestyle: {}, wordIndex: 0, speechAnswers: [], audioContext: null, playing: false
  };
  const $ = (id) => document.getElementById(id);
  const screens = [...document.querySelectorAll(".screen")];
  if ($("year")) $("year").textContent = new Date().getFullYear();

  function showScreen(id) {
    screens.forEach(screen => screen.classList.toggle("active", screen.id === id));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  document.querySelectorAll("[data-go]").forEach(button => {
    button.addEventListener("click", () => showScreen(button.dataset.go));
  });

  document.querySelectorAll(".choice-list[data-group]").forEach(group => {
    group.querySelectorAll(".choice").forEach(choice => {
      choice.addEventListener("click", () => {
        group.querySelectorAll(".choice").forEach(item => item.classList.remove("selected"));
        choice.classList.add("selected");
        group.dataset.answer = choice.textContent.trim();
        const next = document.querySelector(`[data-next-choice="${group.dataset.group}"]`);
        if (next) next.disabled = false;
      });
    });
  });
  document.querySelectorAll("[data-next-choice]").forEach(button => {
    button.addEventListener("click", () => {
      const group = document.querySelector(`[data-group="${button.dataset.nextChoice}"]`);
      state.lifestyle[button.dataset.nextChoice] = group.dataset.answer;
      showScreen(button.dataset.target);
    });
  });

  $("ready-check").addEventListener("change", event => { $("begin-sound").disabled = !event.target.checked; });

  function setupAudio() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      $("audio-status").textContent = "Audio playback isn't supported in this browser.";
      return false;
    }
    if (!state.audioContext) state.audioContext = new AudioContextClass();
    if (state.audioContext.state === "suspended") state.audioContext.resume();
    return true;
  }

  function playTone() {
    if (state.playing || !setupAudio()) return;
    const ctx = state.audioContext;
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    oscillator.type = "sine";
    oscillator.frequency.value = frequencies[state.index];
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.025, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.025, ctx.currentTime + 0.55);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.75);
    oscillator.connect(gain);
    if (panner) {
      panner.pan.value = state.ear === "left" ? -1 : 1;
      gain.connect(panner);
      panner.connect(ctx.destination);
    } else gain.connect(ctx.destination);

    state.playing = true;
    $("audio-status").textContent = "Playing sound…";
    $("play-tone").disabled = true;
    $("heard").disabled = true;
    $("not-heard").disabled = true;
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.78);
    oscillator.onended = () => {
      state.playing = false;
      $("audio-status").textContent = "Did you hear the tone?";
      $("play-tone").disabled = false;
      $("heard").disabled = false;
      $("not-heard").disabled = false;
    };
  }

  function renderTone() {
    const total = frequencies.length * 2;
    const completed = (state.ear === "left" ? frequencies.length : 0) + state.index;
    $("ear-label").textContent = `${state.ear.toUpperCase()} EAR`;
    $("frequency-label").textContent = `Sound ${state.index + 1} of ${frequencies.length}`;
    $("progress-fill").style.width = `${(completed / total) * 70}%`;
    $("audio-status").textContent = "Press play when you're ready.";
    $("play-tone").disabled = false;
    $("heard").disabled = true;
    $("not-heard").disabled = true;
  }

  function recordResponse(heard) {
    state.answers[state.ear].push({ frequency: frequencies[state.index], heard });
    state.index += 1;
    if (state.index >= frequencies.length) {
      if (state.ear === "right") {
        state.ear = "left";
        state.index = 0;
      } else {
        showScreen("speech-screen");
        renderWord();
        return;
      }
    }
    renderTone();
  }

  function renderWord() {
    if (state.wordIndex >= words.length) { showResults(); return; }
    const item = words[state.wordIndex];
    $("speech-word").textContent = `Word ${state.wordIndex + 1} of ${words.length}`;
    $("speech-status").textContent = "Press play to hear a word.";
    $("speech-next").disabled = true;
    const choices = $("speech-choices");
    choices.innerHTML = "";
    item.options.forEach(option => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "choice";
      button.textContent = option;
      button.addEventListener("click", () => {
        choices.querySelectorAll(".choice").forEach(el => el.classList.remove("selected"));
        button.classList.add("selected");
        state.speechAnswers[state.wordIndex] = option === item.heard;
        $("speech-next").disabled = false;
      });
      choices.append(button);
    });
  }

  function speakWord() {
    if (!("speechSynthesis" in window)) {
      $("speech-status").textContent = "Speech playback isn't supported here. You can still continue.";
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(words[state.wordIndex].heard);
    utterance.rate = 0.78;
    utterance.onstart = () => { $("speech-status").textContent = "Playing word…"; };
    utterance.onend = () => { $("speech-status").textContent = "Choose the word you heard."; };
    window.speechSynthesis.speak(utterance);
  }

  function showResults() {
    const summarize = ear => state.answers[ear].filter(item => item.heard).length;
    const right = summarize("right");
    const left = summarize("left");
    $("right-result").textContent = `${right}/${frequencies.length}`;
    $("left-result").textContent = `${left}/${frequencies.length}`;
    $("right-detail").textContent = "tones reported heard";
    $("left-detail").textContent = "tones reported heard";
    const speechCount = state.speechAnswers.filter(Boolean).length;
    $("result-message").textContent = `You reported hearing ${right} of 5 tones in your right ear and ${left} of 5 tones in your left ear. You selected ${speechCount} of 3 spoken words correctly. These counts record your responses only; they are not thresholds or a clinical interpretation.`;
    const lifeAnswers = [state.lifestyle.life1, state.lifestyle.life2, state.lifestyle.life3].filter(Boolean);
    const frequentChallenges = lifeAnswers.filter(answer => answer === "Often" || answer === "Almost always").length;
    const occasionalChallenges = lifeAnswers.filter(answer => answer === "Sometimes").length;
    let lifestyleInsight;
    if (frequentChallenges >= 2) {
      lifestyleInsight = "Your answers suggest that listening is often challenging in some everyday situations. Consider discussing these concerns with a hearing-care professional.";
    } else if (frequentChallenges === 1 || occasionalChallenges >= 2) {
      lifestyleInsight = "Your answers suggest you sometimes experience difficulty in everyday listening situations. If this affects you, consider a hearing assessment.";
    } else if (occasionalChallenges === 1) {
      lifestyleInsight = "Your answers suggest occasional difficulty in one listening situation, while you report little difficulty in others. Keep track of any changes or concerns.";
    } else {
      lifestyleInsight = "Your answers suggest little difficulty in the listening situations asked about. This questionnaire cannot rule out a hearing concern.";
    }
    $("lifestyle-summary").textContent = `Listening questionnaire: ${lifestyleInsight}`;
    showScreen("results-screen");
  }

  $("begin-sound").addEventListener("click", () => {
    state.ear = "right";
    state.index = 0;
    state.answers = { left: [], right: [] };
    showScreen("tone-screen");
    renderTone();
  });
  $("play-tone").addEventListener("click", playTone);
  $("heard").addEventListener("click", () => recordResponse(true));
  $("not-heard").addEventListener("click", () => recordResponse(false));
  $("play-word").addEventListener("click", speakWord);
  $("speech-next").addEventListener("click", () => { state.wordIndex += 1; renderWord(); });
  $("speech-back").addEventListener("click", () => {
    state.wordIndex = 0;
    state.speechAnswers = [];
    state.ear = "right";
    state.index = 0;
    state.answers = { left: [], right: [] };
    showScreen("tone-screen");
    renderTone();
  });
  $("restart-btn").addEventListener("click", () => {
    state.ear = "right";
    state.index = 0;
    state.answers = { left: [], right: [] };
    state.lifestyle = {};
    state.wordIndex = 0;
    state.speechAnswers = [];
    document.querySelectorAll(".choice").forEach(choice => choice.classList.remove("selected"));
    document.querySelectorAll("[data-next-choice]").forEach(button => { button.disabled = true; });
    document.querySelectorAll("[data-group]").forEach(group => { delete group.dataset.answer; });
    $("ready-check").checked = false;
    $("begin-sound").disabled = true;
    showScreen("welcome-screen");
  });
  $("print-btn").addEventListener("click", () => window.print());
})();

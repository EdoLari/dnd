// =============================================
// i18n.js – Internazionalizzazione (IT, EN, ES, PT, DE)
// =============================================

const TRANSLATIONS = {
  it: {
    // gioca.html
    "btn-play": "GIOCA",

    // campagna.html
    "page-title-campaigns": "Campagne",
    "btn-back": "Indietro",
    "btn-create": "Crea Campagna",
    "btn-open": "Apri",
    "btn-change-photo": "Cambia Foto",
    "btn-delete": "Elimina",
    "btn-export": "Esporta",
    "btn-import": "Importa",
    "campaign-label": "Campagna",

    // delete modal
    "delete-confirm": "Sei sicuro di voler eliminare la campagna?",
    "btn-confirm-delete": "Elimina",
    "btn-cancel": "Annulla",

    // sheet.html
    "btn-front": "Fronte",
    "btn-back": "Retro",
    "btn-back-sheet": "Retro",
    "label-saves": "Tiri Salvezza",
    "label-morte": "Morte",
    "label-incantesimi": "Incantesimi",
    "label-bacchette": "Bacchette",
    "label-soffio": "Soffio del Drago",
    "label-paralisi": "Paralisi",
    "label-hp": "Punti Vita",
    "label-hp-cur": "HP Attuali",
    "label-hp-max": "HP Massimi",
    "label-hp-temp": "HP Temporanei",
    "label-ca": "Classe Armatura (CA)",
    "label-stats": "Caratteristiche",
    "label-story": "Storia",
    "label-equipment": "Equipaggiamento",

    // settings modal
    "settings-title": "⚙️ Impostazioni",
    "settings-theme": "🎨 Tema Pulsanti",
    "theme-normal": "⚔️ Normale",
    "theme-dark": "🌑 Dark",
    "theme-natura": "🌿 Natura",
    "theme-neon": "💚 NEON",
    "theme-futuro": "🔮 Futuro",
    "settings-lang": "🌍 Lingua",
    "settings-account": "👤 Account",
    "btn-google-login": "Accedi con Google",
    "btn-logout": "Esci",
    "sync-idle": "Nessun account connesso",
    "sync-ok": "✅ Sincronizzato con il cloud",
    "sync-loading": "⏳ Sincronizzazione...",
    "sync-error": "❌ Errore di sincronizzazione",

    // create campaign prompts
    "prompt-campaign-name": "Nome Campagna:",
    "prompt-char-name": "Nome Personaggio:",
    "prompt-class-level": "Classe & Livello:",

    // import messages
    "import-success": "Campagna importata con successo!",
    "import-error": "File non valido. Usa un file .json esportato da questa app.",
  },

  en: {
    "btn-play": "PLAY",
    "page-title-campaigns": "Campaigns",
    "btn-back": "Back",
    "btn-back-sheet": "Back",
    "btn-create": "Create Campaign",
    "btn-open": "Open",
    "btn-change-photo": "Change Photo",
    "btn-delete": "Delete",
    "btn-export": "Export",
    "btn-import": "Import",
    "campaign-label": "Campaign",
    "delete-confirm": "Are you sure you want to delete this campaign?",
    "btn-confirm-delete": "Delete",
    "btn-cancel": "Cancel",
    "btn-front": "Front",
    "btn-back-sheet": "Back",
    "label-saves": "Saving Throws",
    "label-morte": "Death",
    "label-incantesimi": "Spells",
    "label-bacchette": "Wands",
    "label-soffio": "Dragon Breath",
    "label-paralisi": "Paralysis",
    "label-hp": "Hit Points",
    "label-hp-cur": "Current HP",
    "label-hp-max": "Max HP",
    "label-hp-temp": "Temp HP",
    "label-ca": "Armor Class (AC)",
    "label-stats": "Ability Scores",
    "label-story": "Story",
    "label-equipment": "Equipment",
    "settings-title": "⚙️ Settings",
    "settings-theme": "🎨 Button Theme",
    "theme-normal": "⚔️ Normal",
    "theme-dark": "🌑 Dark",
    "theme-natura": "🌿 Nature",
    "theme-neon": "💚 NEON",
    "theme-futuro": "🔮 Future",
    "settings-lang": "🌍 Language",
    "settings-account": "👤 Account",
    "btn-google-login": "Sign in with Google",
    "btn-logout": "Sign out",
    "sync-idle": "No account connected",
    "sync-ok": "✅ Synced with cloud",
    "sync-loading": "⏳ Syncing...",
    "sync-error": "❌ Sync error",
    "prompt-campaign-name": "Campaign Name:",
    "prompt-char-name": "Character Name:",
    "prompt-class-level": "Class & Level:",
    "import-success": "Campaign imported successfully!",
    "import-error": "Invalid file. Use a .json file exported from this app.",
  },

  es: {
    "btn-play": "JUGAR",
    "page-title-campaigns": "Campañas",
    "btn-back": "Atrás",
    "btn-back-sheet": "Reverso",
    "btn-create": "Crear Campaña",
    "btn-open": "Abrir",
    "btn-change-photo": "Cambiar Foto",
    "btn-delete": "Eliminar",
    "btn-export": "Exportar",
    "btn-import": "Importar",
    "campaign-label": "Campaña",
    "delete-confirm": "¿Estás seguro de que quieres eliminar esta campaña?",
    "btn-confirm-delete": "Eliminar",
    "btn-cancel": "Cancelar",
    "btn-front": "Frente",
    "btn-back-sheet": "Reverso",
    "label-saves": "Tiradas de Salvación",
    "label-morte": "Muerte",
    "label-incantesimi": "Hechizos",
    "label-bacchette": "Varitas",
    "label-soffio": "Aliento de Dragón",
    "label-paralisi": "Parálisis",
    "label-hp": "Puntos de Golpe",
    "label-hp-cur": "PG Actuales",
    "label-hp-max": "PG Máximos",
    "label-hp-temp": "PG Temporales",
    "label-ca": "Clase de Armadura (CA)",
    "label-stats": "Características",
    "label-story": "Historia",
    "label-equipment": "Equipamiento",
    "settings-title": "⚙️ Ajustes",
    "settings-theme": "🎨 Tema de Botones",
    "theme-normal": "⚔️ Normal",
    "theme-dark": "🌑 Oscuro",
    "theme-natura": "🌿 Naturaleza",
    "theme-neon": "💚 NEÓN",
    "theme-futuro": "🔮 Futuro",
    "settings-lang": "🌍 Idioma",
    "settings-account": "👤 Cuenta",
    "btn-google-login": "Iniciar sesión con Google",
    "btn-logout": "Cerrar sesión",
    "sync-idle": "Sin cuenta conectada",
    "sync-ok": "✅ Sincronizado con la nube",
    "sync-loading": "⏳ Sincronizando...",
    "sync-error": "❌ Error de sincronización",
    "prompt-campaign-name": "Nombre de la Campaña:",
    "prompt-char-name": "Nombre del Personaje:",
    "prompt-class-level": "Clase y Nivel:",
    "import-success": "¡Campaña importada con éxito!",
    "import-error": "Archivo no válido. Usa un archivo .json exportado desde esta app.",
  },

  pt: {
    "btn-play": "JOGAR",
    "page-title-campaigns": "Campanhas",
    "btn-back": "Voltar",
    "btn-back-sheet": "Verso",
    "btn-create": "Criar Campanha",
    "btn-open": "Abrir",
    "btn-change-photo": "Mudar Foto",
    "btn-delete": "Eliminar",
    "btn-export": "Exportar",
    "btn-import": "Importar",
    "campaign-label": "Campanha",
    "delete-confirm": "Tens a certeza que queres eliminar esta campanha?",
    "btn-confirm-delete": "Eliminar",
    "btn-cancel": "Cancelar",
    "btn-front": "Frente",
    "btn-back-sheet": "Verso",
    "label-saves": "Jogadas de Salvação",
    "label-morte": "Morte",
    "label-incantesimi": "Feitiços",
    "label-bacchette": "Varinhas",
    "label-soffio": "Sopro de Dragão",
    "label-paralisi": "Paralisia",
    "label-hp": "Pontos de Vida",
    "label-hp-cur": "PV Atuais",
    "label-hp-max": "PV Máximos",
    "label-hp-temp": "PV Temporários",
    "label-ca": "Classe de Armadura (CA)",
    "label-stats": "Características",
    "label-story": "História",
    "label-equipment": "Equipamento",
    "settings-title": "⚙️ Definições",
    "settings-theme": "🎨 Tema dos Botões",
    "theme-normal": "⚔️ Normal",
    "theme-dark": "🌑 Escuro",
    "theme-natura": "🌿 Natureza",
    "theme-neon": "💚 NEON",
    "theme-futuro": "🔮 Futuro",
    "settings-lang": "🌍 Idioma",
    "settings-account": "👤 Conta",
    "btn-google-login": "Entrar com Google",
    "btn-logout": "Sair",
    "sync-idle": "Nenhuma conta ligada",
    "sync-ok": "✅ Sincronizado com a nuvem",
    "sync-loading": "⏳ A sincronizar...",
    "sync-error": "❌ Erro de sincronização",
    "prompt-campaign-name": "Nome da Campanha:",
    "prompt-char-name": "Nome do Personagem:",
    "prompt-class-level": "Classe & Nível:",
    "import-success": "Campanha importada com sucesso!",
    "import-error": "Ficheiro inválido. Usa um ficheiro .json exportado desta app.",
  },

  de: {
    "btn-play": "SPIELEN",
    "page-title-campaigns": "Kampagnen",
    "btn-back": "Zurück",
    "btn-back-sheet": "Rückseite",
    "btn-create": "Kampagne erstellen",
    "btn-open": "Öffnen",
    "btn-change-photo": "Foto ändern",
    "btn-delete": "Löschen",
    "btn-export": "Exportieren",
    "btn-import": "Importieren",
    "campaign-label": "Kampagne",
    "delete-confirm": "Möchtest du diese Kampagne wirklich löschen?",
    "btn-confirm-delete": "Löschen",
    "btn-cancel": "Abbrechen",
    "btn-front": "Vorderseite",
    "btn-back-sheet": "Rückseite",
    "label-saves": "Rettungswürfe",
    "label-morte": "Tod",
    "label-incantesimi": "Zauber",
    "label-bacchette": "Zauberstäbe",
    "label-soffio": "Drachenatem",
    "label-paralisi": "Lähmung",
    "label-hp": "Trefferpunkte",
    "label-hp-cur": "Aktuelle TP",
    "label-hp-max": "Maximale TP",
    "label-hp-temp": "Temporäre TP",
    "label-ca": "Rüstungsklasse (RK)",
    "label-stats": "Attributwerte",
    "label-story": "Geschichte",
    "label-equipment": "Ausrüstung",
    "settings-title": "⚙️ Einstellungen",
    "settings-theme": "🎨 Schaltflächen-Thema",
    "theme-normal": "⚔️ Normal",
    "theme-dark": "🌑 Dunkel",
    "theme-natura": "🌿 Natur",
    "theme-neon": "💚 NEON",
    "theme-futuro": "🔮 Zukunft",
    "settings-lang": "🌍 Sprache",
    "settings-account": "👤 Konto",
    "btn-google-login": "Mit Google anmelden",
    "btn-logout": "Abmelden",
    "sync-idle": "Kein Konto verbunden",
    "sync-ok": "✅ Mit der Cloud synchronisiert",
    "sync-loading": "⏳ Synchronisierung...",
    "sync-error": "❌ Synchronisierungsfehler",
    "prompt-campaign-name": "Kampagnenname:",
    "prompt-char-name": "Charaktername:",
    "prompt-class-level": "Klasse & Stufe:",
    "import-success": "Kampagne erfolgreich importiert!",
    "import-error": "Ungültige Datei. Verwende eine .json-Datei, die aus dieser App exportiert wurde.",
  }
};

// =============================================
// Language helpers
// =============================================

function t(key) {
  const lang = localStorage.getItem("dndLang") || "it";
  const translations = TRANSLATIONS[lang] || TRANSLATIONS["it"];
  return translations[key] || TRANSLATIONS["it"][key] || key;
}

function setLanguage(lang) {
  localStorage.setItem("dndLang", lang);
  applyTranslations();
}

function applyTranslations() {
  const lang = localStorage.getItem("dndLang") || "it";
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const translated = t(key);
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
      el.placeholder = translated;
    } else {
      el.textContent = translated;
    }
  });

  // Update lang select dropdown if present
  const sel = document.getElementById("langSelect");
  if (sel) sel.value = lang;
}

// =============================================
// Theme helpers
// =============================================

const THEME_CLASSES = ["theme-dark-style", "theme-natura", "theme-neon", "theme-futuro"];

function applyTheme(theme) {
  THEME_CLASSES.forEach(cls => document.body.classList.remove(cls));
  if (theme && theme !== "normal") {
    document.body.classList.add("theme-" + theme);
  }
  localStorage.setItem("dndTheme", theme || "normal");

  // Update selected state in modal if open
  document.querySelectorAll(".theme-btn").forEach(btn => {
    btn.classList.toggle("selected", btn.dataset.theme === (theme || "normal"));
  });
}

function loadSavedTheme() {
  const theme = localStorage.getItem("dndTheme") || "normal";
  applyTheme(theme);
}

// =============================================
// Settings Modal
// =============================================

function openSettings() {
  const modal = document.getElementById("settingsModal");
  if (!modal) return;
  modal.classList.add("active");
  updateSettingsUI();
}

function closeSettings() {
  const modal = document.getElementById("settingsModal");
  if (modal) modal.classList.remove("active");
}

function updateSettingsUI() {
  // Reflect current theme selection
  const currentTheme = localStorage.getItem("dndTheme") || "normal";
  document.querySelectorAll(".theme-btn").forEach(btn => {
    btn.classList.toggle("selected", btn.dataset.theme === currentTheme);
  });

  // Reflect Firebase user state
  updateAccountUI();
}

// Stub – updated by firebase-config.js
function updateAccountUI() { }

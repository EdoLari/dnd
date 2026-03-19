// =============================================
// firebase-config.js – Google Login + Firestore Sync
// =============================================
//
// ⚠️  CONFIGURAZIONE RICHIESTA:
// -----------------------------------------------
// 1. Vai su https://console.firebase.google.com
// 2. Crea un nuovo progetto (o usa uno esistente)
// 3. "Aggiungi app" → scegli Web (</>)
// 4. Copia i valori della tua configurazione qui sotto
// 5. In Firebase Console:
//    - Attiva Authentication → Google (provider)
//    - Attiva Firestore Database (modalità test)
//    - In Firestore, le regole di default in "test mode"
//      ti permettono di leggere/scrivere per 30 giorni
// -----------------------------------------------

const firebaseConfig = {
  apiKey: "AIzaSyDuiFojyVuURq_1lnsDyftJRvJmDpl7--M",
  authDomain: "edoardodnd-213f5.firebaseapp.com",
  projectId: "edoardodnd-213f5",
  storageBucket: "edoardodnd-213f5.firebasestorage.app",
  messagingSenderId: "634197230558",
  appId: "1:634197230558:web:29ed94e6578f2ca2e8d34f",
};

// =============================================
// Firebase init
// =============================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

let currentUser = null;

// =============================================
// Auth state listener
// =============================================
onAuthStateChanged(auth, async user => {
  currentUser = user;
  updateAccountUI();

  if (user) {
    setSyncStatus("loading");
    try {
      await syncFromCloud();
      setSyncStatus("ok");
    } catch (e) {
      console.error("Sync error:", e);
      setSyncStatus("error");
    }
  }
});

// =============================================
// Login / Logout
// =============================================
async function loginWithGoogle() {
  try {
    await signInWithPopup(auth, provider);
    // onAuthStateChanged handles the rest
  } catch (err) {
    console.error("Login error:", err);
    setSyncStatus("error");
  }
}

async function logoutGoogle() {
  await signOut(auth);
  currentUser = null;
  updateAccountUI();
}

// =============================================
// Cloud Sync
// =============================================

/**
 * Save campaigns to Firestore.
 * Called any time campaigns change (if user is logged in).
 */
async function saveToCloud(campaigns) {
  if (!currentUser) return;
  try {
    const ref = doc(db, "users", currentUser.uid);
    await setDoc(ref, {
      campaigns: JSON.stringify(campaigns),
      updatedAt: Date.now()
    });
    setSyncStatus("ok");
  } catch (e) {
    console.error("Save to cloud error:", e);
    setSyncStatus("error");
  }
}

/**
 * Load campaigns from Firestore.
 * Compares timestamp with localStorage and uses the most recent.
 */
async function syncFromCloud() {
  if (!currentUser) return;

  const ref = doc(db, "users", currentUser.uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    // No cloud data – push local data to cloud
    const localData = getCampaigns();
    await saveToCloud(localData);
    return;
  }

  const cloudData = snap.data();
  const cloudTime = cloudData.updatedAt || 0;
  const localTime = parseInt(localStorage.getItem("dndCampaignsUpdatedAt") || "0");

  if (cloudTime >= localTime) {
    // Cloud is newer → use cloud
    const parsed = JSON.parse(cloudData.campaigns || "{}");
    localStorage.setItem("dndCampaigns", JSON.stringify(parsed));
    localStorage.setItem("dndCampaignsUpdatedAt", String(cloudTime));
  } else {
    // Local is newer → push to cloud
    const localCampaigns = getCampaigns();
    await saveToCloud(localCampaigns);
  }

  // Refresh UI if renderCampaigns exists
  if (typeof renderCampaigns === "function") renderCampaigns();
}

// =============================================
// UI helpers
// =============================================

function setSyncStatus(status) {
  const el = document.getElementById("syncStatus");
  if (!el) return;
  el.className = "sync-status";
  switch (status) {
    case "ok":
      el.classList.add("ok");
      el.textContent = t("sync-ok");
      break;
    case "loading":
      el.classList.add("loading");
      el.textContent = t("sync-loading");
      break;
    case "error":
      el.classList.add("err");
      el.textContent = t("sync-error");
      break;
    default:
      el.textContent = t("sync-idle");
  }
}

function updateAccountUI() {
  const loginArea = document.getElementById("loginArea");
  const userArea = document.getElementById("userArea");
  const userName = document.getElementById("userName");
  const userAvatar = document.getElementById("userAvatar");
  const syncStatus = document.getElementById("syncStatus");

  if (!loginArea || !userArea) return;

  if (currentUser) {
    loginArea.style.display = "none";
    userArea.style.display = "flex";
    if (userName) userName.textContent = currentUser.displayName || currentUser.email;
    if (userAvatar) userAvatar.src = currentUser.photoURL || "";
    if (syncStatus) setSyncStatus("ok");
  } else {
    loginArea.style.display = "block";
    userArea.style.display = "none";
    if (syncStatus) setSyncStatus("idle");
  }
}

// =============================================
// Override saveCampaigns to also sync to cloud
// =============================================
const _origSaveCampaigns = window.saveCampaigns;
window.saveCampaignsWithCloud = function (data) {
  localStorage.setItem("dndCampaigns", JSON.stringify(data));
  localStorage.setItem("dndCampaignsUpdatedAt", String(Date.now()));
  if (currentUser) {
    saveToCloud(data).catch(console.error);
  }
};

// Expose for use in other scripts
window.loginWithGoogle = loginWithGoogle;
window.logoutGoogle = logoutGoogle;
window.saveToCloud = saveToCloud;
window.syncFromCloud = syncFromCloud;
window.getCurrentUser = () => currentUser;

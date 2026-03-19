let currentCampaign = null

// =============================================
// LocalStorage helpers
// =============================================
function getCampaigns() {
  return JSON.parse(localStorage.getItem("dndCampaigns") || "{}")
}

function saveCampaigns(data) {
  localStorage.setItem("dndCampaigns", JSON.stringify(data))
  localStorage.setItem("dndCampaignsUpdatedAt", String(Date.now()))
  // If cloud sync is available, push to cloud too
  if (typeof window.saveToCloud === "function" && typeof window.getCurrentUser === "function" && window.getCurrentUser()) {
    window.saveToCloud(data).catch(console.error)
  }
}

// =============================================
// Theme
// =============================================
function toggleTheme() {
  document.body.classList.toggle("dark")
  document.body.classList.toggle("light")
}

// =============================================
// Render Campaigns
// =============================================
function renderCampaigns() {
  const container = document.getElementById("campaignSlots");
  if (!container) return;
  container.innerHTML = "";
  const data = getCampaigns();

  for (let i = 1; i <= 3; i++) {
    let c = data[i];
    let div = document.createElement("div");
    div.className = "card";

    if (!c) {
      div.innerHTML = `
        <h2>${t("campaign-label")} ${i}</h2>
        <div class="campaign-actions">
          <button class="primary" onclick="createCampaign(${i})" data-i18n="btn-create">${t("btn-create")}</button>
          <button class="btn-import" onclick="importCampaign(${i})" data-i18n="btn-import">${t("btn-import")}</button>
        </div>
      `;
    } else {
      div.innerHTML = `
        <div style="display:flex;align-items:center">
          <img class="profile" src="${c.image || ''}">
          <div>
            <h2>${c.title}</h2>
            <p>${c.name} - ${c.classLevel}</p>
          </div>
        </div>
        <div class="campaign-actions">
          <button class="primary" onclick="openSheet(${i})" data-i18n="btn-open">${t("btn-open")}</button>
          <button class="secondary" onclick="editImage(${i})" data-i18n="btn-change-photo">${t("btn-change-photo")}</button>
          <button class="btn-export" onclick="exportCampaign(${i})" data-i18n="btn-export">${t("btn-export")}</button>
          <button class="btn-import" onclick="importCampaign(${i})" data-i18n="btn-import">${t("btn-import")}</button>
          <button class="danger" onclick="openDeleteModal(${i})" data-i18n="btn-delete">${t("btn-delete")}</button>
        </div>
      `;
    }

    container.appendChild(div);
  }
}

// =============================================
// Create Campaign
// =============================================
function createCampaign(slot) {
  const title      = prompt(t("prompt-campaign-name"))
  const name       = prompt(t("prompt-char-name"))
  const classLevel = prompt(t("prompt-class-level"))

  if (!title || !name || !classLevel) return;

  const data = getCampaigns()
  data[slot] = {
    title,
    name,
    classLevel,
    image: "",
    stats: { for: 10, des: 10, cos: 10, int: 10, sag: 10, car: 10 },
    hp: { max: 20, current: 20, temp: 0 },
    ca: 10,
    saves: {
      morte: 15,
      incantesimi: 14,
      bacchette: 13,
      soffio: 16,
      paralisi: 12
    },
    back: {
      story: "",
      equipment: ""
    }
  };

  saveCampaigns(data)
  renderCampaigns()
}

// =============================================
// Export / Import Campaign
// =============================================
function exportCampaign(slot) {
  const data = getCampaigns();
  const campaign = data[slot];
  if (!campaign) return;

  const exportData = {
    slot,
    campaign,
    exportedAt: new Date().toISOString(),
    appVersion: "dnd-manager-v2"
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `campagna-${campaign.title || slot}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importCampaign(slot) {
  const input = document.createElement("input");
  input.type   = "file";
  input.accept = ".json";
  input.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function () {
      try {
        const parsed = JSON.parse(reader.result);
        if (!parsed.campaign || parsed.appVersion !== "dnd-manager-v2") {
          alert(t("import-error"));
          return;
        }
        const data = getCampaigns();
        data[slot] = parsed.campaign;
        saveCampaigns(data);
        renderCampaigns();
        alert(t("import-success"));
      } catch (err) {
        alert(t("import-error"));
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

// =============================================
// Edit image
// =============================================
function editImage(slot) {
  const input = document.createElement("input")
  input.type = "file"
  input.accept = "image/*"
  input.onchange = e => {
    const reader = new FileReader()
    reader.onload = function () {
      const data = getCampaigns()
      data[slot].image = reader.result
      saveCampaigns(data)
      renderCampaigns()
    }
    reader.readAsDataURL(e.target.files[0])
  }
  input.click()
}

function openSheet(slot) {
  localStorage.setItem("currentCampaign", slot);
  window.location.href = "sheet.html";
}

// =============================================
// Sheet Front
// =============================================
function showFront() {
  const data = getCampaigns()[currentCampaign];
  if (!data) return;
  const hpPercent = (data.hp.current / data.hp.max) * 100;

  let html = `
  <div class="sheet-layout">
    <!-- TIRI SALVEZZA -->
    <div class="save-throw-box">
      <h3 data-i18n="label-saves">${t("label-saves")}</h3>
      <label data-i18n="label-morte">${t("label-morte")}</label>
      <input type="number" value="${data.saves.morte}" onchange="updateSave('morte',this.value)">
      <label data-i18n="label-incantesimi">${t("label-incantesimi")}</label>
      <input type="number" value="${data.saves.incantesimi}" onchange="updateSave('incantesimi',this.value)">
      <label data-i18n="label-bacchette">${t("label-bacchette")}</label>
      <input type="number" value="${data.saves.bacchette}" onchange="updateSave('bacchette',this.value)">
      <label data-i18n="label-soffio">${t("label-soffio")}</label>
      <input type="number" value="${data.saves.soffio}" onchange="updateSave('soffio',this.value)">
      <label data-i18n="label-paralisi">${t("label-paralisi")}</label>
      <input type="number" value="${data.saves.paralisi}" onchange="updateSave('paralisi',this.value)">
    </div>

    <!-- COLONNA DESTRA -->
    <div>
      <div class="card">
        <h2>${data.name}</h2>
        <p>${data.classLevel}</p>
        <h3 data-i18n="label-hp">${t("label-hp")}</h3>
        <div class="hp-bar">
          <div class="hp-fill" style="width:${Math.min(100, hpPercent)}%"></div>
        </div>
        <label data-i18n="label-hp-cur">${t("label-hp-cur")}</label>
        <input type="number" value="${data.hp.current}" onchange="updateHP('current',this.value)">
        <label data-i18n="label-hp-max">${t("label-hp-max")}</label>
        <input type="number" value="${data.hp.max}" onchange="updateHP('max',this.value)">
        <label data-i18n="label-hp-temp">${t("label-hp-temp")}</label>
        <input type="number" value="${data.hp.temp}" onchange="updateHP('temp',this.value)">
        <label data-i18n="label-ca">${t("label-ca")}</label>
        <input type="number" value="${data.ca}" onchange="updateCA(this.value)">
      </div>

      <div class="card">
        <h3 data-i18n="label-stats">${t("label-stats")}</h3>
        <div class="stat-grid">`;

  for (let key in data.stats) {
    let val = data.stats[key];
    let mod = Math.floor((val - 10) / 2);
    html += `
      <div>
        <label>${key.toUpperCase()}</label>
        <input type="number" value="${val}" onchange="updateStat('${key}',this.value)">
        <div>Mod: ${mod >= 0 ? '+' : ''}${mod}</div>
      </div>`;
  }

  html += `
        </div>
      </div>
    </div>
  </div>`;

  document.getElementById("sheetContent").innerHTML = html;
}

// =============================================
// Sheet Back
// =============================================
function showBack() {
  const data = getCampaigns()[currentCampaign];
  const story     = data.back.story     || "";
  const equipment = data.back.equipment || "";

  document.getElementById("sheetContent").innerHTML = `
    <div class="card">
      <h3 data-i18n="label-story">${t("label-story")}</h3>
      <textarea rows="8" oninput="updateStory(this.value)">${story}</textarea>
    </div>
    <div class="card">
      <h3 data-i18n="label-equipment">${t("label-equipment")}</h3>
      <textarea rows="6" onkeydown="handleEquipmentList(event)" oninput="updateEquipment(this.value)">${equipment}</textarea>
    </div>
  `;
}

// =============================================
// Update helpers
// =============================================
function updateHP(type, value) {
  const data = getCampaigns()
  data[currentCampaign].hp[type] = parseInt(value)
  if (data[currentCampaign].hp.current > data[currentCampaign].hp.max) {
    data[currentCampaign].hp.current = data[currentCampaign].hp.max
  }
  saveCampaigns(data)
  showFront()
}

function updateCA(value) {
  const data = getCampaigns();
  data[currentCampaign].ca = parseInt(value);
  saveCampaigns(data);
}

function updateStat(key, value) {
  const data = getCampaigns()
  data[currentCampaign].stats[key] = parseInt(value)
  saveCampaigns(data)
  showFront()
}

function updateSave(key, value) {
  const data = getCampaigns();
  data[currentCampaign].saves[key] = parseInt(value);
  saveCampaigns(data);
}

function updateStory(value) {
  const data = getCampaigns()
  data[currentCampaign].back.story = value
  saveCampaigns(data)
}

function updateEquipment(value) {
  const data = getCampaigns();
  data[currentCampaign].back.equipment = value;
  saveCampaigns(data);
}

function handleEquipmentList(e) {
  const textarea = e.target;
  if (e.key === "Enter") {
    e.preventDefault();
    const start = textarea.selectionStart;
    const end   = textarea.selectionEnd;
    const value = textarea.value;
    textarea.value = value.substring(0, start) + "\n- " + value.substring(end);
    textarea.selectionStart = textarea.selectionEnd = start + 3;
  }
}

// =============================================
// Delete Modal
// =============================================
let campaignToDelete = null;

function openDeleteModal(slot) {
  campaignToDelete = slot;
  document.getElementById("deleteModal").classList.add("active");
}

function closeModal() {
  campaignToDelete = null;
  document.getElementById("deleteModal").classList.remove("active");
}

function confirmDelete() {
  if (campaignToDelete !== null) {
    const data = getCampaigns();
    delete data[campaignToDelete];
    saveCampaigns(data);
  }
  closeModal();
  renderCampaigns();
}

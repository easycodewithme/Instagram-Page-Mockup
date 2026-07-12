/* judiciarygold — Instagram profile clone.
   Renders the profile from data.js and wires up all interactions. */
(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const fmt = (n) => n.toLocaleString("en-US");

  /* ---- SVG snippets ---- */
  const ICON = {
    verifiedMore: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="5" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="19" cy="12" r="1.6" fill="currentColor"/></svg>`,
    link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 15 15 9"/><path d="M11 6.5 13 4.5a4 4 0 0 1 5.6 5.6l-2 2"/><path d="M13 17.5 11 19.5a4 4 0 0 1-5.6-5.6l2-2"/></svg>`,
    addPerson: `<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6"/><path d="M18 8v6M15 11h6"/></svg>`,
    reel: `<svg viewBox="0 0 24 24"><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm5 5.5v7l6-3.5z"/></svg>`,
    carousel: `<svg viewBox="0 0 24 24"><rect x="7" y="3" width="14" height="14" rx="2.5"/><path d="M4 7v12a2 2 0 0 0 2 2h12" fill="none" stroke="currentColor" stroke-width="2"/></svg>`,
    pin: `<svg viewBox="0 0 24 24"><path d="M9 3h6l-1 5 3 3-5 1v8l-1 1-1-1v-8l-5-1 3-3z"/></svg>`,
    heart: `<svg viewBox="0 0 24 24"><path d="M12 21s-7-4.5-9-9.2C1.6 8.1 3.4 4.5 7 4.5c2 0 3.3 1.1 5 3 1.7-1.9 3-3 5-3 3.6 0 5.4 3.6 4 7.3C19 16.5 12 21 12 21z"/></svg>`,
    heartLine: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-4.5-9-9.2C1.6 8.1 3.4 4.5 7 4.5c2 0 3.3 1.1 5 3 1.7-1.9 3-3 5-3 3.6 0 5.4 3.6 4 7.3C19 16.5 12 21 12 21z"/></svg>`,
    comment: `<svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 4.5 16.8L21 21l-1.2-4.5A9 9 0 0 0 12 3z"/></svg>`,
    grid: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg>`,
    reelsTab: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 8h18M8.5 3l2 5M14.5 3l2 5"/><path d="M10 11v5l4-2.5z" fill="currentColor" stroke="none"/></svg>`,
    tagged: `<svg viewBox="0 0 24 24"><path d="M3 5h18v14H3z"/><circle cx="12" cy="10" r="2.5"/><path d="M7.5 17a4.5 4.5 0 0 1 9 0"/></svg>`,
    search: `<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg>`,
    bell: `<svg viewBox="0 0 24 24"><path d="M12 21s-7-4.5-9-9.2C1.6 8.1 3.4 4.5 7 4.5c2 0 3.3 1.1 5 3 1.7-1.9 3-3 5-3 3.6 0 5.4 3.6 4 7.3C19 16.5 12 21 12 21z"/></svg>`,
    x: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>`,
    camera: `<svg viewBox="0 0 24 24"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="4"/></svg>`,
    send: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M22 3 2 10l7 3 3 7z"/><path d="M9 13 22 3"/></svg>`,
    hl: {
      cap: `<svg viewBox="0 0 24 24"><path d="M3 9l9-4 9 4-9 4z"/><path d="M7 11v4c0 1.5 2.2 2.5 5 2.5s5-1 5-2.5v-4"/><path d="M21 9v5"/></svg>`,
      scales: `<svg viewBox="0 0 24 24"><path d="M12 3v16M6 20h12"/><path d="M6 6h12"/><path d="M6 6 3.5 12h5zM18 6l-2.5 6h5z"/></svg>`,
      medal: `<svg viewBox="0 0 24 24"><circle cx="12" cy="14" r="5"/><path d="M9 9 7 3M15 9l2-6M12 12v4M10.5 14h3"/></svg>`,
      pin: `<svg viewBox="0 0 24 24"><path d="M12 21s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>`,
      film: `<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 4v16M16 4v16M3 9h5M16 9h5M3 15h5M16 15h5"/></svg>`,
      doc: `<svg viewBox="0 0 24 24"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/></svg>`,
    },
  };

  const AVATAR_LOGO = `<svg viewBox="0 0 100 100"><path d="M28 62l22-18 22 18M28 46l22-18 22 18" fill="none" stroke="#fff6df" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

  /* Circular text avatar for the sample accounts. */
  function uAvatar(acc, cls = "") {
    const letter = (acc.n || acc.u || "?")[0].toUpperCase();
    return `<span class="uavatar ${cls}" style="--c:${acc.c || "#555"}">${esc(letter)}</span>`;
  }
  const verifiedTick = `<svg class="verified" viewBox="0 0 24 24" aria-label="Verified"><path fill="#3897f0" d="M12 2l2.4 1.8 3-.1 1 2.8 2.6 1.5-.6 3 .6 3-2.6 1.5-1 2.8-3-.1L12 22l-2.4-1.8-3 .1-1-2.8L3 16l.6-3L3 10l2.6-1.5 1-2.8 3 .1z"/><path fill="#fff" d="m10.6 15.2-2.5-2.5 1.1-1.1 1.4 1.4 3.6-3.6 1.1 1.1z"/></svg>`;

  /* ============================================================
     Layer system — generic overlays (sheets, panels, story, lists)
     ============================================================ */
  const layerStack = [];
  function openLayer(type, html, opts = {}) {
    const back = document.createElement("div");
    back.className = "layer layer-" + type + (opts.cls ? " " + opts.cls : "");
    back.innerHTML = html;
    document.body.appendChild(back);
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => back.classList.add("in"));
    const close = () => {
      if (back._closing) return;
      back._closing = true;
      const i = layerStack.indexOf(entry);
      if (i > -1) layerStack.splice(i, 1);
      back.classList.remove("in");
      setTimeout(() => { back.remove(); if (!layerStack.length && $("#modal").hidden) document.body.style.overflow = ""; }, 180);
      opts.onClose && opts.onClose();
    };
    const entry = { close, el: back };
    back.addEventListener("mousedown", (e) => { if (e.target === back) close(); });
    $$("[data-close]", back).forEach((b) => b.addEventListener("click", close));
    layerStack.push(entry);
    if (opts.setup) opts.setup(back, close);
    return entry;
  }

  const panelShell = (title, body, extra = "") => `
    <div class="panel">
      <div class="panel-head"><h2>${esc(title)}</h2>${extra}</div>
      <div class="panel-body">${body}</div>
    </div>`;

  const sheetShell = (title, body) => `
    <div class="sheet">
      <div class="sheet-head"><h2>${esc(title)}</h2><button class="sheet-x" data-close aria-label="Close">${ICON.x}</button></div>
      <div class="sheet-body">${body}</div>
    </div>`;

  /* ---- People list (followers / following / suggestions) ---- */
  const peopleFollow = {}; // username -> bool
  function personRow(acc) {
    const on = !!peopleFollow[acc.u];
    return `<div class="person">
      ${uAvatar(acc)}
      <div class="p-meta">
        <div class="p-user">${esc(acc.u)}${acc.v ? verifiedTick : ""}</div>
        <div class="p-sub">${esc(acc.n)}</div>
      </div>
      <button class="p-btn ${on ? "on" : ""}" data-follow-user="${esc(acc.u)}">${on ? "Following" : "Follow"}</button>
    </div>`;
  }
  function wirePeople(root) {
    $$("[data-follow-user]", root).forEach((b) => b.addEventListener("click", () => {
      const u = b.dataset.followUser;
      peopleFollow[u] = !peopleFollow[u];
      b.classList.toggle("on", peopleFollow[u]);
      b.textContent = peopleFollow[u] ? "Following" : "Follow";
    }));
  }
  function openPeople(title, list) {
    openLayer("sheet", sheetShell(title, `<div class="people">${list.map(personRow).join("")}</div>`), {
      setup: (root) => wirePeople(root),
    });
  }

  /* ---- Search panel ---- */
  function openSearch() {
    const recents = ACCOUNTS.slice(0, 5);
    openLayer("panel", panelShell("Search",
      `<div class="search-box"><input id="searchInput" type="search" placeholder="Search" autocomplete="off" />
        <button class="search-clear" id="searchClear" aria-label="Clear" hidden>${ICON.x}</button></div>
       <div class="panel-label"><span>Recent</span></div>
       <div class="people" id="searchResults">${recents.map(personRow).join("")}</div>`,
      `<button class="panel-x" data-close aria-label="Close">${ICON.x}</button>`), {
      cls: "from-left",
      setup: (root, close) => {
        wirePeople(root);
        const input = $("#searchInput", root), clear = $("#searchClear", root), res = $("#searchResults", root);
        const label = $(".panel-label span", root);
        input.focus();
        input.addEventListener("input", () => {
          const q = input.value.trim().toLowerCase();
          clear.hidden = !q;
          const list = q ? ACCOUNTS.filter((a) => (a.u + a.n).toLowerCase().includes(q)) : ACCOUNTS.slice(0, 5);
          label.textContent = q ? (list.length ? "Results" : "No results found") : "Recent";
          res.innerHTML = list.map(personRow).join("");
          wirePeople(res);
        });
        clear.addEventListener("click", () => { input.value = ""; input.dispatchEvent(new Event("input")); input.focus(); });
      },
    });
  }

  /* ---- Notifications panel ---- */
  function notifRow(n) {
    const acc = ACCOUNTS.find((a) => a.u === n.u) || { u: n.u, c: "#555", n: n.u };
    return `<div class="notif">
      ${uAvatar(acc)}
      <div class="n-text"><b>${esc(n.u)}</b> ${esc(n.text)} <span class="n-time">${esc(n.time)}</span></div>
    </div>`;
  }
  function openNotifications() {
    document.querySelector('[data-tip="Notifications"]')?.classList.remove("has-dot");
    openLayer("panel", panelShell("Notifications",
      `<div class="panel-label"><span>This week</span></div>
       <div class="notifs">${NOTIFICATIONS.map(notifRow).join("")}</div>`,
      `<button class="panel-x" data-close aria-label="Close">${ICON.x}</button>`),
      { cls: "from-left" });
  }

  /* ---- Messages panel ---- */
  function openMessages() {
    const list = ACCOUNTS.slice(0, 6).map((a, i) => `
      <button class="thread" data-user="${esc(a.u)}">
        ${uAvatar(a)}
        <div class="t-meta"><div class="t-user">${esc(a.u)}</div>
        <div class="t-last">${["Active now", "Sent you a reel · 2h", "Typing…", "Seen 1d ago", "You: thanks! · 3d", "Active 5m ago"][i]}</div></div>
      </button>`).join("");
    openLayer("panel", panelShell("judiciarygold",
      `<div class="panel-label"><span>Messages</span><button class="link-btn" id="msgReq">Requests</button></div>
       <div class="threads">${list}</div>`,
      `<button class="panel-x" data-close aria-label="Close">${ICON.x}</button>`),
      { cls: "from-left", setup: (root, close) => {
        $$(".thread", root).forEach((t) => t.addEventListener("click", () => { close(); openComposer(t.dataset.user); }));
        $("#msgReq", root)?.addEventListener("click", () => toast("No message requests"));
      } });
  }

  /* ---- Create dialog ---- */
  function openCreate() {
    openLayer("sheet", sheetShell("Create new post",
      `<div class="create-drop">
        <div class="create-ill">${ICON.camera}</div>
        <p>Drag photos and videos here</p>
        <button class="btn btn-follow create-select" id="createSelect">Select from computer</button>
      </div>`), {
      cls: "narrow",
      setup: (root, close) => $("#createSelect", root).addEventListener("click", () => { close(); toast("Uploading isn't available in this demo"); }),
    });
  }

  /* ---- Options sheet (username ⋯ and post ⋯) ---- */
  function openOptions() {
    const items = [
      { t: "Report", danger: true }, { t: "Block", danger: true },
      { t: "About this account" }, { t: "Copy profile URL", act: "copy" },
      { t: "Share to…" }, { t: "Cancel", cancel: true },
    ];
    openLayer("sheet", `<div class="opt-sheet">${items.map((it, i) =>
      `<button class="opt ${it.danger ? "danger" : ""} ${it.cancel ? "cancel" : ""}" data-i="${i}">${esc(it.t)}</button>`).join("")}</div>`,
      { cls: "narrow opts", setup: (root, close) => {
        $$(".opt", root).forEach((b) => b.addEventListener("click", () => {
          const it = items[b.dataset.i]; close();
          if (it.cancel) return;
          if (it.act === "copy") copyLink("Profile URL copied to clipboard");
          else toast(`“${it.t}” isn't available in this demo`);
        }));
      } });
  }

  /* ============================================================
     Story viewer
     ============================================================ */
  function openStory(index) {
    let cur = index;
    let timer = null;
    const buildSlide = (i) => {
      const h = HIGHLIGHTS[i];
      const themes = ["portrait-warm", "law-dark", "webinar", "maroon", "navy-arc", "teal"];
      return { h, theme: themes[i % themes.length] };
    };
    const layer = openLayer("story", `
      <button class="modal-close story-x" data-close aria-label="Close">&times;</button>
      <button class="story-nav prev" id="storyPrev" aria-label="Previous">&#8249;</button>
      <div class="story-card" id="storyCard"></div>
      <button class="story-nav next" id="storyNext" aria-label="Next">&#8250;</button>
    `, { onClose: () => clearTimeout(timer) });

    const card = $("#storyCard", layer.el);
    function render() {
      const { h, theme } = buildSlide(cur);
      card.innerHTML = `
        <div class="story-bars">${HIGHLIGHTS.map((_, i) =>
          `<span class="sbar ${i < cur ? "done" : ""} ${i === cur ? "active" : ""}"><i></i></span>`).join("")}</div>
        <div class="story-head">
          <span class="story-cover">${ICON.hl[h.icon]}</span>
          <span class="story-title">${esc(h.label.replace(/…$/, ""))}</span>
          <span class="story-ago">now</span>
        </div>
        <div class="story-slide bg-${theme}">
          <span class="story-glyph">${ICON.hl[h.icon]}</span>
          <div class="story-cap">${esc(h.label.replace(/…$/, ""))}</div>
        </div>
        <div class="story-reply"><input placeholder="Reply to judiciarygold…" aria-label="Reply" />
          <button aria-label="Like">${ICON.heartLine}</button></div>`;
      const activeBar = card.querySelector(".sbar.active i");
      if (activeBar) { activeBar.style.animation = "none"; void activeBar.offsetWidth; activeBar.style.animation = "sfill 4s linear forwards"; }
      clearTimeout(timer);
      timer = setTimeout(next, 4000);
    }
    function next() { if (cur < HIGHLIGHTS.length - 1) { cur++; render(); } else layer.close(); }
    function prev() { if (cur > 0) { cur--; render(); } }
    $("#storyNext", layer.el).addEventListener("click", next);
    $("#storyPrev", layer.el).addEventListener("click", prev);
    layer.el._story = { next, prev };
    render();
  }

  /* ============================================================
     Profile header
     ============================================================ */
  function renderProfile() {
    const p = PROFILE;
    $("#profile").innerHTML = `
      <div class="profile-top">
        <div class="avatar-wrap">
          <button class="avatar-ring" id="avatarStory" aria-label="View story"><div class="avatar">${AVATAR_LOGO}</div></button>
        </div>
        <div class="profile-info">
          <div class="uname-row">
            <span class="uname">${esc(p.username)}</span>
            <button class="uname-more" id="unameMore" aria-label="Options">${ICON.verifiedMore}</button>
          </div>
          <div class="full-name">${esc(p.fullName)}</div>
          <div class="stats">
            <span class="n"><b>${esc(p.posts)}</b> posts</span>
            <button class="n stat-btn" id="statFollowers"><b>${esc(p.followers)}</b> followers</button>
            <button class="n stat-btn" id="statFollowing"><b>${esc(p.following)}</b> following</button>
          </div>
          <div class="category">${esc(p.category)}</div>
          <div class="bio" id="bio">
            ${p.bio.map((l) => esc(l)).join("<br>")}
            <button class="fade more-btn" id="bioMore">more</button>
          </div>
          <a class="bio-link" href="#" onclick="return false;">
            ${ICON.link}${esc(p.link)} <span class="more">${esc(p.linkMore)}</span>
          </a>
        </div>
      </div>
      <div class="cta-row">
        <button class="btn btn-follow" id="followBtn">Follow</button>
        <button class="btn btn-msg" id="msgBtn">Message</button>
        <button class="btn btn-icon" id="suggestBtn" aria-label="Similar accounts">${ICON.addPerson}</button>
      </div>`;

    $("#followBtn").addEventListener("click", toggleFollow);
    $("#msgBtn").addEventListener("click", () => openComposer(PROFILE.username));
    $("#suggestBtn").addEventListener("click", () => openPeople("Suggested for you", ACCOUNTS.slice(2)));
    $("#statFollowers").addEventListener("click", () => openPeople("Followers", ACCOUNTS));
    $("#statFollowing").addEventListener("click", () => openPeople("Following", ACCOUNTS.slice(0, 6)));
    $("#avatarStory").addEventListener("click", () => openStory(0));
    $("#unameMore").addEventListener("click", openOptions);
    $("#bioMore").addEventListener("click", () => {
      const bio = $("#bio");
      bio.innerHTML = PROFILE.bio.map((l) => esc(l)).join("<br>") +
        "<br>📍 7+ offline centres across India<br>🎯 BPSC-J · RJS · HJS · MPCJ · UPPSCJ & more<br>👉 Link in bio to start free";
    });
  }

  /* ---- Follow state (header + modal) ---- */
  let following = false;
  function toggleFollow() {
    following = !following;
    syncFollow();
    toast(following ? "Following judiciarygold" : "Unfollowed judiciarygold");
  }
  function syncFollow() {
    const b = $("#followBtn");
    if (b) { b.textContent = following ? "Following" : "Follow"; b.classList.toggle("following", following); }
    const m = $("#modalFollow");
    if (m && !m.hidden) { m.textContent = following ? "Following" : "Follow"; m.classList.toggle("following", following); }
  }

  /* ---- Highlights ---- */
  function renderHighlights() {
    $("#highlights").innerHTML = HIGHLIGHTS.map((h) => `
      <button class="hl" type="button">
        <span class="hl-cover">${ICON.hl[h.icon]}</span>
        <span class="hl-label">${esc(h.label)}</span>
      </button>`).join("");
    $$(".hl", $("#highlights")).forEach((el, i) => el.addEventListener("click", () => openStory(i)));
  }

  /* ---- Tabs ---- */
  const TABS = [
    { key: "posts", label: "Posts", icon: ICON.grid },
    { key: "reels", label: "Reels", icon: ICON.reelsTab },
    { key: "tagged", label: "Tagged", icon: ICON.tagged },
  ];
  let activeTab = "posts";
  function renderTabs() {
    $("#tabs").innerHTML = TABS.map((t) => `
      <button class="tab ${t.key === activeTab ? "active" : ""}" data-tab="${t.key}">
        ${t.icon}<span>${t.label}</span>
      </button>`).join("");
    $$(".tab", $("#tabs")).forEach((el) =>
      el.addEventListener("click", () => { activeTab = el.dataset.tab; renderTabs(); renderGrid(); }));
  }

  /* ---- Post tile markup ---- */
  function tileMarkup(t) {
    if (t.theme === "result") {
      return `<div class="tile t-result">
        <div class="rbar"><b>${esc(t.title)}</b> ${esc(t.brand)}</div>
        <div class="rhead">RESULTS</div>
        <div class="rrows">${t.rows.map((r) => `<div class="rrow">${esc(r)}</div>`).join("")}</div>
        <div class="rfoot">${esc(t.foot)}</div>
      </div>`;
    }
    const parts = [];
    if (t.top) parts.push(`<div class="top">${esc(t.top)}</div>`);
    if (t.me) parts.push(`<div class="me">${esc(t.me)}</div>`);
    if (t.hand) parts.push(`<div class="hand">${esc(t.hand)}</div>`);
    if (t.counter) parts.push(`<div class="counter">${esc(t.counter)}</div>`);

    const center = [];
    if (t.small) center.push(`<div class="small">${esc(t.small)}</div>`);
    if (t.serif) center.push(`<div class="serif">${esc(t.serif)}</div>`);
    if (t.sub) center.push(`<div class="sub">${esc(t.sub)}</div>`);
    if (t.big) center.push(`<div class="big">${esc(t.big)}</div>`);
    if (t.accent) center.push(`<div class="accent">${esc(t.accent)}</div>`);
    if (t.tag) center.push(`<div><span class="tag">${esc(t.tag)}</span></div>`);
    if (t.when) center.push(`<div class="when">${esc(t.when)}</div>`);
    if (center.length) parts.push(`<div class="center">${center.join("")}</div>`);

    const foot = [];
    if (t.label) foot.push(`<div class="label">${esc(t.label)}</div>`);
    if (t.labelBig) foot.push(`<div class="foot-big">${esc(t.labelBig)}</div>`);
    if (t.tab) foot.push(`<div class="tab-note">${esc(t.tab)}</div>`);
    if (t.foot) foot.push(`<div class="foot-sm">${esc(t.foot)}</div>`);
    if (t.footBig) foot.push(`<div class="foot-big">${esc(t.footBig)}</div>`);
    if (t.footSub) foot.push(`<div class="foot-sm">${esc(t.footSub)}</div>`);
    if (t.ep) foot.push(`<div><span class="ep">${esc(t.ep)}</span></div>`);
    if (t.name) foot.push(`<div class="name">${esc(t.name)}</div>`);
    foot.forEach((f) => parts.push(f));

    return `<div class="tile t-text bg-${t.theme}">${parts.join("")}</div>`;
  }

  /* ---- Grid ---- */
  let visibleList = [];
  function renderGrid() {
    const grid = $("#grid");
    if (activeTab === "tagged") {
      grid.innerHTML = emptyState("camera", "Photos of you", "When people tag you in photos, they'll appear here.");
      visibleList = [];
      return;
    }
    let list = POSTS;
    if (activeTab === "reels") list = POSTS.filter((p) => p.type === "reel");
    visibleList = list;
    if (!list.length) { grid.innerHTML = emptyState("reelsTab", "No reels yet", "Reels you share will show up here."); return; }

    grid.innerHTML = list.map((p) => {
      const corner = p.type === "reel" ? ICON.reel : p.type === "carousel" ? ICON.carousel : "";
      return `<button class="cell" data-id="${p.id}" aria-label="Open post">
        ${tileMarkup(p.tile)}
        ${p.pinned && activeTab === "posts" ? `<span class="cell-pin">${ICON.pin}</span>` : ""}
        ${corner ? `<span class="cell-corner">${corner}</span>` : ""}
        <span class="cell-over">
          <span>${ICON.heart}${fmt(state(p).likes)}</span>
          <span>${ICON.comment}${fmt(state(p).comments.length)}</span>
        </span>
      </button>`;
    }).join("");
    $$(".cell", grid).forEach((el) => el.addEventListener("click", () => openModal(Number(el.dataset.id))));
  }

  function emptyState(icon, title, sub) {
    return `<div class="empty-state">
      <div class="es-icon">${ICON[icon] || ICON.camera}</div>
      <h2>${esc(title)}</h2><p>${esc(sub)}</p></div>`;
  }

  /* ============================================================
     Post state + modal
     ============================================================ */
  const postState = {}; // id -> {liked, saved, likes, comments:[{u,t,likes,liked}]}
  function state(p) {
    if (!postState[p.id]) {
      const base = p.likes || Math.round((p.plays ? 4200 : 5200));
      const n = 2 + (p.id % 3);
      const comments = [];
      for (let i = 0; i < n; i++) {
        const c = COMMENT_POOL[(p.id + i) % COMMENT_POOL.length];
        comments.push({ u: c.u, t: c.t, likes: c.likes, liked: false });
      }
      postState[p.id] = { liked: false, saved: false, likes: base, comments };
    }
    return postState[p.id];
  }

  const modal = $("#modal");
  let current = null;

  function openModal(id) {
    const p = POSTS.find((x) => x.id === id);
    if (!p) return;
    current = p;
    const st = state(p);

    $("#modalMedia").innerHTML = tileMarkup(p.tile) + `<div class="dbl-heart" id="dblHeart">${ICON.heart}</div>`;
    renderModalBody();
    $("#modalWhen").textContent = (p.plays ? p.plays + " plays · " : "") + "2 days ago";
    updateLikeUI(); updateSaveUI(); syncFollow();

    // nav availability
    const idx = visibleList.findIndex((x) => x.id === id);
    $("#modalPrev").style.visibility = idx > 0 ? "visible" : "hidden";
    $("#modalNext").style.visibility = idx > -1 && idx < visibleList.length - 1 ? "visible" : "hidden";

    modal.hidden = false;
    document.body.style.overflow = "hidden";
    $("#modalClose").focus();
  }

  function renderModalBody() {
    const p = current, st = state(p);
    const comments = st.comments.map((c, i) => {
      const acc = ACCOUNTS.find((a) => a.u === c.u) || { u: c.u, c: "#555", n: c.u };
      return `<div class="cmt">
        ${uAvatar(acc, "sm")}
        <div class="cmt-body"><div><span class="cmt-user">${esc(c.u)}</span> ${esc(c.t)}</div>
          <div class="cmt-meta">${fmt(c.likes)} likes · <button class="cmt-reply">Reply</button></div></div>
        <button class="cmt-like ${c.liked ? "liked" : ""}" data-c="${i}" aria-label="Like comment">${ICON.heartLine}</button>
      </div>`;
    }).join("");
    $("#modalBody").innerHTML = `
      <div class="cap">
        ${uAvatar({ n: "J", c: "#8a6d1f" }, "sm")}
        <div class="cap-body"><span class="cap-user">judiciarygold</span> ${esc(p.caption)}
          <div class="cap-line">${p.type === "reel" ? "Reel" : p.type === "carousel" ? "Carousel" : "Post"}</div></div>
      </div>
      <div class="comments">${comments}</div>`;
    $$(".cmt-like", $("#modalBody")).forEach((b) => b.addEventListener("click", () => {
      const c = st.comments[b.dataset.c];
      c.liked = !c.liked; c.likes += c.liked ? 1 : -1;
      renderModalBody();
    }));
  }

  function updateLikeUI() {
    const st = state(current);
    $("#modalLike").classList.toggle("liked", st.liked);
    $("#modalLikes").textContent = fmt(st.likes) + " likes";
  }
  function updateSaveUI() { $("#modalSave").classList.toggle("saved", state(current).saved); }

  function toggleLike(force) {
    const st = state(current);
    const wasLiked = st.liked;
    st.liked = force === undefined ? !st.liked : force;
    if (st.liked !== wasLiked) st.likes += st.liked ? 1 : -1;
    updateLikeUI();
  }

  function closeModal() {
    modal.hidden = true;
    if (!layerStack.length) document.body.style.overflow = "";
    current = null;
    renderGrid(); // reflect like/comment count changes on tiles
  }
  function navModal(dir) {
    if (!current) return;
    const idx = visibleList.findIndex((x) => x.id === current.id);
    const nxt = visibleList[idx + dir];
    if (nxt) openModal(nxt.id);
  }

  // modal wiring
  $("#modalLike").addEventListener("click", () => toggleLike());
  $("#modalSave").addEventListener("click", () => { const st = state(current); st.saved = !st.saved; updateSaveUI(); toast(st.saved ? "Saved" : "Removed from saved"); });
  $("#modalShare").addEventListener("click", () => copyLink("Post link copied to clipboard"));
  $("#modalFollow").addEventListener("click", toggleFollow);
  $("#modalMore").addEventListener("click", openOptions);
  $("#modalClose").addEventListener("click", closeModal);
  $("#modalPrev").addEventListener("click", () => navModal(-1));
  $("#modalNext").addEventListener("click", () => navModal(1));
  $("#modalCommentFocus").addEventListener("click", () => $("#commentInput").focus());
  modal.addEventListener("mousedown", (e) => { if (e.target === modal) closeModal(); });

  // double-click / double-tap to like
  let lastTap = 0;
  $("#modalMedia").addEventListener("dblclick", flyHeart);
  $("#modalMedia").addEventListener("click", (e) => {
    const now = Date.now();
    if (now - lastTap < 300) flyHeart();
    lastTap = now;
  });
  function flyHeart() {
    toggleLike(true);
    const h = $("#dblHeart");
    if (h) { h.classList.remove("pop"); void h.offsetWidth; h.classList.add("pop"); }
  }

  // comment box
  const cInput = $("#commentInput"), cPost = $("#commentPost");
  cInput.addEventListener("input", () => { cPost.disabled = !cInput.value.trim(); });
  function postComment() {
    const val = cInput.value.trim();
    if (!val || !current) return;
    state(current).comments.push({ u: "you", t: val, likes: 0, liked: false });
    cInput.value = ""; cPost.disabled = true;
    renderModalBody();
    $(".comments", $("#modalBody")).scrollTop = 1e6;
    toast("Comment added");
  }
  cPost.addEventListener("click", postComment);
  cInput.addEventListener("keydown", (e) => { if (e.key === "Enter" && cInput.value.trim()) postComment(); });

  /* ---- keyboard ---- */
  document.addEventListener("keydown", (e) => {
    if (layerStack.length) {
      const top = layerStack[layerStack.length - 1];
      if (e.key === "Escape") top.close();
      else if (top.el.classList.contains("layer-story")) {
        if (e.key === "ArrowRight") top.el._story?.next();
        if (e.key === "ArrowLeft") top.el._story?.prev();
      }
      return;
    }
    if (!modal.hidden) {
      if (e.key === "Escape") closeModal();
      else if (e.key === "ArrowRight" && document.activeElement !== cInput) navModal(1);
      else if (e.key === "ArrowLeft" && document.activeElement !== cInput) navModal(-1);
    }
  });

  /* ---- Message composer ---- */
  function openComposer(user) {
    const acc = ACCOUNTS.find((a) => a.u === user) || { u: user, n: PROFILE.fullName, c: "#8a6d1f" };
    openLayer("sheet", `
      <div class="composer">
        <div class="comp-head">${uAvatar(acc)}<div><div class="comp-user">${esc(acc.u)}</div><div class="comp-sub">Instagram</div></div>
          <button class="sheet-x" data-close aria-label="Close">${ICON.x}</button></div>
        <div class="comp-thread" id="compThread"><div class="comp-empty">No messages yet. Say hi 👋</div></div>
        <div class="comp-input"><input id="compText" placeholder="Message…" aria-label="Message" />
          <button id="compSend" disabled>Send</button></div>
      </div>`, { cls: "narrow", setup: (root) => {
        const text = $("#compText", root), send = $("#compSend", root), thread = $("#compThread", root);
        text.focus();
        text.addEventListener("input", () => { send.disabled = !text.value.trim(); });
        function fire() {
          const v = text.value.trim(); if (!v) return;
          const empty = thread.querySelector(".comp-empty"); if (empty) empty.remove();
          const b = document.createElement("div"); b.className = "bubble me"; b.textContent = v; thread.appendChild(b);
          text.value = ""; send.disabled = true; thread.scrollTop = 1e6;
          setTimeout(() => {
            const r = document.createElement("div"); r.className = "bubble them";
            r.textContent = "Thanks for reaching out! Our team will reply soon 🙌";
            thread.appendChild(r); thread.scrollTop = 1e6;
          }, 700);
        }
        send.addEventListener("click", fire);
        text.addEventListener("keydown", (e) => { if (e.key === "Enter" && text.value.trim()) fire(); });
      } });
  }

  /* ---- Sidebar wiring ---- */
  function wireSidebar() {
    const byTip = (t) => document.querySelector(`.side-btn[data-tip="${t}"]`);
    byTip("Search")?.addEventListener("click", openSearch);
    byTip("Notifications")?.addEventListener("click", openNotifications);
    byTip("Messages")?.addEventListener("click", openMessages);
    byTip("Create")?.addEventListener("click", openCreate);
    byTip("Profile")?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    byTip("Home")?.addEventListener("click", () => { window.scrollTo({ top: 0, behavior: "smooth" }); toast("You're all caught up ✨"); });
    byTip("Reels")?.addEventListener("click", () => { activeTab = "reels"; renderTabs(); renderGrid(); document.getElementById("tabs").scrollIntoView({ behavior: "smooth", block: "start" }); });
    byTip("Menu")?.addEventListener("click", openOptions);
    byTip("Dashboard")?.addEventListener("click", () => toast("Professional dashboard isn't available in this demo"));
  }

  /* ---- helpers ---- */
  function copyLink(msg) {
    const url = "https://instagram.com/judiciarygold";
    if (navigator.clipboard) navigator.clipboard.writeText(url).then(() => toast(msg)).catch(() => toast(msg));
    else toast(msg);
  }
  let toastTimer;
  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg; el.hidden = false;
    requestAnimationFrame(() => el.classList.add("show"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.classList.remove("show"); setTimeout(() => { el.hidden = true; }, 220); }, 1900);
  }

  /* ---- Init ---- */
  renderProfile();
  renderHighlights();
  renderTabs();
  renderGrid();
  wireSidebar();
})();

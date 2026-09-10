(function () {
  "use strict";

  const nodes = [...document.querySelectorAll("[data-game-leaderboard]")];
  const client = window.gameAuth && window.gameAuth.client;
  const difficultyName = { low: "低速", normal: "中速", high: "高速" };

  if (!nodes.length) return;

  const style = document.createElement("style");
  style.textContent = `
    .desktop-game-leaderboard { padding: 16px; border: 1px solid var(--line, rgba(244, 243, 238, .13)); border-radius: 8px; background: var(--surface, #131922); }
    .game-leaderboard-head { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; padding-bottom: 12px; border-bottom: 1px solid var(--line, rgba(244, 243, 238, .13)); }
    .game-leaderboard-title { margin: 0; font-size: 14px; }
    .game-leaderboard-scope { color: var(--muted, #a9b0bc); font: 700 10px ui-monospace, SFMono-Regular, Consolas, monospace; }
    .game-leaderboard-list { display: grid; gap: 10px; margin: 14px 0 0; padding: 0; list-style: none; }
    .game-leaderboard-row { display: grid; grid-template-columns: 22px minmax(0, 1fr) auto; gap: 8px; align-items: center; min-width: 0; }
    .game-leaderboard-rank { color: var(--lime, #c8ff5f); font: 800 10px ui-monospace, SFMono-Regular, Consolas, monospace; }
    .game-leaderboard-player { min-width: 0; overflow: hidden; color: var(--muted, #a9b0bc); font-size: 12px; text-overflow: ellipsis; white-space: nowrap; }
    .game-leaderboard-score { color: var(--ink, #f4f3ee); font: 800 12px ui-monospace, SFMono-Regular, Consolas, monospace; }
    .game-leaderboard-empty { margin: 14px 0 0; color: var(--muted, #a9b0bc); font-size: 12px; line-height: 1.5; }
    .game-leaderboard-status { display: block; min-height: 16px; margin-top: 13px; color: var(--muted, #a9b0bc); font-size: 10px; }
    @media (max-width: 790px) { .desktop-game-leaderboard { display: none; } }
  `;
  document.head.append(style);

  function createElement(name, className, text) {
    const element = document.createElement(name);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function prepare(node) {
    const title = node.dataset.gameTitle || "排行榜";
    const heading = createElement("div", "game-leaderboard-head");
    const titleElement = createElement("h2", "game-leaderboard-title", `${title} 排行榜`);
    const scope = createElement("span", "game-leaderboard-scope");
    const list = createElement("ol", "game-leaderboard-list");
    const status = createElement("span", "game-leaderboard-status", "正在读取...");
    heading.append(titleElement, scope);
    node.replaceChildren(heading, list, status);
    return { scope, list, status };
  }

  const views = new Map(nodes.map(node => [node, prepare(node)]));

  function renderEmpty(view, message, statusText) {
    view.list.replaceChildren(createElement("li", "game-leaderboard-empty", message));
    view.status.textContent = statusText;
  }

  async function load(node) {
    const view = views.get(node);
    const game = node.dataset.gameLeaderboard;
    const difficulty = node.dataset.gameDifficulty || "normal";
    const reaction = game === "reaction";
    view.scope.textContent = reaction ? "越低越快" : difficultyName[difficulty] || "普通";

    if (!client) {
      renderEmpty(view, "排行榜服务未加载", "暂不可用");
      return;
    }

    const { data, error } = await client
      .from("game_scores")
      .select("user_id, high_score, updated_at")
      .eq("game_slug", game)
      .eq("difficulty", difficulty)
      .order("high_score", { ascending: reaction })
      .order("updated_at", { ascending: true })
      .limit(5);

    if (error) {
      renderEmpty(view, "排行榜暂时不可用", "请稍后重试");
      return;
    }

    const rows = data || [];
    const ids = rows.map(row => row.user_id);
    let profiles = [];
    let currentUserId = null;
    const [{ data: profileData }, { data: sessionData }] = await Promise.all([
      ids.length ? client.from("player_profiles").select("user_id, username, nickname").in("user_id", ids) : Promise.resolve({ data: [] }),
      client.auth.getSession()
    ]);
    profiles = profileData || [];
    currentUserId = sessionData && sessionData.session && sessionData.session.user ? sessionData.session.user.id : null;
    const profileMap = new Map(profiles.map(profile => [profile.user_id, profile]));

    view.list.replaceChildren();
    if (!rows.length) {
      renderEmpty(view, "还没有分数", "等待第一位玩家");
      return;
    }

    rows.forEach((row, index) => {
      const profile = profileMap.get(row.user_id);
      const item = createElement("li", "game-leaderboard-row");
      const rank = createElement("span", "game-leaderboard-rank", String(index + 1).padStart(2, "0"));
      const player = createElement("span", "game-leaderboard-player", currentUserId === row.user_id ? "你" : (profile && (profile.nickname || profile.username)) || "玩家");
      const scoreText = reaction ? `${Number(row.high_score || 0)} ms` : Number(row.high_score || 0).toLocaleString("zh-CN");
      const score = createElement("span", "game-leaderboard-score", scoreText);
      item.append(rank, player, score);
      view.list.append(item);
    });
    view.status.textContent = `前 ${rows.length} 名`;
  }

  function refresh() {
    nodes.forEach(node => { void load(node); });
  }

  window.gameLeaderboard = { refresh };
  window.addEventListener("gameleaderboard:refresh", refresh);
  refresh();
})();

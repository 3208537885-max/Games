(function () {
  "use strict";

  const client = window.gameAuth && window.gameAuth.client;

  async function recordCompletion(gameSlug) {
    if (!client) return;
    const { data: sessionData } = await client.auth.getSession();
    if (!sessionData.session) return;
    const { error } = await client.rpc("record_game_completion", { p_game_slug: gameSlug });
    if (error) console.warn("Completion sync failed:", error.message);
  }

  window.gameProgress = { recordCompletion };
})();

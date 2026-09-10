(function () {
  "use strict";

  const projectUrl = "https://rpgydhjxtcivnexvuifu.supabase.co";
  const publishableKey = "sb_publishable_yJPWfwhxkj5tp0WnBJLtGQ_Sk31Y4Sy";

  if (!window.supabase || typeof window.supabase.createClient !== "function") {
    window.gameAuth = { client: null, available: false };
    return;
  }

  window.gameAuth = {
    client: window.supabase.createClient(projectUrl, publishableKey),
    available: true
  };
})();

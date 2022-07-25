// IDS
const ID_VIDEO = "VIDEO"
const ID_CONTAINER_INTERACTIVE = "CONTAINER"

var hls,
  interactiveApp,
  videoElement;

const channelId = "c9c2ebfb-2887-4de6-aec4-0a30aa848915"

const SOURCE_URL = "https://dev-livestream.gviet.vn/manifest/VTV3-PACKAGE/master.m3u8";

async function getUserToken(body) {
  const res = await fetch("https://dev-livestream.gviet.vn/api/interactive/v1/users/gen-token", {
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWQiOiJhZG1pbiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NDEzNTYyNTl9.WBRTuqhjBvzHTWCSorkVWeGeRcDFZUHzkGekDGtuZqg",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
    method: "POST",
  })

  const { token } = await res.json();
  return token
}

// Khởi tạo tương tác
async function initInteractive() {
  let token = undefined
  token = await getUserToken({
    id: "0966888666",
    role: "user",
    appId: "default-app",
    userData: {
      id: "0966888666",
      role: "user",
      platform: "web"
    },
  })

  const config = {
    appId: "default-app",
    channelId: channelId,
    token: token,
    overlay: {
      hls: hls,
      containerId: ID_CONTAINER_INTERACTIVE,
    },
    panel: {
      containerId: ID_CONTAINER_INTERACTIVE,
    },
  };

  interactiveApp = SigmaInteractive.initApp(config);

  // define actions based on app events
  interactiveApp.$on("INTERACTIVE_READY", () => {
  });

  interactiveApp.$on('INTERACTIVE_SHOW', () => {
    const containerElement = document.getElementById(ID_CONTAINER)
    containerElement.style['z-index'] = 999;
  });

  interactiveApp.$on('INTERACTIVE_HIDE', () => {
    const containerElement = document.getElementById(ID_CONTAINER)
    containerElement.style['z-index'] = 0;
  });

  interactiveApp.$on("INTERACTIVE_CONNECTION_ERROR", () => {
  });

  // handle initialize error (like token expired)
  // we can recall initiApp function with new config(token)
  interactiveApp.$on("FULL_RELOAD", () => {
    // create new token and recall initApp function
    const newToken = token
    const newConfig = {
      appId: "default-app",
      channelId: channelId,
      token: newToken,
      overlay: {
        hls: hls,
        containerId: ID_CONTAINER_INTERACTIVE,
      },
      panel: {
        containerId: ID_CONTAINER_INTERACTIVE,
      },
    }
    interactiveSdk = SigmaInteractive.initApp(newConfig);
  });
}

// Khởi tạo hls player
function initSigmaInteractivePlayer() {
  videoElement = document.getElementById(ID_VIDEO);
  if (!Hls || !Hls.isSupported() || !videoElement) return;
  if (hls) {
    hls.destroy();
    hls = undefined;
  }
  hls = new Hls({ enableWorker: true, debug: false });
  hls.attachMedia(videoElement);
  hls.on(Hls.Events.MEDIA_ATTACHED, function () {
    hls.loadSource(SOURCE_URL);

    hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
      initInteractive();
    });
  });
};


window.onload = function () {
  initSigmaInteractivePlayer();
};

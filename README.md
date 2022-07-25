# Sigma Interactive Web 3.0.0

## **Introduction**

> The Sigma Interactive Demo for Web platform, which support latest HLS.js player.
*This demo is for SDK version 3.0.0*
>

## **Usage**

### 1. **Installation**

- add SDK script tag to your document head.

```html
<head>
  <!-- other head tags -->
	<script src="https://resource-ott.gviet.vn/sdk/3.0.0/sigma-interactive-js.js"></script>
</head>
```

- The **window.SigmaInteractive** can be accessed when the page has completely loaded

```jsx
window.onload = function () {
  console.log(**SigmaInteractive) // SigmaInteractive instance**
};

```

### 2. Create container

Provide a html container to display interactive app. ***Usually, you should make the container size to match the video player's size.***

```html
<div style="position: relative; aspect-ratio: 16/9; outline-style: solid; outline-color: rgba(192,132,252,1);">
  <video
		id="VIDEO"
		style="height: 100%; width: 100%; display: block;" autoplay muted>
	</video>
  <div
    id="CONTAINER"
    style="inset: 0; position: absolute; width: 100%; height: 100%;"
  />
</div>
```

### 3. Initialize Interactive App

 The interactive app should be initiated after the HLS **MANIFEST_PARSED** event.

```jsx
hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
  **initInteractive**();
});
```

Init interactive app with your configs. (please check the type definition)

```tsx
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

const interactiveApp = SigmaInteractive.initApp(config)
```

**Config:**

```tsx
interface InteractiveConfig {
  appId: string // appId provide by Sigma team
  channelId: string // the channelId - related to panel config
  **token**?: string. // contain information of user, undefined as guest
	// enable overlay
  overlay: false | {
    containerId: string // id of Container element | e.g: "CONTAINER"
    hls: HLS // Hls Instance
  }
	// enable panel
  panel: false | {
    containerId: string // can be same as overlay.containerId
  }
}
```

### **4. Listen to Interactive Events**

```tsx
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
```

### 5. Expose methods

**Static** methods

```tsx
// initialize app
SigmaInteractive.initApp(config)

// get current app instance === interactiveApp
SigmaInteractive.getInstance()

// clean up current app
SigmaInteractive.clear()

```

**Instance** method

```tsx
// listen on app event
interactiveApp.$on()
// $destroy app instance
interactiveApp.$destroy()

// open Interactive Panel
interactiveApp.openPanel()
```

# Overlay and Panel

You can define your own usage for **Overlay** and **Panel** with the **on/off** options and container for each in the **config from Step 3.**

Example:

- Use both and in the same **Container**

    ![Untitled](Sigma%20Interactive%20Web%203%200%200%204bbf4f7140fa48a983b10124adc4fb98/Untitled.png)


```tsx

const config = {
  // ... other config
  overlay: {
    hls: hls,
    containerId: ID_CONTAINER_INTERACTIVE,
  },
  panel: {
    containerId: ID_CONTAINER_INTERACTIVE,
  },
};
```

- Use both and in difference **Container**

    ![Untitled](Sigma%20Interactive%20Web%203%200%200%204bbf4f7140fa48a983b10124adc4fb98/Untitled%201.png)


```tsx

const config = {
  // ... other config
  overlay: {
    hls: hls,
    containerId: ID_OVERLAY_CONTAINER_INTERACTIVE,
  },
  panel: {
    containerId: ID_PANEL_CONTAINER_INTERACTIVE,
  },
};
```

# Preview Demo

Clone the repo.

Install packages

```tsx
npm install
```

Start demo

```tsx
npm run dev
```

One container demo [http://127.0.0.1:5173/](http://127.0.0.1:5173/)

Two container demo: [http://127.0.0.1:5173/two-container/](http://127.0.0.1:5173/two-container/)

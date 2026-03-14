export async function checkForUpdate() {

  try {
    const res = await fetch("/version.json?t=" + Date.now());
    const data = await res.json();

    const current = localStorage.getItem("harinos_version");

    if (!current) {
      localStorage.setItem("harinos_version", data.version);
      return;
    }

    if (current !== data.version) {
      showUpdateButton(data.version);
    }

  } catch (err) {
    console.log("Update check failed");
  }
}

function showUpdateButton(newVersion) {

  if (document.getElementById("updateAppBtn")) return;

  const btn = document.createElement("button");

  btn.id = "updateAppBtn";
  btn.innerText = "🔄 UPDATE APP";

  btn.style.position = "fixed";
  btn.style.bottom = "25px";
  btn.style.left = "50%";
  btn.style.transform = "translateX(-50%)";
  btn.style.padding = "14px 22px";
  btn.style.background = "#ff5a00";
  btn.style.color = "white";
  btn.style.border = "none";
  btn.style.borderRadius = "12px";
  btn.style.fontSize = "16px";
  btn.style.zIndex = "9999";

  btn.onclick = () => {

    localStorage.setItem("harinos_version", newVersion);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then(regs => {
        regs.forEach(r => r.unregister());
        location.reload(true);
      });
    } else {
      location.reload(true);
    }
  };

  document.body.appendChild(btn);
}

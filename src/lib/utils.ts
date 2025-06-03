function getQueryParam(key: string) {
  return new URLSearchParams(window.location.search).get(key);
}

function getDeviceType() {
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|iphone|android/i.test(ua)) return "mobile";
  return "desktop";
}

function getBrowserName() {
  const ua = navigator.userAgent;
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Edg")) return "Edge";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Safari")) return "Safari";
  return "Unknown";
}

function getBrowserVersion() {
  const match = navigator.userAgent.match(/(Chrome|Firefox|Safari|Edg)\/([\d.]+)/);
  return match?.[2] ?? "unknown";
}

function getOSName() {
  const ua = navigator.userAgent;
  if (/Windows/i.test(ua)) return "Windows";
  if (/Mac/i.test(ua)) return "MacOS";
  if (/Android/i.test(ua)) return "Android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
  return "Unknown";
}

function getOSVersion() {
  const ua = navigator.userAgent;
  const match = ua.match(/(Windows NT|Android|CPU (iPhone )?OS) ([\d_\.]+)/);
  return match?.[3]?.replace(/_/g, ".") ?? "unknown";
}

export {
  getQueryParam,
  getDeviceType,
  getBrowserName,
  getBrowserVersion,
  getOSName,
  getOSVersion
};
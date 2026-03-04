const APPLE_STORE_BASE_URL = "https://apps.apple.com/no/app/rema-1000/id1184277401?l=nb";
const PLAY_STORE_BASE_URL = "https://play.google.com/store/apps/details?id=no.rema.bella&hl=no";
const WEBSITE_BASE_URL = "https://www.rema.no";

function isIOS(userAgent) {
  const iOSDevice = /iPad|iPhone|iPod/i.test(userAgent);
  return iOSDevice;
}

function isAndroid(userAgent) {
  return /android/i.test(userAgent);
}

function withTracking(baseUrl, platform, requestUrl) {
  const url = new URL(baseUrl);
  const incoming = new URL(requestUrl);

  const source = incoming.searchParams.get("utm_source") || "qr";
  const medium = incoming.searchParams.get("utm_medium") || "offline";
  const campaign = incoming.searchParams.get("utm_campaign") || "rema1000_app_download";
  const content = incoming.searchParams.get("utm_content") || platform;

  url.searchParams.set("utm_source", source);
  url.searchParams.set("utm_medium", medium);
  url.searchParams.set("utm_campaign", campaign);
  url.searchParams.set("utm_content", content);

  const placement = incoming.searchParams.get("placement");
  if (placement) {
    url.searchParams.set("placement", placement);
  }

  return url.toString();
}

function targetFor(userAgent, requestUrl) {
  if (isIOS(userAgent)) {
    return withTracking(APPLE_STORE_BASE_URL, "ios", requestUrl);
  }

  if (isAndroid(userAgent)) {
    return withTracking(PLAY_STORE_BASE_URL, "android", requestUrl);
  }

  return withTracking(WEBSITE_BASE_URL, "desktop", requestUrl);
}

export default {
  async fetch(request) {
    const userAgent = request.headers.get("user-agent") || "";
    const target = targetFor(userAgent, request.url);

    return Response.redirect(target, 302);
  },
};

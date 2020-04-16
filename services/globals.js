export function getGeolocation() {
  if (typeof window !== "undefined" && window.navigator?.geolocation != null) {
    return window.navigator.geolocation;
  }
  return null;
}

export function hasGeolocation() {
  const geolocation = getGeolocation();
  return geolocation !== null;
}

import { getGeolocation } from "./globals";

export function getCurrentPosition() {
  const geolocation = getGeolocation();
  if (geolocation == null) {
    return null;
  }
  const promise = new Promise((resolve) => {
    geolocation.getCurrentPosition((position) => {
      resolve(position.coords);
    });
  });

  return promise;
}

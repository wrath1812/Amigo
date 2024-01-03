import { BarCodeScanner } from "expo-barcode-scanner";
async function getQrDataFromImage(image) {
  const scannedResults = await BarCodeScanner.scanFromURLAsync(image);
  return scannedResults;
}

export default getQrDataFromImage;

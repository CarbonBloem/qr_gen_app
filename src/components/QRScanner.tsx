
import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { BrowserQRCodeReader } from "@zxing/browser";

export default function QRScanner() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let codeReader: BrowserQRCodeReader | null = null;
    let active = true;

    async function startCamera() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError("Camera API not supported on this device/browser.");
        return;
      }
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        if (!videoRef.current) {
          setError("Video element not available.");
          return;
        }
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {
          setError("Unable to start video playback. Please check camera permissions.");
        });
        codeReader = new BrowserQRCodeReader();
        setScanning(true);
        codeReader.decodeFromVideoDevice(
          undefined,
          videoRef.current,
          (result: { getText: () => string } | undefined | null, err: Error | undefined | null) => {
            if (!active) return;
            if (result) {
              setScanResult(result.getText());
              setScanning(false);
            }
            if (err && !(err.name === "NotFoundException")) {
              setError(err.message);
            }
          }
        );
      } catch (err) {
        if (err instanceof DOMException && err.name === "NotAllowedError") {
          setError("Camera access denied. Please allow camera permissions in your browser settings.");
        } else if (err instanceof DOMException && err.name === "NotFoundError") {
          setError("No camera device found. Please ensure your device has a camera.");
        } else {
          setError((err instanceof Error ? err.message : "Camera access error"));
        }
      }
    }
    startCamera();
    return () => {
      active = false;
      setScanning(false);
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <Card className="p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-4">QR Code Scanner</h2>
      <div className="w-full max-w-xs mb-4">
        <video
          ref={videoRef}
          className="w-full rounded-lg border shadow"
          style={{ background: "black" }}
          muted
          playsInline
        />
      </div>
      {scanning && <div className="text-blue-600">Scanning...</div>}
      {scanResult && (
        <div className="mt-4 text-green-600 font-semibold">Scanned: {scanResult}</div>
      )}
      {error && (
        <div className="mt-4 text-red-600 font-semibold">Error: {error}</div>
      )}
    </Card>
  );
}

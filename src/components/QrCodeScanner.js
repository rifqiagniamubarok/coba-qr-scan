import { useCallback, useEffect, useRef } from 'react';
import QrScanner from 'qr-scanner';
import Webcam from 'react-webcam';
import { useState } from 'react';

const QrCodeScanner = (props) => {
  const { onChange, width = 400, height = 300, delay = 1000 } = props;

  const videoConstraints = {
    width: width,
    height: height,
    facingMode: { exact: 'environment' },
  };

  const [result, setResult] = useState('');
  const [img, setImage] = useState(null);

  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();

    const file = dataURLtoFile(imageSrc, 'name');
    setImage(file);
    readCodeImage(file);
  }, [webcamRef]);

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
  const readCodeImage = (file) => {
    if (!file) {
      return;
    }
    QrScanner.scanImage(file, { returnDetailedScanResult: true })
      .then((res) => {
        onChange(res.data);
        setResult(res.data);
      })
      .catch((err) => {
        setResult('');
        onChange('');
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      capture();
    }, delay);

    return () => clearInterval(interval);
  }, []);

  return (
    <Webcam
      audio={false}
      height={height}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      width={width}
      videoConstraints={videoConstraints}
    />
  );
};
export default QrCodeScanner;

import axios from 'axios';
import { useEffect, useState } from 'react';
import { nfn } from '../../common';
import Uploader from './Uploader';
const Config = {
  axios,
  setConfig(axios) {
    this.axios = axios;
  }
};

const handleRes = res => res;

Uploader.useUploadFile = ({
  url,
  onSuccess = nfn,
  onError = nfn,
  handleResponse = handleRes,
  handleError = e => e?.message || e,
  method = 'post'
}) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [percent, setPercent] = useState(0);

  const upload = params => {
    setLoading(true);
    return Config.axios[method](url, params, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: progressEvent => {
        const percent =
          ((progressEvent.loaded / progressEvent.total) * 100) | 0;
        setPercent(percent);
      }
    })
      .then(handleResponse)
      .then(res => {
        setLoading(false);
        onSuccess(res);
        setSuccess(true);
        setError(false);
      })
      .catch(err => {
        setLoading(false);
        onError(err);
        setSuccess(false);
        setError(handleError(err));
      });
  };

  useEffect(() => {
    setSuccess(false);
    setError(false);
    setPercent(0);
  }, [file]);

  return {
    upload,
    loading,
    percent,
    file,
    setFile,
    success,
    error,
    setPercent,
    setLoading
  };
};

Uploader.setConfig = Config.setConfig.bind(Config);

export default Uploader;

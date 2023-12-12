import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import UploaderProvider from './context/uploaderContext';

const container = document.getElementById('imageUploader');
const root = createRoot(container);

root.render(<React.StrictMode><UploaderProvider><App /></UploaderProvider></React.StrictMode>);

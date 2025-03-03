// import { GoogleOAuthProvider } from '@react-oauth/google';
import { createRoot } from 'react-dom/client';
import App from './App';
import LoveYouBabudi from './LoveYouBabudi';
const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <>
    <LoveYouBabudi />
  </>
);

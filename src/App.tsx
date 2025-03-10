import { Fragment } from 'react/jsx-runtime';
import { Toaster } from './components/ui/sonner';
import { Home } from './pages/Home';

import '@/stylesheets/index.css';

export default function App() {
  return (
    <Fragment>
      <Home />
      <Toaster richColors theme='light' />
    </Fragment>
  );
}

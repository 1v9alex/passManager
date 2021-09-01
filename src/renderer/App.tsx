/* eslint-disable @typescript-eslint/no-explicit-any */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { NextUIProvider, createTheme, Loading } from '@nextui-org/react';
import './App.css';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Accounts from './components/pages/Accounts';
import Settings from './components/pages/Settings';
import { Login } from './components/Login';
import '../types/managerTypes';

const lightTheme = createTheme({
  type: 'light',
  theme: {},
});

const darkTheme = createTheme({
  type: 'dark',
  theme: {},
});

export default function App() {
  const [accountFileExists, setAccountFileExists] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('init-app', [{}]);
    window.electron.ipcRenderer.once('init-app', (arg: any) => {
      setAccountFileExists(arg.accountFileExists);
      setLoading(false);
    });
  }, []);

  return (
    <NextThemesProvider
      defaultTheme="dark"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        {loading ? (
          <div id="appLoadingParent">
            <Loading type="points" size="xl" style={{}} />
          </div>
        ) : (
          <div style={{ width: '100%', display: 'flex' }}>
            {accountFileExists && authenticated ? (
              <Router>
                <Sidebar />
                <div id="content">
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <Accounts
                          setAccounts={setAccounts as any}
                          accounts={accounts}
                        />
                      }
                    />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </div>
              </Router>
            ) : (
              <Login
                setAuthenticated={setAuthenticated}
                setAccountFileExists={setAccountFileExists}
                setAccounts={setAccounts as any}
                accountFileExists={accountFileExists}
              />
            )}
          </div>
        )}
      </NextUIProvider>
    </NextThemesProvider>
  );
}

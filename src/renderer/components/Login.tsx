/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/prefer-default-export */
import { Text, Input, Button, Spacer } from '@nextui-org/react';
import { useState } from 'react';

type Props = {
  accountFileExists: boolean;
  setAccountFileExists: (accountFileExists: boolean) => void;
  setAccounts: (accounts: LolAccount[]) => void;
  setAuthenticated: (authenticated: boolean) => void;
};

export const Login = ({
  setAccountFileExists,
  setAccounts,
  accountFileExists,
  setAuthenticated,
}: Props) => {
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [message, setMessage] = useState('');

  const createAccountFile = () => {
    if (password !== repeatPassword) {
      setMessage('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters');
      return;
    }

    window.electron.ipcRenderer.sendMessage('create-account-file', {
      password,
    });
    window.electron.ipcRenderer.once('create-account-file', (arg: any) => {
      if (arg.error === false) {
        setAccountFileExists(true);
      }
    });
  };

  const authenticate = () => {
    window.electron.ipcRenderer.sendMessage('authenticate', {
      password,
    });
    window.electron.ipcRenderer.once('authenticate', (arg: any) => {
      if (arg.authenticated === true) {
        setAccounts(arg.accounts);
        setAccountFileExists(true);
        setAuthenticated(true);
      } else {
        setMessage('Incorrect password');
      }
    });
  };

  return (
    <div style={{ width: '100%', display: 'flex', marginTop: 50 }}>
      <div id="loginForm">
        <Text h2>Authentication</Text>
        <Spacer y={0.1} />
        {!accountFileExists ? (
          <Text>Create your encrypted account database.</Text>
        ) : (
          <Text>Enter your password</Text>
        )}
        <Spacer y={0.5} />
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="Database encryption key"
        />
        {!accountFileExists && <Spacer y={0.5} />}
        {!accountFileExists && (
          <Input.Password
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            type="text"
            placeholder="Please confirm the key"
          />
        )}
        {message !== '' && (
          <Text style={{ marginBottom: 0, marginTop: 10 }} color="warning">
            {message}
          </Text>
        )}
        <Spacer y={0.8} />

        <Button onPress={accountFileExists ? authenticate : createAccountFile}>
          {accountFileExists ? 'Authenticate' : 'Create'}
        </Button>
      </div>
    </div>
  );
};

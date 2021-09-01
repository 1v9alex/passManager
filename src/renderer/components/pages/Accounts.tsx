/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Table, Button, Avatar, Spacer, Text } from '@nextui-org/react';
import { MdDeleteForever, MdModeEdit } from 'react-icons/md';
import AddAccountModal from '../AddAccountModal';
import ModifyAccountModal from '../ModifyAccountModal';
import { fetchAccount } from '../../../api_functions/api';

type Props = {
  accounts: LolAccount[];
  setAccounts: (accounts: LolAccount[]) => void;
};

// Get account by id
const getAccountById = (accounts: LolAccount[], id: string) => {
  return accounts.find((account: LolAccount) => account.id === id);
};

export default function Accounts({ accounts, setAccounts }: Props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAccounts, setSelectedAccounts] = useState() as any;
  const [selectedAccount, setSelectedAccount] = useState() as any;
  const addAccount = (accountData: LolAccount) => {
    window.electron.ipcRenderer.sendMessage('add-account', accountData);
    window.electron.ipcRenderer.once('add-account', (arg: any) => {
      setAccounts([...accounts, arg.account]);
    });
  };

  const editAccount = (account: LolAccount) => {
    window.electron.ipcRenderer.sendMessage('edit-account', account);
    window.electron.ipcRenderer.once('edit-account', (arg: any) => {
      if (arg.error === false) {
        setAccounts(arg.accounts);
      }
    });
  };

  // remove an account
  const removeAccount = () => {
    if (!selectedAccount) {
      return;
    }
    const account = selectedAccount;
    window.electron.ipcRenderer.sendMessage('remove-account', account.id);
    window.electron.ipcRenderer.once('remove-account', (arg: any) => {
      if (arg.error === false) {
        setAccounts(arg.accounts);
      }
    });
  };

  useEffect(() => {
    // check if selectedAccounts has 'currentKey' property
    if (selectedAccounts && selectedAccounts.currentKey) {
      const account = getAccountById(accounts, selectedAccounts.currentKey);
      if (account) {
        setSelectedAccount(account);
      } else {
        setSelectedAccount(accounts[0]);
      }
    }
  }, [selectedAccounts]);

  return (
    <div>
      <div
        id="acc-layout-parent"
        style={{
          display: 'flex',
          height: '100vh',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div id="acc-layout-child-table" style={{ width: '100%' }}>
          <Table
            aria-label="Accounts"
            selectedKeys={selectedAccounts}
            onSelectionChange={(selectedKeys: any) => {
              setSelectedAccounts(selectedKeys);
            }}
            css={{
              height: 'auto',
              minWidth: '100%',
            }}
            selectionMode="single"
          >
            <Table.Header>
              <Table.Column>Icon</Table.Column>
              <Table.Column>Rank</Table.Column>
              <Table.Column>Level</Table.Column>
              <Table.Column>Region</Table.Column>
              <Table.Column>Summoner Name</Table.Column>
              <Table.Column>Username</Table.Column>
            </Table.Header>
            <Table.Body>
              {accounts.map((account: LolAccount) => (
                <Table.Row key={account.id}>
                  <Table.Cell>
                    <Avatar
                      squared
                      bordered
                      src={`https://ddragon.leagueoflegends.com/cdn/12.14.1/img/profileicon/${
                        account.profileIconId ? account.profileIconId : 29
                      }.png`}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {account.tier
                      ? `${account.tier} ${account.rank} ${account.leaguePoints} LP`
                      : ''}
                  </Table.Cell>
                  <Table.Cell>
                    {account.summonerLevel ? account.summonerLevel : ''}
                  </Table.Cell>
                  <Table.Cell>{account.region}</Table.Cell>
                  <Table.Cell>{account.summonerName}</Table.Cell>
                  <Table.Cell>{account.username}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          <ModifyAccountModal
            onSubmit={editAccount}
            account={selectedAccount}
            isOpen={isEditModalOpen}
            setIsOpen={setIsEditModalOpen}
          />
        </div>
        <div
          id="acc-layout-child-footer"
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            display: 'inline-flex',
          }}
        >
          <Button>Fill</Button>
          <Spacer x={1} />
          <div
            style={{
              display: 'inline-flex',
            }}
          >
            <AddAccountModal onSubmit={addAccount} />
            <Spacer x={0.4} />
            <Button
              color="primary"
              onPress={() => {
                if (selectedAccount) {
                  setIsEditModalOpen(true);
                }
              }}
              icon={<MdModeEdit />}
              auto
            />
            <Spacer x={0.4} />
            <Button
              color="error"
              onPress={removeAccount}
              icon={<MdDeleteForever />}
              auto
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import './App.css';
import { Routes, Route } from 'react-router-dom';
import { MantineProvider, AppShell, Header } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

import Inventory from './pages/Inventory';
import Auction from './pages/Auction';

import HeaderSimple from './components/Header';
import React from 'react';
import Signup from './pages/Signup';


import ClientProfile from './pages/ClientProfile';
import BuilderProfile from './pages/BuilderProfile';
import Project from './pages/Project';
import CreateAuction from './pages/CreateAuction';
import ConfirmProject from './pages/ConfirmProject';
import {AtLanding} from "@auction-app/at-landing";

const queryClient = new QueryClient();

const Main = () => {
  return (
    <Routes>
      {' '}
      {/* The Switch decides which component to show based on the current URL.*/}
      <Route path="/" element={<AtLanding />}></Route>
      <Route path="/inventory" element={<Inventory />}></Route>
      <Route path="/create_auction" element={<CreateAuction />}></Route>
      <Route path="/auction/:id" element={<Auction />}></Route>
      <Route path="/project/:id" element={<Project />}></Route>
      <Route path="/choose_units/:id" element={<Project registered />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/client_profile" element={<ClientProfile />}></Route>
      <Route path="/builder_profile" element={<BuilderProfile />}></Route>
      <Route path="/client_profile" element={<ClientProfile />}></Route>
      <Route path="/edit_project/:id" element={<ConfirmProject />}></Route>
    </Routes>
  );
};

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <AppShell
          padding="md"
          header={
            <Header height={60} p="xs">
              <HeaderSimple
                links={[
                  { link: '/inventory', label: 'Inventory' },
                  { link: '/auction/1', label: 'Auction' },
                  { link: '/signup', label: 'Signup' },
                  { link: '/client_profile', label: 'Client Profile' },
                  { link: '/builder_profile', label: 'Builder Profile' },
                ]}
              />
            </Header>
          }
          styles={(theme) => ({
            main: {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          })}
        >
          <div className="App">
            <Main />
          </div>
        </AppShell>
        <Notifications />
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;

import './App.css';
import { Routes, Route } from 'react-router-dom';
import { MantineProvider, AppShell, Header } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from 'react-query';
import HeaderSimple from './components/Header';
import React from 'react';
import Signup from './pages/Signup';
import ConfirmProject from './pages/ConfirmProject';
import { LandingPage } from '@auction-app/landing';
import { InventoryPage } from '@auction-app/inventory';
import { ClientProfilePage } from '@auction-app/client-profile';
import { BuilderProfilePage } from '@auction-app/builder-profile';
import { AuctionPage, ProjectPage } from '@auction-app/auction';
import { CreateAuctionPage } from '@auction-app/create-auction';

const queryClient = new QueryClient();

const Main = () => {
  return (
    <Routes>
      {' '}
      {/* The Switch decides which component to show based on the current URL.*/}
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/inventory" element={<InventoryPage />}></Route>
      <Route path="/create_auction" element={<CreateAuctionPage />}></Route>
      <Route path="/auction/:id" element={<AuctionPage />}></Route>
      <Route path="/project/:id" element={<ProjectPage />}></Route>
      <Route
        path="/choose_units/:id"
        element={<ProjectPage registered />}
      ></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/client_profile" element={<ClientProfilePage />}></Route>
      <Route path="/builder_profile" element={<BuilderProfilePage />}></Route>
      <Route path="/client_profile" element={<ClientProfilePage />}></Route>
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

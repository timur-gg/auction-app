import "./App.css";
import { Routes, Route } from "react-router-dom";
import { MantineProvider, AppShell, Header } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import Inventory from "./pages/Inventory";
import Auction from "./pages/Auction";

import HeaderSimple from "./components/Header";
import React from "react";
import Signup from "./pages/Signup";
import ClientProfile from "./pages/ClientProfile";
import BuilderProfile from "./pages/BuilderProfile";

const Main = () => {
  return (
    <Routes>
      {" "}
      {/* The Switch decides which component to show based on the current URL.*/}
      <Route path="/inventory" element={<Inventory />}></Route>
      <Route path="/auction/:id" element={<Auction />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/client_profile" element={<ClientProfile />}></Route>
      <Route path="/builder_profile" element={<BuilderProfile />}></Route>
    </Routes>
  );
};

function App(): React.JSX.Element {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell
        padding="md"
        header={
          <Header height={60} p="xs">
            <HeaderSimple
              links={[
                { link: "/inventory", label: "Inventory" },
                { link: "/auction/1", label: "Auction" },
                { link: "/signup", label: "Signup" },
                { link: "/client_profile", label: "Client Profile" },
                { link: "/builder_profile", label: "Builder Profile" },
              ]}
            />
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
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
  );
}

export default App;

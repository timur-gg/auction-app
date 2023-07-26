import "./App.css";
import { Routes, Route } from "react-router-dom";
import { MantineProvider, AppShell, Header } from "@mantine/core";

import Inventory from "./pages/Inventory";
import Auction from "./pages/Auction";

import HeaderSimple from "./components/Header";
import React from "react";
import Signup from "./pages/Signup";
import ClientProfile from "./pages/ClientProfile";

const Main = () => {
  return (
    <Routes>
      {" "}
      {/* The Switch decides which component to show based on the current URL.*/}
      <Route path="/inventory" element={<Inventory />}></Route>
      <Route path="/auction/:id" element={<Auction />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/client_profile" element={<ClientProfile />}></Route>

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
    </MantineProvider>
  );
}

export default App;

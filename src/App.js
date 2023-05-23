import React, { useState } from "react";

import AppLayout from "@cloudscape-design/components/app-layout";
import BreadcrumbGroup from "@cloudscape-design/components/breadcrumb-group";
import Input from "@cloudscape-design/components/input";
import SideNavigation from "@cloudscape-design/components/side-navigation";
import TopNavigation from "@cloudscape-design/components/top-navigation";

import "./styles/base.scss";
import "./styles/top-navigation.scss";

import logo from "./logo.svg";
import { Notifications } from "./notifications";
import { TrainingTable } from "./trainingTable";

const navItems = [
  { type: "link", text: "Train", href: "#/train" },
  { type: "link", text: "Program", href: "#/program" },
  {
    type: "section",
    text: "ExampleSection",
    items: [
      { type: "link", text: "Database", href: "#/database" },
      { type: "link", text: "Authentication", href: "#/authentication" },
    ],
  },
];

const breadcrumbs = [
  {
    text: "pizzapress",
    href: "#",
  },
  {
    text: "Pages",
    href: "#",
  },
];

const i18nStrings = {
  searchIconAriaLabel: "Search",
  searchDismissIconAriaLabel: "Close search",
  overflowMenuTriggerText: "More",
  overflowMenuTitleText: "All",
  overflowMenuBackIconAriaLabel: "Back",
  overflowMenuDismissIconAriaLabel: "Close menu",
};

const profileActions = [
  { type: "button", id: "profile", text: "Profile" },
  { type: "button", id: "preferences", text: "Preferences" },
  { type: "button", id: "security", text: "Security" },
  {
    type: "menu-dropdown",
    id: "support-group",
    text: "Support",
    items: [
      {
        id: "documentation",
        text: "Documentation",
        href: "#",
        external: true,
        externalIconAriaLabel: " (opens in new tab)",
      },
      {
        id: "feedback",
        text: "Feedback",
        href: "#",
        external: true,
        externalIconAriaLabel: " (opens in new tab)",
      },
      { id: "support", text: "Customer support" },
    ],
  },
  { type: "button", id: "signout", text: "Sign out" },
];

export default function App() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <>
      <TopNavigation
        i18nStrings={i18nStrings}
        identity={{
          href: "#",
          title: "pizzapress",
          logo: { src: logo, alt: "Service name logo" },
        }}
        search={
          <Input
            ariaLabel="Input field"
            clearAriaLabel="Clear"
            value={searchValue}
            type="search"
            placeholder="Search"
            onChange={({ detail }) => setSearchValue(detail.value)}
          />
        }
        utilities={[
          {
            type: "button",
            iconName: "notification",
            ariaLabel: "Notifications",
            badge: true,
            disableUtilityCollapse: true,
          },
          {
            type: "button",
            iconName: "settings",
            title: "Settings",
            ariaLabel: "Settings",
          },
          {
            type: "menu-dropdown",
            text: "Customer name",
            description: "customer@example.com",
            iconName: "user-profile",
            items: profileActions,
          },
        ]}
      />
      <AppLayout
        stickyNotifications
        toolsHide
        ariaLabels={{ navigationClose: "close" }}
        navigation={<SideNavigation activeHref="#/pages" items={navItems} />}
        breadcrumbs={
          <BreadcrumbGroup
            items={breadcrumbs}
            expandAriaLabel="Show path"
            ariaLabel="Breadcrumbs"
          />
        }
        contentType="table"
        content={<TrainingTable />}
        notifications={<Notifications />}
      />
    </>
  );
}

// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Chain Docs",
  tagline: "Complete documentation for the Chain Ecosystem",
  url: "https://docs.chain.com",
  baseUrl: "/docs-site/",
  trailingSlash: false,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  staticDirectories: ["static"],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "chain", // Usually your GitHub org/user name.
  projectName: "docs-site", // Usually your repo name.
  deploymentBranch: "gh-pages",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: {
          alt: "Chain Logo",
          href: "https://chain.com",
          src: "img/logo-light.png",
        },
        items: [
          {
            type: "doc",
            position: "left",
            docId: "sequence/get-started/introduction",
            label: "Sequence",
          },
          {
            type: "doc",
            position: "left",
            docId: "xcn/token/introduction",
            label: "XCN",
          },
        ],
      },
      algolia: {
        // The application ID provided by Algolia
        appId: "MEID2H0G2L",

        // Public API key: it is safe to commit it
        apiKey: "d8d4dd66779786cadcfedce0db4d1060",

        indexName: "chain",

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: "false",

        //... other Algolia params
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Sequence",
                to: "docs/sequence/get-started/introduction",
              },
              {
                label: "XCN",
                to: "docs/xcn/token/introduction",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Github",
                href: "https://github.com/chain",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/chain",
              },
              {
                label: "LinkedIn",
                href: "https://linkedin.com/company/chain-global",
              },
              {
                label: "Instagram",
                href: "https://instagram.com/Chain",
              },
              {
                label: "Telegram",
                href: "https://t.me/Chain",
              },
              {
                label: "Discord",
                href: "https://discord.gg/ChainOfficial",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Chain, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["java", "ruby"],
      },
    }),
};

module.exports = config;

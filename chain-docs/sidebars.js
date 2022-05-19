
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

const sidebars = {
  sequence:[
    {
      type: 'category',
      label: 'Getting Started',
      collapsible: false,
      collapsed: false,
      items: [
        'sequence/get-started/introduction',
        'sequence/get-started/teams',
        'sequence/get-started/ledgers',
        'sequence/get-started/access-control',
        'sequence/get-started/sdks',
        'sequence/get-started/explorer',                        
        'sequence/get-started/5-minute-guide',
      ]
    },
    {
      type: 'category',
      label: 'Examples',
      collapsible: false,
      collapsed: false,
      items: [
        'sequence/examples/mobile-wallet',
        'sequence/examples/crypto-exchange',
        'sequence/examples/lending-platform',
        'sequence/examples/ride-sharing',        
      ]
    },
  ],
  xcn:[
    {
      type: 'category',
      label: 'Token',
      collapsible: false,
      collapsed: false,
      items: [
        'xcn/token/introduction',
        'xcn/token/disclaimer',
        'xcn/token/terms-of-service',
        'xcn/token/tokenomics',        
        'xcn/token/utility',        
        'xcn/token/interfaces',        
        'xcn/token/api',        
      ]
    },
  ],
};

module.exports = sidebars;

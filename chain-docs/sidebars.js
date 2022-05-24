
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */

const sidebars = {
  sequence:[
    {
      type: 'category',
      label: 'Getting Started',
      collapsible: true,
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
      collapsible: true,
      collapsed: false,
      items: [
        'sequence/examples/mobile-wallet',
        'sequence/examples/crypto-exchange',
        'sequence/examples/lending-platform',
        'sequence/examples/ride-sharing',        
      ]
    },
    {
      type: 'category',
      label: 'Ledger Objects',
      collapsible: true,
      collapsed: false,
      items: [
        'sequence/ledger-objects/tokens',
        'sequence/ledger-objects/flavors',
        'sequence/ledger-objects/accounts',
        'sequence/ledger-objects/transactions',        
        'sequence/ledger-objects/actions',        
        'sequence/ledger-objects/keys',        
      ]
    },
    {
      type: 'category',
      label: 'Ledger Queries',
      collapsible: true,
      collapsed: false,
      items: [
        'sequence/ledger-queries/overview',
        'sequence/ledger-queries/filters',
        'sequence/ledger-queries/pagination',
        'sequence/ledger-queries/list-queries',        
        'sequence/ledger-queries/sum-queries',        
        'sequence/ledger-queries/feeds',        
      ]
    },
    {
      type: 'category',
      label: 'Reference',
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: 'link',
          label: 'Java SDK',
          href: 'https://docs.seq.com/sdk/java/2.2/overview-summary.html',
        },
        {
          type: 'link',
          label: 'Ruby SDK',
          href: 'https://docs.seq.com/sdk/ruby/2.2/index.html',
        },
        {
          type: 'link',
          label: 'Node SDK',
          href: 'https://docs.seq.com/sdk/node/2.2.0/index.html',
        },
        {
          type: 'doc',
          id: 'sequence/reference/pii',
          label: 'PII',
        },
        {
          type: 'doc',
          id: 'sequence/reference/errors',
          label: 'Errors',
        }
      ]
    },
  ],
  xcn:[
    {
      type: 'category',
      label: 'Token',
      collapsible: true,
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
    {
      type: 'category',
      label: 'Staking',
      collapsible: true,
      collapsed: false,
      items: [
        'xcn/staking/staking',
        'xcn/staking/rewards',
        'xcn/staking/epoch',
        'xcn/staking/delegates',        
        'xcn/staking/slashing',                             
      ]
    },
    {
      type: 'category',
      label: 'Governance',
      collapsible: true,
      collapsed: false,
      items: [
        'xcn/governance/dao',
        'xcn/governance/constitution',
        'xcn/governance/architecture',
        'xcn/governance/proposals',        
        'xcn/governance/parameters',                             
        'xcn/governance/voting',                             
        'xcn/governance/treasury',                             
      ]
    },
  ],
};

module.exports = sidebars;

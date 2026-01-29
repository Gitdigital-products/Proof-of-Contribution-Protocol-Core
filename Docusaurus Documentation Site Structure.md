# 🌐 Docusaurus Documentation Site Structure

/docs-site/ (recommended root folder)

`
docs-site/
│
├── docusaurus.config.js
├── sidebars.js
├── package.json
├── tsconfig.json
├── static/
│   ├── img/
│   │   ├── logo.svg
│   │   └── architecture-diagram.png
│   └── favicon.ico
│
└── docs/
    ├── intro.md
    │
    ├── protocol/
    │   ├── overview.md
    │   ├── spec.md
    │   ├── threat-model.md
    │   ├── scoring-rules.md
    │   ├── glossary.md
    │   └── architecture.md
    │
    ├── integration/
    │   ├── getting-started.md
    │   ├── integration-guide.md
    │   ├── api-reference.md
    │   ├── use-cases.md
    │   └── examples.md
    │
    ├── governance/
    │   ├── rfc-template.md
    │   ├── maintainer-handbook.md
    │   ├── governance-process.md
    │   └── versioning.md
    │
    ├── compliance/
    │   ├── compliance-checklist.md
    │   ├── security-policy.md
    │   └── responsible-disclosure.md
    │
    └── community/
        ├── contributing.md
        ├── code-of-conduct.md
        ├── contributor-journey.md
        └── roadmap.md
`

---

## 📘 1. docusaurus.config.js (core config)

This is the heart of the site — branding, navbar, footer, theme, plugins.

`js
module.exports = {
  title: 'Proof-of-Contribution Protocol',
  tagline: 'Deterministic. Auditable. Composable.',
  url: 'https://gitdigital.org',
  baseUrl: '/',
  favicon: 'img/favicon.ico',

  organizationName: 'GitDigital',
  projectName: 'Proof-of-Contribution-Protocol-Core',

  themeConfig: {
    navbar: {
      title: 'PoC Protocol',
      logo: {
        alt: 'GitDigital Logo',
        src: 'img/logo.svg',
      },
      items: [
        { to: '/docs/intro', label: 'Docs', position: 'left' },
        { to: '/docs/protocol/spec', label: 'Spec', position: 'left' },
        { to: '/docs/integration/getting-started', label: 'Integrate', position: 'left' },
        { href: 'https://github.com/GitDigital/Proof-of-Contribution-Protocol-Core', label: 'GitHub', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      copyright: © ${new Date().getFullYear()} GitDigital Products,
    },
  },
};
`

---

### 📚 2. sidebars.js (navigation)

This defines the left‑hand navigation tree.

`js
module.exports = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'Protocol',
      items: [
        'protocol/overview',
        'protocol/spec',
        'protocol/threat-model',
        'protocol/scoring-rules',
        'protocol/glossary',
        'protocol/architecture',
      ],
    },
    {
      type: 'category',
      label: 'Integration',
      items: [
        'integration/getting-started',
        'integration/integration-guide',
        'integration/api-reference',
        'integration/use-cases',
        'integration/examples',
      ],
    },
    {
      type: 'category',
      label: 'Governance',
      items: [
        'governance/rfc-template',
        'governance/maintainer-handbook',
        'governance/governance-process',
        'governance/versioning',
      ],
    },
    {
      type: 'category',
      label: 'Compliance',
      items: [
        'compliance/compliance-checklist',
        'compliance/security-policy',
        'compliance/responsible-disclosure',
      ],
    },
    {
      type: 'category',
      label: 'Community',
      items: [
        'community/contributing',
        'community/code-of-conduct',
        'community/contributor-journey',
        'community/roadmap',
      ],
    },
  ],
};
`

---

### 🧭 3. docs/intro.md (landing page)

`md

Welcome to the Proof‑of‑Contribution Protocol

The Proof‑of‑Contribution Protocol is a deterministic, auditable, and composable standard for measuring meaningful contributions across decentralized ecosystems.

Use the sidebar to explore:

- The canonical protocol specification  
- Integration guides and examples  
- Governance and RFC processes  
- Compliance and security documentation  
- Contributor resources  
`

---

#### 🎨 4. Branding & UX

The structure supports:

- GitDigital branding  
- Dark/light mode  
- Mermaid diagrams  
- Versioned docs  
- Search  
- Auto‑generated sidebars  

It feels like a real protocol site — not a hobby project.

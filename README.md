# [reactnative.dev](https://reactnative.dev/) &middot; [![CC BY 4.0 license](https://img.shields.io/badge/license-CC%20BY%204.0-blue.svg)](LICENSE-docs) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md) <a href="https://twitter.com/intent/follow?screen_name=reactnative"><img src="https://img.shields.io/twitter/follow/reactnative.svg?label=Follow%20@reactnative" alt="Follow @reactnative" /></a>

* goal
  * website configuration and documentation of [React Native website](https://reactnative.dev/)

## Contents

- [Overview](#-overview)
- [Website configuration](#-website-configuration)
- [Contributing](#-contributing)
- [License](#-license)

## 📖 Overview

* content == ".md" |
  * `docs`,
    * source files -- for -- the sections 
      * "Guides",
      * "Components"
      * "APIs"
  * `website/architecture` 
  * `website/contributing`

* React Native website
  * == static site / -- generated via -- [Docusaurus](https://docusaurus.io/)
  * 's configuration | `website/`

### Directory Structure

The following is a high-level overview of relevant files and folders.

```
react-native-website/
├── docs/
│   ├── [BASE VERSIONED DOC FILES]
│   └── ...
└── website/
    ├── architecture/
    │   ├── [ARCHITECTURE DOC FILES]
    │   └── ...
    ├── blog/
    │   ├── [BLOG POSTS]
    │   └── ...
    ├── contributing/
    │   ├── [CONTRIBUTING DOC FILES]
    │   └── ...
    ├── core/
    │   ├── [CUSTOM COMPONENTS]
    │   └── ...
    ├── src/
    │   ├── css/
    │   │   ├── [CUSTOM STYLES]
    │   │   └── ...
    │   ├── pages/
    │   │   ├── [STATIC PAGES]
    │   │   └── ...
    │   └── theme/
    │   │   ├── [SWIZZLED COMPONENTS]
    │   │   └── ...
    ├── static/
    │   ├── blog/
    │   │   └── assets/
    │   ├── docs/
    │   │   └── assets/
    │   └── img/
    ├── versioned_docs/
    │   ├── [GENERATED VERSIONED DOC FILES]
    │   └── ...
    ├── versioned_sidebars/
    │   ├── [GENERATED VERSIONED SIDEBARS]
    │   └── ...
    ├── docusaurus.config.js
    ├── package.json
    ├── showcase.json
    ├── sidebars.json
    ├── sidebarsArchitecture.json
    ├── sidebarsContributing.json
    └── versions.json
```

### Versioned docs

* NEW version of the website / NEW React Native release 

## 🔧 Website configuration -- "website/"

* `website/docusaurus.config.js`
  * == main config file -- for the -- website
    * see [Docusaurus how to build the website](https://v2.docusaurus.io/docs/configuration)
* `core/`
  * TODO:
  * == JavaScript and React components that are the core part of the website.
* `src/pages`
  * == subdirectory contains the React components that make up the non-documentation pages of the site, such as the homepage.
* `src/theme`
  * == contains the swizzled React components from the Docusaurus theme.
* `showcase.json`
  * file contains the list of users that are highlighted in the React Native showcase.


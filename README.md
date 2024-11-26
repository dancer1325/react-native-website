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

### Documentation sources

As mentioned above, the `docs` folder contains the source files for docs from "Guides", "Components" and "APIs" tabs on the React Native website (versioned docs).
The doc files for the "Architecture" and "Contribution" tabs are located inside `website` in the respective directories (unversioned/static docs).
In most cases, you will only want to edit the files within those directories.

If you're adding a new doc or you need to alter the order the docs appear in the sidebar, take a look at the `sidebars.json`, `sidebarsArchitecture.json` and `sidebarsContributing.json` files in the `website` directory. The sidebar files contain a list of document ids that should match those defined in the header metadata (aka frontmatter) of the docs markdown files.

### Versioned docs

Part of the React Native website is versioned to allow users to go back and see the Guides or API reference documentation for any given release. A new version of the website is generally generated whenever there is a new React Native release. When this happens, any changes made to the `docs` and `website/sidebars.json` files will be copied over to the corresponding location within `website/versioned_docs` and `website/versioned_sidebars`.

> **_Note:_** Do not edit the auto-generated files within `versioned_docs` or `versioned_sidebars` unless you are sure it is necessary. Edits made to older versions will not be propagated to newer versions of the versioned docs.

Docusaurus keeps track of the list of versions for the site in the `website/versions.json` file. The ordering of versions in this file should be in reverse chronological order.

#### Cutting a new version

##### After RC

The React Native website lints and typechecks documents in "next". The version of React Native used by the linter should be updated before a release for consistency and to catch any documents/examples where APIs have changed.

This can be done by updating the `package.json` and configuration files in `script/lint-examples` the same way a React Native application would be updated. The diff of these files can be seen using a tool like [React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/?from=0.70.6&to=0.71.0).

##### After Release

1.  `cd react-native-website` to go into the project root.
1.  `cd website` to go into the website portion of the project.
1.  Run `yarn version:cut <newVersion>` where `<newVersion>` is the new version being released.

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


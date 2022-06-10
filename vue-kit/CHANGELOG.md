# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased Version

### Added

### Changed

### Removed

## [6.1.9] - 2022-05-24

### Change

- fix dialog button allowing all custom props correctly

## [6.1.8] - 2022-05-24

### Change

- fix transition with v-if on elements of dialog and tabs-selected event emitted. Menu root item rise click item event

## [6.1.7] - 2022-05-19

### Change

- Fix dialog transition and buttons content display

## [6.1.6] - 2022-05-17

### Change

- Fix autocomplete list option

## [6.1.5] - 2022-05-13

### Change

- Fix dialog z-index

## [6.1.4] - 2022-05-13

### Change

- Fix relative paths in dl-ui-treebox component.

## [6.1.3] - 2022-05-12

### Change

- Fix onSelectedRow event in dl-ui-datagrid

## [6.1.2] - 2022-05-11

### Change

- Fix footer default image
- Fix snack text property
- Fix component position on playground
- Fix header component -> z-index in right and left slot
- Fix icon documentation to explain how to color it

## [6.1.1] - 2022-05-09

### Change

- Fix ripple documentation
- Complete Filetree component styling
- Fix autocomplete behavior

## [6.1.0] - 2022-04-21

### Added

- New file tree components

## [6.0.4] - 2022-04-11

### Changed

- fix height tab content and add some missing imports in index file

## [6.0.3] - 2022-04-07

### Changed

- fix css conflict between tabs and menu nav items

## [6.0.2] - 2022-04-4

### Changed

- fix import sin some components

## [6.0.1] - 2022-03-31

### Changed

- fix stepper class specificity

## [6.0.0] - 2022-03-30

### Added

- New color system
- Component autocomplete
- Component color picker

### Changed

- refactor some components
- Improve testing coverage

## [5.3.0] - 2022-02-17

### Added

- New layout system

## [5.2.0] - 2022-01-31

### Changed

- Showcase update

## [5.1.0] - 2022-01-21

### Changed

- Update linter and prettier system

## [5.0.0] - 2022-01-21

### Added

- Migration to Vue 3

## [4.2.1] - 2022-01-13

### Changed

- Leaflet map upgraded and standarizsed.

## [4.2.0] - 2021-12-17

### Changed

- Leaflet map integrated with IDS. Geotool uses ac. buttons. Some storybook progress.

## [4.1.4] - 2021-12-15

### Changed

- fix some components to import dl-ui-icon component

## [4.1.3] - 2021-12-9

### Added

- Add new test

### Changed

- some fix over menu component

## [4.1.2] - 2021-12-9

### Added

- Add new doc

## [4.1.1] - 2021-12-03

### Added

- Add new doc

## [4.1.0] - 2021-12-02

### Added

- Add new menu component

## [4.0.0] - 2021-12-02

### Added

- Add new layout support to IDS design system
- Add new components
- Add new directives

## [3.0.1] - 2021-07-29

### Changed

- fixes latlng control startup error

## [3.0.0] - 2021-07-29

### Changed

- updated leaflet map compo with latest features. added organisms section for cesium and leaflet maps.

## [2.3.0] - 2021-07-14

### Added

- added new property in dl-ui-accordion for showing/hidding content

## [2.2.6] - 2021-06-07

### Changed

- fix radio percent on main bar of progress circle

## [2.2.5] - 2021-05-18

### Changed

- remove code-prettier dependency because it is not used

## [2.2.4] - 2021-05-13

### Changed

- Add new config elements in snackbar

## [2.2.3] - 2021-04-29

### Changed

- Fix icon in checkbox
- Fix some css mixin files names in showcase

## [2.2.2] - 2021-03-08

### Changed

- Synced all utm addons to leaflet-map compo

## [2.2.1] - 2021-03-03

### Changed

- Fix toggle-button input width

## [2.2.0] - 2021-03-03

### Added

- add dl-ui-toggle-button component

## [2.1.0] - 2021-03-01

### Added

- add dl-ui-checkbox-group component

### Changed

- update test files for dl-ui-snack
- update test files for dl-ui-checkbox
- update test files for dl-ui-accordion
- update test files for dl-ui-icon-set

## [2.0.11] - 2021-02-23

### Changed

- extend dl-ui-checkbox for independent indeterminate state

## [2.0.10] - 2021-02-16

### Changed

- add postinstall script

## [2.0.9] - 2021-02-16

### Changed

- fix relative path import from some components
- add new features to leaflet-map component

## [2.0.8] - 2021-02-01

### Changed

- dl-ui-leaflet-map updated with WC version
- css imports are now absolute

## [2.0.7] - 2020-12-22

### Added

- Snack component dl-ui-snack

## [2.0.6] - 2020-12-22

### Changed

- Leaflet map redesigned towards WC

## [2.0.5] - 2020-11-16

### Added

- Cesium credits prop, to use independently of logo

## [2.0.4] - 2020-10-30

### Changed

- Cesium imageryLayer watcher, for compatibility with oneo

## [2.0.3] - 2020-10-20

### Added

- New checkbox status (indeterminate)

## [2.0.2] - 2020-10-06

### Changed

- Select css hotfix

## [2.0.1] - 2020-10-01

### Changed

- Update layout dependency

## [2.0.0] - 2020-09-29

### Add

- Import dl-frwk-ui-layout to manage sass layout base

## [1.6.2] - 2020-09-28

### Changed

- Fix default class style in accordion component

## [1.6.1] - 2020-09-08

### Changed

- Fix width property in select component
- Fix folder structure of mixin SASS select component

## [1.6.0] - 2020-09-08

### Added

- New component 'radio'
- New component 'select'
- Functionality for dynamic generation of an array with all routes for an atomic model which AUTOMATIZES APP by responding to folder changes/creation
- All updates on cesium map compo, due to sync with onEo developments

### Changed

- Refactored some of the kit catalog display compos for better compatibility
- Demo template now uses and passes full 'component' prop

### Removed

- All demo data files for every component. Now every component contains its own data for demo too. This eases devs and makes component more autogenerable

## [1.5.1] - 2020-08-05

### Changed

- Fix disabled init status of button

## [1.5.0] - 2020-07-27

### Added

- New component checkbox

## [1.4.2] - 2020-07-17

### Changed

- Fix cesium import

## [1.4.1] - 2020-07-17

### Changed

- Fix on rating component

## [1.4.0] - 2020-07-15

### Added

- New component card
- New component rating

### Changed

- Set footer default image to base64

## [1.3.5] - 2020-07-13

### Changed

- Fixes switch translation while changing style

## [1.3.4] - 2020-07-13

### Changed

- fix version for nexus version deployment.

## [1.3.3] - 2020-07-13

### Changed

- Fixes _@_ shortcut for components
- Fixes property name in demo properties section for Switch, Range and Cesium component.

## [1.3.2] - 2020-07-10

### Changed

- Fixes css: relative container for switch input

## [1.3.1] - 2020-07-10

### Added

- Switch component
- Range component

### Changed

- Playground props, value and style assignments

## [1.3.0] - 2020-07-01

### Added

- Switch component
- Range component

### Changed

- Fix errors in coverage report

## [1.2.3] - 2020-06-21

### Added

- Add Docker file

## [1.2.2] - 2020-06-18

### Added

- Unit test for all component except `dl-ui-cesium-map`

### Changed

- Reallocate components of demo and create subdirectory `catalog` for all related with demos and info

## [1.2.1] - 2020-06-15

### Changed

- fix Cesium map name
- fix Cesium map css import

## [1.2.0] - 2020-06-12

### Added

- Cesium Map component
- Handling of prop passing to demo with v-bind
- Properties are now shown in html example
- New block Notes can be used in demo page

### Changed

- Demo inputs arrays

## [1.1.0] - 2020-06-08

### Added

- Accordion component
- Stepper component
- Help page to create a new component

### Changed

- Fix scss and html use template

## [1.0.0] - 2020-06-05

### Added

- Footer component
- Progress circle component
- New templating for demos.
- New directive for syntax highligthing

### Changed

- Fix hover and active color in dl-ui-button
- Fix layout in main page

## [0.1.0] - 2020-04-30

### Added

First version of the product.

- Add dl-ui-button component
- Add dl-ui-progress-bar component
- Add dl-ui-icon component
- Add dl-ui-icon-set component

[6.0.0]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F6.0.0&targetBranch=refs%2Ftags%2F5.2.0
[5.2.0]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F5.2.0&targetBranch=refs%2Ftags%2F5.1.0
[5.1.0]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F5.1.0&targetBranch=refs%2Ftags%2F5.0.0
[5.0.0]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F5.0.0&targetBranch=refs%2Ftags%2F4.2.1
[4.2.1]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F4.2.1&targetBranch=refs%2Ftags%2F4.2.0
[4.2.0]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F4.2.0&targetBranch=refs%2Ftags%2F4.1.2
[3.0.1]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F2.2.6&targetBranch=refs%2Ftags%2F3.0.0
[3.0.0]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F2.2.6&targetBranch=refs%2Ftags%2F2.3.0
[2.2.6]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F2.2.6&targetBranch=refs%2Ftags%2F2.2.5
[2.2.5]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F2.2.5&targetBranch=refs%2Ftags%2F2.2.4
[2.2.4]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F2.2.4&targetBranch=refs%2Ftags%2F2.2.3
[2.2.3]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F2.2.3&targetBranch=refs%2Ftags%2F2.2.2
[2.2.2]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F2.2.2&targetBranch=refs%2Ftags%2F2.2.1
[2.2.1]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F2.2.1&targetBranch=refs%2Ftags%2F2.2.0
[2.2.0]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F2.2.0&targetBranch=refs%2Ftags%2F2.1.0
[2.1.0]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F2.1.0&targetBranch=refs%2Ftags%2F2.0.11
[2.0.11]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F2.0.110&targetBranch=refs%2Ftags%2F2.0.10
[2.0.10]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F2.0.10&targetBranch=refs%2Ftags%2F2.0.9
[2.0.9]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F2.0.9&targetBranch=refs%2Ftags%2F2.0.8
[2.0.8]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F2.0.8&targetBranch=refs%2Ftags%2F2.0.7
[2.0.7]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F2.0.7&targetBranch=refs%2Ftags%2F2.0.6
[2.0.6]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F2.0.6&targetBranch=refs%2Ftags%2F2.0.5
[2.0.5]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F2.0.5&targetBranch=refs%2Ftags%2F2.0.4
[2.0.4]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F2.0.4&targetBranch=refs%2Ftags%2F2.0.2
[2.0.2]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F2.0.2&targetBranch=refs%2Ftags%2F2.0.0
[2.0.0]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F2.0.0&targetBranch=refs%2Ftags%2F1.6.2
[1.6.2]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F1.6.2&targetBranch=refs%2Ftags%2F1.6.1
[1.6.1]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F1.6.1&targetBranch=refs%2Ftags%2F1.6.0
[1.6.0]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F1.6.0&targetBranch=refs%2Ftags%2F1.5.2
[1.5.1]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F1.5.2&targetBranch=refs%2Ftags%2F1.5.1
[1.5.1]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F1.5.1&targetBranch=refs%2Ftags%2F1.5.0
[1.5.0]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F1.5.0&targetBranch=refs%2Ftags%2F1.4.2
[1.4.2]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F1.4.2&targetBranch=refs%2Ftags%2F1.4.1
[1.4.1]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F1.4.1&targetBranch=refs%2Ftags%2F1.4.0
[1.4.0]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F1.4.0&targetBranch=refs%2Ftags%2F1.3.5
[1.3.5]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F1.3.5&targetBranch=refs%2Ftags%2F1.3.4
[1.3.4]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F1.3.4&targetBranch=refs%2Ftags%2F1.3.3
[1.3.3]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F1.3.3&targetBranch=refs%2Ftags%2F1.3.2
[1.3.2]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F1.3.2&targetBranch=refs%2Ftags%2F1.3.1
[1.3.1]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F1.3.1&targetBranch=refs%2Ftags%2F1.3.0
[1.3.0]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F1.3.0&targetBranch=refs%2Ftags%2F1.2.3
[1.2.3]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F1.2.3&targetBranch=refs%2Ftags%2F1.2.2
[1.2.2]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F1.2.2&targetBranch=refs%2Ftags%2F1.2.1
[1.2.1]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F1.2.1&targetBranch=refs%2Ftags%2F1.2.0
[1.2.0]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F1.2.0&targetBranch=refs%2Ftags%2F1.1.0
[1.1.0]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F1.1.0&targetBranch=refs%2Ftags%2F1.0.0
[1.0.0]: https://bitbucket.indra.es/projects/GT_DL/repos/dl-fmwk-vue-comp-kit/compare/commits?sourceBranch=refs%2Ftags%2F1.0.0&targetBranch=refs%2Ftags%2F0.1.0

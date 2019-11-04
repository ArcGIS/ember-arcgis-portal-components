# ember-arcgis-portal-components Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## Unreleased

### Changed
- rename `loading-indicator` to `loading-bars` so that it doesn't step on opendata-ui

## 1.3.5

### Changed
- upgraded ember-cli-sass
- added focus state color to item-picker rows for a11y
- moved `alert` message in item-picker to avoid collisions with facets in the DOM

### Fixed
- injected necessary `session` service into preview components in the `item-picker` [90782](https://esriarlington.tpondemand.com/entity/90782-webmap-picker-preview-adds-extra-https
)

## 1.3.2
### Fixed
- uses updated `ember-arcgis-server-services` version which has corrected logic for when to send tokens to servers (fail-and-retry)

## 1.3.1
### Fixed
- uses updated `ember-arcgis-server-services` version that *correctly* relies on ArcGIS-REST-JS

## 1.3.0
### Fixed
- uses `ember-arcgis-server-services` version that relies on ArcGIS-REST-JS
- a11y of facets radio button list on `item-picker` component so they are keyboard navigable [86483](https://esriarlington.tpondemand.com/entity/86483-item-picker-facets-not-keyboard-navigable)

## [1.2.4]
### Added
- added a11y labels to buttons on `search-form` component for screen readers [86518](https://esriarlington.tpondemand.com/entity/86518)

## [1.2.3]
### Changed
- configure eslint to disallow use of global fetch [86117](https://esriarlington.tpondemand.com/entity/86117-eapc-use-eslint-no-restricted-globals)
- fix bug in dummy app layerpicker route
- replace ember-cli-bootstrap-sassy with ember-bootstrap in dummy app [86647](https://esriarlington.tpondemand.com/entity/86647-add-ember-bootstrap-to-eapc)

## [1.2.2]
### Changed
- remove unnecessary uses of jQuery
- configure eslint to disallow use of jQuery in addon

## [1.2.1]
### Changed
- bump to ember-arcgis-portal-services 1.7.1 & torii-provider-arcgis 2.0

## [1.2.0]
### Added
- Added vertical flex mode [85042](https://esriarlington.tpondemand.com/entity/85042-modals-minimum-height-is-very-tall)

### Fixed
- Hides duplicate 'clear-input' pseudoelement in text inputs on IE/Edge [83956](https://esriarlington.tpondemand.com/entity/83956)
- Properly display thumbnails in the item preview component [85527](https://esriarlington.tpondemand.com/entity/85527-thumbnails-broken-on-item-picker)

### Changed
- item-picker will now initialize with passed in selections if any are passed in
- update `ember-cli` to 2.18.2, `ember-radio-button` to 1.2.4, `ember-cli-active-link-wrapper` to 0.4.0, `ember-cli-github-pages` to 0.2.0, `torii` to 0.10.1, and `torii-provider-arcgis` to 1.2.0

## [1.0.6]
### Fixed
- Padding issue on item picker modals [84646](https://esriarlington.tpondemand.com/entity/84646-chore-fixing-the-padding-issue-on)

## [1.0.5]
### Changed
- replace ember-network w/ ember-fetch

## [1.0.4]
### Fixed
- Style issue where the checkbox and title were not centered in the row in multi mode

## [1.0.3]
### Fixed
- Text fadeout is now placed at the bottom of the description container instead of the description itself

## [1.0.2]
### Fixed
- Removed stray string causing styling issues
### Removed
- Removed tooltips on hover of titles in item picker

## [1.0.1]
### Fixed
- Preview panel now closes when clicking an active row [link](https://github.com/Esri/ember-arcgis-portal-components/issues/76)
- Sidebar now takes full height of the modal instead of taking the height of results
### Changed
- Text of preview back button is now 'Close'

## [1.0.0]
### Added
- magic-checkbox class is now used in multi-select mode
- markdown docs for item-picker
### Changed
- `feature-service-preview` action-up with `{item, options}`
- `item-row` selectItem action uses `next`
- general cleanup and consistency for using `model` internally, and returning `{item, options}`
- preview pane now uses flex box instead of absolute positioning
### Fixed
- Checkboxes no longer jump in Safari when checked [link](https://esriarlington.tpondemand.com/entity/83629-filter-by-initiative-styling-issues-withtooltips)
- On smaller screens, the “Select” button on the bottom right now has a fixed width [link](https://esriarlington.tpondemand.com/entity/83629-filter-by-initiative-styling-issues-withtooltips)
- Old and unused classes have now been removed and the border is no longer visible in the monorepo [link](https://esriarlington.tpondemand.com/entity/83659-chore-search-classes-need-to-cleanup)
### Removed
- Extra padding on item picker has been removed [link](https://github.com/Esri/ember-arcgis-portal-components/issues/63)

## 0.9.4
### Fixed
- Fix issue where checkboxes would not become active on click in multi-select mode [link](https://esriarlington.tpondemand.com/entity/83698-checkboxes-dont-have-active-state-on)

### Removed
- Removed unnecessary tooltip from title

## 0.9.3
### Changed
- More fixes for feature service preview to fix e2e tests

## 0.9.2
### Changed
- Updated feature service preview for e2e fix

## 0.9.1
### Changed
- Updated `onItemClick` to expect a model instead of just an item

## 0.9.0
### Added
- Readded `form-group` class for optimum spacing
- item-pager supports bootstrap 4 (by adding a few classes)
### Fixed
- added semi-colon to fix lint error
em

## 0.8.3
### Added
- Add documentation on `rowComponent` usage
- Update links in documentation
- More minor UX tweaks

## 0.8.2
### Removed
- Remove `form-group` class that was causing margin issues

## 0.8.1
### Removed
- Moved custom translations outside of item picker and into monorepo

## 0.8.0
### Changed
- Updated the item picker to use contextual components and accept an optional parameter of `rowComponent` [link](https://esriarlington.tpondemand.com/entity/83325)
- UX tweaks: [link](https://esriarlington.tpondemand.com/entity/83365)
  - styling updates to checkboxes, padding, and titles [link](https://esriarlington.tpondemand.com/entity/83371)
  - Add a `Deselect All` button for multiselect [link](https://esriarlington.tpondemand.com/entity/83368)

## 0.7.0
### Changed
- Upgrade to ember 2.18 [link](https://esriarlington.tpondemand.com/entity/83424)
### Added
- Prepare for open sourcing of repository [link 1](https://github.com/ArcGIS/ember-arcgis-portal-components/pull/34) [link 2](https://github.com/ArcGIS/ember-arcgis-portal-components/pull/45)
- Add button to remove the current search [link](https://esriarlington.tpondemand.com/entity/82642)

## 0.6.0
### Changed
- add `{{loading-indicator}}` default message string
- move itemPicker strings under `addons.components` so it will be included for translation
- `{{search-form }}` uses `i18nScope` to be consistent with other addons

## 0.5.4
- Preview button now takes user to the selected item [Link](https://esriarlington.tpondemand.com/entity/83079)
- Update styling to better provide visual hierarchy [link](https://esriarlington.tpondemand.com/entity/83080)
- Updated styling and ux for search form [link](https://esriarlington.tpondemand.com/entity/82699)

## 0.5.3
### Fixed
- If only one layer is available, it will now be auto selected [Link](https://esriarlington.tpondemand.com/entity/82678)

## 0.5.2
### Fixed
- added missing util `force-https` and it's tests
### Changed
- `feature-service-preview` will now auto-upgrade protocol to https regardless of the domain. If the request fails, we show an appropriate message.
- Update the language to remove `Feature Service` and `Map Service` in favor of `Data` [Link](https://esriarlington.tpondemand.com/entity/82148)

## 0.5.1
### Added
- Add data-test data attribute to item-picker/item-preview and item-picker/feature-service-preview for use by e2e test element locator.

## 0.5.0
### Added
- Add layer picker to allow users to select which specific layer in a item they'd like to view
- Update documentation on layer picker and restructure old docs to be more concise

## 0.4.2
### Fixed
- Filter now persists when changing pages [Link](https://esriarlington.tpondemand.com/entity/81552)
- Fix issue where the search button was overlaid on top of the side panel [Link](https://esriarlington.tpondemand.com/entity/81552)

## 0.4.1
### Fixed
- Adjusted min height for the item-container [Link](https://esriarlington.tpondemand.com/entity/81443)

### Added
- Search bar component was moved from ember-arcgis-opendata-components to ember-arcgis-portal-components and adjust styling [Link](https://esriarlington.tpondemand.com/entity/81443)

## 0.4.0
### Fixed
- Filter from input now persists across catalogs when switching between them
- Fix issue with importing `isGuid` from util

### Added
- Users can now add the `active: true` flag to the facet (catalog) they'd like to start as the default. [Example](https://arcgis.github.io/ember-arcgis-portal-components/#/itempicker/defaultcatalog)
- Users can search by ID if they know the item ID. [Example](https://arcgis.github.io/ember-arcgis-portal-components/#/itempicker/specificid)

### Changed
- The `Preview` button is now active for all types

## 0.3.7
### Fixed
- issue with facet classnames

## 0.3.6
### Changed
- `item-picker` now accepts a `portalHostName` property which can define where the preview button links out to
- The preview pane will now jump to the top if scrolled down on error message.
- Add classnames to facet radio button labels to facilitate testing

## 0.3.4
### Changed
- Selected item preview pane slightly re-ordered and style for description cutoff slightly changed as well

## 0.3.3
### Fixed
- if `portalOpts === {}` is passed from `item-picker` into search, it would issue an unauthenticated search. Changed so it sends `undefined` and thus the search is executed using the current user's token

## 0.3.2
### Changed
- if no `portalOpts` passed to `item-picker`, call item-service::search with portalOpts = `{}`

## 0.3.1 -- yanked

## 0.3.0
### Changed
- `item-picker` component now accepts a portalOpts parameter, and will use that when searching.
- added example to dummy app
- added doc to README.md


## 0.2.1
### Fixed
- Once a warning appeared select anyway button would never revert to select.

## 0.2.0
### Added
- A validator can be passed in to validate the viability of an item

## 0.1.1
### Fixed
- No search results now properly display No datasets found messages.

## 0.1.0
### Added
- Item picker now takes a catalog spec by way of `catalog`. A query will be generated from anything within catalog.params.query. Other param handling (bbox, etc) will come later.
- Catalog facet tabs
- Number of search result rows can now be set by: `rowCount`
- item-preview pane now has a preview button which links out to the item in question.

[Unreleased]: https://github.com/Esri/ember-arcgis-portal-components/compare/v1.2.3...HEAD
[1.2.3]: https://github.com/Esri/ember-arcgis-portal-components/compare/v1.2.2...1.2.3
[1.2.2]: https://github.com/Esri/ember-arcgis-portal-components/compare/v1.2.1...1.2.2
[1.2.1]: https://github.com/Esri/ember-arcgis-portal-components/compare/v1.2.0...1.2.1
[1.2.0]: https://github.com/Esri/ember-arcgis-portal-components/compare/v1.0.6...1.2.0
[1.0.6]: https://github.com/Esri/ember-arcgis-portal-components/compare/v1.0.5...1.0.6
[1.0.5]: https://github.com/Esri/ember-arcgis-portal-components/compare/v1.0.4...1.0.5
[1.0.4]: https://github.com/Esri/ember-arcgis-portal-components/compare/v1.0.3...1.0.4
[1.0.3]: https://github.com/Esri/ember-arcgis-portal-components/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/Esri/ember-arcgis-portal-components/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/Esri/ember-arcgis-portal-components/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/Esri/ember-arcgis-portal-components/compare/v0.9.4...v1.0.0

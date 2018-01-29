# ember-arcgis-portal-components Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## Unreleased
### Changed
- Update code to prepare for Ember 2.18 update

## [0.5.2]
### Fixed
- added missing util `force-https` and it's tests
### Changed
- `feature-service-preview` will now auto-upgrade protocol to https regardless of the domain. If the request fails, we show an appropriate message.
- Update the language to remove `Feature Service` and `Map Service` in favor of `Data` [Link](https://esriarlington.tpondemand.com/entity/82148)

## [0.5.1]
### Added
- Add data-test data attribute to item-picker/item-preview and item-picker/feature-service-preview for use by e2e test element locator.

## [0.5.0]
### Added
- Add layer picker to allow users to select which specific layer in a item they'd like to view
- Update documentation on layer picker and restructure old docs to be more concise

## [0.4.2]
### Fixed
- Filter now persists when changing pages [Link](https://esriarlington.tpondemand.com/entity/81552)
- Fix issue where the search button was overlaid on top of the side panel [Link](https://esriarlington.tpondemand.com/entity/81552)

## [0.4.1]
### Fixed
- Adjusted min height for the item-container [Link](https://esriarlington.tpondemand.com/entity/81443)

### Added
- Search bar component was moved from ember-arcgis-opendata-components to ember-arcgis-portal-components and adjust styling [Link](https://esriarlington.tpondemand.com/entity/81443)

## [0.4.0]
### Fixed
- Filter from input now persists across catalogs when switching between them
- Fix issue with importing `isGuid` from util

### Added
- Users can now add the `active: true` flag to the facet (catalog) they'd like to start as the default. [Example](https://arcgis.github.io/ember-arcgis-portal-components/#/itempicker/defaultcatalog)
- Users can search by ID if they know the item ID. [Example](https://arcgis.github.io/ember-arcgis-portal-components/#/itempicker/specificid)

### Changed
- The `Preview` button is now active for all types

## [0.3.7]
### Fixed
- issue with facet classnames

## [0.3.6]
### Changed
- `item-picker` now accepts a `portalHostName` property which can define where the preview button links out to
- The preview pane will now jump to the top if scrolled down on error message.
- Add classnames to facet radio button labels to facilitate testing

## [0.3.4]
### Changed
- Selected item preview pane slightly re-ordered and style for description cutoff slightly changed as well

## [0.3.3]
### Fixed
- if `portalOpts === {}` is passed from `item-picker` into search, it would issue an unauthenticated search. Changed so it sends `undefined` and thus the search is executed using the current user's token

## [0.3.2]
### Changed
- if no `portalOpts` passed to `item-picker`, call item-service::search with portalOpts = `{}`

## [0.3.1] -- yanked

## [0.3.0]
### Changed
- `item-picker` component now accepts a portalOpts parameter, and will use that when searching.
- added example to dummy app
- added doc to README.md


## [0.2.1]
### Fixed
- Once a warning appeared select anyway button would never revert to select.

## [0.2.0]
### Added
- A validator can be passed in to validate the viability of an item

## [0.1.1]
### Fixed
- No search results now properly display No datasets found messages.

## [0.1.0]
### Added
- Item picker now takes a catalog spec by way of `catalog`. A query will be generated from anything within catalog.params.query. Other param handling (bbox, etc) will come later.
- Catalog facet tabs
- Number of search result rows can now be set by: `rowCount`
- item-preview pane now has a preview button which links out to the item in question.

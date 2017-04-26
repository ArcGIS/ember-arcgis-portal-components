import Ember from 'ember';

export default Ember.Controller.extend({
  selectedItem: null,

  catalog: Ember.A([
    {
      name: 'All',
      params: {
        query: {
          access: 'public'
        }
      }
    },
    {
      name: 'Apps',
      params: {
        query: {
          type: [
            'Web Mapping Application'
          ],
          typekeywords: [
            '-hubsite',
            '-story'
          ],
          tags: [
            '-survey',
            '-storymap',
            '-site'
          ]
        }
      }
    },
    {
      name: 'Pages',
      params: {
        query: {
          tags: [
            'page'
          ],
          typekeywords: [
            'hubsite'
          ]
        }
      }
    },
    {
      name: 'Sites',
      params: {
        query: {
          tags: [
            'site'
          ],
          typekeywords: [
            'hubSite'
          ]
        }
      }
    },
    {
      name: 'Story Maps',
      params: {
        query: {
          typekeywords: [
            'story'
          ],
          tags: [
            'storymap'
          ]
        }
      }
    },
    {
      name: 'Surveys',
      params: {
        query: {
          typekeywords: [
            'Registered App'
          ],
          tags: [
            'survey'
          ],
          type: [
            'Web Mapping Application'
          ]
        }
      }
    },
    {
      name: 'Webmaps',
      params: {
        query: {
          type: [
            'Web Map',
            '-Web Mapping Application'
          ],
          tags: [
            'WebMap'
          ]
        }
      }
    },
    {
      name: 'My favorite enviro apps',
      params: {
        query: {
          tags: [
            'environment',
            'hydrology'
          ],
          type: [
            'Web Mapping Applications'
          ]
        }
      }
    }
  ]),

  actions: {
    onSelectItem (selected) {
      Ember.$('#myModal').modal('hide');
      this.set('selectedItem', selected);
    },
  }
});

import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    onShowMetadata (field) {
      alert(`You need to show metadata for ${field.name}`);
    },
    onSelectField (field) {
      alert(`${field.name} seleced.`);
    }
  }
});

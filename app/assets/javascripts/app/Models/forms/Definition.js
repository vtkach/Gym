;(function (app) {

    app.models.DefinitionModel = app.models.PhysicalTabModel.extend({

        urlPart: '/definitions/',

        defaults: {
            age: '',
            date: '',
            proteins: 0,
            fats: 0,
            carbohydrates: 0,
            calories: 0
        },

        wrapperJson: 'definition',

        resetToDefaults: function () {
            this.set(_.extend({}, this.defaults, {
                age: this.get('age')
            }));
        }
    });

} (app));
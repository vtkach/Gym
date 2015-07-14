;(function (app) {

    app.models.DefinitionModel = app.models.PhysicalTabModel.extend({

        urlPart: '/definitions/',

        defaults: {
            age: '',
            date: '',
            calculatedProteins: 0,
            calculatedFats: 0,
            calculatedCarbohydrates: 0,
            calculatedCalories: 0
        },

        wrapperJson: 'definition',

        resetToDefaults: function () {
            this.set(this.defaults);
        }
    });

} (app));
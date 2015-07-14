;(function (app) {

    app.models.DefinitionModel = app.models.PhysicalTabModel.extend({

        urlPart: '',

        defaults: {
            calculatedProteins: 0,
            calculatedFats: 0,
            calculatedCarbohydrates: 0,
            calculatedCalories: 0
        },

        wrapperJson: 'definition'
    });

} (app));
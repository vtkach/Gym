;(function (app) {

    app.models.DefinitionModel = app.models.PhysicalTabModel.extend({

        urlPart: '',

        defaults: {},

        wrapperJson: 'definition'
    });

} (app));
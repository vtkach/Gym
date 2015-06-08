;(function (app) {

    app.models.DefinitionModel = app.models.BaseModel.extend({

        defaults: {},

        toJSON: function () {
            return {
                definition: _.clone(this.attributes)
            }
        }

    });

} (app));
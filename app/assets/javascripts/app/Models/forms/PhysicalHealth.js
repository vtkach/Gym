;(function (app) {

    app.models.PhysicalHealthModel = app.models.BaseModel.extend({

        defaults: {},

        toJSON: function () {
            return {
                physicalHealth: _.clone(this.attributes)
            }
        }

    });

} (app));
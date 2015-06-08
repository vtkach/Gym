;(function (app) {

    app.models.BodyIndexModel = app.models.BaseModel.extend({

        defaults: {},

        toJSON: function () {
            return {
                bodyIndex: _.clone(this.attributes)
            }
        }

    });

} (app));
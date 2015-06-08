;(function (app) {

    app.models.PhysStateFormModel = app.models.BaseModel.extend({

        defaults: {},

        toJSON: function () {
            return {
                physStateForm: _.clone(this.attributes)
            }
        }

    });

} (app));
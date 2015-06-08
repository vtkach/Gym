;(function (app) {

    app.models.MotorActivityModel = app.models.BaseModel.extend({

        urlPart: '/motor_activity/',

        defaults: {},



        calculate: function () {

        },

        toJSON: function () {
            return {
                motorActivity: _.clone(this.attributes)
            }
        }

    });

} (app));
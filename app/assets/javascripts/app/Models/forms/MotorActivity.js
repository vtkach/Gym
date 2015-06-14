;(function (app) {

    app.models.MotorActivityModel = app.models.BaseModel.extend({

        urlPart: '/motor_activities/',

        defaults: {},

        wrapperJson: 'motorActivity',

        calculate: function () {

        }

    });

} (app));
;(function (app) {

    app.models.MotorActivityModel = app.models.PhysicalTabModel.extend({

        urlPart: '/motor_activities/',

        defaults: {},

        wrapperJson: 'motorActivity',

        calculate: function () {

        }

    });

} (app));
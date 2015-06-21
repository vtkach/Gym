;(function (app) {

    app.models.MotorActivityModel = app.models.PhysicalTabModel.extend({

        urlPart: '/motor_activities/',

        defaults: {
            age: '',
            date: '',
            weight: '',
            height: '',
            activities: [{
                startTime: '',
                executionTime: '',
                activityType: '',
                activityLevel: '',

            }]
        },

        wrapperJson: 'motorActivity',

        calculate: function () {

        }

    });

} (app));
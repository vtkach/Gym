;(function (app) {

    app.models.ActivityRowModel = Backbone.Model.extend({

        defaults: {
            activityPeriod: '',
            activityLevel: '',
            description: '',
            startData: ''
        }

    });

} (app));
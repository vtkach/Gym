;(function (app) {

    app.models.ActivityRowModel = app.models.BaseModel.extend({

        urlPart: '/activities/',

        defaults: {
            activityPeriod: '',
            activityLevel: '',
            description: '',
            startDate: ''
        }

    });

} (app));
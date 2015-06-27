;(function (app) {

    app.models.ActivityRowModel = app.models.BaseModel.extend({

        urlPart: '/activities/',

        defaults: {
            activityPeriod: '',
            activityLevel: 'basic',
            description: '',
            startDate: ''
        }

    });

} (app));
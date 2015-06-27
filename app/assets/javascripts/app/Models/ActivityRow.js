;(function (app) {

    app.models.ActivityRowModel = app.models.BaseModel.extend({

        urlPart: '/activities/',

        defaults: {
            activityPeriod: '',
            activityLevel: 'basic',
            description: '',
            startDate: ''
        },

        validation: {
            startDate: {
                range: [0, 24]
            },

            activityPeriod: {
                range: [0, 1140]
            },

            activityLevel: {
                oneOf: [
                    'basic',
                    'sitting',
                    'small',
                    'middle',
                    'high'
                ]
            },

            description: {
                minLength: 1
            }
        }

    });

} (app));
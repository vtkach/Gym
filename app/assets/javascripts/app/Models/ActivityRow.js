;(function (app) {

    app.models.ActivityRowModel = app.models.BaseModel.extend({

        urlPart: '/activities/',

        defaults: {
            activityLevel: 'basic',
            activityPeriod: '',
            startMinute: '',
            description: '',
            startHour: ''
        },

        validation: {
            startHour: {
                range: [0, 24]
            },

            startMinute: {
                range: [0, 60]
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
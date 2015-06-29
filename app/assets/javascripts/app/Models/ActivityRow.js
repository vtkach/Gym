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
                range: [0, 23],
                msg: 'Година повинна знаходитися в інтервалі від 0 до 23!'
            },

            startMinute: {
                range: [0, 59],
                msg: 'Хвилини повинні знаходитися в інтервалі від 0 до 59!'
            },

            description: {
                minLength: 1,
                msg: 'Опис не може бути порожнім!'
            },

            activityPeriod: {
                range: [1, 1140],
                msg: 'Період активності повинен знаходитися в діапазоні від 1 до 1140 хвилин!'
            },

            activityLevel: {
                oneOf: [
                    'basic',
                    'sitting',
                    'small',
                    'middle',
                    'high'
                ],
                msg: 'Обрано неправильний рівень активності!'
            }
        }

    });

} (app));
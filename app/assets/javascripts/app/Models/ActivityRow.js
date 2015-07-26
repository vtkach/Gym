;(function (app) {

    app.models.ActivityRowModel = app.models.BaseModel.extend({

        urlPart: '/activities/',

        defaults: {
            activityMinute: '00',
            activityLevel: 'bl',
            startMinute: '00',
            activityHour: '0',
            description: '',
            startHour: '6'
        },

        validation: {
            startHour: {
                range: [5, 24],
                msg: 'Година повинна знаходитися в інтервалі від 6 до 24!'
            },

            startMinute: {
                range: [0, 56],
                msg: 'Хвилини повинні знаходитися в інтервалі від 0 до 55!'
            },

            description: {
                minLength: 1,
                msg: 'Опис не може бути порожнім!'
            },

            activityHour: {
                range: [0, 24],
                msg: 'Період активності повинен знаходитися в діапазоні від 0 до 24 годин!'
            },

            activityMinute: {
                range: [0, 60],
                msg: 'Період активності повинен знаходитися в діапазоні від 0 до 60 хвилин!'
            },

            activityLevel: {
                oneOf: ['bl', 'sml', 'ml', 'bl', 'hl'],
                msg: 'Обрано неправильний рівень активності!'
            }
        }

    });

} (app));
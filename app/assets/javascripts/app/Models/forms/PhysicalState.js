;(function (app) {

    app.models.PhysicalStateModel = app.models.PhysicalTabModel.extend({

        urlPart: '/physical_states/',

        wrapperJson: 'physicalState',

        defaults: {
            age: '',
            date: '',
            height: '',
            weight: '',
            circumference: '',
            volume: '',
            bodyindex: '',
            lifeindex: ''
        },

        additionalFields: {
            height: {
                range: [20, 250],
                msg: 'Зріст повинен бути у діапазоні вiд 20 до 250 см!'
            },

            weight: {
                range: [20, 150],
                msg: 'Вага повинна бути в діапазоні від 20 до 150 кг!'
            },

            circumference: {
                range: [20, 160],
                msg: 'Окружність грудної клітки повинна бути в діапазоні від 20 до 160 см!'
            }
        },

        calculate: function () {
            var weight = this.get('weight'),
                bodyIndex = weight / (this.get('height')) * 100,
                lifeIndex = this.get('volume') / weight;

            this.set({
                bodyindex: bodyIndex.toFixed(2),
                lifeindex: lifeIndex.toFixed(2)
            });
        }

    });

} (app));
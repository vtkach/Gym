;(function (app) {

    app.models.PhysicalHealthModel = app.models.PhysicalTabModel.extend({

        urlPart: '/physical_health_states/',
        // TODO: remove values from defaults properties
        defaults: {
            age: '',
            date: '',
            height: '180',
            weight: '70',
            pressure: '120',
            volume: '5000',
            wrist: '50',
            pulse: '60',
            pulseRecovering: '80',
            result: ''
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

            pressure: {
                range: [40, 260],
                msg: 'Тиск повинен бути в діапазоні від 40 до 260!'
            },

            volume: {
                range: [1000, 7000],
                msg: 'Життєва ємність легенів повинна бути в діапазоні від 1000 до 7000 мл!'
            },

            wrist: {
                range: [0, 100],
                msg: 'Сила кисті повинна бути в діапазоні від 0 до 100 кг'
            },

            pulse: {
                range: [40, 250],
                msg: 'Пульс повинен бути в діапазоні від 40 до 250 ударів за хвилину'
            },

            pulseRecovering: {
                min: 0,
                msg: 'Час відновлення пульсу не може бути менше 0!'
            }
        },

        wrapperJson: 'physicalHealth',

        calculate: function () {
            var gender = app.instances.profile.get('gender'),
                weight = this.get('weight'),
                indicatorResults = {
                    indicator1: weight / Math.pow(this.get('height') / 100, 2),
                    indicator2: this.get('volume') / weight,
                    indicator3: this.get('wrist') * 100 / weight,
                    indicator4: this.get('pulse') * this.get('pressure') / 100,
                    indicator5: this.get('pulseRecovering')
                },
                properties = _.keys(indicatorResults),
                result;

            result = _.reduce(properties, function (memo, indicatorName) {
                var index = _.findIndex(this.RANGES[gender][indicatorName], function (range) {
                    var val = indicatorResults[indicatorName];

                    return val >= range.min && val <= range.max;
                });

                return memo + this.grades[indicatorName][index];
            }, 0, this);

            this.set('result', result);
        },

        grades: {
            indicator1: [-2, -1, 0, 1, 2],
            indicator2: [-1, 0, 1, 2, 3],
            indicator3: [-1, 0, 1, 2, 3],
            indicator4: [-2, -1, 0, 3, 5],
            indicator5: [-2, 1, 3, 5, 7]
        },

        RANGES: {
            male: {
                indicator1: [
                    {
                        min: 0,
                        max: 18.9
                    }, {
                        min: 19,
                        max: 20
                    }, {
                        min: 20.1,
                        max: 25
                    }, {
                        min: 25.1,
                        max: 28
                    }, {
                        min: 28.1,
                        max: 500
                    }
                ],

                indicator2: [
                    {
                        min: 0,
                        max: 50
                    }, {
                        min: 51,
                        max: 55
                    }, {
                        min: 56,
                        max: 60
                    }, {
                        min: 61,
                        max: 65
                    }, {
                        min: 66,
                        max: 500
                    }
                ],

                indicator3: [
                    {
                        min: 0,
                        max: 60
                    }, {
                        min: 61,
                        max: 65
                    }, {
                        min: 66,
                        max: 70
                    }, {
                        min: 71,
                        max: 80
                    }, {
                        min: 81,
                        max: 500
                    }
                ],

                indicator4: [
                    {
                        min: 111,
                        max: 500
                    }, {
                        min: 95,
                        max: 110
                    }, {
                        min: 85,
                        max: 94
                    }, {
                        min: 70,
                        max: 84
                    }, {
                        min: 0,
                        max: 69
                    }
                ],

                indicator5: [
                    {
                        min: 180,
                        max: 500
                    }, {
                        min: 120,
                        max: 179
                    }, {
                        min: 90,
                        max: 119
                    }, {
                        min: 60,
                        max: 89
                    }, {
                        min: 0,
                        max: 59
                    }
                ]
            },

            female: {
                indicator1: [
                    {
                        min: 0,
                        max: 16.9
                    }, {
                        min: 17,
                        max: 18
                    }, {
                        min: 18.1,
                        max: 23.8
                    }, {
                        min: 23.9,
                        max: 26
                    }, {
                        min: 26.1,
                        max: 500
                    }
                ],

                indicator2: [
                    {
                        min: 0,
                        max: 40
                    }, {
                        min: 41,
                        max: 45
                    }, {
                        min: 46,
                        max: 50
                    }, {
                        min: 51,
                        max: 55
                    }, {
                        min: 56,
                        max: 500
                    }
                ],

                indicator3: [
                    {
                        min: 0,
                        max: 40
                    }, {
                        min: 41,
                        max: 50
                    }, {
                        min: 51,
                        max: 55
                    }, {
                        min: 56,
                        max: 60
                    }, {
                        min: 61,
                        max: 500
                    }
                ],

                indicator4: [
                    {
                        min: 111,
                        max: 500
                    }, {
                        min: 95,
                        max: 110
                    }, {
                        min: 85,
                        max: 94
                    }, {
                        min: 70,
                        max: 84
                    }, {
                        min: 0,
                        max: 69
                    }
                ],

                indicator5: [
                    {
                        min: 180,
                        max: 500
                    }, {
                        min: 120,
                        max: 179
                    }, {
                        min: 90,
                        max: 119
                    }, {
                        min: 60,
                        max: 89
                    }, {
                        min: 0,
                        max: 59
                    }
                ]
            }
        }

    });

} (app));
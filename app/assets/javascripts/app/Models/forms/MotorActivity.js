;(function (app) {

    app.models.MotorActivityModel = app.models.PhysicalTabModel.extend({

        urlPart: '/motor_activities/',

        wrapperJson: 'motorActivity',

        defaults: {
            date: '',
            age: '',
            smlresult: 0,
            blresult: 0,
            slresult: 0,
            mlresult: 0,
            hlresult: 0
        },

        initialize: function () {
            app.models.PhysicalTabModel.prototype.initialize.call(this);
            this.activityCollection = new app.collections.ActivityCollection();
        },

        parse: function () {},

        addField: function (accum, field) {
            accum[field] = this.get(field);

            return accum;
        },

        toJSON: function () {
            var arrayToSend = [
                'smlresult',
                'blresult',
                'slresult',
                'mlresult',
                'hlresult',
                'date',
                'age'
            ];

            return {
                motorActivity: _.reduce(arrayToSend, this.addField, {}, this)
            };
        },

        converterForActivityPercent: function (dir, val) {
            if (dir === Backbone.ModelBinder.Constants.ModelToView) {
                return val || '';
            }

            return val;
        },

        converterForActivityLevel: function (dir, val) {
            var hours, minutes, result;

            if (dir === Backbone.ModelBinder.Constants.ModelToView) {
                hours = parseInt(val / 60, 10);
                minutes = val % 60;

                if (hours) {
                    result = hours + ' год ';
                }
                if (minutes) {
                    result += (minutes + ' хв');
                }

                return result;
            }

            return val;
        },

        calculate: function () {
            var activityGroups = this.activityCollection.groupBy('activityLevel'),
                activities = _.keys(activityGroups),
                TWENTY_FOUR_HOURS = 1440,
                PER_CENTS = 100,
                results = {
                    smlpercent: 0,
                    blpercent: 0,
                    slpercent: 0,
                    mlpercent: 0,
                    hlpercent: 0,
                    smlresult: 0,
                    blresult: 0,
                    slresult: 0,
                    mlresult: 0,
                    hlresult: 0
                };

            activities.forEach(function (key) {
                results[key + 'result'] = activityGroups[key].reduce(this.reduceActivityTime, 0);
                results[key + 'percent'] = parseInt((results[key + 'result'] / TWENTY_FOUR_HOURS) * PER_CENTS, 10);
            }.bind(this));

            this.set(results);
        },

        reduceActivityTime: function (accum, model) {
            var activityMinute = parseInt(model.get('activityMinute'), 10),
                activityHour = parseInt(model.get('activityHour'), 10),
                MINUTES_PER_HOUR = 60;

            _.isNumber(activityHour) && (accum += activityHour * MINUTES_PER_HOUR);
            _.isNumber(activityMinute) && (accum += activityMinute);

            return accum;
        }

    });

} (app));
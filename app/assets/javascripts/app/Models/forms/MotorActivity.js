;(function (app) {

    app.models.MotorActivityModel = app.models.PhysicalTabModel.extend({

        urlPart: '/motor_activities/',

        wrapperJson: 'motorActivity',

        defaults: {
            age: '',
            date: '',
            activities: ''
        },

        initialize: function () {
            app.models.PhysicalTabModel.prototype.initialize.call(this);
            this.activityCollection = new app.collections.ActivityCollection();
        },

        parse: function (response) {
            this.activityCollection.reset(response.activities);
            return response;
        },

        toJSON: function () {
            var motorActivity = _.omit(this.attributes, 'activities');

            return {
                activities: this.activityCollection.toJSON(),
                motorActivity: motorActivity
            };
        },

        calculate: function () {
            var result = {},
                totalTime = 0,
                isValid;

            isValid = this.activityCollection.every(function (model) {
                var activityType,
                    activityPeriod;

                if (model.validate()) {
                    return false;
                }

                activityType = model.get('activityLevel');
                activityPeriod = parseInt(model.get('activityPeriod'), 10);

                result[activityType] = result[activityType] || 0;
                result[activityType] += activityPeriod;
                totalTime += activityPeriod;

                return true;
            });

            if (!isValid) {
                return ;
            }

            _.each(result, function (value, key) {
                var activityPercent = value / totalTime * 100;
                result[key + '-percent'] = activityPercent.toFixed(4);
            });

            this.set(result);
        }

    });

} (app));
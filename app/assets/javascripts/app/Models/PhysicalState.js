;(function (app) {

    app.models.PhysicalStateModel = app.models.BaseModel.extend({

        urlPart: '/physical_states/',

        defaults: {
            circumference: '',
            volume: '',
            height: '',
            weight: '',
            date: '',
            bodyindex: '',
            lifeindex: ''
        },

        calculate: function () {
            var weight = this.get('weight'),
                bodyIndex = weight / (this.get('height')) * 100,
                lifeindex = this.get('volume') / weight;

            this.set({
                bodyindex: bodyIndex,
                lifeindex: lifeindex
            });
        },

        toJSON: function () {
            return {
                physicalState: _.clone(this.attributes)
            }
        }

    });

} (app));
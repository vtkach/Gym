;(function (app) {

    app.models.BodyIndexModel = app.models.BaseModel.extend({

        defaults: {},

        wrapperJson: 'bodyIndex',

        classification: [{
            min: 0,
            max: 18.5
        }, {
            min: 18.5,
            max: 24.9
        }, {
            min: 25,
            max: 29.9
        }, {
            min: 30,
            max: 34.9
        }, {
            min: 35,
            max: 39.9
        }, {
            min: 40,
            max: 200
        }],

        initialize: function () {
            this.listenTo(this, 'change:height change:weight', this.calculate);
        },

        calculate: function () {
            this.set('bodyindex', this.get('weight') / (this.get('height')) * 100);
        }

    });

} (app));
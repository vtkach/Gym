;(function (app) {

    app.views.BodyIndexView = app.views.PhysicalTabView.extend({

        colors: [
            'warning',
            'success',
            'warning',
            'danger',
            'danger',
            'danger'
        ],

        eachRange: function (range) {
            var bodyindex = this.model.get('bodyindex');

            return range.min < bodyindex && range.max > bodyindex;
        },

        coloredTableRow: function () {
            var neededRow = _.findKey(this.model.classification, this.eachRange.bind(this));

            this.$('tbody tr').removeAttr('class')
                .eq(neededRow)
                .addClass(this.colors[neededRow]);
        },

        afterRender: function () {
            this.listenTo(this.model, 'change:bodyindex', this.coloredTableRow);
        }

    }, {
        profileBindings: {
            gender: {
                selector: '[name=gender]',
                    converter: function (dir, val) {
                    var dict = {
                        male: 'Мужчина',
                        female: 'Женщина'
                    };

                    if (dir === Backbone.ModelBinder.Constants.ModelToView) {
                        return dict[val];
                    }

                    return val;
                }
            },

            firstName: '[name=firstName]',
            lastName: '[name=lastName]',
            surname: '[name=surname]'
        }
    });

} (app));
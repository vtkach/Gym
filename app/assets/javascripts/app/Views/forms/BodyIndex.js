;(function (app) {

    app.views.BodyIndexView = app.views.PhysicalTabView.extend({

        railsRoute: '/body_index/',

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

    });

} (app));
;(function (app) {

    app.views.ActivityRowView = app.helpers.BaseView.extend({

        tagName: 'tr',

        events: {
            'click .glyphicon-remove': 'removeRow'
        },

        removeRow: function () {
            this.model.destroy();
        }

    });

} (app));
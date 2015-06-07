;(function (app) {

    app.views.FormView = app.views.BaseView.extend({

        afterRender: function () {
            //this.$('button').on('click', this.model.save.bind(this.model));
        }

    });

} (app));
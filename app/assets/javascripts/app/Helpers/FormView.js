;(function (app) {

    app.helpers.FormView = app.helpers.BaseView.extend({

        afterRender: function () {
            //this.$('button').on('click', this.model.save.bind(this.model));
        }

    });

} (app));
;(function (app) {

    app.helpers.FormView = app.helpers.BaseView.extend({

        afterRender: function () {
            console.warn(this.model.toJSON())
            //this.$('button').on('click', this.model.save.bind(this.model));
        }

    });

} (app));
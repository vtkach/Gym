;(function (app) {

    app.views.PhysicalStateView = app.views.PhysicalTabView.extend({

        onInit: function () {
            this.model = new app.models.PhysicalStateModel();
        },

        afterRender: function () {
            console.warn(this);
            //this.$('[name=date]').datepicker();
            //this.$('button').on('click', this.onSaveEvent.bind(this));
        }


    }, {
        //bindings: {
        //    firstName: '[name=firstName]',
        //    lastName: '[name=lastName]',
        //    surname: '[name=surname]',
        //
        //    gender: {
        //        selector: '[name=gender]',
        //        converter: function (dir, value, attr, model) {
        //            var gender = {
        //                male: 'М',
        //                female: 'Ж'
        //            };
        //
        //            return gender[value];
        //        }
        //    }
        //}
    });

} (app));
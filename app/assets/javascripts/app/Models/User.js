;(function (app) {

    app.models.UserModel = Backbone.Model.extend({

        url: 'users/sign_in',

        defaults: {
            email: 'stoo@ukr.net',
            password: 'eybdthcfk456'
        },

        initialize: function () {
            this.fetch();
        },

        toJSON: function () {
            return {
                user: this.attributes
            };
        },

        checkSession: function () {
            return this.fetch({
                url: '/users/check_session'
            });
        }

    });

} (app));

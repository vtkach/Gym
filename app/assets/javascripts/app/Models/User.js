;(function (app) {

    app.models.UserModel = Backbone.Model.extend({

        url: 'users/sign_in',

        paramRoot: 'user',

        defaults: {
            email: 'stoo@ukr.net',
            password: 'eybdthcfk456'
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

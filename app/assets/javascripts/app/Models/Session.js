;(function (app) {

    app.models.SessionModel = Backbone.Model.extend({

        url: 'users/sign_in',

        default: {
            password: '',
            email: ''
        },

        toJSON: function () {
            return {
                user: _.clone(this.attributes)
            };
        },

        checkSession: function () {
            return this.fetch({
                url: '/users/check_session'
            });
        },

        signOut: function () {
            return this.destroy({
                url: '/users/sign_out'
            });
        },

        logIn: function () {
            return this.save({}, {
                url: '/users/sign_in',
                method: 'POST'
            });
        }

    });

} (app));

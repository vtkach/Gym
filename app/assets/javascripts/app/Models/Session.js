;(function (app) {

    app.models.SessionModel = app.models.BaseModel.extend({

        url: 'users/sign_in',

        defaults: {
            password: '',
            email: ''
        },


        checkSession: function () {
            return this.ajax({
                url: '/users/check_session'
            });
        },

        signOut: function () {
            return this.ajax({
                url: '/users/sign_out',
                method: 'DELETE'
            });
        },

        logIn: function (userData) {
            return this.ajax({
                url: '/users/sign_in',
                method: 'POST',
                dataType: 'JSON',
                data: {
                    user: userData
                }
            });
        },

        createUser: function (userData) {
            return this.ajax({
                url: '/users',
                method: 'POST',
                dataType: 'JSON',
                data: {
                    user: userData
                }
            });
        }

    });

} (app));

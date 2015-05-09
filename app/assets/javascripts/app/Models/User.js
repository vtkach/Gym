/**
 * Created by victor on 19.04.15.
 */
;(function (app) {

    app.models.UserModel = Backbone.Model.extend({

        url: '/users/sign_in',

        defaults: {
            user: {
                password: 'eybdthcfk456',
                email: 'stoo@ukr.net'
            }
        }

    });

} (app));

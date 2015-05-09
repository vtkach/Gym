/**
 * Created by victor on 19.04.15.
 */
;(function (app) {

    app.views.MainView = Backbone.View.extend({

        $mainContainer: null,

        el: 'body',

        events: {
            'click .glyphicon-folder-open': 'logout'
        },

        onSuccessCallback: function () {
            debugger;
        },

        onErrorCallback: function () {
            debugger;
        },

        logout: function () {
            app.instances.user.url = 'users/sign_out';
            app.instances.user.destroy().then(
                this.onSuccessCallback,
                this.onErrorCallback
            );
        },

        cacheElements: function () {
            this.$mainContainer = this.$('section.row');
        }

    });

} (app));

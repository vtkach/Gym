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
            app.instances.user.clear();
        },

        onErrorCallback: function () {
            debugger;
        },

        logout: function () {
            app.instances.session.signOut().then(
                this.onSuccessCallback,
                this.onErrorCallback
            );
        },

        cacheElements: function () {
            this.$mainContainer = this.$('section.row');
        }

    });

} (app));

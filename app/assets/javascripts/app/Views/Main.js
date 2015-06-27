;(function (app) {

    app.views.MainView = Backbone.View.extend({

        $mainContainer: null,

        el: 'body',

        events: {
            'click .glyphicon-folder-open': 'logout'
        },

        initialize: function () {
            this.listenTo(Backbone.Events, 'is-login', this.toggleMenuItem);
            this.modalView = new app.views.ModalView();
        },

        toggleMenuItem: function (mode) {
            this.$menuListItem.not(this.$profileItem).toggleClass('disabled', mode);
            this.$profileItem.toggleClass('disabled', !mode);
        },

        onSuccessCallback: function () {
            app.instances.user.clear();
            app.instances.profile.clear();
            this.toggleMenuItem(false);
        },

        logout: function () {
            app.instances.session.signOut()
                .then(this.onSuccessCallback.bind(this));
        },

        cacheElements: function () {
            this.$mainContainer = this.$('section.row');
            this.$menuListItem = this.$('#menu li');
            this.$profileItem = this.$menuListItem.last();
        }

    });

} (app));

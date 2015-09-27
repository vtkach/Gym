;(function (app) {

    app.views.MainView = Backbone.View.extend({

        $mainContainer: null,

        el: 'body',

        events: {
            'click .loader-container': 'goHome',
            'click .logout': 'logout'
        },

        initialize: function () {
            this.listenTo(Backbone.Events, 'is-login', this.toggleMenuItem)
                .listenTo(Backbone, 'scroll-to-elem', this.scrollToElement);

            this.modalView = new app.views.ModalView();
        },

        scrollToElement: function ($elem) {
            this.$el.animate({
                scrollTop: $elem.offset().top
            }, 1000);
        },

        goHome: function () {
            app.instances.router.navigate('accessed/home', {
                trigger: true
            });
        },

        toggleMenuItem: function (mode) {
            this.$menuListItem.not(this.$profileItem).toggle(!mode);
            this.$profileItem.toggle(mode);
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
            this.checkUser();
        },

        checkUser: function () {
            var isValidUser = app.instances.user.isValidUser();
            this.toggleMenuItem(isValidUser);
        }

    });

} (app));

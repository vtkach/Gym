;(function (win) {

    win.views.BaseView = Backbone.View.extend({

        events: {
            'click button': 'prevDefault',
            'click .cancel': 'close'
        },

        initialize: function (options) {
            this._modelBinder = new Backbone.ModelBinder();
            this.tplName = options.tplName;
            this.model = options.model;
            this.onInit();
        },

        onInit: function () {},

        prevDefault: function (event) {
            event.preventDefault();
        },

        onClose: function () {

        },

        binding: function () {
            this._modelBinder.bind(
                this.model,
                this.$(':not(#profile)'),
                this.constructor.bindings
            );

            this.extendBinding();
        },

        extendBinding: function () {

        },

        getTemplate: function (tplName) {
            var content = document.querySelector('#' + tplName).content;

            return document.importNode(content, true);
        },

        afterRender: function () {

        },

        render: function () {
            this.$el.html(this.getTemplate(this.tplName));
            this.binding();
            this.afterRender();

            return this;
        },

        close: function () {
            this.stopListening();
            this.remove();
            this.onClose();
        },

        extendEvents: function (events) {
            this.events = _.clone(this.events);

            _.extend(this.events, events);
        }

    }, {
        showFlashMessage: function (messageType, xhr, type, message) {
            var $flashMessage = $('.flash-message'),
                classesToRemove = [
                    'alert-warning',
                    'alert-success',
                    'alert-danger',
                    'notify'
                ].join(' '),
                //TODO: remove this hell
                text = xhr.errors || (xhr.responseJSON && xhr.responseJSON.errors) || message;

            $flashMessage.removeClass(classesToRemove)
                .find('.text-message')
                .text(text);

            _.delay($flashMessage.addClass.bind($flashMessage, 'alert-' + messageType + ' notify'), 100);
        }
    });

} (app));
;(function (win) {

    win.helpers.BaseView = Backbone.View.extend({

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
                app.instances.session,
                this.$el,
                this.constructor.bindings
            );
        },

        getTemplate: function (tplName) {
            var content = document.querySelector('#' + tplName).content;

            return document.importNode(content, true);
        },

        render: function () {
            this.$el.html(this.getTemplate(this.tplName));
            this.binding();

            return this;
        },

        close: function () {
            this.stopListening();
            this.remove();
            this.onClose();
        }

    }, {
        showFlashMessage: function (messageType, xhr, text) {
            var $flashMessage = $('.flash-message'),
                classesToRemove = [
                    'alert-warning',
                    'alert-success',
                    'alert-danger',
                    'notify'
                ].join(' ');

            $flashMessage.removeClass(classesToRemove)
                .find('.text-message')
                .text(text);

            _.delay($flashMessage.addClass.bind($flashMessage, 'alert-' + messageType + ' notify'), 100);
        }
    });

} (app));
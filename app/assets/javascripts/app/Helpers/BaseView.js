;(function (win) {

    win.views.BaseView = Backbone.View.extend({

        events: {
            'click button': 'prevDefault',
            'click .cancel': 'close',
            'keypress [name=datepicker]': 'disableKeyboard'
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
                this.el,
                this.constructor.bindings
            );

            this.extendBinding();
        },

        extendBinding: function () {

        },

        getTemplate: function (tplName) {
            var template = document.querySelector('#' + tplName);

            if (!template) {
                template = document.querySelector('#home');
            }

            return document.importNode(template.content, true);
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

        showValidationError: function (model, errors) {
            var errorFields = _.keys(errors),
                message = errors[errorFields[0]];

            this.constructor.showFlashMessage('danger', message);
        },

        showServerError: function (model, xhr) {
            this.constructor.showFlashMessage('danger', xhr.responseJSON.errors);
        },

        showSuccessMessage: function () {
            this.constructor.showFlashMessage('success', 'Збережено!');
        },

        extendEvents: function (events) {
            this.events = _.clone(this.events);

            _.extend(this.events, events);
        },

        dateConverter: function (dir, val, attr, model) {
            var date = new Date(val);

            return [
                date.getDate(),
                date.getMonth() + 1,
                date.getFullYear()
            ].join('/');
        },

        disableKeyboard: function (e) {
            e.preventDefault();
        }

    }, {
        showFlashMessage: function (messageType, message) {
            var $flashMessage = $('.flash-message'),
                classesToRemove = [
                    'alert-warning',
                    'alert-success',
                    'alert-danger',
                    'notify'
                ].join(' ');

            $flashMessage.removeClass(classesToRemove)
                .find('.text-message')
                .text(message);

            _.delay($flashMessage.addClass.bind($flashMessage, 'alert-' + messageType + ' notify'), 100);
        }
    });

} (app));
;(function (app, window) {

    app.views.YouShouldKnowView = app.views.InfoTabView.extend({

        events: {
            'click .scroll-bar': 'scrollTo'
        },

        videos: [{
            header: 'Street workout',
            id: 'O5fe4s5qSns'
        }, {
            header: 'Aквааеробіка',
            id: 'VAi6GipVd7s'
        }, {
            header: 'Атлетична гімнастика',
            id: 'fNlA1Dl9Zy0'
        }, {
            header: 'Базова (класична) аеробіка',
            id: 'KkUHKvL6hjk'
        }, {
            header: 'Плавання',
            id: 'HFdTG-3NCFc'
        }, {
            header: 'Роуп скіппінг',
            id: 'IHv2nzfV3tw'
        }, {
            header: 'Фітбол',
            id: 'QvO8VUpNeFw'
        }],

        afterRender: function() {
            this.$videos = this.$('.videos');
            this.$window = $(window);
            this.onScrollHandler = this.onScrollHandler.bind(this);
            this.$window.on('scroll', this.onScrollHandler);
        },

        onScrollHandler: function () {
            this.scrollPosition = this.scrollPosition || this.$videos.offset().top - screen.height * 2;

            if (window.pageYOffset > this.scrollPosition) {
                this.$videos.append(this.getVideos());
                this.$window.off('scroll', this.onScrollHandler);
            }
        },

        onClose: function () {
            app.views.UserActionsView.prototype.onClose.call(this);
            this.$window.off('scroll', this.onScrollHandler);
        },

        getVideos: function () {
            var fragment = document.createDocumentFragment();

            _.each(this.videos, this.addVideo.bind(this, fragment));

            return fragment;
        },

        addVideo: function (fragment, videoData) {
            var videoNode = this.getTemplate('video-item');

            videoNode.querySelector('.video-header').innerHTML = videoData.header;
            videoNode.querySelector('.video-iframe').src = 'https://www.youtube.com/embed/' + videoData.id;
            fragment.appendChild(videoNode);
        }

    });

} (app, window));
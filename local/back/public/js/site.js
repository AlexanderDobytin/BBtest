'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Item = function () {
    function Item() {
        var _this = this;

        _classCallCheck(this, Item);

        this.height();
        $('.b-catalog-new').stick_in_parent();
        $(window).resize(function () {
            _this.height();
        });
    }

    _createClass(Item, [{
        key: 'height',
        value: function height() {
            $('.b-catalog-item__container').css({ 'height': $('.b-catalog-item__container').width() });
            $('.b-catalog-new').css({ 'height': $('.b-catalog-new').width() });
        }
    }]);

    return Item;
}();

var City = function () {
    function City() {
        _classCallCheck(this, City);

        this.getList();
        var that = this;
        $('.b-catalog-new__submit').on('click', function (event) {
            event.preventDefault();
            $.fancybox.open({
                src: '#hidden-content'
            });
        });
        $('.b-popUp__form').on('submit', function (event) {
            event.preventDefault();
            that.submit(this);
        });
    }

    _createClass(City, [{
        key: 'submit',
        value: function submit(item) {
            var data = $(item).serializeArray();
            var newdata = [];
            data.forEach(function (item, index) {

                newdata[item.name] = item.value;
            });
            this.request(newdata);
        }
    }, {
        key: 'request',
        value: function request(data) {
            var that = this;
            $.ajax({
                url: '/place',
                method: "POST",
                data: { "city": data.city, "name": data.name, "link": data.link },
                success: function success(answer) {
                    that.add(answer);
                }
            });
        }
    }, {
        key: 'add',
        value: function add(answer) {
            var item = this.renderItem(answer);
            $('.b-catalog__list').append(item);
            $.fancybox.close(true);
        }
    }, {
        key: 'renderItem',
        value: function renderItem(answer) {
            var item = '<div class="b-catalog-item col-xs-4">\n        <div style="background: url(\'' + answer.link + '\') 50% center / cover no-repeat; height: 270px;" class="b-catalog-item__container"><a href="" class="b-catalog-item__textblock">\n            <div class="b-catalog-item__title">' + answer.name + '</div>\n            <div class="b-catalog-item__subtitle">' + answer.city + '</div></a></div>\n      </div>';
            return item;
        }
    }, {
        key: 'getList',
        value: function getList() {
            var that = this;
            var list = "";
            $.ajax({
                url: '/place',
                method: "GET",
                success: function success(answer) {
                    answer.forEach(function (item, index) {
                        list += that.renderItem(item);
                    });
                    $('.b-catalog__list').html(list);
                }
            });
        }
    }]);

    return City;
}();

$(document).ready(function () {
    new Item();
    new City();
});
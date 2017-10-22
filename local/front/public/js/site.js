class item {
    constructor() {
        this.height()
        $('.b-catalog-new').stick_in_parent()
        $(window).resize(() => {
            this.height()
        })
    }

    height() {
        $('.b-catalog-item__container').css({ 'height': $('.b-catalog-item__container').width() })
        $('.b-catalog-new').css({ 'height': $('.b-catalog-new').width() })
    }
}


class City {
    constructor() {
        this.getList();
        let that = this;
        $('.b-catalog-new__submit').on('click', function (event) {
            event.preventDefault();
            $.fancybox.open({
                src: '#hidden-content'
            })
        })
        $('.b-popUp__form').on('submit', function (event) {
            event.preventDefault();
            that.submit(this)
        })
    }
    submit(item) {
        let data = $(item).serializeArray();
        var newdata = [];
        data.forEach(function (item, index) {

            newdata[item.name] = item.value
        })
        this.request(newdata);
    }
    request(data) {
        let that = this
        $.ajax({
            url: '/place',
            method: "POST",
            data: { "city": data.city, "name": data.name, "link": data.link, },
            success: function (answer) {
                that.add(answer);

            }
        });
    }
    add(answer) {
        let item = `<div class="b-catalog-item col-xs-4">
            <div style="background: url('`+ answer.link + `') 50% center / cover no-repeat; height: 270px;" class="b-catalog-item__container"><a href="" class="b-catalog-item__textblock">
                <div class="b-catalog-item__title">`+ answer.name + `</div>
                <div class="b-catalog-item__subtitle">`+ answer.city + `</div></a></div>
          </div>`;
        $('.b-catalog__list').append(item);
        $.fancybox.close(true);
    }
    getList() {
        let that = this
        let list;
        $.ajax({
            url: '/place',
            method: "GET",
            success: function (answer) {
                answer.forEach(function (item, index) {
                    list += `<div class="b-catalog-item col-xs-4">
                  <div style="background: url('`+ item.link + `') 50% center / cover no-repeat; height: 270px;" class="b-catalog-item__container"><a href="" class="b-catalog-item__textblock">
                      <div class="b-catalog-item__title">`+ item.name + `</div>
                      <div class="b-catalog-item__subtitle">`+ item.city + `</div></a></div>
                </div>`;

                })
                $('.b-catalog__list').html(list);
            }
        });
    }
}
$(document).ready(function () {
    new item()
    new City()

})
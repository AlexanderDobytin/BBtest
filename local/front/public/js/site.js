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


class City{
    constructor(){
        
        let that = this;
        $('.b-catalog-new__submit').on('click',function(event){
            event.preventDefault();
            $.fancybox.open({
                src  : '#hidden-content'})
        })
    }
    PopUp(){
        
    }
}
$(document).ready(function () {
    new item()
    new City()
    $("[data-fancybox]").fancybox();
})
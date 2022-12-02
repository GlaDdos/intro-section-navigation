const menu_button = document.querySelector('.wrapper header button');
const menu_close = document.getElementById('menu_close');
const menu = document.getElementById('nav_menu');
const wrapper = document.getElementById('wrapper');
const overlay = document.querySelector('#wrapper .overlay')
const menu_item_openable = menu.querySelectorAll('li.sub');

window.addEventListener('click', function (event) {
    menu_item_openable.forEach(element => {
        const sub_menu = element.nextElementSibling;
        if(sub_menu.classList.contains('open')) {
            element.classList.remove('open');
            sub_menu.classList.remove('open');
        }
    });
})

menu.addEventListener('animationend', function (event) {
    if(event.animationName == 'closing') {
        this.classList.remove('closing');
        this.classList.remove('opened');
        this.classList.add('closed');
        wrapper.classList.remove('dark');
        overlay.classList.remove('transparent');
    }
});

menu_item_openable.forEach(element => {
    element.addEventListener('click', function(event) {
        const sub_menu = element.nextElementSibling;
        
        function closeAnimation() {
            let height = sub_menu.scrollHeight;
            
            const animation = [
               { height: height + 'px'},
               {height: 1 + 'px'}
            ];

            const options = {
                duration: 200, 
                iterations: 1
            }

            sub_menu.style.overflow = 'hidden';
            
            sub_menu.animate(animation, options);

            Promise.all(sub_menu.getAnimations().map((animation) => animation.finished)).then(
                () => {
                    sub_menu.classList.remove('open');
                    element.classList.remove('open');
                }
            );
        }

        sub_menu.addEventListener('click', function (event) {
            closeAnimation();
        });
        
        if(sub_menu.tagName == 'UL' && sub_menu.classList.contains('open')) {            
            closeAnimation();
        } else {
            let height = sub_menu.scrollHeight;

            const animation = [
                {height: 0},
                {height: height + 'px'}
            ];

            const options = {
                duration: 200, 
                iterations: 1
            }

            sub_menu.animate(animation, options);

            Promise.all(sub_menu.getAnimations().map((animation) => animation.finished)).then(
                () => sub_menu.classList.add('open')
            );

            element.classList.add('open');
        }
    });
});

menu_button.addEventListener('click', function(event) {
    menu.classList.add('opened');
    menu.classList.remove('closed');
    wrapper.classList.add('dark');
});

menu_close.addEventListener('click', function(event) {
    overlay.classList.add('transparent');
    menu.classList.add('closing');
});
class ActionBar {
    constructor(title) {
        document.getElementById('nav').innerHTML = Templates.nav({title: title});

        var drawer = document.getElementById('drawer');

        drawer.setAttribute('open', false.toString());

        var touchStartPosX = 0;

        drawer.addEventListener('touchstart', (e : TouchEvent) => {
            var touch : Touch = e.touches[0];
            console.log(touch);
            drawer.style.transition = 'none';
            touchStartPosX = touch.clientX;
        });

        drawer.addEventListener('touchmove', (e : TouchEvent) => {
            var touch : Touch = e.touches[0];

            var direction = (touch.clientX - touchStartPosX - drawer.offsetLeft);
            if(direction > 0) {
                direction = 0;
            }
            drawer.style.transform = 'translateX(' + direction + 'px)';
        });

        var menu = document.getElementById('btn-menu');
        menu.addEventListener('click', () => {
            var value = !parseBoolean(drawer.getAttribute('open'));
            toggleClass(menu, 'md-menu', 'md-arrow-back', value);
            drawer.setAttribute('open', value.toString());
        });
    }
}
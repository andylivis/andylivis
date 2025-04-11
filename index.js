
// 为导航栏添加滚动事件，当滚动到一定位置时，导航栏会固定在顶部，并且滚动到顶部时，导航栏会隐藏。
// 还有底部的滚动到顶部按钮，当滚动到一定位置时，按钮会显示出来，点击按钮可以滚动到顶部。
const headerEl = document.querySelector("header");
const scrollToTop = document.querySelector(".scrollToTop");

window.addEventListener('scroll', () => {
    let height = headerEl.getBoundingClientRect().height;

    if(window.scrollY - height > 800){
        if(!headerEl.classList.contains('sticky')){
            headerEl.classList.add('sticky');
        }
    }else{
        headerEl.classList.remove("sticky");
    }

    if(window.scrollY > 1000){
        scrollToTop.style.display = "block";
    }else{
        scrollToTop.style.display = "none";
    }
});




// 把 class = "glide" 的元素挂载到 glide 实例上
const glide = new Glide('.glide');


// 处理首页轮播图上的文字动画 开始



// 获取到轮播图的文字，赋值给 captionEl 
const captionEl = document.querySelectorAll(".slide-caption");

// glide 提供了几个事件，我们可以监听这些事件，来实现一些功能  
// mount.after  当 glide 实例挂载到 DOM 上之后，会触发这个事件
// run.after  当 glide 实例开始运行之后，会触发这个事件
glide.on(['mount.after', 'run.after'], () => {
    // 获取到当前轮播图的文字的下标index，赋值给 caption
    const caption = captionEl[glide.index];
    // 使用anime的动画库，来实现文字的动画效果
    anime({
        // targets: caption.children  表示要动画的元素
        targets: caption.children,
        // opacity: [0, 1]  表示要动画的透明度，从0到1
        opacity: [0, 1],
        // duration: 400  表示动画的持续时间
        duration: 400,
        // easing: 'linear'  表示动画的缓动函数，通俗来说是线性动画
        easing: 'linear',
        // delay: anime.stagger(400, { from: 'left' })  表示动画的延迟时间，从左往右依次延迟400ms，
        // 这里使用了anime的stagger函数，来实现依次延迟的效果，即caption.children的第一个元素延迟400ms，第二个元素延迟800ms，以此类推， 
        // from: 'left' 表示从左往右依次延迟
        delay: anime.stagger(400, {
            from: 'left',
            start: 300    // 表示动画的起始时间，这里是300ms，即caption.children的第一个元素延迟300ms开始动画
        }),
        // 表示动画的位移，从下往上依次位移40px，10px，0px，即caption.children的第一个元素位移40px，第二个元素位移10px，以此类推，
        translateY: [anime.stagger([40, 10]), 0]
    });
});

// 这里是在轮播图开始运行之前，把轮播图的文字的透明度设置为0，即隐藏
glide.on('run.before', () => {
    document.querySelectorAll('.slide-caption > *').forEach(el => {
        el.style.opacity = 0;
    });
});


// 把 glide 实例挂载到 DOM 上
glide.mount();

// 处理首页轮播图上的文字动画 结束


// 定义 isotope 实例 开始  
const isotope = new Isotope('.cases', {
    layoutMode: "masonry",  // 表示布局模式，fitRows表示按行布局，即每行的高度相同，
    itemSelector: ".case-item",  // 表示要布局的元素，即.case-item，   
    // gutter: 20,  // 表示元素之间的间距，10px表示10像素，            
    // transitionDuration: '0.8s',   // 表示布局的过渡时间，0.8s表示0.8秒，
    // filter: '.featured'   // 表示要过滤的元素，即.featured，即只显示.featured的元素
});

// 检查 Isotope 实例是否正确创建
if (isotope) {
    console.log('Isotope 实例创建成功');
} else {
    console.error('Isotope 实例创建失败');
}

// 尝试手动触发一次布局
isotope.layout();

// 定义 isotope 实例 结束

// 创建分类选择器 开始

/*
// 选择所有具有 "filter-btns" 类的元素，赋值给 filterBtns
const filterBtns = document.querySelectorAll(".filter-btns");


原版代码，提示错误：TypeError: filterBtns.addEventListener is not a function
// 为每个过滤按钮添加点击事件监听器，当点击时，会触发这个事件
filterBtns.addEventListener("click", e => {
    // 解构赋值，从事件对象中获取点击的目标元素，赋值给 target
    let { target } = e;
    console.log(target);
    // 获取点击按钮的 "data-filter" 属性值，赋值给 filterOption 
    // 这里的 "data-filter" 属性值，就是我们在 HTML 中定义的，用来表示要过滤的元素，即filterOption，即只显示.filterOption的元素
    const filterOption = target.getAttribute("data-filter");
    // 检查按钮是否有 "data-filter" 属性
    if (filterOption) {
        // 移除所有具有 "fliter-btn.cative" 类的按钮的 "active" 类，即移除高亮显示
        document
            .querySelectorAll(".filter-btn.active")
            .forEach(btn => btn.classList.remove("active"));
        // 给当前点击的按钮添加active类，即高亮显示
        target.classList.add("active");
        // 使用isotope的arrange方法，来实现布局，即重新布局，
        // filter: filterOption  表示要过滤的元素，即filterOption，即只显示.filterOption的元素  
        isotope.arrange({ filter: filterOption });

    }
})
// 创建分类选择器 结束
*/

// ai 代码
// ... existing code ...
// 选择所有具有 "filter-btn" 类的元素，而不是之前错误的 "filter-btns"
const filterBtns = document.querySelectorAll(".filter-btn");

// 遍历 filterBtns 中的每个按钮
filterBtns.forEach(btn => {
    // 为每个按钮添加点击事件监听器
    btn.addEventListener("click", e => {
        // 解构赋值，从事件对象中获取点击的目标元素
        let { target } = e;
        console.log(target);
        // 获取点击按钮的 "data-filter" 属性值
        const filterOption = target.getAttribute("data-filter");
        // 检查按钮是否有 "data-filter" 属性
        if (filterOption) {
            // 移除所有具有 "filter-btn.active" 类的按钮的 "active" 类
            document
                .querySelectorAll(".filter-btn.active")
                .forEach(btn => btn.classList.remove("active"));
            // 给当前点击的按钮添加 active 类
            target.classList.add("active");
            // 使用 isotope 的 arrange 方法，根据过滤选项重新布局
            isotope.arrange({ filter: filterOption });
        }
    });
});
// ... existing code ...

// ”关于我们“、“服务流程”部分的文字动画 开始
const staggeringOption = {
    delay: 300,
    distance: "50px",
    duration: 500,
    easing: "ease-in-out",
    origin: "bottom"
}
ScrollReveal().reveal(".feature",{ ...staggeringOption, interval: 350})
ScrollReveal().reveal(".service-item",{ ...staggeringOption, interval: 350})
// 单独设置“数据部分”的动画效果
ScrollReveal().reveal(".data-section",{
    beforeReveal:()=>{
        anime({
            targets:".data-section .num",
            innerHTML: el => {
                return[0, el.innerHTML];
            },
            duration: 2000,round: 1,easing: "easeInExpo"
        });
    }
});

// ”关于我们“、“服务流程”部分的文字动画 结束


// 导航链接平滑滚动到指定位置 开始
const scroll = new SmoothScroll('nav a[href*="#"], .scrollToTop a[href*="#"]',{
    header:"header",
    offset:80
})

document.addEventListener("scrollStart",()=> {
    if(headerEl.classList.contains("open")){
        headerEl.classList.remove("open");
    }
})

// 为”探索更多“按钮添加点击事件监听器，当点击时，会触发这个事件
const exploreBtnEls = document.querySelectorAll(".explore-btn");

exploreBtnEls.forEach((exploreBtnEl) => {
    exploreBtnEl.addEventListener("click", () => {
        scroll.animateScroll(document.querySelector("#about-us"));
    })
})
// 导航链接平滑滚动到指定位置 结束

// 折叠按钮的点击事件 开始
// 获取折叠按钮的实例
const burgerEl = document.querySelector(".burger");
// 为折叠按钮添加点击事件监听器，当点击时，会触发这个事件
burgerEl.addEventListener("click", () => {
    // 切换折叠按钮的 active 类，即切换折叠按钮的状态
    headerEl.classList.toggle("open");
})
// 折叠按钮的点击事件 结束
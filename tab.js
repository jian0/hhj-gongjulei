class Tab {
    // 原版
    // constructor(itemClass,eventType,itemActiveClass,contentClass,contentShowClass){
    //     this.itemClass = itemClass || '.item';
    //     this.eventType = eventType || 'mouseover';
    //     this.itemActiveClass = itemActiveClass || 'active';
    //     this.contentClass = contentClass || '.content';
    //     this.contentShowClass = contentShowClass || 'show';
    // }

    // 优化版
    // constructor(options) {
    //     options = options || {};
    //     this.itemClass = options.itemClass || '.item';
    //     this.eventType = options.eventType || 'mouseover';
    //     this.itemActiveClass = options.itemActiveClass || 'active';
    //     this.contentClass = options.contentClass || '.content';
    //     this.contentShowClass = options.contentShowClass || 'show';
    //     this.items = document.querySelectorAll(this.itemClass);
    //     this.contetns = document.querySelectorAll(this.contentClass);

    //     // 调用方法，实现效果
    //     this.addEvent();
    // }

    // 最优版
    constructor(def) {
        let options = {
            itemClass: '.item',
            itemActiveClass: 'active',
            eventType: 'mouseover',
            contentClass: '.content',
            contentShowClass: 'show'
        }

        // 浅拷贝
        for (let key in def) {
            options[key] = def[key];
        }

        for (let key in options) {
            this[key] = options[key];
        }

        // 优化版
        // Object.assign(options, def);
        // Object.assign(this, options);


        // 获取元素
        this.items = document.querySelectorAll(this.itemClass);
        this.contetns = document.querySelectorAll(this.contentClass);

        // 必然new了之后要有效果，需要调用addEvent方法实现
        this.addEvent();
    }


    addEvent() {
        // 使用简写方法，可以让this指向上一层
        this.items.forEach((e, i) => {
            e.addEventListener(this.eventType, (e) => {
                let target = e.target;
                // 调用切换分类的方法
                this.changeItems(target);
                // 调用切换内容的方法
                this.changeContent(i);
            })
        })
    }

    // 切换分类
    changeItems(current) {
        // 把点击中的变红，没有点击的清除红色的样式
        this.items.forEach(e => {
            // 把所有的样式清除
            e.classList.remove(this.itemActiveClass);
        })
        // 把第一个的样式加上
        current.classList.add(this.itemActiveClass);
    }

    // 切换内容
    changeContent(index) {
        // 先把所有内容隐藏掉
        this.contetns.forEach(e => {
            // 把所有的样式清除
            e.classList.remove(this.contentShowClass);
        })
        // 再把对应点击的内容显示出来
        this.contetns[index].classList.add(this.contentShowClass);
    }
}

// 如需调用，可用:
    // let tab = new Tab({
    //  属性：值
    // });
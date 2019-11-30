$(function () {
  let arr = kits.getData('cartdata');
  let html = ``;
  arr.forEach(e => {
    html += `<div class="item" data-id="${e.pID}">
        <div class="row">
          <div class="cell col-1 row">
            <div class="cell col-1">
              <input type="checkbox" class="item-ck" ${e.ischecked ? "checked" : ''}>
            </div>
            <div class="cell col-4">
              <img src="${e.imgSrc}" alt="">
            </div>
          </div>
          <div class="cell col-4 row">
            <div class="item-name">${e.name}</div>
          </div>
          <div class="cell col-1 tc lh70">
            <span>￥</span>
            <em class="price">${e.price}</em>
          </div>
          <div class="cell col-1 tc lh70">
            <div class="item-count">
              <a href="javascript:void(0);" class="reduce fl ">-</a>
              <input autocomplete="off" type="text" class="number fl" value="${e.number}">
              <a href="javascript:void(0);" class="add fl">+</a>
            </div>
          </div>
          <div class="cell col-1 tc lh70">
            <span>￥</span>
            <em class="computed">${e.price * e.number}</em>
          </div>
          <div class="cell col-1">
            <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
          </div>
        </div>
      </div>`
  });
  $('.item-list').append(html);


  // 当点选没有全部勾选时，全选不勾选
  let nockall = arr.find(e => {
    return !e.ischecked;
  })

  $('.pick-all').prop('checked', !nockall);

  // 购物车有商品时，要隐藏空空如也的提示以及显示头和尾
  if (arr.length != 0) {
    $('.empty-tip').hide();
    $('.cart-header').show();
    $('.total-of').show();
  }

  // 判断全选或者点选---------------------------------------------------
  $('.pick-all').on('click', function () {
    let result = $(this).prop('checked');
    // console.log(result);
    $('.pick-all').prop('checked', result);
    $('.item-ck').prop('checked', result);

    arr.forEach(function (e) {
      e.ischecked = result;
    })
    kits.saveData('cartdata', arr);
    calcTotal();
  })

  // 点选，动态生成的列表建议用委托来做
  $('.item-list').on('click', '.item-ck', function () {
    // 如果勾选的个数和总个数一样，就是全选
    let ckall = $('.item-ck').length === $('.item-ck:checked').length;
    // 设置全选的状态和ckall的一致
    $('.pick-all').prop('checked', ckall);
    let pid = $(this).parents('.item').attr('data-id');
    // 获取当前的按钮是否被选中
    let ischecked = $(this).prop('checked');

    arr.forEach(function (e) {
      if (e.pID == pid) {
        e.ischecked = ischecked;
      }
    })
    kits.saveData('cartdata', arr);
    calcTotal();
  })

  // 算出总件数和总价格-------------------------------------------------
  function calcTotal() {
    let totalnum = 0;
    let totalmoney = 0;
    arr.forEach(function (e) {
      if(e.ischecked){
        totalnum += e.number;
        totalmoney += e.number * e.price;
        }
    })
    // 把算出来的值更新到页面上
    $('.selected').text(totalnum);
    $('.total-money').text(totalmoney);
  }
  // 一开始要先算一次
  calcTotal();

  // 实现数量的增加---------------------------------------------------
  $('.add').on('click', function () {
    console.log($(this).prev().val());
    // 获取到输出框里面的元素，点+号的时候数量+1
    let num1 = $(this).prev().val();
    $(this).prev().val(++num1);
    let id = $(this).parents('.item').attr('data-id');
    let obj = arr.find(e => {
      return e.pID == id;
    })
    obj.number = num1;
    kits.saveData('cartdata', arr);
    calcTotal();
    $(this).parents('.item').find('.computed').text(obj.number * obj.price);
  })

  // 实现数量的减少---------------------------------------------------
  $('.reduce').on('click', function () {
    let num2 = $(this).next().val();
    if (num2 <= 1) {
      alert('数量不能小于1');
      return;
    } else {
      // 点-号的时候数量-1
      $(this).next().val(--num2);
    }
    let id = $(this).parents('.item').attr('data-id');
    let obj = arr.find(e => {
      return e.pID == id;
    })
    console.log(obj);

    obj.number = num2;
    kits.saveData('cartdata', arr);
    calcTotal();
    // 更新数据
    $(this).parents('.item').find('.computed').text(obj.number * obj.price);
  })

  // 修改商品数量，当得到焦点时，把当前的值，先保存 起来，如果失焦的时候输入的结果是不合理的，我们可以恢复原来的数字
  $('.number').on('focus', function () {
    // 把旧的，正确的数据存起来
    let old = $(this).val();
    $(this).attr('data-old', old);
  });


  // 当失去焦点时，需要把修改完的值更新到本地存储
  $('.item-list').on('blur', '.number', function () {
    // 先获取输入框里面的内容
    let num = $(this).val();
    if (parseInt(num) <= 0 || isNaN(num) || num.trim().length === 0) {
      // 先获取旧的数据
      let old = $(this).attr('data-old');
      // 把原来的旧数据恢复
      $(this).val(old);
      alert('请输入正确的数值');
      return;
    }

    // 如果条件满足，重新计算并更新数据
    let id = $(this).parents('.item').attr('data-id');
    let obj = arr.find(e => {
      return e.pID == id;
    })
    obj.number = parseInt(num);
    // 存储在本地
    kits.saveData('cartdata', arr);
    // 重新计算总价
    calcTotal();
    // 更新右边的价格
    $(this).parents('.item').find('.computed').text(obj.number * obj.price);
  })

  // 删除购物车中的商品
  $('.item-list').on('click', '.item-del', function () {
    // layer的方法
    // layer.confirm('你确定要删除吗?', {icon: 0, title:'警告'}, (index)=>{
    //   layer.close(index);

    // 确认框
    confirm('您确定要删除吗');
    let id = $(this).parents('.item').attr('data-id');
    // 删除点击的那行
    $(this).parents('.item').remove();

    arr = arr.filter(e => {
      return e.pID != id;
    });
    // 更新本地储存数据
    kits.saveData('cartdata', arr);
    // 重新计算总价
    calcTotal();
  });
})

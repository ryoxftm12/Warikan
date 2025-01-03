// 計算ボタン押下
const onclickCalc = () => {
    // 金額取得
    const moneyAll = document.getElementById("money-text").value;
   
    // リスト取得
    const groupListEl = document.getElementById("group-list");
    const children = groupListEl.children;

    // 入力内容チェック
    if(!validate(moneyAll, children)){
        return;
    }

    const truncationEl = document.getElementById("truncation");
    const truncation = truncationEl.value;

    // 支払金額保持用
    let payment = 0;
    
    for(let i = 0; i < children.length; i++) {
        // 人数、割合取得
        const divEl = children[i].getElementsByTagName("div");
        // divElは1つのみなので配列先頭指定、セレクタで人数と割合を取得
        const count = divEl[0].querySelector("input#count-input").value;
        const percent = divEl[0].querySelector("input#percent-input").value;
        const money = divEl[0].querySelector("input#money-input");
        // 計算（金額/人数*割合/100）
        let calc = moneyAll / count * percent / 100;
        // 指定値単位で切り捨て
        calc = roundDown(calc, parseInt(truncation));
        money.value = calc;
        // (一人当たり金額*人数)をメモリに保持
        payment += calc * count;
    }
        
    // 端数計算（金額-ラベル金額）
    const flaction = moneyAll - payment;
    // 端数表示
    const flacInput = document.getElementById("flac-text");
    flacInput.value = flaction;
};

// グループ追加ボタン押下
const onclickAddGroup = ()=> {
    // 要素作成
    const groupListEl = document.getElementById("group-list");
    const liEl = document.createElement("li");
    liEl.setAttribute("id", "list-group-item");
    const divEl = document.createElement("div");
    divEl.setAttribute("class", "col-sm form-inline")
    const countEl = document.createElement("input");
    countEl.setAttribute("id", "count-input");
    countEl.setAttribute("class", "form-control");
    countEl.setAttribute("type", "number");
    countEl.setAttribute("placeholder", "人数");
    countEl.setAttribute("style", "width:20%");
    const percentEl = document.createElement("input");
    percentEl.setAttribute("id", "percent-input");
    percentEl.setAttribute("class", "form-control");
    percentEl.setAttribute("type", "number");
    percentEl.setAttribute("placeholder", "割合(%)");
    percentEl.setAttribute("style", "width:20%");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "削除"
    deleteButton.setAttribute("class", "btn btn-primary");
    const moneyEl = document.createElement("input");
    moneyEl.setAttribute("id", "money-input");
    moneyEl.setAttribute("class", "form-control");
    moneyEl.setAttribute("type", "number");
    moneyEl.setAttribute("placeholder", "支払金額");
    moneyEl.setAttribute("disabled", "disabled");
    //moneyEl.setAttribute("style", "width:40%");
    
    // 要素削除ボタン押下
    deleteButton.addEventListener("click", () => {
        const deleteTarget = deleteButton.closest("li");
        groupListEl.removeChild(deleteTarget);
    });

    // リストに要素追加
    groupListEl.appendChild(liEl);
    liEl.appendChild(divEl);
    divEl.appendChild(countEl);
    divEl.appendChild(percentEl);
    divEl.appendChild(deleteButton);
    divEl.appendChild(moneyEl);
};

// 入力値チェック
const validate = (moneyAll, children) => {
    if(!moneyAll || moneyAll === "0") {
        alert("金額を入力してください。");
        return false;
    }

    let percentTotal = 0;

    for(let i = 0; i < children.length; i++) {
        // 人数、割合取得
        const divEl = children[i].getElementsByTagName("div");
        const count = divEl[0].querySelector("input#count-input").value;
        const percent = divEl[0].querySelector("input#percent-input").value;
        if(!count || !percent){
            alert("人数、割合が未入力の行が存在します。");
            return false;
        }

        percentTotal += parseInt(percent);
    }

    if(percentTotal != 100) {
        alert("割合が100%ではありません。");
        return false;
    }

    return true;
};

// 値の切り捨て value:値、num:切り捨ての単位(ex:100,500など)
const roundDown = (value, num) => {
    let val = value / num;
    val = Math.trunc(val);
    val = val * num;
    return val;
};

// イベント登録
document
    .getElementById("calc-button")
    .addEventListener("click", () => onclickCalc());

document
    .getElementById("add-group-button")
    .addEventListener("click", () => onclickAddGroup());
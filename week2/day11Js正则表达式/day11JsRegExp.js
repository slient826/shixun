function q1() {
    var a = /^\d*\.?\d*$/;
    q1Output.innerHTML = "检测结果为：" + a.test(q1Input.value);
}
function q2() {
    var a = /^(\(\+\d{2}\))\d{3}-\d{8}$/;
    q2Output.innerHTML = "检测结果为：" + a.test(q2Input.value);
}
function q3() {
    var a = /^[a-zA-Z]{2,4}$/;
    q3Output.innerHTML = "检测结果为：" + a.test(q3Input.value);
}
function q4() {
    var a = /^[a-zA-Z]{3}_\d{2}@[a-zA-Z]{2}\.[a-zA-Z]{2}$/;
    q4Output.innerHTML = "检测结果为：" + a.test(q4Input.value);
}
function q5() {
    var a = /^\d{3}\.\d{3}\.\d{3}\.\d{3}$/;
    q5Output.innerHTML = "检测结果为：" + a.test(q5Input.value);
}
function q6() {
    var a = /^[a-zA-Z_][a-zA-Z\d_]{7,14}$/;
    q6Output.innerHTML = "检测结果为：" + a.test(q6Input.value);
}
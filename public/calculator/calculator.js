//calc logic

function UpdateScreen(text){
    if(text == ""){text = "\n- - - - - - - - - - -"};
    document.getElementById('display').textContent = text;
}

function UpdateAnswer(text){
    if(text == ""){text = "\n- - - - - - - - - - -"};
    document.getElementById('display-result').textContent = text + "";
}


let equation = "";


const butClear = document.getElementById('clear');
butClear.onclick = function() {
    equation = "";
    UpdateScreen(equation);

}


const but0 = document.getElementById('0');
but0.onclick = function() {
    equation += "0";
    UpdateScreen(equation);
}


const but1 = document.getElementById('1');
but1.onclick = function() {
    equation += "1";
    UpdateScreen(equation);
}


const but2 = document.getElementById('2');
but2.onclick = function() {
    equation += "2";
    UpdateScreen(equation);
}


const but3 = document.getElementById('3');
but3.onclick = function() {
    equation += "3";
    UpdateScreen(equation);
}


const but4 = document.getElementById('4');
but4.onclick = function() {
    equation += "4";
    UpdateScreen(equation);
}


const but5 = document.getElementById('5');
but5.onclick = function() {
    equation += "5";
    UpdateScreen(equation);
}


const but6 = document.getElementById('6');
but6.onclick = function() {
    equation += "6";
    UpdateScreen(equation);
}


const but7 = document.getElementById('7');
but7.onclick = function() {
    equation += "7";
    UpdateScreen(equation);
}


const but8 = document.getElementById('8');
but8.onclick = function() {
    equation += "8";
    UpdateScreen(equation);
}


const but9 = document.getElementById('9');
but9.onclick = function() {
    equation += "9";
    UpdateScreen(equation);
}


const butdiv = document.getElementById('divide');
butdiv.onclick = function() {
    equation += "/";
    UpdateScreen(equation);
}


const butmult = document.getElementById('multiply');
butmult.onclick = function() {
    equation += "*";
    UpdateScreen(equation);
}


const butmin = document.getElementById('-');
butmin.onclick = function() {
    equation += "-";
    UpdateScreen(equation);
}


const butplus = document.getElementById('+');
butplus.onclick = function() {
    equation += "+";
    UpdateScreen(equation);
}


const butvir = document.getElementById('vir');
butvir.onclick = function() {
    equation += ".";
    UpdateScreen(equation);
}


const butopar = document.getElementById('oPar');
butopar.onclick = function() {
    equation += "(";
    UpdateScreen(equation);
}


const butcpar = document.getElementById('cPar');
butcpar.onclick = function() {
    equation += ")";
    UpdateScreen(equation);
}




const butegal = document.getElementById('egal');
butegal.onclick = function() {
    UpdateAnswer(eval(equation)); //how to get hacked 101
}

const butdel = document.getElementById('del');
butdel.onclick = function() {
    equation = equation.slice(0, -1);
    UpdateScreen(equation);
}
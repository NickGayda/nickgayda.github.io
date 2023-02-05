//Adding event clicks to buttons to show in display
const buttonDisplayIdList = 
["(", ")", "%",
 "7", "8", "9", "/",
 "4", "5", "6", "*",
 "1", "2", "3", "-",
 "0", ".",      "+"];
 
const disp = document.getElementById("calculator-display-numbers");
const times = document.getElementById("*").innerHTML;
const divide = document.getElementById("/").innerHTML;
var numReset = false;

for (const element of buttonDisplayIdList)
{
	document.getElementById(element).addEventListener("click", function() { addToDisplay(this.id);});
}

document.getElementById("AC").addEventListener("click", clearDisplay);
document.getElementById("=").addEventListener("click", calculate);

function calculateHelper(calc) {
	var numbers = calc.split(/\+|\-|\*|\/|\%/g);

  	var operators = calc.replace(/[0-9]|\./g, "").split("");

	var modulus = operators.indexOf("%");
	while (modulus != -1) {
		numbers.splice(modulus, 2, numbers[modulus] % numbers[modulus + 1]);
		operators.splice(modulus, 1);
		modulus = operators.indexOf("%");
	}

	var multiply = operators.indexOf("*");
	while (multiply != -1) {
		numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
		operators.splice(multiply, 1);
		multiply = operators.indexOf("*");
	}

	var divide = operators.indexOf("/");
	while (divide != -1) {
		numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
		operators.splice(divide, 1);
		divide = operators.indexOf("/");
	}

	var subtract = operators.indexOf("-");
	while (subtract != -1) {
		numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
		operators.splice(subtract, 1);
		subtract = operators.indexOf("-");
	}

	var add = operators.indexOf("+");
	while (add != -1) {
		numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
		operators.splice(add, 1);
		add = operators.indexOf("+");
	}

	return numbers[0];
}

function calculate() {

	var calc = disp.innerHTML;
	calc = calc.replace(times, "*");
	calc = calc.replace(divide, "/");
	calc = "(" + calc + ")";

	var open = calc.lastIndexOf("(");
	var close = calc.indexOf(")", open);
	while (open != -1 && close != -1)
	{
		var value = calculateHelper(calc.substring(open+1, close));
		var firstPart = calc.slice(0, open);
		var lastPart = calc.slice(close+1, calc.length);
		calc = firstPart + value + lastPart;
		open = calc.lastIndexOf("(");
		close = calc.indexOf(")", open);
	}

	total = Math.round(Number(calc) * 100000) / 100000;

	if (isNaN(total))
		total = "Error";

	disp.innerHTML = total;

	numReset = true;
}

function addToDisplay(c) {


	if ((!Number.isNaN(Number(c)) || c == ".") && numReset)
	{
		disp.innerHTML = "";
		numReset = false;
	}

	if (c == "/")
		c = "&divide;";
	if (c == "*")
		c = "&times;";
	
	if (disp.innerHTML == "0" || disp.innerHTML == "Error" || disp.innerHTML == "Infinity")
		disp.innerHTML = c;
	else
		disp.innerHTML += c;
		
	numReset = false;
}

function clearDisplay() {
	disp.innerHTML = "0";
}
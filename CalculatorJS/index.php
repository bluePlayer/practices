<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>JavaScript Calculator | version: 1.0.0</title>
		<link rel="stylesheet" href="css/style.css">	
	</head>
	<body class="body">
        <h3>JavaScript Calculator application.</h3>
        <p>
            Made completely with pure JavaScript and HTML 5. It is Windows 7 calculator lookalike and a proper test for my JavaScript coding skills.
            Copyright &copy 2015 - made by bluePlayer aka Vlado - <a href="http://tunephp.blogspot.com">TunePHP</a>
            For complete code reference visit <a href="https://github.com/bluePlayer/practices/tree/master/CalculatorJS">bluePlayer</a>
        </p>
		<table class="table">
			<tr>
				<td colspan="5"><input type="text" value="0" class="textField" readonly="true" id="digitsField"/></td>
			</tr>
            <tr>
                <td colspan="5"><input type="text" value="" class="textField" readonly="true" id="memoryLabel"/></td>
            </tr>
			<tr>
				<td colspan="5"><textarea class="textField" id="operationField" readonly="true"></textarea></td>
			</tr>
			<tr>
				<td><input type="button" value="MC" class="button" title="Memory Clear" onclick="APP.Buttons.pressMemoryButton('MC')"/></td>
                <td><input type="button" value="MR" class="button" title="Memory Recall" onclick="APP.Buttons.pressMemoryButton('MR')"/></td>
                <td><input type="button" value="MS" class="button" title="Memory Save" onclick="APP.Buttons.pressMemoryButton('MS')"/></td>
                <td><input type="button" value="M+" class="button" title="Memory Add" onclick="APP.Buttons.pressMemoryButton('M+')"/></td>
                <td><input type="button" value="M-" class="button" title="Memory Subtract" onclick="APP.Buttons.pressMemoryButton('M-')"/></td>
			<tr>
				<td><input type="button" value="<-" class="button" title="Undo" onclick="APP.Buttons.pressUndo()"/></td>
				<td><input type="button" value="CE" class="button" title="Clear Entry" onclick="APP.Buttons.pressClearEntry()"/></td>
				<td><input type="button" value="C" class="button" title="Clear" onclick="APP.Buttons.pressClear();"/></td>
				<td><input type="button" value="+/-" class="button" title="Sign +/-" onclick="APP.Buttons.pressUnaryOperation('+/-');"/></td>
				<td><input type="button" value="&#8730;" class="button" title="Find Root" onclick="APP.Buttons.pressUnaryOperation('sqrt');"/></td>
			</tr>
			<tr>
				<td><input type="button" value="7" class="button" onclick="APP.Buttons.pressNumber('7');"/></td>
				<td><input type="button" value="8" class="button" onclick="APP.Buttons.pressNumber('8');"/></td>
				<td><input type="button" value="9" class="button" onclick="APP.Buttons.pressNumber('9');"/></td>
				<td><input type="button" value="/" class="button" onclick="APP.Buttons.pressBinaryOperation('/');"/></td>
				<td><input type="button" value="%" class="button" title="Find Percent %" onclick="APP.Buttons.pressBinaryOperation('%');"/></td>
			</tr>
			<tr>
				<td><input type="button" value="4" class="button" onclick="APP.Buttons.pressNumber('4');"/></td>
				<td><input type="button" value="5" class="button" onclick="APP.Buttons.pressNumber('5');"/></td>
				<td><input type="button" value="6" class="button" onclick="APP.Buttons.pressNumber('6');"/></td>
				<td><input type="button" value="*" class="button" onclick="APP.Buttons.pressBinaryOperation('*');"/></td>
				<td><input type="button" value="1/x" class="button" title="Find Reciprocal Value" onclick="APP.Buttons.pressUnaryOperation('1/x');"/></td>
			</tr>
			<tr>
				<td><input type="button" value="1" class="button" onclick="APP.Buttons.pressNumber('1');"/></td>
				<td><input type="button" value="2" class="button" onclick="APP.Buttons.pressNumber('2');"/></td>
				<td><input type="button" value="3" class="button" onclick="APP.Buttons.pressNumber('3');"/></td>
				<td><input type="button" value="-" class="button" onclick="APP.Buttons.pressBinaryOperation('-');"/></td>
				<td rowspan="2"><input type="button" value="=" class="buttonEqual" onclick="APP.Buttons.pressEqual();"/></td>
			</tr>
			<tr>
				<td colspan="2"><input type="button" value="0" class="buttonZero" onclick="APP.Buttons.pressNumber('0');"/></td>
				<td><input type="button" value="," class="button" onclick="APP.Buttons.pressComma();"/></td>
				<td><input type="button" value="+" class="button" onclick="APP.Buttons.pressBinaryOperation('+');"/></td>
			</tr>
			<!--<tr>
				<td colspan = "5">
					<select name="history" size = "5" class = "textField">
						<option value="value1">this area will show history</option> 
					</select>
				</td>
			</tr>-->
		</table>
		<script type="text/javascript" src="js/calc.js"></script>
		<!--<script type="text/javascript" src="js/script.js"></script>-->
	<body/>
</html>

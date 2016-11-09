/*
 * Created by SharpDevelop.
 * User: vlado
 * Date: 30.03.2016
 * Time: 10:41
 * 
 * To change this template use Tools | Options | Coding | Edit Standard Headers.
 */
using System;

namespace Pipeline_Dev_Vezhba_2D
{
	/// <summary>
	/// Description of Helper.
	/// </summary>
	public static class Helper
	{
		public const int NUM_OF_CMD_ARGS = 3;
		public const string FILE_PATH = "..\\..\\Assets\\slate-vezhba.nk";
		
		public const string FILE_DOESNT_EXIST_ERR = "The data file does not exist or it cannot be found at the given location. Exiting!";
		public const string VALUE_ARGUMENT_NON_VALID_ERR = "The value argument is invalid. Type value=Value. Exiting!";
		public const string VAR_ARGUMENT_NON_VALID_ERR = "The variable argument is invalid. Type variable=VarName or var=VarName. Exiting!";
		public const string CLASS_ARGUMENT_NON_VALID_ERR = "The class argument is invalid. Type class=ClassName. Exiting!";
		public const string INVALID_NUM_OF_ARGUMENTS_ERR = "Invalid number of arguments supplied, there must be 3. Exiting!";
		public const string FILE_DOESNT_CONTAIN_GIVEN_CLASS_ERR = "The file doesn't contain the given class. Exiting!";
		public const string FILE_DOESNT_CONTAIN_GIVEN_VARIABLE_ERR = "The file doesn't contain the given variable. Exiting!";
		public const string FILE_DOESNT_EXIST_AT_THE_GIVEN_PATH_ERR = "The file cannot be found the the given path: ";
		public const string THE_CLASS_DOESNT_CONTAINT_GIVEN_VAR_ERR = "The class segment doesn't contain the given variable. Exiting!";
		
		public const string NUMBER_OF_ARGS_SUPPLIED_LABEL = "Number of arguments supplied: ";
		public const string NUMBER_OF_CHARS_BEFORE_OPS_LABEL = "Number of characters before operations: ";
		public const string NUMBER_OF_CHARS_AFTER_OPS_LABEL = "Number of characters after operations: ";
		public const string HELP_TITLE_LABEL = "------------ HELP ------------";
		
		public const string HELP_1_MSG = "Run the program with arguments: class, variable and value.";
		public const string HELP_2_MSG = "Use equal(=) sign to separate argument from its value.";
		public const string HELP_3_MSG = "Separate arguments by using a whitespace.";
		public const string HELP_4_MSG = "Example: program.exe class=MyClass variable=MyVar value=MyValue. You can use var instead of variable.";
		
		public const string END_GROUP_KEY = "end_group";
		public const string SET_KEY = "set";
		public const string PUSH_KEY = "push";
		public const string CLASS_ENDING_KEY = " {";
		
		public const string CLASS_ARG = "class=";
		public const string VAR_ARG = "var=";
		public const string VARIABLE_ARG = "variable=";
		public const string VALUE_ARG = "value=";
	}
}

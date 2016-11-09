/*
 * Created by SharpDevelop.
 * User: vlado
 * Date: 30.03.2016
 * Time: 10:08
 * 
 * To change this template use Tools | Options | Coding | Edit Standard Headers.
 */
using System;
using System.IO;
using System.Collections;
using System.Collections.Generic;

namespace Pipeline_Dev_Vezhba_2D
{
	class Program
	{
		static string className = String.Empty;
		static string varName = String.Empty;
		static string varValue = String.Empty;
		
		/// <summary>
		/// Main application function. Covers execution of the application
		/// environment including application specific tasks.
		/// </summary>
		/// <param name="args">string[]</param>
		/// <returns></returns>
		public static int Main(string[] args)
		{
			switch (args.Length)
			{
				case 3:
					if (!args[0].StartsWith(Helper.CLASS_ARG))
					{
						PrintMessage(Helper.CLASS_ARGUMENT_NON_VALID_ERR);
						return 1;
					}
					
					if (!(args[1].StartsWith(Helper.VARIABLE_ARG) || args[1].StartsWith(Helper.VAR_ARG)))
					{
						PrintMessage(Helper.VAR_ARGUMENT_NON_VALID_ERR);
						return 1;
					}
					
					if (!args[2].StartsWith(Helper.VALUE_ARG))
					{
						PrintMessage(Helper.VALUE_ARGUMENT_NON_VALID_ERR);
						return 1;
					}
					
					className = args[0].Split('=')[1];
					varName = args[1].Split('=')[1];
					varValue = args[2].Split('=')[1];
					
					for (int i = 0; i < args.Length; i += 1)
					{
						Console.WriteLine(args[i]);
					}
					
					PerformFileOperations(args);
					
					return 0;
				default:
					PrintHelp();
					PrintMessage(Helper.INVALID_NUM_OF_ARGUMENTS_ERR);
					PrintMessage(Helper.NUMBER_OF_ARGS_SUPPLIED_LABEL + args.Length);
					break;
			}
			
			return 0;
		}

		/// <summary>
		/// Print single line with data from string contents
		/// </summary>
		/// <param name="msg">string</param>
		static void PrintMessage (string msg = "")
		{
			Console.WriteLine(msg);
		}
		
		/// <summary>
		/// Write data to file from string variable using StreamWriter char by char and add some indentation.
		/// </summary>
		/// <param name="data">string</param>
		static void WriteToFile (string data)
		{
			try
			{
				using (StreamWriter sw = new StreamWriter(Helper.FILE_PATH))
				{
					string str = String.Empty;
					foreach (Char ch in data)
					{
						if (ch.Equals('\n'))
						{
							if (!str.EndsWith(Helper.CLASS_ENDING_KEY) && 
							    !str.StartsWith(Helper.PUSH_KEY) &&
							    !str.StartsWith(Helper.SET_KEY) &&
							    !str.Equals(Helper.END_GROUP_KEY) &&
							   	!str.Equals("}"))
							{
								str = "    " + str;
							}
							if (!str.Equals("}"))
							{
								//str = "    " + str;
							}
							sw.WriteLine(str);
							str = String.Empty;
						}
						else
						{
							str += ch;
						}
					}
					sw.Close();
				}
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex.Message);
			}
		}
		
		/// <summary>
		/// Read from file using StreamReader, line by line and put file contents
		/// inside string variable
		/// </summary>
		/// <param name="filePath">string</param>
		/// <returns>string</returns>
		static string ReadFromFile (string filePath)
		{
			string result = String.Empty;
			string stringLine = String.Empty;

			try
			{
				using (StreamReader sr = File.OpenText(filePath))
				{
					while((stringLine = sr.ReadLine()) != null)
					{
						result += stringLine;
						result +="\n";
					}
					sr.Close();
				}
				return result;
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex.Message);
				return String.Empty;
			}
		}
		
		/// <summary>
		/// Print help messages
		/// </summary>
		static void PrintHelp ()
		{
			PrintMessage();
			PrintMessage(Helper.HELP_TITLE_LABEL);
			PrintMessage(Helper.HELP_1_MSG);
			PrintMessage(Helper.HELP_2_MSG);
			PrintMessage(Helper.HELP_3_MSG);
			PrintMessage(Helper.HELP_4_MSG);
			PrintMessage();
		}
		
		/// <summary>
		/// Clear given string variable from surplus whitespaces and empty or null rows
		/// </summary>
		/// <param name="data">string</param>
		/// <returns>string</returns>
		static string ClearWhiteSpacesAndEmptyRows (string data)
		{
			StringReader sr = new StringReader(data);
			string line = String.Empty;
			string lineAfterTrim = String.Empty;
			string result = String.Empty;
			while((line = sr.ReadLine()) != null)
			{
				lineAfterTrim = line.Trim();
				if (!String.IsNullOrWhiteSpace(lineAfterTrim))
				{
					result += lineAfterTrim;
					result += "\n";
				}
			}
			
			return result;
		}
		
		/// <summary>
		/// Prints the length of the given string in console.
		/// </summary>
		/// <param name="data">string</param>
		static void PrintStrLenInConsole (string data)
		{
			PrintMessage("String length: " + data.Length.ToString());
		}
		
		/// <summary>
		/// Perform all necessary file operations. Check if the file exists on the given path.
		/// If yes read its contents and put it in a string variable as it is. Clear the string variable
		/// contents from surplus whitespaces and empty rows. 
		/// Check if the given class name and var name exist in the file. If not, exit the program.
		/// Collect all classes, lines that start with "push", "set" and "end_group" into one ArrayList object(allDataClasses).
		/// Search for the classes in (allDataClasses) that contain the given arguments, 
		/// class and var name and put these classes into helper(newDataList) List.
		/// Replace the old data with new data in the allDataClasses ArrayList and write allDataClasses data into 
		/// a single string variable(wholeFile).
		/// Output the new string data(wholeFile) into a file.
		/// 
		/// Args can be class, variable, and value. 
		/// Example input: Pipeline Dev Vezhba 2D.exe class=MyClass variable=MyVar value=NewValue
		/// </summary>
		/// <param name="args">string[]</param>
		/// <returns>int</returns>
		static int PerformFileOperations (string[] args)
		{
			if (!File.Exists(Helper.FILE_PATH))
			{
				PrintMessage(Helper.FILE_DOESNT_EXIST_ERR);
				PrintMessage(Helper.FILE_DOESNT_EXIST_AT_THE_GIVEN_PATH_ERR + Helper.FILE_PATH);
				
				return 1;
			}
			
			string wholeFile = String.Empty;
			wholeFile = ReadFromFile(Helper.FILE_PATH);
			wholeFile = ClearWhiteSpacesAndEmptyRows(wholeFile);
			
			if (!wholeFile.Contains(className))
			{
				PrintMessage(Helper.FILE_DOESNT_CONTAIN_GIVEN_CLASS_ERR);
				PrintMessage("Class name: " + className);
				return 1;
			}
			
			if (!wholeFile.Contains(varName))
			{
				PrintMessage(Helper.FILE_DOESNT_CONTAIN_GIVEN_VARIABLE_ERR);
				PrintMessage("Var name: " + varName);
				return 1;
			}

			string line;
			string classData = String.Empty;
			bool recordData = false;
			
			ArrayList allDataClasses = new ArrayList();
			ArrayList allDataIndexes = new ArrayList();
			ArrayList allDataCounts = new ArrayList();
			StringReader allDataReader = new StringReader(wholeFile);
			
			// collect all classes, lines that start with push, set and end_group 
			// into one ArrayList object
			while((line = allDataReader.ReadLine()) != null)
			{
				if (line.Equals("}") && classData != String.Empty)
				{
					recordData = false;
					classData += line;
					allDataClasses.Add(classData);
					allDataCounts.Add(classData.Length);
					allDataIndexes.Add(wholeFile.IndexOf(classData, 0));
					classData = String.Empty;
				}
				
				if (line.EndsWith(Helper.CLASS_ENDING_KEY))
				{
					recordData = true;
				}
				
				if (line.StartsWith(Helper.PUSH_KEY) ||
				    line.StartsWith(Helper.SET_KEY) ||
				    line.Equals(Helper.END_GROUP_KEY))
				{
					allDataClasses.Add(line);
					allDataCounts.Add(line.Length);
					allDataIndexes.Add(wholeFile.IndexOf(line, 0));
				}

				if (recordData)
				{
					classData += line;
					classData += "\n";
				}
			}
			
			int allDataIndex = 0;
			List<Tuple<int, string>> newDataList = new List<Tuple<int, string>>();
			
			// search for the classes that contain the given arguments, class and var name
			// and put this data into helper ArrayList
			foreach (string str in allDataClasses)
			{
				if (str.StartsWith(className + Helper.CLASS_ENDING_KEY) && str.Contains(varName))
				{
					string handle = String.Empty;
					string[] varManipulator = str.Split('\n');
					for (int j = 0; j < varManipulator.Length; j += 1)
					{
						if(varManipulator[j].Contains(" "))
						{
							string[] pair = varManipulator[j].Trim().Split(' ');
							handle += (pair[0] == varName ? (varName +" "+ varValue) : varManipulator[j]);
						}
						else
						{
							handle += varManipulator[j];
						}
						handle += '\n';
					}
					newDataList.Add(new Tuple<int, string>(allDataIndex, handle));
				}
				allDataIndex += 1;
			}
			
			// replace the old data with new data in the all classes ArrayList
			foreach(Tuple<int, string> obj in newDataList) 
			{
				allDataClasses[obj.Item1] = obj.Item2;
			}
			
			// write all classes data into a single string variable
			wholeFile = String.Empty;
			foreach(string str in allDataClasses)
			{
				string currentData = str;
				if (!str.EndsWith("\n"))
				{
					currentData += "\n";
				}
				wholeFile += currentData;
			}
			
			// output the new data into a file
			PrintStrLenInConsole(wholeFile);
			WriteToFile(wholeFile);
			return 0;
		}
	}
}
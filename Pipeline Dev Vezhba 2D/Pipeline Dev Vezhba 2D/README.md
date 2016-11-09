					---------- README ----------

This is README file for the file manipulator project. It is an exercise for programming skills
for the job position 2D pipeline C++/Python developer at FX3X, Skopje. 

					---------- Description ------------
					
This application is written in C# as Windows 32-bit console application.
To use this program go to the folder: bin/Debug and use Windows command prompt to run Pipeline Dev Vezhba 2D.exe
You can enter this folder manually with "cd" command or by using the batch file I provided. 

					---------- Command line arguments -------------
					
There are 3 cmd arguments and the program will work if and only if 3 arguments are supplied, i.e no more or less than 3.
 
A common command would look like:

- c:\path\"Pipeline Dev Vezhba 2D.exe" class=MyClass var=MyVar value=MyNewValue

You can use both "var" and "variable" keyword, this would also work:

- c:\path\"Pipeline Dev Vezhba 2D.exe" class=MyClass variable=MyVar value=MyNewValue

The arguments must be separated by a white space and each argument must be glued with equal(=) and its argument name, i.e
this would not work: class = MyClass

					--------- Data file and batch program --------------
					
I created new file for better usage and it is called slate-vezhba.nk. This is the file being edited, read and written to.
You can find it in the Assets folder. 
How do you test? Open slate.nk, select all its contents and copy it into slate-vezhba.nk. 
slate-vezhba.nk file must be inside the Assets folder of this project because the application is compiled to search this 
folder for this specific file.

Ways to run the program:

1. Open RunCmd.bat file and edit the project path. Open Windows command prompt and run this batch file to execute the command.
2. You can also as well add this console application to you windows Path variable. 
3. Or you can run it manually in command prompt.
4. You can also edit some variables/settings inside Helper.cs file but that would require C# compiler to compile it and turn the
	changes into executable code. I recommend, SharpDevelop 5 IDE, .NET 4.0/C# and of course Windows 32 bit operatind system.  

					------- Errors/Problems while running the program -----------
					
Problems that can happen:

If you provide less or more than three arguments, the program will exit.
If you supply argument names diffrent than class, var, variable or value the program will exit.
If you provide argument values that are not existend in the file, the program will exit.
If the data file does not exist or it is on different location the program will exit. 

Author: Vladimir Zakar, 01.04.2016, Skopje
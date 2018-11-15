using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace AdventureWorksWPF.Code
{
    class MainWindowMVVM:Notifier
    {
        public AdventureWorks2012Entities dbEntities { get; set; }

        public MainWindowMVVM()
        {
            dbEntities = new AdventureWorks2012Entities();

            departments = new List<Department>();

            foreach (var d in dbEntities.Departments)
            {
                departments.Add(d);
            }

            employeesByDep = new List<EmployeeDepartmentHistory>();

            shifts = new List<Shift>();

            foreach(var s in dbEntities.Shifts)
            {
                shifts.Add(s);
            }
        }

        private List<Department> _departments;
        public List<Department> departments
        {
            get { return _departments; }
            set
            {
                _departments = value;
                OnPropertyChanged("departments");
            }
        }

        private Department _chosenDepartment;
        public Department chosenDepartment
        {
            get { return _chosenDepartment; }
            set
            {
                _chosenDepartment = value;
                OnPropertyChanged("chosenDepartment");

                employeesByDep.Clear();

                foreach (var v in dbEntities.EmployeeDepartmentHistories)
                {
                    if (v.DepartmentID == _chosenDepartment.DepartmentID)
                    {
                        employeesByDep.Add(v);
                    }
                }

                OnPropertyChanged("employeesByDep");
            }
        }

        private List<EmployeeDepartmentHistory> _employeesByDep;
        public List<EmployeeDepartmentHistory> employeesByDep
        {
            get { return _employeesByDep; }
            set
            {
                _employeesByDep = value;
                OnPropertyChanged("employeesByDep");
            }
        }

        private EmployeeDepartmentHistory _chosenEmployeeByDep;
        public EmployeeDepartmentHistory chosenEmployeeByDep
        {
            get { return _chosenEmployeeByDep; }
            set
            {
                _chosenEmployeeByDep = value;
                OnPropertyChanged("chosenEmployeeByDep");
            }
        }

        private List<Shift> _shifts;
        public List<Shift> shifts
        {
            get { return _shifts; }
            set
            {
                _shifts = value;
                OnPropertyChanged("shifts");
            }
        }

        private Shift _chosenShift;
        public Shift chosenShift
        {
            get { return _chosenShift; }
            set
            {
                _chosenShift = value;
                OnPropertyChanged("chosenShift");

                if(employeesByDep.Count > 0 )
                {
                    employeesByDep.Clear();

                    foreach (var v in dbEntities.EmployeeDepartmentHistories)
                    {
                        if (v.DepartmentID == _chosenDepartment.DepartmentID && v.ShiftID == _chosenShift.ShiftID)
                        {
                            employeesByDep.Add(v);
                        }
                    }

                    OnPropertyChanged("employeesByDep");
                }
            }
        }
    }
}

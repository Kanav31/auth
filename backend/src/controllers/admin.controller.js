// import { Admin } from "../models/admin.model.js";
// import { CompanyEmployee } from '../models/companyEmployee.model.js';
// import { v4 as uuidv4 } from 'uuid';
// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import jwt from "jsonwebtoken"


// // Controller to add a new admin
// const addAdmin = asyncHandler(async (req, res, next) => {
//     try {
//         const { name, password } = req.body;

//         if (!name || !password) {
//             throw new ApiError(400, "Username and password are required");
//         }

//         const existingAdmin = await Admin.findOne({ name });
//         if (existingAdmin) {
//             throw new ApiError(409, "Admin with this username already exists");
//         }

//         const newAdmin = new Admin({ name, password });
//         await newAdmin.save();

//         return res.status(201).json(new ApiResponse(201, newAdmin, "Admin created successfully"));
//     } catch (error) {
//         next(error);
//     }
// });

// // Controller to handle admin login
// const loginAdmin = asyncHandler(async (req, res, next) => {
//     try {
//         const { name, password } = req.body;

//         if (!name || !password) {
//             throw new ApiError(400, "Name and password are required");
//         }

//         const admin = await Admin.findOne({ name });
//         console.log(admin.password);
//         console.log(password);
//         if (!admin || !(await admin.isPasswordCorrect(password))) {
//             throw new ApiError(401, "Invalid username or password");
//         }

//         // Generate a JWT token
//         const token = jwt.sign({ _id: admin._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

//         return res.status(200).json(new ApiResponse(200, { token }, "Login successful"));
//     } catch (error) {
//         next(error);
//     }
// });

// // Controller function to create a new employee
// const createEmployee = async (req, res) => {
//     try {
//         const { fullName, email, company } = req.body;

//         if (!fullName || !email || !company) {
//             return res.status(400).json({ message: "All fields (fullName, email, company) are required" });
//         }

//         const newEmployee = new CompanyEmployee({
//             employeeId: uuidv4(),
//             fullName,
//             email,
//             company
//         });

//         await newEmployee.save();

//         return res.status(201).json({ message: "Employee created successfully", employee: newEmployee });
//     } catch (error) {
//         console.error('Error creating employee:', error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

// // Controller function to get all employees
// const getAllEmployees = async (req, res) => {
//     try {
//         const employees = await CompanyEmployee.find();
//         return res.status(200).json(employees);
//     } catch (error) {
//         console.error('Error fetching employees:', error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

// // Controller function to get a specific employee by ID
// const getEmployeeById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const employee = await CompanyEmployee.findOne({ employeeId: id });

//         if (!employee) {
//             return res.status(404).json({ message: "Employee not found" });
//         }

//         return res.status(200).json(employee);
//     } catch (error) {
//         console.error('Error fetching employee:', error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

// // Controller function to update a specific employee by ID
// const updateEmployee = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { fullName, email, company } = req.body;

//         const updatedEmployee = await CompanyEmployee.findOneAndUpdate(
//             { employeeId: id },
//             { fullName, email, company },
//             { new: true, runValidators: true }
//         );

//         if (!updatedEmployee) {
//             return res.status(404).json({ message: "Employee not found" });
//         }

//         return res.status(200).json({ message: "Employee updated successfully", employee: updatedEmployee });
//     } catch (error) {
//         console.error('Error updating employee:', error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

// // Controller function to delete a specific employee by ID
// const deleteEmployee = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deletedEmployee = await CompanyEmployee.findOneAndDelete({ employeeId: id });

//         if (!deletedEmployee) {
//             return res.status(404).json({ message: "Employee not found" });
//         }

//         return res.status(200).json({ message: "Employee deleted successfully" });
//     } catch (error) {
//         console.error('Error deleting employee:', error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

// // Controller to change the admin by deleting the previous one
// const changeAdmin = asyncHandler(async (req, res, next) => {
//     try {
//         const { username, password } = req.body;

//         // Validate input
//         if (!username || !password) {
//             throw new ApiError(400, "Username and password are required");
//         }

//         // Delete all existing admins
//         await Admin.deleteMany({});

//         const newAdmin = new Admin({ username, password });
//         await newAdmin.save();

//         return res.status(201).json(new ApiResponse(201, newAdmin, "Admin changed successfully"));
//     } catch (error) {
//         next(error);
//     }
// });

// export {
//     addAdmin,
//     loginAdmin,
//     createEmployee,
//     getAllEmployees,
//     getEmployeeById,
//     updateEmployee,
//     deleteEmployee,
//     changeAdmin
// };


import { Admin } from "../models/admin.model.js";
import { CompanyEmployee } from '../models/companyEmployee.model.js';
import { v4 as uuidv4 } from 'uuid';
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

// Controller to add a new admin
const addAdmin = asyncHandler(async (req, res, next) => {
    try {
        const { name, password } = req.body;

        if (!name || !password) {
            throw new ApiError(400, "Username and password are required");
        }

        const existingAdmin = await Admin.findOne({ name });
        if (existingAdmin) {
            throw new ApiError(409, "Admin with this username already exists");
        }

        const newAdmin = new Admin({ name, password });
        await newAdmin.save();

        return res.status(201).json(new ApiResponse(201, newAdmin, "Admin created successfully"));
    } catch (error) {
        next(error);
    }
});

// Controller to handle admin login
const loginAdmin = asyncHandler(async (req, res, next) => {
    try {
        const { name, password } = req.body;

        if (!name || !password) {
            throw new ApiError(400, "Name and password are required");
        }

        const admin = await Admin.findOne({ name });
        if (!admin || !(await admin.isPasswordCorrect(password))) {
            throw new ApiError(401, "Invalid username or password");
        }

        // Generate JWT tokens
        const accessToken = jwt.sign({ _id: admin._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ _id: admin._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        // Set tokens as cookies
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(200, { accessToken, refreshToken }, "Login successful"));

    } catch (error) {
        next(error);
    }
});

// Controller function to create a new employee
const createEmployee = asyncHandler(async (req, res) => {
    try {
        const { fullName, email, company } = req.body;

        if (!fullName || !email || !company) {
            return res.status(400).json({ message: "All fields (fullName, email, company) are required" });
        }

        const newEmployee = new CompanyEmployee({
            employeeId: uuidv4(),
            fullName,
            email,
            company
        });

        await newEmployee.save();

        return res.status(201).json({ message: "Employee created successfully", employee: newEmployee });
    } catch (error) {
        console.error('Error creating employee:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Controller function to get all employees
const getAllEmployees = asyncHandler(async (req, res) => {
    try {
        const employees = await CompanyEmployee.find();
        return res.status(200).json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Controller function to get a specific employee by ID
const getEmployeeById = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await CompanyEmployee.findOne({ employeeId: id });

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        return res.status(200).json(employee);
    } catch (error) {
        console.error('Error fetching employee:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


// Controller function to delete a specific employee by ID
const deleteEmployee = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEmployee = await CompanyEmployee.findOneAndDelete({ employeeId: id });

        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        return res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        console.error('Error deleting employee:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Controller to change the admin by deleting the previous one
const changeAdmin = asyncHandler(async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            throw new ApiError(400, "Username and password are required");
        }

        // Delete all existing admins
        await Admin.deleteMany({});

        const newAdmin = new Admin({ username, password });
        await newAdmin.save();

        return res.status(201).json(new ApiResponse(201, newAdmin, "Admin changed successfully"));
    } catch (error) {
        next(error);
    }
});

export {
    addAdmin,
    loginAdmin,
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    deleteEmployee,
    changeAdmin
};

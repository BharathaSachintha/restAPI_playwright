# API Testing Framework with Playwright [![Codacy Badge](https://app.codacy.com/project/badge/Grade/aa94e04874154ff2bb3d42f2b600ac55)](https://www.codacy.com/gh/rampatra/jbot/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=rampatra/jbot&amp;utm_campaign=Badge_Grade)

A robust API testing framework built with Playwright for testing RESTful APIs. This framework follows best practices for
API testing with support for data generation, request handling, and comprehensive logging.

## Project Structure

### Core Service Files

- `tests/` - Root directory containing all test-related files and folders
    - `functions/` - Contains reusable function modules
        - `restfulAPI/` - API service layer implementations
            - `RestFullAPIService.js` - Core service class handling all API operations with clean interfaces

### Support Files

- `tests/support/` - Contains all supporting utilities and configurations
    - `config/` - Configuration related files
        - `APIConfig.js` - Centralized API endpoints and configuration settings
    - `dataGenerator/` - Test data generation utilities
        - `actions/randomDataGenerator/` - Random data generation modules
            - `DataGenerator.js` - Generates random test data for API requests
    - `utils/` - Utility functions and helper classes
        - `enums/` - Enumeration and constant values
            - `Enums.js` - Centralized enum definitions for the framework
        - `APIUtils.js` - Core HTTP request handling utility
        - `TestAssertions.js` - Common test assertion methods

### Test Cases

- `tests/testcases/` - Contains all test suites
    - `testCaseAPI/` - API-specific test cases
        - `Objects.spec.js` - Test suite for object-related API endpoints

## Key Components

### Service Layer

- `RestFullAPIService.js`: Service class that handles all API operations and provides a clean interface for test cases

### Support Utilities

- `APIUtils.js`: Core utility for making HTTP requests and handling responses
- `APIConfig.js`: Configuration file containing API endpoints and other settings
- `Enums.js`: Enumeration values used across the framework
- `TestAssertions.js`: Common assertion methods for test validation

### Data Generation

- `DataGenerator.js`: Generates random test data for API requests

### Test Cases

- `Objects.spec.js`: Test suite for object-related API endpoints implementing CRUD operations

## Framework Features

- **Service-Based Architecture**: Organized API interactions through service classes
- **Data Generation**: Random data generation for test scenarios
- **Request Handling**: Centralized request management through APIUtils
- **Response Validation**: Structured response validation and assertions
- **Enum Management**: Centralized management of constant values
- **CRUD Testing**: Complete coverage of Create, Read, Update, and Delete operations


## Best Practices Implemented

1. **Service Layer Pattern**: API operations are abstracted through service classes
2. **Reusable Utilities**: Common functionalities are centralized in utility classes
3. **Data Generation**: Dynamic test data generation for robust testing
4. **Structured Assertions**: Standardized validation through TestAssertions
5. **Clean Code Structure**: Well-organized project structure with clear separation of concerns

## Environment Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables in `.env` file:

```env
API_BASE_URL=your_api_base_url
```

## Test Execution

To run the tests:

```bash
npx playwright test
```

To run a specific test file:

```bash
npx playwright test tests/testcases/testCaseAPI/Objects.spec.js
```

To view the HTML test report:

```bash
# Default port (9323)
npx playwright show-report

# If port 9323 is in use, specify a different port
npx playwright show-report --port 9324
```

If you encounter a port in use error (EADDRINUSE), try these solutions:

For Windows:
```bash
netstat -ano | findstr :9323
taskkill /PID <PID> /F
```

For Mac/Linux:
```bash
lsof -i :9323
kill -9 <PID>
```


### Contributors

<table border="0">
  <tr>
    <td width=25%">
 <div class="card-body">
    <h5 class="card-title"></h5>
    <a href="#" class="btn btn-primary"></a>
  </div>     
<a href="" class="btn btn-primary">View Profile</a>
 <td width=25%">
<div class="card-body">
<p>Design & Infrastructure:</p>
    <h5 class="card-title">Bharatha Sachintha</h5>
    <a href="#" class="btn btn-primary"></a>
  </div>     
<a href="" class="btn btn-primary">View Profile</a>
 <td width=25%">
<div class="card-body">
<p>Scope & Management:</p>
    <a href="#" class="btn btn-primary"></a>
  </div>      
<a href="" class="btn btn-primary">View Profile</a>

 <td width=25%">
<div class="card-body">
<p>Documentation(s):</p>
    <h5 class="card-title">Bharatha Sachintha</h5>
    <a href="#" class="btn btn-primary"></a>
  </div>      
<a href="" class="btn btn-primary">View Profile</a>

</td>
  </tr>
<tr>
    <td width=25%">
 <div class="card-body">
<p>Development / System Integrations:</p>
    <h5 class="card-title">Bharatha Sachintha</h5>
    <a href="#" class="btn btn-primary"></a>
  </div>     
<a href="" class="btn btn-primary">View Profile</a>

<td width=20%">
<div class="card-body">
<p>Test Cases / QA:</p>
    <a href="#" class="btn btn-primary"></a>
  </div>      
<a href="" class="btn btn-primary">View Profile</a>

<td width=20%">
<div class="card-body">
<p>Scripting:</p>
    <h5 class="card-title">Bharatha Sachintha</h5>
    <a href="#" class="btn btn-primary"></a>
  </div>  
<a href="" class="btn btn-primary">View Profile</a>
</td>

 <td width=20%">
<div class="card-body">
<p>DevOps:</p>
    <a href="#" class="btn btn-primary"></a>
  </div>  
<a href="" class="btn btn-primary">View Profile</a>
</td>

  </tr>
 </table>

### Releases

<table border="0">
  <tr>
    <td>
 <div class="card-body">
    <h5 class="card-title">Initial Release  </h5>
    <a href="#" class="btn btn-primary"></a>
  </div>     
 <td >
 <div class="card-body">
    <h5 class="card-title">19 Jan 2025 </h5>
    <a href="#" class="btn btn-primary"></a>
  </div>   
<td >
 <div class="card-body">
    <h5 class="card-title">Bharatha Sachintha</h5>
    <a href="#" class="btn btn-primary"></a>
  </div> 
</tr>

<tr>
    <td>
 <div class="card-body">
    <h5 class="card-title">V1.01.00  </h5>
    <a href="#" class="btn btn-primary"></a>
  </div>     
 <td >
 <div class="card-body">
    <h5 class="card-title">19 Jan 2025 </h5>
    <a href="#" class="btn btn-primary"></a>
  </div>   
<td >
 <div class="card-body">
    <h5 class="card-title">Bharatha Sachintha</h5>
    <a href="#" class="btn btn-primary"></a>
  </div> 
</tr>

 </table>


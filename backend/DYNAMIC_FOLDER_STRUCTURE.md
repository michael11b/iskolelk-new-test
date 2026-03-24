# Dynamic Folder Structure for File Uploads

## Overview
The file upload system now uses dynamic folder paths based on the exam type and other parameters instead of static folders like `papers/` and `marking-schemes/`.

## Folder Structure

### AL (Advanced Level) Papers
- **Papers**: `al/{subject}/{medium}/{filename}`
- **Marking Schemes**: `al/{subject}/{medium}/markingschemes/{filename}`

**Example:**
```
al/accounting/sinhala/2023-al-accounting-1.pdf
al/accounting/sinhala/markingschemes/2023-al-accounting-1.pdf
```

### OL (Ordinary Level) Papers
- **Papers**: `ol/{subject}/{medium}/{filename}`
- **Marking Schemes**: `ol/{subject}/{medium}/markingschemes/{filename}`

**Example:**
```
ol/maths/sinhala/2023-ol-maths-11.pdf
ol/maths/sinhala/markingschemes/2023-ol-maths-11.pdf
```

### Scholarship Papers
- **Papers**: `scholarship/{medium}/{filename}`
- **Marking Schemes**: `scholarship/{medium}/markingschemes/{filename}`

**Example:**
```
scholarship/sinhala/2023-scholarship-23.pdf
scholarship/sinhala/markingschemes/2023-scholarship-23.pdf
```

### Files without examType
Files uploaded without an `examType` parameter are stored in the `misc/` folder with a unique suffix.

**Example:**
```
misc/paper-1753632765988-698784793.pdf
```

## Filename Generation
Filenames are generated using the following pattern:
- `{year}-{examType}-{subject}-{paperNumber}.{extension}`

For scholarship papers (which don't have subjects):
- `{year}-{examType}-{paperNumber}.{extension}`

## Implementation Details

### Files Modified
1. `src/utils/pathGenerator.js` - Centralized path generation logic
2. `src/utils/fileUpload.js` - Updated local storage configuration
3. `src/utils/s3Config.js` - Updated S3 storage configuration
4. `src/utils/r2Config.js` - Updated R2 storage configuration
5. `src/controllers/paperController.js` - Updated to use new path structure

### Key Features
- **Dynamic Path Generation**: Paths are generated based on form data parameters
- **Automatic Directory Creation**: Directories are created automatically for local storage
- **Cloud Storage Compatible**: Works with both S3 and R2 cloud storage
- **Backward Compatibility**: Existing files in old structure continue to work
- **Fallback Handling**: Files without examType go to misc folder

### Usage
The system automatically detects the exam type and other parameters from the form data and generates appropriate folder paths. No changes are needed in the frontend or API calls - the system handles the path generation transparently.

## Migration Notes
- Existing files in the old structure (`papers/` and `marking-schemes/` folders) will continue to work
- New uploads will use the new dynamic structure
- File deletion utilities work with both old and new path structures 
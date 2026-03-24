import { sendResponse } from '../utils/responseHandler.js';

export const getAll = (Model) => async (req, res) => {
  try {
    let query = {};
    
    // Add organization filter if it exists in request
    if (req.user.organization && req.user.role !== 'SUPER_ADMIN') {
      query.organization = req.user.organization;
    }

    // Basic filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);
    query = { ...query, ...queryObj };

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalCount = await Model.countDocuments(query);

    // Execute query
    const documents = await Model.find(query)
      .skip(skip)
      .limit(limit);

    sendResponse(res, 200, "success", 'Data retrieved successfully', {
      documents,
      pagination: {
        total: totalCount,
        page,
        pages: Math.ceil(totalCount / limit),
        limit
      }
    });
  } catch (error) {
    sendResponse(res, 500, "error", error.message);
  }
};

export const getOne = (Model, popOptions) => async (req, res) => {
  try {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    
    const document = await query;
    if (!document) {
      sendResponse(res, 404, "error", 'No document found with that ID');
      return;
    }

    // Check if user has access to this organization's data
    if (req.user.role !== 'SUPER_ADMIN' && 
        document.organization.toString() !== req.user.organization.toString()) {
      sendResponse(res, 403, "error", 'You do not have permission to access this document');
      return;
    }

    sendResponse(res, 200, "success", 'Document retrieved successfully', { document });
  } catch (error) {
    sendResponse(res, 500, "error", error.message);
  }
};

export const createOne = (Model) => async (req, res) => {
  try {
    // Add organization to the document if user is not super admin
    if (req.user.role !== 'SUPER_ADMIN') {
      req.body.organization = req.user.organization;
    } else {
      req.body.organization = req.user.organization;
    }

    // Add audit fields
    req.body.createdBy = req.user._id;
    req.body.lastUpdatedBy = req.user._id;

    const document = await Model.create(req.body);
    sendResponse(res, 201, "success", 'Document created successfully', { document });
  } catch (error) {
    sendResponse(res, 500, "error", error.message);
  }
};

export const updateOne = (Model) => async (req, res) => {
  try {
    const document = await Model.findById(req.params.id);
    if (!document) {
      sendResponse(res, 404, "error", 'No document found with that ID');
      return;
    }

    // Check organization access
    if (req.user.role !== 'SUPER_ADMIN' && 
        document.organization.toString() !== req.user.organization.toString()) {
      sendResponse(res, 403, "error", 'You do not have permission to update this document');
      return;
    }

    // Add audit field
    req.body.lastUpdatedBy = req.user._id;

    const updatedDocument = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    sendResponse(res, 200, "success", 'Document updated successfully', { document: updatedDocument });
  } catch (error) {
    sendResponse(res, 500, "error", error.message);
  }
};

export const deleteOne = (Model) => async (req, res) => {
  try {
    const document = await Model.findById(req.params.id);
    if (!document) {
      sendResponse(res, 404, "error", 'No document found with that ID');
      return;
    }

    // Check organization access
    if (req.user.role !== 'SUPER_ADMIN' && 
        document.organization.toString() !== req.user.organization.toString()) {
      sendResponse(res, 403, "error", 'You do not have permission to delete this document');
      return;
    }

    await Model.findByIdAndDelete(req.params.id);
    sendResponse(res, 204, "success", 'Document deleted successfully');
  } catch (error) {
    sendResponse(res, 500, "error", error.message);
  }
}; 
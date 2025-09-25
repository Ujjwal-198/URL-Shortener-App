import { Url } from '../models/urlModel.js';
import { nanoid } from 'nanoid';
import validator from 'validator';

const BASE_URL = process.env.BACKEND_URL || 'http://localhost:8080';

// CREATE
export const handleCreateUrl = async (req, res) => {
  const { longUrl } = req.body;
  try {
    if (!longUrl || !validator.isURL(longUrl, { require_protocol: true })) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Invalid URL.' },
      });
    }

    const shortId = nanoid(7);
    const response = await Url.create({
      shortId,
      longUrl,
      userId: req.user?.id,
      visitHistory: [],
    });

    if (!response) {
      return res.status(500).json({
        success: false,
        error: { code: 'ERROR', message: 'Error creating Database entry' },
      });
    }

    return res.status(201).json({
      success: true,
      data: {
        LongURL: response.longUrl,
        ShortId: `${BASE_URL}/api/url/${shortId}`,
        urlInfo: {
          totalClick: response.visitHistory.length,
          History: response.visitHistory,
        },
      },
      message: 'ShortURL created successfully',
    });
  } catch (error) {
    console.error('handleCreateUrl error:', error);
    return res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_SERVER_ERROR', message: 'Internal Server Error' },
      message: error.message,
    });
  }
};

// REDIRECT
export const handleRedirect = async (req, res) => {
  const { shortId } = req.params;
  try {
    if (!shortId) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'ShortId is required' },
      });
    }

    // find url document
    const urlDoc = await Url.findOne({ shortId });
    if (!urlDoc) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Short URL does not exist' },
      });
    }

    
    urlDoc.visitHistory.push({ TimeNow: new Date().toLocaleString() });
    await urlDoc.save();

    return res.redirect(urlDoc.longUrl);
  } catch (error) {
    console.error('handleRedirect error:', error);
    return res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_SERVER_ERROR', message: 'Internal Server Error' },
      message: error.message,
    });
  }
};

// GET ALL URLS FOR A USER (uniform response)
export const handleGetAllUrl = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "User ID is required",
        },
      });
    }

    const urls = await Url.find({ userId });

    if (!urls || urls.length === 0) {
      return res.status(404).json({
        success: false,
        error: {
          code: "NOT_FOUND",
          message: "No URLs found for this user",
        },
      });
    }

    const formattedUrls = urls.map((url) => ({
      LongURL: url.longUrl,
      ShortId: `${BASE_URL}/api/url/${url.shortId}`,
      urlInfo: {
        totalClick: url.visitHistory.length,
        History: url.visitHistory,
      },
    }));

    return res.status(200).json({
      success: true,
      data: {
        count: urls.length,
        urls: formattedUrls,
      },
      message: "User URLs fetched successfully",
    });
  } catch (error) {
    console.error("handleGetAllUrl error:", error);
    return res.status(500).json({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal Server Error",
      },
      message: error.message,
    });
  }
};

export const handleDeleteUrl = async (req, res) => {
  const { shortId } = req.params;
  try {
    if (!shortId) {

      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'ShortId is required' },
      });
    }
    
    const urlDoc = await Url.findOneAndDelete({ shortId });
    if (!urlDoc) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Short URL does not exist' }
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Short URL deleted successfully',
    });
  }
  catch (error) {
    console.error('handleDeleteUrl error:', error);
    return res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_SERVER_ERROR', message: 'Internal Server Error' },
      message: error.message,
    });
  }
};

export const handleDeleteAllUrlsForUser = async (userId) => {
  try {
    if (!userId) {
      throw new Error('User ID is required to delete URLs');

    }
    await Url.deleteMany({ userId });
    return { success: true, message: 'All URLs for user deleted successfully' };
  } catch (error) {
    console.error('handleDeleteAllUrlsForUser error:', error);
    throw new Error('Error deleting URLs for user');
  }
};

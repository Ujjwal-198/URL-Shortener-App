import rateLimit from 'express-rate-limit';

export const UrlLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after an hour.',
});

export const UserLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 50,
  message: 'Too many requests from this IP, please try again after an hour.',
});
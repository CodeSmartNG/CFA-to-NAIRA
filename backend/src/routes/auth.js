// routes/auth.js
router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, me);

// routes/rates.js
router.get('/', getRate);
router.put('/', protect, adminOnly, updateRate);

// routes/requests.js
router.post('/', protect, createRequest);
router.get('/mine', protect, myRequests);
router.patch('/:id/cancel', protect, cancelRequest);
router.get('/', protect, adminOnly, listAll);
router.patch('/:id/review', protect, adminOnly, reviewRequest);

// routes/reports.js
router.get('/dashboard', protect, adminOnly, dashboard);

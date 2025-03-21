const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const connectdb = require('./db'); 
const authRoutes = require('./routes/auth'); 
const signRoutes = require('./routes/sign'); 
const adminRoutes = require('./routes/admin');
const logoutRoute = require('./routes/logout'); 

const session = require('express-session');
const cookieParser = require('cookie-parser');

// Database Connection
connectdb();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // ✅ Serve static files

// Session Middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/login', authRoutes);
app.use('/signup', signRoutes);
app.use('/admin', adminRoutes);
app.use('/', logoutRoute);  // ✅ Placed logout route after middleware

// Main Pages
app.get('/', (req, res) => res.render('home'));  // ✅ Correct position
app.get('/playlist', (req, res) => res.render('playlist'));

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('❗ Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

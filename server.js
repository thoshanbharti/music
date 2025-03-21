const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const connectdb = require('./db'); 
const authRoutes = require('./routes/auth'); 
const signRoutes = require('./routes/sign'); 
const session = require('express-session');
const cookieParser = require('cookie-parser');
const adminRoutes = require('./routes/admin');

const logoutRoute = require('./routes/logout'); // Import the logout route
app.use('/', logoutRoute); // Register the logout route

app.get('/', (req, res) => {
    res.render('home'); // Renders home page directly
});

// Database Connection
connectdb();
   

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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


// Main Pages

app.get('/playlist', (req, res) => res.render('playlist'));

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('❗ Error:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

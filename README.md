# URL Shortener

A simple and efficient URL shortener application built with JavaScript, CSS, and HTML. This tool allows users to convert long URLs into shorter, more manageable links that are easier to share across platforms.

## Features

- 🔗 **Quick URL Shortening** - Convert long URLs into short, memorable links
- 📋 **Copy to Clipboard** - Easily copy shortened URLs with a single click
- 🎨 **Clean UI** - Intuitive and user-friendly interface
- ⚡ **Fast Processing** - Instant URL shortening
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🔄 **No Database Required** - Works client-side with no backend setup needed

## Project Structure

```
CodeAlpha_URLshortner/
├── index.html          # Main HTML file
├── style.css           # Styling for the application
├── script.js           # JavaScript logic for URL shortening
└── README.md          # This file
```

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (97.4%)
- **Styling**: CSS (2.1%)
- **Markup**: HTML (0.5%)

## Getting Started

### Prerequisites

To run this project locally, you only need:
- A modern web browser (Chrome, Firefox, Safari, Edge, etc.)
- A code editor (optional, for development)
- Git (optional, for cloning the repository)

### Installation

#### Option 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/rahulthapa9024/CodeAlpha_URLshortner.git

# Navigate to the project directory
cd CodeAlpha_URLshortner
```

#### Option 2: Download ZIP

1. Go to the repository on GitHub
2. Click the green "Code" button
3. Select "Download ZIP"
4. Extract the ZIP file to your desired location

### Running Locally

#### Method 1: Direct File Opening (Simplest)

1. Navigate to the project folder
2. Double-click `index.html` to open it in your default browser
3. The application will load and be ready to use

#### Method 2: Using a Local Server

For better development experience and to avoid potential CORS issues, run a local server:

**Using Python 3:**
```bash
# Navigate to the project directory
cd CodeAlpha_URLshortner

# Start a local server
python -m http.server 8000
```

Then open your browser and go to: `http://localhost:8000`

**Using Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Using Node.js (if installed):**
```bash
# Install http-server globally (one-time)
npm install -g http-server

# Start the server
http-server
```

**Using PHP (if installed):**
```bash
php -S localhost:8000
```

**Using Live Server in VS Code:**
1. Install the "Live Server" extension by Ritwick Dey
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Usage

1. Open the application in your browser
2. Enter a long URL in the input field
3. Click the "Shorten URL" button
4. Your shortened URL will be displayed
5. Click "Copy" to copy it to your clipboard
6. Share the shortened URL wherever you like

## Development

### Modifying the Code

The project is structured as follows:

- **index.html** - Contains the HTML structure and form elements
- **style.css** - All styling and responsive design rules
- **script.js** - Core URL shortening logic and event handlers

To modify the application:

1. Open the files in your favorite code editor
2. Make your changes
3. Save the files
4. Refresh your browser to see the changes

### Common Customizations

**Change Colors:**
- Edit `style.css` to modify color schemes

**Adjust URL Algorithm:**
- Modify the URL shortening logic in `script.js`

**Update UI Text:**
- Edit labels and button text in `index.html`

## Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## File Descriptions

### index.html
Contains the HTML markup for:
- URL input field
- Shortening button
- Results display area
- Copy to clipboard button

### style.css
Includes styling for:
- Layout and positioning
- Color scheme and typography
- Responsive design for mobile devices
- Button and input field styling
- Animations and transitions

### script.js
Contains functionality for:
- URL validation
- URL shortening algorithm
- Clipboard copy functionality
- User interaction event handling

## Known Limitations

- URLs are shortened client-side only (no persistent storage)
- Shortened URLs are temporary (not stored on a server)
- For production use, consider integrating a backend service

## Future Enhancements

Potential improvements for future versions:
- Backend integration for persistent URL storage
- URL analytics and click tracking
- Custom short URL creation
- QR code generation
- URL expiration settings
- User accounts and URL management dashboard

## Troubleshooting

### The application won't open
- Ensure you're using a modern web browser
- Try opening with a different browser
- Check that all files are in the same directory

### Copy to clipboard doesn't work
- Ensure your browser has clipboard permissions
- Try using a local server instead of opening the file directly

### Styling looks broken
- Clear your browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
- Ensure all files are in the same directory
- Try opening in a different browser

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/YourFeature`)
6. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Author

**Rahul Thapa**
- GitHub: [@rahulthapa9024](https://github.com/rahulthapa9024)

## Support

If you encounter any issues or have questions:

1. Check the Troubleshooting section above
2. Open an issue on the [GitHub repository](https://github.com/rahulthapa9024/CodeAlpha_URLshortner/issues)
3. Review existing issues for similar problems

## Disclaimer

This is a simple URL shortener for educational and personal use. For production environments, consider using established URL shortening services or implementing a robust backend.

---

**Happy shortening! 🚀**

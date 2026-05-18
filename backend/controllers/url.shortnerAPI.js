import { nanoid } from "nanoid";
import { Url } from "../models/urlSchema.js";

/**
 * Creates a shortened URL for the authenticated user.
 */
export const CreateShortUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;

        // 1. Check if URL is provided
        if (!originalUrl) {
            return res.status(400).json({
                success: false,
                message: "URL is required"
            });
        }

        // 2. Normalize URL (ensure protocol exists for standard redirection)
        let normalizedUrl = originalUrl.trim();
        if (!/^https?:\/\//i.test(normalizedUrl)) {
            normalizedUrl = `http://${normalizedUrl}`;
        }

        // 3. Validate URL format structure
        try {
            new URL(normalizedUrl);
        } catch (e) {
            return res.status(400).json({
                success: false,
                message: "Invalid URL format"
            });
        }

        // 4. Retrieve email from isLoggedIn verified middleware req.user
        const email = req.user.email;

        // 5. Check if this user already shortened this exact URL
        const existingUrl = await Url.findOne({
            email,
            originalUrl: normalizedUrl
        });

        const host = req.get("host");
        const protocol = req.protocol;

        if (existingUrl) {
            return res.status(200).json({
                success: true,
                message: "Short URL already exists",
                shortUrl: `${protocol}://${host}/${existingUrl.shortCode}`
            });
        }

        // 6. Generate a unique 6-character short code
        let shortCode;
        let isUnique = false;
        
        // Loop to ensure shortCode is globally unique (collision protection)
        while (!isUnique) {
            shortCode = nanoid(6);
            const codeExists = await Url.findOne({ shortCode });
            if (!codeExists) {
                isUnique = true;
            }
        }

        // 7. Create database entry
        const newUrl = await Url.create({
            email,
            originalUrl: normalizedUrl,
            shortCode
        });

        return res.status(201).json({
            success: true,
            message: "Short URL created successfully",
            shortUrl: `${protocol}://${host}/${newUrl.shortCode}`
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

/**
 * Handles HTTP redirection from the short URL to the original URL.
 */
export const RedirectUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;

        // Find the URL mapping
        const urlEntry = await Url.findOne({ shortCode });

        if (!urlEntry) {
            // Elegant premium error page for user experience
            return res.status(404).send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>404 - URL Not Found</title>
                    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600&display=swap" rel="stylesheet">
                    <style>
                        body {
                            background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
                            color: #f1f5f9;
                            font-family: 'Outfit', sans-serif;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            height: 100vh;
                            margin: 0;
                            overflow: hidden;
                        }
                        .container {
                            text-align: center;
                            background: rgba(255, 255, 255, 0.03);
                            backdrop-filter: blur(16px);
                            border: 1px solid rgba(255, 255, 255, 0.08);
                            padding: 3rem;
                            border-radius: 24px;
                            box-shadow: 0 10px 50px rgba(0, 0, 0, 0.3);
                            max-width: 400px;
                            width: 90%;
                            animation: fadeIn 0.8s ease-out;
                        }
                        h1 {
                            font-size: 5rem;
                            margin: 0;
                            background: linear-gradient(90deg, #38bdf8, #818cf8);
                            -webkit-background-clip: text;
                            -webkit-text-fill-color: transparent;
                        }
                        h2 {
                            font-size: 1.5rem;
                            margin-top: 0;
                            color: #cbd5e1;
                        }
                        p {
                            color: #94a3b8;
                            line-height: 1.6;
                            margin-bottom: 2rem;
                        }
                        .btn {
                            display: inline-block;
                            background: linear-gradient(95deg, #4f46e5 0%, #06b6d4 100%);
                            color: #ffffff;
                            text-decoration: none;
                            padding: 0.8rem 2rem;
                            border-radius: 12px;
                            font-weight: 600;
                            transition: transform 0.2s, box-shadow 0.2s;
                            box-shadow: 0 4px 20px rgba(79, 70, 229, 0.4);
                        }
                        .btn:hover {
                            transform: translateY(-2px);
                            box-shadow: 0 6px 25px rgba(79, 70, 229, 0.6);
                        }
                        @keyframes fadeIn {
                            from { opacity: 0; transform: translateY(20px); }
                            to { opacity: 1; transform: translateY(0); }
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>404</h1>
                        <h2>Short URL Not Found</h2>
                        <p>The link you are trying to access does not exist or has expired. Please verify and try again.</p>
                        <a href="/" class="btn">Go Home</a>
                    </div>
                </body>
                </html>
            `);
        }

        // Perform 302 redirection
        return res.redirect(urlEntry.originalUrl);

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

/**
 * Returns a list of all shortened URLs generated by the authenticated user.
 */
export const GetMyUrls = async (req, res) => {
    try {
        const email = req.user.email;
        const urls = await Url.find({ email }).sort({ createdAt: -1 });

        const host = req.get("host");
        const protocol = req.protocol;

        const formattedUrls = urls.map(u => ({
            _id: u._id,
            originalUrl: u.originalUrl,
            shortCode: u.shortCode,
            shortUrl: `${protocol}://${host}/${u.shortCode}`,
            createdAt: u.createdAt
        }));

        return res.status(200).json({
            success: true,
            urls: formattedUrls
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

/**
 * Deletes a shortened URL generated by the authenticated user.
 */
export const DeleteShortUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;
        const email = req.user.email;

        const deletedUrl = await Url.findOneAndDelete({
            shortCode,
            email
        });

        if (!deletedUrl) {
            return res.status(404).json({
                success: false,
                message: "URL not found or you are not authorized to delete it"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Short URL deleted successfully"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
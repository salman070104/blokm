const { put } = require('@vercel/blob');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verifikasi password
  const authHeader = req.headers.authorization;
  const expectedPassword = process.env.ADMIN_PASSWORD || 'blokmstudio2024';
  if (authHeader !== `Bearer ${expectedPassword}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { filename, imageBase64 } = req.body;
    if (!filename || !imageBase64) {
      return res.status(400).json({ error: 'Missing filename or imageBase64' });
    }

    // Convert base64 Data URL to Buffer
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');

    // Upload to Vercel Blob
    const blob = await put(`photos/${filename}`, buffer, {
      access: 'public',
      addRandomSuffix: true // Mencegah nama file bentrok
    });
    
    return res.status(200).json(blob);
  } catch (error) {
    console.error('Upload Error:', error);
    return res.status(500).json({ error: error.message });
  }
}

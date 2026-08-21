const { put, list } = require('@vercel/blob');

export default async function handler(req, res) {
  // CORS Headers if needed (Vercel automatically handles this usually for same-domain)
  
  if (req.method === 'GET') {
    try {
      // Find the URL of the database.json
      const { blobs } = await list({ prefix: 'database.json' });
      
      if (blobs.length > 0) {
        // Since we might have multiple if we use addRandomSuffix, we sort by uploadedAt to get the latest
        // But if we use addRandomSuffix: false, there's only one. Let's get the most recent just in case.
        blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
        const dbUrl = blobs[0].url;
        
        const response = await fetch(dbUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch DB file');
        }
        const data = await response.json();
        return res.status(200).json(data);
      } else {
        // Belum ada database.json, return empty state
        return res.status(200).json({ 
          portfolioPhotos: [], 
          berandaPhotos: [], 
          services: [] 
        });
      }
    } catch (error) {
      console.error('Data GET Error:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'POST') {
    // Verifikasi password
    const authHeader = req.headers.authorization;
    const expectedPassword = process.env.ADMIN_PASSWORD || 'blokmstudio2024';
    if (authHeader !== `Bearer ${expectedPassword}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const data = req.body;
      
      // Simpan ke Vercel Blob
      // Kita set addRandomSuffix: false agar selalu menimpa file yang sama (database.json)
      // Note: Vercel Blob akan meng-overwrite file yang sama jika namanya sama dan addRandomSuffix = false
      const blob = await put('database.json', JSON.stringify(data), {
        access: 'public',
        addRandomSuffix: false,
        contentType: 'application/json'
      });
      
      return res.status(200).json({ success: true, url: blob.url });
    } catch (error) {
      console.error('Data POST Error:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

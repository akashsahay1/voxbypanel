import apn from 'apn';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { deviceToken, title, message } = req.body;

    // APNs Configuration
    const options = {
      token: {
        key: process.env.APN_KEY_PATH,
        keyId: process.env.APN_KEY_ID,
        teamId: process.env.APN_TEAM_ID,
      },
      production: false // Use true for production
    };

    const apnProvider = new apn.Provider(options);

    // Create notification
    const notification = new apn.Notification();
    notification.expiry = Math.floor(Date.now() / 1000) + 3600;
    notification.badge = 1;
    notification.sound = "ping.aiff";
    notification.alert = {
      title: title,
      body: message
    };
    notification.topic = process.env.BUNDLE_ID;

    // Send notification
    const result = await apnProvider.send(notification, deviceToken);
    
    // Shutdown provider
    apnProvider.shutdown();

    if (result.failed.length > 0) {
      throw new Error(JSON.stringify(result.failed[0].response));
    }

    res.status(200).json({ success: true, message: 'Notification sent successfully' });
  } catch (error) {
    console.error('Push notification error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}